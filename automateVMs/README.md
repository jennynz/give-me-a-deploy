# Booting & Destroying VMs in OpenStack through Bamboo

The first steps towards being able to test software on short-lived pre-provisioned and configured VMs is being able to automate the spinning up and tearing down of VMs. This page describes how a VM instance can be launched and terminated on a local OpenStack server in an automatic fashion using Bamboo and Ruby source code. Many of the instructions are a step-by-step walk-through of how we managed this task.

## Files

The only three necessary files in your git repo are boot-vm.rb, destroy-vm.rb and the Gemfile. A .gitignore may be added if needed.

`boot-vm.rb` creates an OpenStack object ‘os’, which it uses to connect to Orion's local OpenStack server (called DevStack). In OS, it creates a new instance with the specified attributes such as name, imageRef for the type of operating system and flavorRef for the RAM size. The instance information is then stored in a YAML file (servers.yml) in the build agent to be later used to identify the OS instance to shut down.

`destroy-vm.rb` loads the details of the instance from the YAML file, logs in to OS and uses the server ID to shut down the correct VM.

## Setting up Stash and Bamboo

1.  Set up a repository on Stash.
2.  Add ruby source code files boot-vm.rb and shutdown-vm.rb to the repository.
3.  Add a Gemfile, which specifies the ruby version required (2.0.0) and all the ruby gems needed to carry out the Bamboo plan.
4.  Add the development-agents group under Repository Permissions (Settings > Permissions:Repository > Add group) to allow the Bambooo agent to access your repository.
5.  Set up an SSH key using a key generating application like puTTYgen. Parameters we used were key type "SSH-2 RSA" and 208 bits. Copy and paste the "public key for pasting into OpenSSH authorized-keys file" into your Stash account.

## Configuring Stages, Jobs & Tasks on Bamboo

Bamboo schedules and executes builds according to a hierarchy of things to do:
* Stages run sequentially, and can have different agents
* Jobs within a stage can run in parallel, but each job only uses a single agent for all its tasks.
* Tasks are the individual steps within a job. Here, you can specify a final task to always execute (in our case, destroying the VM), even if the other tasks fail.

1.  Go to the "Configure plan" view.
2.  Click "Create stage" and give it a unique name e.g. Portal Automation
3.  Create a new job in the stage, again with a descriptive, clear name and job key e.g. Portal 7.2.0 beta. _This project only requires one job, but multiple jobs can be made to run simultaneously to test different versions of Portal._
4.  Make sure that the "Enable this job?" check box is ticked, otherwise the job will not run.
5.  Add tasks to the job.
    1.  Source Code Checkout from the repository
        1.  Add task > Source control > Source code checkout
        2.  Point this to the default repository set up earlier (see "Repository" above) by selecting the repo name from the dropdown.
    2.  Script: "Start VM"
        1.  Add task > Script
        2.  Choose the script location to be "Inline", and write a shell script to call the ruby script which boots a VM on OpenStack. An example of the script body we used is below:
        ```
        #!/bin/bash

        # Locate where rbenv can be found
        source ~/.bash_profile
        
        # Install bundler to install all required gems in the Gemfile and its dependencies
        gem install bundler
        rbenv rehash
        bundle install --path vendor/bundle

        bundle exec ruby boot-vm.rb
        ``` 
        3. If the Bamboo agent does not recognise the commands “gem” and “bundle”, specify the Ruby version on the first run by adding `rbenv global 2.0.0` to the inline script above the "gem" command (this is needed the first time the agent is used). Alternatively, create a `.ruby-version` file with just the version number in it e.g. `echo 2.0.0 > .ruby-version`.
    3.  Script: "Destroy VM"
        1.  Another inline script, which this time destroys the created VM by calling the ruby script `destroy-vm.rb`.
        ```
        #!/bin/bash
        source ~/bash_profile
        bundle exec ruby destroy-vm.rb
        ```
    2.  After saving this task, drag it under “Final tasks” section of the in the tasks menu so that the VM is always destroyed each run, even if previous tasks fail.

### Build Agent

Configure the requirements of the build agent so it has the required capabilities already installed to carry out your job.

1.  Go to the “Requirements” tab on the job page.
2.  In the dropdown menu for “New custom requirement…”, choose the executable “Bash”, and the Custom “rbenv” (two separate requirements to add)
    1.  There should be at least one agent which is capable of building the job. You will be notified if there are no agents which can fulfil both requirements.

## Build & Validation

Once the plan has been configured with the appropriate tasks, requirements and source repository, *run the plan*.

Check that `boot-vm.rb` is storing the newly created VM information (server ID) by logging in to the build agent and reading the `servers.yml` file.

1.  Login to DevStack and go to Instances.
2.  There will be a small window of time after the VM has booted but before it is terminated when the instance is visible. Click the Instance Name and note its ID. 
3.  On a bash command prompt, log in to the build agent using `ssh build@build-agent-name` (using your own build agent’s name at the build result summary details).
4.  View the YAML file. The value of `serverid` should still be the ID of the instance which was just created and destroyed.
