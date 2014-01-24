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

puts "\n\n" + os + "\n\n"