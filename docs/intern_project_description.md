# Intern Project: Portal Automation Library Environments Built on Demand

## Introduction

The process of deploying Orion Health products for testing can be an arduous task taking up to days to complete. The intention of this Intern Project is to automate the deployment of these aforementioned products in a short-lived VM environment for testing. The automation process forms a part of the continuous integration framework in reducing the time to release of software products as well as in improving the reliability of software testing in a deployed environment.

## Objectives

The workflow can be divided into two main phases: the automation of the deployment environment using services internal to Orion Health (Phase I), followed by the replacement of internal services for third-party services (Phase II). The key undertakings of each respective phase are outlined below.

### Phase I

* Spin up a VM on the local OpenStack (devstack)
* Install Portal on the VM instance 
* Configure Portal to be independent of any external databases
* Run Portal Automation Library Tests
* Destroy VM upon successful test run
* Automate processes via Bamboo

### Phase II
	
* Switch out internal Selenium-grid service for Saucelabs
* Switch out local OpenStack for HP Cloud

## Potential Benefits

There are several potential advantages of automating the deployment process.

* Easy configurability - by specifying the applications required as well as the OS and flavour of the VM desired, an environment tailored to the developer's needs can automatically be generated.
* Isolation - because the Portal installation is independent of any external databases, the developer will not need to worry about disrupting the work of other developers when making changes to the environment.
* Consistency and reliability - short-lived testing environments can improve software reliability as developers will no longer need to face uncertain software environments running on existing virtual machines. Furthermore, moving the deployment of test environments to HP Cloud will free up internal server resources, the shortage of which is closely associated with the inconsistencies of the current build: http://bamboo/browse/CPO-PORTALAUTOMATION
* Time savings - this project could help realise cost savings in terms of time saved for developers. The automation of the deployment of test environments could improve productivity by enabling developers to focus time and effort on the actual development of reliable software rather than on error fixing in building the development environment.

## Further information

* [Continuous Delivery](http://martinfowler.com/bliki/ContinuousDelivery.html)
* [Talk on Continuous Delivery](http://yow.eventer.com/events/1004/talks/1062)

# Intern project proposal: Automated deployment of virtual machines for testing

## Project Deliverables

The aim of this project is to improve reliability of software testing in a deployed environment and forms a part of the continuous integration plan of reducing time to release for our * software products. Using our internal systems and tools, the intern will work alongside the Product Development team to deliver the project. This will involve:

* Researching process and workflow needs
* Technical design and build-out of the integration
* Testing and bug-fixing
* Documentation of processes

## Intern information

Jenny Sahng - Bachelor of Arts / Bachelor of Engineering (Honours) Conjoint, Specialisation in Biomedical Engineering
James Han - Bachelor of Engineering (Hons)/ Bachelor of Commerce

## Project Overview

*What increased capability, product, process or market knowledge do you expect to attain as a result of this project?*
The current process of deploying Orion Health products for testing can be an arduous task. By adopting automation practices the deployment process can be reduced from days to hours. This frees up both time and server resourcing resulting in reduced cost and greater productivity.

*Why is this of benefit to the company and what is its relevance to the main activities of the company or business unit? What steps are in place to ensure the intern is mentored through their internship?*
Orion Health promotes a strong innovative culture within the company and we are constantly looking for ways to enhance our product offerings to improve patient health. The Development team are responsible for the technical execution of the software.
By having this application, the teams will benefit from:
* Better software reliability: because they will not have to deal with uncertain software environments running on an existing virtual machine
* Greater productivity: this application enables the teams to focus time and effort on actual development and not unnecessary error fixing

*Through our graduate and internship programs in the past, we have experience with leading and mentoring intern and successfully demonstrating project outcomes. The chosen intern will have access to a network of key individuals across the business. We will support the intern with a broad scope including:*
* Giving them a buddy they can go to with any questions
* Integration into the product development team
* Formal and informal 1:1 catchups with senior business leaders
* Technical and commercial team meetings to facilitate knowledge transfer

*As a result of this project, what revenues, profits or cost savings do you expect in dollars per annum?*
This project will help us realise cost savings in terms of time saved for all development teams. Software testing within a development environment can be a challenging task and can potentially take a lot of time fixing the environment and divert focus away from building reliable software. Exact dollar amounts are hard to quantify but we know from experience that this is an important requirement to help speed up the deployment of our systems. 

*How will these benefits be realised? What market channels will be used to create the extra revenues or how will profits or cost savings be realised?*
We will realise the benefits of this project through educating our development teams to use this application effectively. Cost savings will be achieved by saving on development time spent.

## Project Outcomes

*What are the major steps or phases in the project? Please name each Technical or Commercial outcome with a short descriptive title.*
Technical Design and Build-out

*Describe the major steps or phases in the project. How do you plan to undertake the work?*
* Requirements gathering
* Interaction with key stakeholders
* Researching existing systems
* Building the front and backend framework

*Describe a successful outcome or result expected.*
* Technical design and architecture
* Working software code
* Process and workflow documentation

*What are the major steps or phases in the project? Please name each Technical or Commercial outcome with a short descriptive title.*
Assets and artefacts

*Describe the major steps or phases in the project. How do you plan to undertake the work?*
Collateral assets to leave behind knowledge transfer items to continue on-going management

*Describe a successful outcome or result expected.*
Key design decisions recorded
Key processes documented
Steps for change management documented 