#!/usr/bin/env ruby

require 'bundler'
Bundler.require

require 'fog'
require 'yaml'
require 'base64'

# Establish a connection to HP Cloud service
conn = Fog::Compute.new(
  :provider      => "HP",
  :hp_access_key  => "YTJ3CDHULMMX8V8K4FVD",
  :hp_secret_key => "8FXL9pZocUEIi9Bub3UyM/ZZvaQ5nxhXtbjTHWO5",
  :hp_auth_uri   => "https://region-a.geo-1.identity.hpcloudsvc.com:35357/v2.0/",
  :hp_tenant_id => "10647634461576",
  :hp_avl_zone => "az-3.region-a.geo-1",
  )

conn.flavors.all
conn.list_flavors

provision_script = Base64::encode64(File.read('cloud_init.sh'))

# Create a new server provisioned with NGINX
new_server = conn.servers.create(
  :name => "gmad-nginx",
  :flavor_id => "t1.micro",
  :image_id => 2,
  :key_name => "puppet",
  :user_data_encoded => [provision_script].pack('m'),
  # :security_groups => ["aaa"]
)

while new_server['status'] != 'ACTIVE' do 
  puts new_server['status']
  sleep(5)
end

puts "\n" + new_server.name + " is active."

# Allocate a floating ip
puts "Assigning floating IP...\n\n\n"
address = conn.adresses.create
address.new_server = new_server
puts "\nFloating IP: " + address.ip + "\n\n\n"

# Store information of existing instance created on OS in data set variable.
server_info = { 
  :server_id => new_server.id
  :floating_ip => address.ip
}

# Write server information to file.
File.open('server_info.yml', 'w') { |fh|
 fh.puts servers.to_yaml + "\n" + os.to_yaml
}
