
function GenerateHPCloudScripts(vmname) {

	return (
	"\n\n################################################################\n\n" +
	"Give-Me-A-Vagrant for HP Cloud is currently in dev!\n" + 
	"Check out this Stash repo for an example of what it may eventually look like:\n\n" +
	"http://stash/users/richardpa/repos/vagrant-on-hpcloud/browse/Vagrantfile\n\n" +
	"################################################################\n\n\n\n\n\n" +

	"# -*- mode: ruby -*-\n" +
	"# vi: set ft=ruby :\n\n" +

	"# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!\n" +
	"VAGRANTFILE_API_VERSION = '2'\n\n" +

	"Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|\n\n" + 

	"# Allocate the VM more memory\n" + 
	"config.vm.provider :virtualbox do |vb|\n" + 
	"  vb.customize ['modifyvm', :id, '--memory', '1536']\n" +
	"end\n\n" + 
	 
	"# Every Vagrant VM requires a box to build off of.\n" +
	"config.vm.box = 'dummy'\n\n" + 

	"# The url from where the config.vm.box will be fetched if it doesn't already exist on the host machine.\n" + 
	"config.vm.box_url = 'https://github.com/cloudbau/vagrant-openstack-plugin/raw/master/dummy.box'\n\n" +

	"# Set the name of the host machine.\n" +
  	"config.vm.hostname = '" + vmname + "'\n\n" + 

	"config.vm.provider :openstack do |os|\n" +
	    "os.username = ENV['OS_USERNAME']\n" +
	    "os.api_key  = ENV['OS_PASSWORD']\n" +
	    "os.tenant   = ENV['OS_TENANT_NAME']\n" +
	    "os.endpoint = \"#{ENV['OS_AUTH_URL']}/tokens\"\n\n" +

	    "os.keypair_name = keypair_name\n" +
	    "os.ssh_username = 'root'\n\n" +

	    "os.flavor   = 'standard.small'\n" +
	    "os.image    = '78265' # CentOS 6.3\n\n" +

	    "os.address_id = 'private' # Chooses the 15.x.x.x range 'private IP' over the 10.x.x.x address\n\n" +

		"hostname = `hostname`.chomp\n" +
	    "os.server_name = '#{hostname}-vagrant'\n\n" +

	    "# Workaround until Vagrant 1.4 is released - https://github.com/mitchellh/vagrant/issues/1482\n" +
	    "os.user_data = File.read('user-data.txt')\n" +
	"end\n\n" +

	"# Install Puppet\n" + 
 	"config.vm.provision :shell, path: 'setup.sh'\n\n" + 

 	"# Install OHP with Puppet modules\n" + 
	"config.vm.provision :puppet do |puppet|\n" + 
	"  # puppet.options = '--verbose --debug'\n" +
	"  puppet.module_path  = 'modules/puppet-ohp'\n" +
	"  puppet.manifests_path = 'manifests'\n" +
	"  puppet.manifest_file  = 'site.pp'\n" + 
	"end\n\n" +

	"end");
}