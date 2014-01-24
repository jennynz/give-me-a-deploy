#!/usr/bin/env ruby

require 'bundler'
Bundler.require

require 'fog'
require 'yaml'

server_info = YAML.load_file('server_info.yml')
puts "\n\nShutting down " + server_info[:name] + " on DevStack.\n\n\n"

# Establish a connection to HP Cloud service
conn = Fog::Compute.new(
  :provider      => "HP",
  :hp_access_key  => "YTJ3CDHULMMX8V8K4FVD",
  :hp_secret_key => "8FXL9pZocUEIi9Bub3UyM/ZZvaQ5nxhXtbjTHWO5",
  :hp_auth_uri   => "https://region-a.geo-1.identity.hpcloudsvc.com:35357/v2.0/",
  :hp_tenant_id => "10647634461576",
  :hp_avl_zone    => "az-1.region-a.geo-1",
  :version        => "v2",
  )

# Delete the floating IP
floating_ip = conn.adresses.get(server_info[:floating_ip])

# Destroy the existing instance
server = conn.servers.get(server_info[:server_id])
server.destroy