#!/usr/bin/env ruby

require 'bundler'
Bundler.require

require 'openstack'
require 'yaml'
require 'base64'

# Establish a connection to HP Cloud service
conn = OpenStack::Connection.create(
  :username => "jennysa",
  :api_key => "orionsys",
  :auth_method => "password",
  :auth_url => "https://region-a.geo-1.identity.hpcloudsvc.com:35357/v2.0/",
  :service_type =>"compute"
  )