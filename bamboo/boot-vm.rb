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

# Create a new server provisioned with NGINX
gmadserver = os.create_server(
  :name => 'bamboo-gmad',
  :imageRef => '202e7659-f7c6-444a-8b32-872fe2ed080c',
  :flavorRef => '100',
  :key_name => 'puppet',
  :user_data => Base64::encode64(File.read('cloud_init.sh')),
  )


while gmadserver.status != 'ACTIVE' do 
  puts gmadserver.status
  gmadserver.refresh
  sleep(5)
end

puts gmadserver.name + " is ACTIVE."

# Allocate a floating ip
puts "Assigning floating IP..."
floating_ip = os.create_floating_ip
ip_success = os.attach_floating_ip({:server_id=>gmadserver.id, :ip_id=>floating_ip.id})
puts "attached: #{ip_success}\n\n"

# Store information of existing instance created on OS in data set variable.
server_info = { 
  :server_id => gmadserver.id,
  :ip_id => floating_ip.id
}

# Write server information to file.
File.open('server_info.yml', 'w') { |fh|
 fh.puts server_info.to_yaml + "\n" + os.to_yaml
}