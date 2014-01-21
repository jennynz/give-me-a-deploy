# OCD-115 "Spike"

> **Note**: Additional documentation can be found under the `docs/` directory.

This repository contains assets related to delivery of [http://jira/browse/OCD-115](OCD-115).

1. Puppet modules for:
   * Orion Components (OHP)
   * HA Proxy
   * JMeter (as per <http://subversion/src/QualityAssurance/_ATF/trunk/apache-jmeter-2.10/>)
   * Oracle 12c.
   * Puppet master
   * Performance Collection / Monitoring (todo)
   * Commmon configuration:
      * sar
      * collectd
      * syslog
1. Nova scripts for
   * Creating Puppet master
   * Creating database server and disk storage
   * Creating security groups (PM/DB/App servers/HA Proxy/JMeter)
1. Vagrant script to create Ubuntu vm for windows users
   * This vm is pre-configured with ruby, puppet, nova-pythonclient, git and ssh config.
   * For more details look at nova/README.md
1. Shared private key for logging onto created servers
1. Scripts for related to importing seed data into Oracle

## Pre-requisites

1. If you don't have Ruby 1.9.3 or later (ruby -v on command line), install RVM stable with ruby from <https://rvm.io/rvm/install>. This is needed for both `librarian-puppet` and the `erb` application used by the scripts to boot agents.
1. Checkout this repository if you haven't already. 
1. Run `bundle install` to install ruby dependencies from this projects root.
1. Change the permissions on the puppet private key file to read/write for your user only: `chmod 600 puppet_id_rsa`

## Nova

Nova is a CLI client for using the OpenStack API. It is written in python and distributed via "pip" (python package manager). You will need python/pip installed and to use it to install novaclient as follows. Additionally an extension to use secret keys for authentication should be added.

### Debian/Ubuntu

The nova client for managing OpenStack can be installed apt-get, however the extension supporting key-based authentication needs to be installed via pip.

    $ apt-get -y install python-pip
    $ pip install python-novaclient novaclient-auth-secretkey

### OS/X

    $ brew install python
    $ pip install python-novaclient novaclient-auth-secretkey

## Setting up your environment variables

Nova requires a few parameters to be passed in order use the OpenStack API. Fortunately these can also be provided via environment variables. The suggested workflow is to create a bash `.env` file in this projects root with the relevant exports.  

Create the environment settings `.env` as per the `.env.template` by filling in the '...' blanks from the values in <https://account.hpcloud.com/account/api_keys>. 

As this will contain user specific settings, it should *not* be committed to git. The `.gitignore` is configured to ignore `.env` so this should not be a problem.


To "activate" this configuration, you need to source it into your current bash shell.

    . .env

To test the connection 
`nova list`

`PUPPET_MASTER_IP` in the .env should now be set to the *private* IPv4 address of the puppet master you will be using for configuring your compute instances. 

'ORACLE_IP' shoud be set to *private* IPv4 address of the oracle server you will be using.

`PUPPET_MASTER_IP` and `ORACLE_IP` are inserted into `/etc/hosts` on nodes.

'PUPPET_CERT_PATH' is the path to the private key puppet_id_rsa with correct permissions of 600

Ensure you have set up the "puppet" key for your user on hp cloud. You can generate the public key from the private key using the following command: `ssh-keygen -y -f puppet_id_rsa > puppet_id_rsa.pub`

Register that key with HP Cloud by 
`nova keypair-add --pub-key puppet_id_rsa.pub puppet`

This will put this key on any VMs booted by your account.

When using an existing puppet master the scripts provided here, `PUPPET_MASTER_EXT_IP` should be set to the *public* IPv4 of the puppet master. This is used by the `puppet-sync.sh` script for pushing config to the puppet master from local. 


    export PUPPET_MASTER_EXT_IP="15.185.120.35"

### Configuring SSH

##### Ubunutu / OS/X

Because many instances will not have a public IP address it is recommended to configure SSH to use a SOCKS tunnel via the haproxy instance. The following instructions are specific to openssh.

In the following configuration, hosts are given arbitrary names under `.perf` (performance) namespace. 

You will need 'netcat' (`nc`) installed for the following to work.


    vi ~/.ssh/config

and then make you you have:

    Host *.perf
      GSSAPIAuthentication no
      UserKnownHostsFile /dev/null
      User root
      PasswordAuthentication no
      IdentityFile /Users/johnwo/.ssh/puppet_id_rsa
      IdentitiesOnly yes
      UserKnownHostsFile /dev/null
      StrictHostKeyChecking no
    
    Host puppet-master.perf
      Hostname <PUBLIC-IP-ADDRESS-OF-PUPPET-MASTER>
      DynamicForward 1080
    
    Host haproxy.perf
      Hostname <PUBLIC-IP-ADDRESS-OF-HA-PROXY>
    
    Host jmeter.perf
      Hostname 10.0.X.X # PRIVATE IP ADDRESS OF HOST
      ProxyCommand nc -X 4 -x localhost:1080 %h %p
    
    Host oracle.perf
      Hostname 10.0.X.X # PRIVATE IP ADDRESS OF HOST
      ProxyCommand nc -X 4 -x localhost:1080 %h %p


So, to access Oracle DB for instance, you should:

1. In a terminal, `ssh -f -N puppet-master.perf` to set up the SOCKS proxy if you have not already. This command only needs to be run once per session, and the `-f -N` flags will make ssh run in the background.
1. In another terminal, `ssh oracle.perf`. Assuming you have netcat installed, you should be logged into the database host as root.

##### Windows

You will need 'socat' installed for the following to work. Download socat from http://blog.gentilkiwi.com/downloads/socat-1.7.2.1.zip, unzip it and put it on your machine path.

Updata the ~/.ssh/config file to:

```
Host *.perf
  UserKnownHostsFile /dev/null
  User root
  PasswordAuthentication no
  IdentityFile /c/Users/balrajs/.ssh/puppet_id_rsa
  IdentitiesOnly yes
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no

  Host puppet-master.perf
  Hostname <PUBLIC-IP-ADDRESS-OF-PUPPET-MASTER>

  Host haproxy.perf
    DynamicForward 1080
    Hostname <PUBLIC-IP-ADDRESS-OF-HAPROXY>

  Host jmeter.perf
    Hostname 10.0.X.X # PRIVATE IP ADDRESS OF HOST
    ProxyCommand socat - SOCKS:localhost:%h:%p

  Host oracle.perf
    Hostname 10.0.X.X # PRIVATE IP ADDRESS OF HOST
    ProxyCommand socat - SOCKS:localhost:%h:%p

  Host balrajs-ohp.perf
    Hostname 10.0.0.36 # PRIVATE IP ADDRESS OF HOST
    ProxyCommand socat - SOCKS:localhost:%h:%p

```

To access the host use the same commands as above for OS/X.


#### Using SOCKS proxy with web browser

**TODO**

## Instructions for building complete environment

> Make sure nova is installed and environment variables configured.

Setup puppet master and boot nodes:

```
$ gem install bundler
$ bundle install # run this from the OCD-115 dir
$ librarian-puppet install
```

**TODO**: Add deploying solution instructions here

create yourself a puppet master

```
$ cd puppet/
$ ./create-pm.sh
$ nova list # get the IP
$ export PUPPET_MASTER_IP=<10.* address of puppet master for agents>
```
make sure in ~/.ssh/config puppet-master.perf is set to correct puppet master *floating* ip
and run 'ssh -f -N puppet-master.perf', create a ssh tunnel to puppet master so scripts can connect with oracle, jmeter or ohp nodes.

push config to puppet master; I've added a puppet-master entry to .ssh/config so I can ssh directly in. You will need this.

```
$ ./bin/puppet-sync.sh
```

create the oracle database server if not already present, look at Building Oracle Database Server for more details.
create the database users. You can use contrib/create_database.sql. This will drop some users and create new so make sure you read it.

make sure you have exported env variable 'ORACLE_IP' with *fixed* ipv4 address of oracle database server.

Create the ohp nodes for your solution. Run

    $ AGENT_FLAVOR=standard.medium ./bin/create-ohp-nodes.sh numberOfNodes

Specify numberOfNodes to be number of OHP nodes to create for a solution. This will boot a "medium" flavor of node for OHP, which has
4GB of RAM. If you need to boot a different sized OHP node, change standard.medium to the flavor you want.

### Add OHP nodes to an existing group

Make sure you have exported PUPPET_MASTER_IP and ORACLE_IP with correct IPv4 addresses. Run:

```
$ AGENT_FLAVOR=standard.medium ./bin/add-ohp-nodes.sh numOfNodesToCreate numToStartCreatingNodesFrom
```
numOfNodesToCreate is the number of new OHP nodes to add to an existing group.
numToStartCreatingNodesFrom is the number of the first node to create, as name is 'NAMESPACE-ohp-number'. If you already have 4 nodes in a group numToStartCreatingNodesFrom will be 5.

This will boot a "medium" flavor of node for OHP, which has 4GB of RAM. If you need to boot a different sized OHP node, change standard.medium to the flavor you want.

### JMeter

To create 3 jmeter nodes (1 being a master, the remaining being slaves), run:

```
./bin/create-jmeter-nodes.sh 3
```

This will stand up 3 jmeter nodes.

To manually launch jmeter nodes:

```
# create a jmeter master node
./bin/create-agent-with-role.sh jmeter-master "" true

# create jmeter slave nodes
./bin/create-agent-with-role.sh jmeter-2 "" false <address of jmeter master>
./bin/create-agent-with-role.sh jmeter-3 "" false <address of jmeter master>
```

* The default configuration requires 4G of RAM. Hiera configuration has been provided in global.yaml to reduce memory specification.

### HAProxy

The HAProxy will require a public IP address, so you'll need to create a floating IP address and specify it when booting the node.

```
./bin/create-agent-with-role.sh haproxy 15.125.115.135
```

## Puppet Master

The Pupper Master is responsible for configuring the 'agents' and needs to be configured before any other servers. It is a "long lived" instance and does not normally need to be touched by end users.

For detailed instructions on building a puppet master see [this document](docs/building_puppet_server.md).


## Oracle Database

See [this document](docs/building_oracle_database.md) covers (roughly) the steps involved in building a new Oracle instance and loading the CDR seed data.

Assuming you have your `.ssh/config` file configured as described above, you should be able to ssh onto to the Oracle database and use sqlplus to manage the database directly:

    $ ssh oracle.perf
    # su -i oracle
    [oracle@perf-oracle ~]$ ORACLE_SID=orion rlwrap sqlplus / as sysdba

or

    [oracle@perf-oracle ~]$ ORACLE_SID=admin rlwrap sqlplus orion/orionsys


### Increasing Process Limit

If you hit `ORA-00020: maximum number of processes` and are not able to reduce application pool sizes further, it is be possible to increase process limits beyond the default 600, but it will require a restart of Oracle and disrupt existing clients.

> *Note* If you hit the process limit, you will need to kill (some random) oracle process before you will be able to connect as sysdba.

The steps to increase the process limit are:


#### 1. Check current state:
```
[oracle@perf-oracle ~]$ ORACLE_SID=orion rlwrap sqlplus / as sysdba

SQL> SHOW PARAMETER PROCESS

NAME				         TYPE	 VALUE
------------------------------------ ----------- ------------------------------
aq_tm_processes 		     integer	 1
cell_offload_processing 	 boolean	 TRUE
db_writer_processes		     integer	 1
gcs_server_processes		 integer	 0
global_txn_processes		 integer	 1
job_queue_processes		     integer	 4
log_archive_max_processes	 integer	 4
processes			         integer	 600
processor_group_name		 string
```

#### 2. Update the parameter and restart Oracle:

```
SQL> ALTER SYSTEM SET PROCESSES=2000 SCOPE=spfile;

System altered.

SQL> SHUTDOWN IMMEDIATE
Database closed.
Database dismounted.
ORACLE instance shut down.

SQL> STARTUP
ORACLE instance started.

Total System Global Area 2087780352 bytes
Fixed Size		    2290264 bytes
Variable Size		 1979714984 bytes
Database Buffers	  100663296 bytes
Redo Buffers		    5111808 bytes
Database mounted.
Database opened.
```

#### 3. Verify the change has taken effect:

```
SQL> SHOW PARAMETER PROCESS

NAME				     TYPE	 VALUE
------------------------------------ ----------- ------------------------------
aq_tm_processes 		    integer	 1
cell_offload_processing 	boolean	 TRUE
db_writer_processes		    integer	 1
gcs_server_processes		integer	 0
global_txn_processes		integer	 1
job_queue_processes		    integer	 4
log_archive_max_processes	integer	 4
processes			        integer	 2000
processor_group_name		string
```

Done!


#### When it goes wrong

```
SQL> STARTUP
ORA-00821: Specified value of sga_target 600M is too small, needs to be at least 1224M
SQL> show parameter sga_target
ORA-01034: ORACLE not available
Process ID: 0
Session ID: 0 Serial number: 0
```

Edit the spfile to a pfile so it can be edited and instance started.

```
-bash-4.1$ ORACLE_SID=orion sqlplus / as sysdba
...
Connected to an idle instance.
SQL> create pfile from spfile ;
File created.
SQL> Disconnected
-bash-4.1$ cd $ORACLE_HOME/dbs
-bash-4.1$ vi initorion.ora
-bash-4.1$ ORACLE_SID=orion sqlplus / as sysdba
SQL> startup pfile='initorion.ora'
ORACLE instance started.
(party)
SQL> create spfile from pfile;
```


## Resources

* <https://forge.puppetlabs.com/puppetlabs/haproxy>
* <https://forge.puppetlabs.com/pdxcat/collectd>
* <https://github.com/biemond/puppet/tree/master/modules/oradb>



## Useful for investigation

* `/var/log/messages` - timestamped log file of last puppet run
* `/var/log/cloud-init.log` - log of the current vm's server provisioning operation
* `/var/log/cloud-init-agent.log` - output of the current vm's cloud init script
* `/var/lib/cloud/instance/user-data.txt` - the cloud-init script that is run when the vm is first booted
