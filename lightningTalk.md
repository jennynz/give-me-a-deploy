# Give-Me-A-Deploy Lightning Talk

Intern Project Demos, 1pm, Friday 21st February 2014

## Give-Me-A-Deploy

Hello everyone, my name is Jenny Sahng and I was one of the interns in the Orion Continuous Delivery team this summer. During my time here, I built this tool called Give-Me-A-Deploy which aims to make Virtual Machines (aka VMs) as quick and easy as possible for developers and testers at Orion Health. 

## Ideal for Software QA

VMs are ideal for software quality assurance, as they can provide a clean and consistent test environment. 

1. Isolation: VMs can isolate applications from one another, and from programmes on your daily OS to minimise interference with tests.

2. Consolidation: They are much quicker to boot, cheaper to maintain than physical machines, and multiple VMs can be run on one physical machine.

3. Ease of testing: VMs are easily configurable to fit your needs, and many virtualisation packages have features designed for testing like snap shots.

4. Mobility: They are also able to be moved around and copied across physical machines as single files, making them flexible and easy to deploy.

As you can see, smart utilisation of VMs can maximise efficiency and productivity. 
 
## Vagrant & Puppet

Vagrant is the command line VM manager. It is used by Give-Me-A-Deploy because it makes it very simple to boot up and destroy exactly the kind of guest machine you want in a disposable environment.

One of Vagrant's built-in automation tools is Puppet, which is used by the Continuous Delivery team to automate the installation and configuration of our Orion Health products. Give-Me-A-Deploy uses the same OHP Puppet module in Stash that's used in production. This ensures consistency between development, testing and production. 

## How It Works

This web-based application is essentially a Javascript source code generator. It outputs code that you run to boot a VM that is already provisioned with Orion Health products. This tool aims to make VMs an increasingly widespread option for devs and testers by being fast, hands-free and user friendly. 

_Homepage slide_: Here is the landing page when you arrive at Give-Me-A-Deploy. As you can see, there are a few input fields for you to customise your VM. The default values there are fine for a typical setup, so we can just click Generate Source Code.

_Source code generated_: You're instantly taken to these three generated scripts which are already customised with the options you input just before. Download them as zip, or just copy and paste. 

_Command line_: Once they're in the same directory, make run.sh executable, and then run it. From here, you're hands are free.

You can see here that it's started cloning some Git repositories from Stash. It'll carry you through the entire process from booting up your customised VM, to downloading and writing out files, to Puppet installing the specified Orion Health products.

As you can imagine, this is a much faster and more reliable process than doing all these steps manually. There's much less risk of missing a step, and it's all automatic. 

_Platform/Portal_: 15-30 minutes later, there's Platform and Portal running on your browsers. Improvements to the current Give-Me-A-Deploy app may include functions to validate form entries, and tests on a wider range of products, as at the moment it has only been tested with the more recent versions of Platform and Portal.

_Docs_: It also comes with extensive user documentation found on the app itself, and also developer documentation in the Woki.

## Short-lived VMs, built on demand

While Give-Me-A-Deploy is ideal for spinning up VMs locally using source code, it doesn't quite have the functionality to deploy a VM straight from the GUI.

A possible continuation of this app may be to enable the interface to automatically spin up provisioned VMs in a cloud server (like HP Cloud). This would allow you to focus on your own code, without worrying about problems with the server.

If we made these on-demand VMs short-lived, meaning that they automatically expire after 48 hours or so, this would eliminate the problem of idle VMs. This would save on resources, while continuing to provide consistent, fast and flexible environments for developers and testers at Orion.
