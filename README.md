Give-Me-A-Deploy (GMAD)
==
This repository contains all the files from the development and implementation of an intern project called Give-Me-A-Deploy, a web-based GUI configurator which generates executable source code that spins up Virtual Machines provisioned with Orion Health products. It aims to make Virtual Machines faster and easier for testers and developers at Orion Health, as they provide clean and consistent environments.

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

You are **not** required to clone these repositories yourself manually. This will all be done automatically upon running the script `run.sh`. After calling `run.sh`, the scripts should require no further interaction from the users until the specified Orion Health products are installed and accessible from your browser.

E.g.
http://localhost:19080/conductor for Platform, http://localhost:19080/concerto for Portal.

#### Provisioned VM on HP Cloud ####
This option is not yet available on GMAD. A example page can be viewed when you click "Generate 

## Hosting Give-Me-A-Deploy on an nginx server ##
During the course of this project, 

### Continuously Delivering Give-Me-A-Deploy on Bamboo ###
the Bamboo plan [Give-Me-A-Deploy on HP Cloud](http://bamboo/browse/ATT-GMAD) which aims to boot an HP Cloud instance provisioned with an NGINX server hosting the web app Give-Me-A-Vagrant, using a Ruby API Binding.

For more information, please see this [Woki article on hosting GMAD on an nginx server](http://woki/display/IntDev/Hosting+Give-Me-A-Deploy+on+an+nginx+server).

## Further Information ##
Please refer to the Give-Me-A-Deploy About page (html/about.html) or the Docs (html/docs.html), or the [Woki page](http://woki/display/IntDev/Give-Me-A-Deploy) for more information.