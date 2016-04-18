# Give-Me-A-Deploy

This repository contains all the files for Give-Me-A-Deploy, a summer internship project at Orion Health as part of the Orion Continunous Delivery team. Give-Me-A-Deploy is a web-based GUI configurator for virtual machines (VM) which generates executable source code that spins up custom VMs provisioned with Orion Health products. It aims to make VMs faster and easier for testers and developers at Orion Health, as they provide clean and consistent environments. It uses the Vagrant command line VM manager to package images into lightweight, mobile files, and the Puppet automation tool to install selected Orion Health products. It uses the same Puppet modules that are used in production, to ensure consistency between the development and production environments.

## Using Give-Me-A-Deploy locally ##
If you wish to use this entirely client-side web app locally, simply clone this repository and open **html/index.html**.

### Prerequisites ###
The requirements of your host machine depend on the type of Virtual Environment you select. There are three options:

#### Provisioned VM on your local machine ####
This option outputs customised scripts which, when run, boot up a VM provisioned with OHP products on your local machine.

Before running the generated script `run.sh`, which kicks off the entire booting and provisioning process, please install the following on your host machine:

- [VirtualBox](https://www.virtualbox.org/wiki/Downloads) - ensure that the version is compatible with Vagrant
- [Vagrant](http://www.vagrantup.com/)
- [Git version control](http://git-scm.com/downloads)

You must also have SSH key pairs set up with your Stash account, and permission to clone the following repositories:

* [OCD tooling (Stash)](http://stash/projects/OCD/repos/tooling/browse)
* [puppet-ohp (Stash)](http://stash/projects/PUPPET/repos/puppet-ohp/browse) - these are the same OHP Puppet modules used in Production, ensuring consistency across the development and production environments
* [PlatformBuild/trunk (Subversion)](http://subversion/src/Orchestral/Framework/PlatformBuild/trunk)

You are **not** required to clone these repositories yourself manually. This will all be done automatically upon running the script `run.sh`.

After calling `run.sh`, the scripts should require no further interaction from the users until the specified Orion Health products are installed and accessible from your browser.

*E.g. If the input in the 'Host Port' and 'Products' fields of the form were kept as the defaults, go to [http://localhost:19080/conductor](http://localhost:19080/conductor) for Orion Health Platform and [http://localhost:19080/concerto](http://localhost:19080/concerto) for Orion Health Portal.*

#### Provisioned VM on HP Cloud ####
This option has not yet been developed. Click "Deploy" A mock-up popup dialogue has been put in place when this option is selected to give an example of how the feature may look if it is developed in the future.

#### Empty VM on your local machine ####
The 'Empty Vagrant' option simply generates a single Vagrantfile with a few custom configurations. It can be used to boot up a VM with any or no provisioning on your local machine. 

## Hosting Give-Me-A-Deploy on an nginx server ##
Included in this repository are the files for automating the hosting of GMAD live on an nginx server, either [locally](localhost/) or on an [HP Cloud instance](hpcloud/). This holds several purposes:

1. It is a good stepping stone to getting Give-Me-A-Deploy live and accessible to other users.
2. It provided a simple example (nginx being a much simpler application and puppet module to configure than an Orion Health product) to use in the development of scripts which automate the spinning up of provisioned VMs in the cloud, which may help with the "Provisioned VM on HP Cloud" option in the app.
2. It allowed us to practice continuous delivery on our own internal applications and tools.

## Documentation

* For end user documentation on how to use this app, system requirements, how to manage your VM, background information on VMs and the potential gains from using VMs for testing, please see the Docs on the actual Give-Me-A-Deploy web app (html/docs).
* For developers wishing to know more about how this app works or to see ideas on improvements to functionality/UI, please see the [Developer Documentation](docs/developer_documentation.md).
* For any further documentation, please contact [Jenny Sahng](mailto:jenny.s@hotmail.co.nz). This may include:
  * Information on automating the booting of a provisioned HP Cloud instance with Bamboo, which gets Give-Me-A-Deply live (hosted on an NGINX server using a Ruby API binding) and accessible to other users, and also provides a stepping stone for practising continuous delivery on our own internal applications and tools.
  * A list of all the compatible Orion Health products and versions that this app has been tested on (as of February 2014)