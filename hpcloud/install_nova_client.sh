#!/bin/bash

set -e

apt-get update
apt-get -y install python-pip
pip install python-novaclient novaclient-auth-secretkey

# Upgrade ruby 1.9.3
apt-get -y install ruby1.9.1 ruby1.9.1-dev \
  rubygems1.9.1 irb1.9.1 ri1.9.1 rdoc1.9.1 \
  build-essential libopenssl-ruby1.9.1 libssl-dev zlib1g-dev

update-alternatives --install /usr/bin/ruby ruby /usr/bin/ruby1.9.1 400 \
         --slave   /usr/share/man/man1/ruby.1.gz ruby.1.gz \
                        /usr/share/man/man1/ruby1.9.1.1.gz \
        --slave   /usr/bin/ri ri /usr/bin/ri1.9.1 \
        --slave   /usr/bin/irb irb /usr/bin/irb1.9.1 \
        --slave   /usr/bin/rdoc rdoc /usr/bin/rdoc1.9.1

update-alternatives --config ruby
update-alternatives --config gem

# Install git
apt-get -y install git

# Install curl
apt-get -y install curl

# Install required dependencies from gem file
gem install bundler
cd /vagrant
bundle install

# Append source env to .profile, and save variables to bash session.
cat /vagrant/hp_cloud_prop.env >> /home/vagrant/.profile
export OS_AUTH_SYSTEM="secretkey"
export OS_ACCESS_KEY_ID="YTJ3CDHULMMX8V8K4FVD"
export OS_SECRET_KEY="8FXL9pZocUEIi9Bub3UyM/ZZvaQ5nxhXtbjTHWO5"
export OS_REGION_NAME="region-a.geo-1"
export OS_AUTH_URL="https://region-a.geo-1.identity.hpcloudsvc.com:35357/v2.0/"
export OS_TENANT_NAME="Continuous-Delivery"
export OS_PASSWORD=useapikey
export OS_USERNAME=useapikeey
export INSTANCE_NAME=gmad-nginx

# copy ssh configuration
sudo cp -a /vagrant/config /home/vagrant/.ssh
sudo cp -a /vagrant/puppet_id_rsa /home/vagrant/.ssh
chmod 400 /home/vagrant/.ssh/config /home/vagrant/.ssh/puppet_id_rsa

# Boot nova instance
nova boot --flavor standard.xsmall --image "CentOS 6.3 Server 64-bit 20130116 (b)" --key-name puppet ${INSTANCE_NAME} --user-data="/vagrant/cloud_init.sh" >/dev/null

# Assign a new floating IP
export FLOATING_IP="`nova floating-ip-create | awk '$4 == "None" { print $2 }'`"
while [ "`nova show ${INSTANCE_NAME} | awk '$2 == "status" { print $4 }'`" != "ACTIVE" ]
do
	sleep 2
done
nova add-floating-ip ${INSTANCE_NAME} ${FLOATING_IP}

sleep 120

nova show ${INSTANCE_NAME}

# Sync across html files
rsync -e "ssh -i /home/vagrant/.ssh/puppet_id_rsa -o StrictHostKeyChecking=no -o GSSAPIAuthentication=no" -avz  /vagrant/html root@${FLOATING_IP}:/usr/share/nginx/

sleep 60

# Restart NGINX service to update with new html files
ssh -t -t -i /home/vagrant/.ssh/puppet_id_rsa -o StrictHostKeyChecking=no -o GSSAPIAuthentication=no root@${FLOATING_IP} "service nginx restart"

echo -e "\n\n    Give-Me-A-Deploy"
echo -e "    hosted on HP Cloud instance '${INSTANCE_NAME}'"
echo -e "    accessible at http://${FLOATING_IP}/index.html\n\n"