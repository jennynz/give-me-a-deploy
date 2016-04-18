# Developer Documentation

Give-Me-A-Deploy (GMAD) started as an intern project over the summer of 2013/2014, and was left in the midst of the development of potentially its most useful and efficient feature: the option of deploying and managing short-lived provisioned VMs from the GUI. Some developer's documentation has been compiled which may prove useful for any further extension to this app in the future.

## Introduction to the Give-Me-A-Deploy app

Give-Me-A-Deloy makes use of JavaScript libraries in order to produce a customised string, which is printed out into a textbox and then able to be downloaded as a Vagrantfile in a zip along with other meta-phase shell scripts and any required dependencies. The user should be able to download the zip file and just run one of the included shell scripts. This should execute the entire automated process of spinning up a VM (whether on the local machine - Vagrant, on a local server - DevStack, or on the cloud - HP Cloud), and installing and configuring the desired OH products.

## A provisioned VM on your local machine

### Purely client-side

> There are many advantages to client-side scripting including faster response times, a more interactive application, and less overhead on the web server. Client-side code is ideal for when the page elements need to be changed without the need to contact the database. - [Bill Fote, Segue Technologies](http://www.seguetech.com/blog/2013/05/01/client-side-server-side-code-difference)

The GMAD  configurator is designed to be written in only client-side scripts, with JavaScript handling all back end processes. Efforts have been made to ensure that this web application does not require access to any forms of permanent storage such as a databases or files. All its dependent scripts and files are downloaded from the Internet or network (Ivy), or written to files created in the initial shell script. It is always preferable to use client-side scripts where possible, because involving the web server not only uses the host's resources, but it can also lead to a much slower user experience as variable information is being passed back and forth between the changing webpage and remote permanent storage. The only downside to client-side scripting is that there is wide variation in browser support, an issue which GMAD attempts to address with multiple options for file download depending on the user's browser capabilities.

Due to this fact, GMAD is unable to generate a zip file with all the dependent applications and files included. Instead, it write out strings to scripts, which are then run to download or create the dependencies. These are used together to boot and provision the VM.

### run.sh

This is the metaphase shell script which the user runs to kick off the entire spin-up, installation and configuration process.
It runs the commands that need to be executed in the directory that contains the Vagrantfile on the host machine. The main requirements for this kick-off script are the cloning of the OCD tooling repository and Puppet modules from Stash, the creation of the directories modules and modules/puppet-ohp for these repositories to go in and finally, calling "vagrant up". The directories which will eventually have to be made on the VM are also created by this file, as they will be mirrored between the host directory and the VM's default directory (/vagrant) automatically anyway.

### Vagrantfile

> The primary function of the Vagrantfile is to describe the type of machine required for a project, and how to configure and provision these machines. - [Vagrantfile, Vagrant Docs](https://www.vagrantup.com/docs/vagrantfile/index.html)

The Vagrantfile allows you to package up your entire VM configuration into one lightweight Ruby-syntax file. It can be committed to version control, checked out by another development, booted up (with "vagrant up") and ready to roll, making them very portable. The VM is booted when "vagrant up" in called from inside run.sh on the host machine.

The parameters which are able to be customised by GMAD are currently very basic. The only modification to Vagrant's template (try run "vagrant init" in a directory, and have a look at the template Vagrantfile which is generated) is the addition of the provisioning.sh shell script being called at the end to prepare the newly created VM with the appropriate directories, source files and dependencies for the OHP to be able to be installed and configured automatically with Puppet. The default box is CentOS 64, fetched from [Puppet Labs Vagrant Boxes](http://puppet-vagrant-boxes.puppetlabs.com/).

### provisioning.sh

This is the provisioning shell script which is called by Vagrantfile and executed inside the newly created guest machine. It essentially sets up the installation environment with all the required dependencies, then uses the repositories cloned in the metaphase by run.sh (e.g. OHP Puppet module, OCD tooling) to Puppet install and start Platform and the other specified applications.

## Thoughts on improvements

### Functionality

* Make the app's back end more robust - currently, the app is vulnerable to failure if any of its dependent repositories on Stash, Subversion or Ivy undergo any changes.
* With the aid of server-side script, we may be able to completely move from generating source code and instead deploy these local VMs straight into the user's machine (some security issues may arise here).
* Better compatibility with wider range of products and versions (maybe survey users first to see which products or versions are most wanted).

### UI

* Maybe a dropdown box of products and a list of foundation versions straight off Ivy to avoid problems with format of user input and string manipulation - make it more robust!
* Are the instructions clear enough in the heading?
* How much knowledge of VMs and command line does the average end user have? Do they know what to do when they see, for example, "$ chmod +x run.sh" or "cd to/your/directory"?
* Do people like the SelectAll() function? Does it ever get annoying where if you wanted to just copy one line, you have to copy the whole thing across to your text editor, unless it just highlights the whole textbox on mouseup?
* Checkbox asking whether the user would like an automated email sent to them if their VM is about to expire.
  * Email address entered in form should autocomplete the email field in the "deployed" popup.
  * Check validity of email address (and the other inputs too).
* More `<input required>` attributes specifying which fields are required, and an appropriate error message if not all necessary fields are filled.
* A straight deploy to the cloud wouldn't need a Host Port specified - hide field when "Provisioned VM on HP Cloud" option is checked.
* jQuery tooltip for information at bottom of local provisioned VM scripts ("For more information about these scripts...")

### Cleaner code

* The naming of some classes and ids could have been better thought out. Names such as "provisionedenv-run-source" are too long, and they are ambiguous as it does not specify whether it is referring to the Provisioned VM option on HP Cloud, or on a local machine.
* stylesheet.css could be split into separate files, such as main, index, docs etc. Commenting already tries to divide the styles into global, and page-specific categories.
* Possibly one consolidated, comprehensive set of documentation all in one place, instead of being spread between GMAD Docs, Woki and Stash markdown readme's (in progress!).

### Analytics

* Take some metrics, maybe another survey down the track when users have used GMAD to see if opinions towards using VMs have improved (initial opinions towards using VMs was largely unenthusiastic as of December 2013).

## "Empty VM on your local machine"

This option is just a Vagrantfile generator, which makes it even easier for a vagrant VM to be configured with basic options, as sometimes the syntax or available options may not be very obvious (although they are quite clearly set out in the [Vagrant Docs](https://www.vagrantup.com/docs/virtualbox/configuration.html)). The usefulness of this option is questionable: would there be a demand for such a configurator from users who require VMs, when Vagrant already makes VMs so straight forward? The purpose of this option was to serve as a testing ground during the initial stages of this app's development.

*Is this option necessary/useful?*
It would make for a cleaner UX if it were removed, as it is quite an "odd-one-out" compared with the other two options. If most users of this app would already be comfortable with using and configuring Vagrant, with the aid of their official docs, is it necessary to have this feature at all?

## "Provisioned VM on HP Cloud" (to be developed)

Even better than deployable source code would be pre-configured VMs automatically spun up a pubic cloud server (HP Cloud) and destroyed from a GUI interface. These short-lived VMs would eliminate the problem of idle VMs, and provide an efficient solution the the demand for fast and flexible VMs for development. This would require some server-side scripts which implement the HP Cloud/OpenStack APIs to allow the app to control the booting and destroying of instances in the cloud.

This option could first be developed with the local OpenStack Server at Orion, DevStack. This would require the user's machine to use either the OpenStack command line client, Nova, written in Python and available through pip, or the Ruby API binding, Fog. The same puppet modules would be required for the installation and configuration of the Orion Health applications.

Some preliminary experiments on automating the creation of a provisioned HP Cloud instance from a local machine was done with Nova and nginx as the provisioned application (serving GMAD, in fact). For specific details on how this was done, please see Hosting Give-Me-A-Deploy on an nginx server or the give-me-a-deploy/hpcloud/ directory in Stash. The same basic structure of install_nova_client.sh calling a cloud_init.sh script which provisions the HP Cloud instance with the application of your choice using Puppet could be replicated. Instead of puppet installing an nginx module, the OHP module would be used instead, with the appropriate changes to site.pp made. The cloud_init.sh script would likely be much more complex than the one for booting an nginx server, as many of the same dependencies that are fetched from provisioning.sh would be required in this new instance also.
 
