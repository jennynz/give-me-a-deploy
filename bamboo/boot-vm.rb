#!/usr/bin/env ruby

instance_id = '89015b29-a192-4d9f-96ed-fe5cedb644bc'

server = nova.server(instance_id)
floating_ip = nova.create_floating_ip

success = nova.attach_floating_ip server_id: server.id, ip_id: floating_ip.id
puts "attached: #{success}"



require 'bundler'
Bundler.require

require 'openstack'
require 'yaml'
require 'base64'

# Log in to OS
os = OpenStack::Connection.create(
  :username => "admin",
  :api_key => "orionsys",
  :auth_method => "password",
  :auth_url => "http://ocd-devstack:5000/v2.0/",
  :authtenant_name =>"admin",
  :service_type =>"compute"
  )

boot_script = Base64::encode64(File.read('boot-script.sh'))

# Create a new instance in OS
server = os.create_server(
  :name => "Portal Automation",
  :imageRef => 'cb17598a-d083-41e5-8ccf-8d585f3a5202',
  :flavorRef => '2',
  :key_name => "akl-build8",
  :user_data => Base64.encode64(File.read('boot-script.sh'))
  )

puts "\n\nBooting up " + server.name + " VM on DevStack...\n\n"

while server.status != 'ACTIVE' do 
  server.refresh
  puts server.status
  sleep(5)
end

puts "\n" + server.name + " is active.\n\n\n"

# Store information of existing instance created on OS in data set variable.
servers = { 
  :name => server.name,
  :flavor => server.flavor['id'],
  :image => server.image['id'],
  :address => server.addresses.map { |a| a.address }.select{|ip| ip[/^192/]}.first,
  :serverid => server.id
  }

  

# Write server information to file.
File.open('servers.yml', 'w') { |fh|
 fh.puts servers.to_yaml + "\n" + os.to_yaml
}
