#!/usr/bin/env ruby

require 'bundler'
Bundler.require

require 'fog'
require 'yaml'
require 'base64'

# Establish a connection to HP Cloud service
conn = Fog::Compute.new(
  :provider       => "HP",
  :hp_access_key  => "YTJ3CDHULMMX8V8K4FVD",
  :hp_secret_key  => "8FXL9pZocUEIi9Bub3UyM/ZZvaQ5nxhXtbjTHWO5",
  :hp_auth_uri    => "https://region-a.geo-1.identity.hpcloudsvc.com:35357/v2.0/",
  :hp_tenant_id   => "10647634461576",
  :hp_avl_zone    => "az-1.region-a.geo-1",
  :version        => "v2",
  )

conn.images.all
# conn.flavors.all