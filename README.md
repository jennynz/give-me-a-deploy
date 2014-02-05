# Give-Me-A-Deploy #
This repository contains all the files from the development and implementation of an intern project called Give-Me-A-Deploy (GMAD), a web-based GUI configurator which generates executable source code that spins up Virtual Machines provisioned with Orion Health products. It aims to make Virtual Machines faster and easier for testers and developers at Orion Health, as they provide clean and consistent environments.

## Using Give-Me-A-Deploy locally ##
If you wish to use this entirely client-side web app locally, simply clone this repository and open **html/index.html**.

### Prerequisites ###
The requirements of your host machine depend on the type of Virtual Environment you select. There are three options:

#### Provisioned VM on your local machine ####
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
This option is not yet available on GMAD. A example of how this feature may look can be viewed when you click "Deploy" with the virtual environment set to this option.

#### Empty VM on your local machine ####
The 'Empty Vagrant' option simply outputs a Vagrantfile with a few custom configurations for your convenience. It is very simple to boot, and you may add any provisioning you wish.

## Hosting Give-Me-A-Deploy on an nginx server ##
Included in this repository are the files for automating the hosting of GMAD live on an nginx server, either locally or on an HP Cloud instance. This holds several purposes:

1. It is a good stepping stone to getting Give-Me-A-Deploy live and accessible to other users.
2. It provided a simple example (nginx being a much simpler application and puppet module to configure than an Orion Health product) to use in the development of scripts which automate the spinning up of provisioned VMs in the cloud, which may help with the "Provisioned VM on HP Cloud" option in the app.
2. It allowed us to practice continuous delivery on our own internal applications and tools.

### Continuously Delivering Give-Me-A-Deploy on Bamboo ###
The Bamboo plan [Give-Me-A-Deploy on HP Cloud](http://bamboo/browse/ATT-GMAD) boots an HP Cloud instance provisioned with an NGINX server hosting the web app Give-Me-A-Vagrant using a Ruby API Binding. It is a start on a fully-fledged example of continuous delivery, where each commit would kick off some tests, and only if passed would the changes to the actual app (in **html/**) be pushed live, all in an automated fashion.

For more information, please see this [Woki article on hosting GMAD on an nginx server](http://woki/display/IntDev/Hosting+Give-Me-A-Deploy+on+an+nginx+server).

## Further Information ##
Please refer to the Give-Me-A-Deploy About (html/about.html) and Docs (html/docs.html) pages for more end-user information, or the [Give-Me-A-Deploy Woki page](http://woki/display/IntDev/Give-Me-A-Deploy) for more detailed developer's docs and for lists of tested products and versions. 