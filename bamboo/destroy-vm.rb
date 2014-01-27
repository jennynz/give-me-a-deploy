#!/usr/bin/env ruby

require 'openstack'
require 'yaml'

server_info = YAML.load_file('server_info.yml')
puts "\n\nShutting down " + server_info[:server_name] + " on HP Cloud.\n\n\n"

# Establish a connection to HP Cloud service
conn = OpenStack::Connection.create(
  :username => "YTJ3CDHULMMX8V8K4FVD",
  :api_key => "8FXL9pZocUEIi9Bub3UyM/ZZvaQ5nxhXtbjTHWO5",
  :auth_method => "key",
  :auth_url => "https://region-a.geo-1.identity.hpcloudsvc.com:35357/v2.0/",
  :authtenant_id =>"10647634461576",
  :service_type =>"compute",
  :region => "region-a.geo-1",
)

# Delete the floating IP
floating_ip = conn.adresses.get(server_info[:floating_ip])

# Destroy the existing instance
server = os.get_server(server_info[:server_id])
server.delete!
