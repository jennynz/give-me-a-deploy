Hosting Give-Me-A-Deploy on a local nginx server
================================================

This was a simple test (nginx being a much simpler application and puppet module to configure than an Orion Health product) in the development of scripts which automate the spinning up of provisioned VMs in the cloud. To host the Give-Me-A-Deploy app locally, call 
```
vagrant up
```
Ensure that the host port specified in Vagrantfile matches the value of the listen_port in manifests/site.pp.