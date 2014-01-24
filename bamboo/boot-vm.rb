#!/usr/bin/env ruby

require 'bundler'
Bundler.require

require 'openstack'
require 'yaml'
require 'base64'

# Establish a connection to HP Cloud service
os = OpenStack::Connection.create(
  :username => "YTJ3CDHULMMX8V8K4FVD",
  :api_key => "8FXL9pZocUEIi9Bub3UyM/ZZvaQ5nxhXtbjTHWO5",
  :auth_method => "key",
  :auth_url => "https://region-a.geo-1.identity.hpcloudsvc.com:35357/v2.0/",
  :authtenant_id =>"10647634461576",
  :service_type =>"compute",
  :region => "region-a.geo-1",
  )

# conn = Fog::Compute.new(
#   :provider       => "HP",
#   :hp_access_key  => "YTJ3CDHULMMX8V8K4FVD",
#   :hp_secret_key  => "8FXL9pZocUEIi9Bub3UyM/ZZvaQ5nxhXtbjTHWO5",
#   :hp_auth_uri    => "https://region-a.geo-1.identity.hpcloudsvc.com:35357/v2.0/",
#   :hp_tenant_id   => "10647634461576",
#   :hp_avl_zone    => "az-1.region-a.geo-1",
#   :version        => "v2",
#   )

# Create a new server provisioned with NGINX
# image = os.get_image('202e7659-f7c6-444a-8b32-872fe2ed080c')
# image.name
# flavor = os.get_flavor(2)
# flavor.name
gmadserver = os.create_server(
  :name => 'give-me-a-deploy',
  :imageRef => '202e7659-f7c6-444a-8b32-872fe2ed080c',
  :flavorRef => '100',
  :key_name => 'puppet',
  :user_data => Base64::encode64(File.read('cloud_init.sh')),
  )

# gmadserver = conn.servers.create(
#   :name => "gmad-nginx-bamboo",
#   :flavor_id => "100",
#   :image_id => "202e7659-f7c6-444a-8b32-872fe2ed080c",
#   :key_name => "puppet",
#   :user_data_encoded => [provision_script].pack('m'),
# )

while gmadserver.status != 'ACTIVE' do 
  puts gmadserver.status
  gmadserver.refresh
  sleep(5)
end

# while gmadserver['status'] != 'ACTIVE' do 
#   puts gmadserver['status']
#   sleep(5)
# end

puts "\n" + gmadserver.name + " is active."

# Allocate a floating ip
puts "Assigning floating IP...\n\n\n"

floating_ip = os.create_floating_ip
success = os.attach_floating_ip({:server_id=>gmadserver.id, :ip_id=>floating_ip.id})
puts "attached: ${success}"
puts "\nFloating IP: " + floating_ip + "\n\n\n"

# address = conn.adresses.create
# address.gmadserver = gmadserver
# puts "\nFloating IP: " + address.ip + "\n\n\n"

# Store information of existing instance created on OS in data set variable.
server_info = { 
  :server_id => gmadserver.id,
  :floating_ip => address.ip
}

# Write server information to file.
File.open('server_info.yml', 'w') { |fh|
 fh.puts servers.to_yaml + "\n" + os.to_yaml
}