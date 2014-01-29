function GenerateVagrantRun() {
	return (
		"#!/bin/bash\n\n" +

		"echo -e\n" +
		"echo -e \"\033[36m-->  Creating directories to be mirrored across to the /vagrant directory in the VM\033[0m\"\n" +
		"echo -e\n" +

		"mkdir frontend\n" +
		"mkdir -p modules/solution\n" +
		"mkdir manifests\n\n" +

		"echo 'frontend/'\n" +
		"echo 'modules/solution/'\n" +
		"echo 'manifests/'\n\n" +

		"echo -e\n" +
		"echo -e \"\033[36m-->  Cloning required files from Stash and move into appropriate directories\033[0m\"\n" +
		"echo -e\n" +

		"git svn clone -rHEAD http://subversion/src/Orchestral/Framework/PlatformBuild/trunk\n" +
		"mv trunk PlatformBuild\n" +
		"mv PlatformBuild/ ./modules/\n\n" +

		"git clone ssh://git@stash:7999/ocd/tooling.git\n" +
		"cd tooling\n" + 
		"git checkout tags/intern-projects\n" +
		"cd ..\n" +
		"mv tooling/ ./modules/\n\n" +

		"git clone ssh://git@stash:7999/puppet/puppet-ohp.git\n" +
		"mv puppet-ohp/ ./modules\n\n" +

		"echo -e\n" +
		"echo -e \"\033[36m-->  Booting VM with Vagrant\033[0m\"\n" +
		"echo -e\n" +

		"vagrant up"
	);
}



function GenerateVagrantfile(vmname) {

	// Get VM details from form.
	var memory = document.getElementById("memory").value;
	var hostport = document.getElementById("hostport").value;

	// If no VM name specified, omit config.vm.hostname
	if (vmname == 'noName') {
		var configHostname = "\n";
	} else {
		var configHostname = "\n  # Set the name of the host machine.\n  config.vm.hostname = '" + vmname + "'\n\n";
	}


	// Return code to be output into textbox
	return (
		"# -*- mode: ruby -*-\n" +
		"# vi: set ft=ruby :\n\n" +

		"# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!\n" +
		"VAGRANTFILE_API_VERSION = '2'\n\n" +

		"Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|\n\n" + 

		"  # Allocate the VM more memory.\n" +
		"  config.vm.provider :virtualbox do |vb|\n" +
	  	"    vb.customize [\"modifyvm\", :id, \"--memory\", \"" + memory + "\"]\n" +
		"  end\n\n" +

		"  # Every Vagrant VM requires a box to build off of.\n" +
		"  config.vm.box = 'centos-64-x64-vbox4210-nocm'\n\n" + 

		"  # The url from where the config.vm.box will be fetched if it doesn't already exist on the host machine.\n" + 
		"  config.vm.box_url = 'http://puppet-vagrant-boxes.puppetlabs.com/centos-64-x64-vbox4210-nocm.box'\n" +

	  	configHostname + 

		"  # Create a forwarded port mapping which allows access to a specific port within the machine from a port on the host machine.\n" + 
		"  config.vm.network 'forwarded_port', guest: 19080, host: " + hostport + "\n\n" + 

		"  # Set up VM and Puppet install OHP.\n" + 
	 	"  config.vm.provision 'shell', path: 'install.sh'\n\n" + 

		"end"
	);	
}



function GenerateVagrantInstall() {
	// Get list of products and version numbers from form, split lines into arrays.
	var products = document.getElementById("Products").value.split("\n");
		
	// Split again into names and versions.
	var names = new Array();
	var versions = new Array();
	for (var i = 0; i < products.length; i++) {
		var splitstr = products[i].split(": ");
		names[i] = splitstr[0];
		versions[i] = splitstr[1];
	}
	// Get rid of any indentation
	for (var i = 0; i < names.length; i++) {
		if (names[i].indexOf("  ") != -1) {
		  names[i].replace("  ","");
		}
	}

	// Check that a foundation version has been specified, isolate version number for provisioning installer URL.
	var foundationIndex = names.indexOf("foundation");
	if (foundationIndex == -1) {
		alert("A foundation version must be specified. Please check your spelling and format of the foundation version.");
		document.getElementById("vmdetails").reset();
		return;
	}
	var foundationVersion = versions[foundationIndex];

	// Verify correct formatting of products

	// Write solutionVersion.yaml
	var solutionVersion = "";
	for (var i = 0; i < products.length; i++) {
		solutionVersion = solutionVersion.concat("  ", products[i], "\n");
	}

	// Write site.pp string variables.
	// applications => ['portal', 'foundation'],
	var applicationstr = "applications => ['";
	for (var i = 0; i < names.length; i++) {
		applicationstr = applicationstr.concat(names[i],"'");
		if (i+1 == names.length) { applicationstr = applicationstr.concat("],\n"); }
		else { applicationstr = applicationstr.concat(", '"); }
	}
	// application_versions => { 'portal' => '${portalVersion}', 'foundation' => '${foundationVersion}' },\n
	var application_versionsstr = "application_versions => { '";
	for (var i = 0; i < names.length; i++) {
		application_versionsstr = application_versionsstr.concat(names[i], "' => '", versions[i], "'");
		if (i+1 == names.length) { application_versionsstr = application_versionsstr.concat(" },\n"); }
		else { application_versionsstr = application_versionsstr.concat(", '"); }
	}

	return (
		"#!/bin/bash\n" +
		"\n" + 
		"echo -e\n" +
		"echo -e \"#######################################################\"\n" +
		"echo -e\n" +
		"echo -e \"        SETTING UP OHP INSTALLATION ENVIRONMENT        \"\n" +
		"echo -e\n" +
		"echo -e \"#######################################################\"\n" +
		"echo -e\n" +
		"\n" +
		"# Remove firewalls to allow port forwarding\n" +
		"sudo service iptables stop\n" +
		"\n" +
		"# Set up variables\n" +
		"installer='platform-linux-x64.sh';\n" +
		"base_url='/vagrant';\n" +
		"\n" +
		"cd ${base_url}\n" +
		"\n" +
		"echo -e\n" +
		"echo -e \"-->  Installing dependencies\"\n" +
		"echo -e\n" +
		"\n" +
		"# java-1.7.0-openjdk  Default Java version on Vagrant is 1.6, but 1.7 required.\n" +
		"# ant-apache-regexp   Fix error: 'No supported regular expression matcher found: java.lang.ClassNotFoundException: org.apache.tools.ant.util.regexp.Jdk14RegexpRegexp'\n" +
		"# ant                 Apache ant for \n" +
		"# ant-jsch            Needed for 'ant create.custom.solution.package' later.\n" +
		"sudo yum install java-1.7.0-openjdk ant-apache-regexp ant ant-jsch -y\n" +
		"\n" +
		"# Specify that Java 1.7 should be used instead of the default 1.6\n" +
		"export JAVA_HOME=/usr/lib/jvm/jre-1.7.0\n" +
		"\n" +
		"# Install necessary .jar files into ant library directory\n" +
		"wget http://ivy-rep-ro/apache/ant/1.9.2/jars/ant-junit.jar -P modules/PlatformBuild/anttasks --user=ivy-http --password=YouSayHello\n" +
		"wget http://ivy-rep-ro/opensource/com.jcraft.jsch/0.1.50/jars/com.jcraft.jsch-nodist.jar -P modules/PlatformBuild/anttasks --user=ivy-http --password=YouSayHello\n" +
		"\n" +
		"# Line 17 in build-tasks.xml (cloned from PlatformBuild/trunk in svn) needs to be edited to include path to ant-junit jar file\n" +
		"sed -i -e '17s/.*/\\t\\t\\t<taskdef name=\"junit\" classname=\"org.apache.tools.ant.taskdefs.optional.junit.JUnitTask\" classpath=\"${common.build.dir}\\/anttasks\\/ant-junit.jar\"\\/>/' ./modules/PlatformBuild/build-tasks.xml\n" +
		"\n" +
		"echo -e\n" +
		"echo -e \"-->  Downloading provisioning installer from Ivy\"\n" +
		"echo -e\n" +
		"\n" +
		"# Download OHP provisioning installer from Ivy.\n" +
		"wget http://ivy-rep-ro/orchestral/provisioning-installer/" + foundationVersion + "/installers/${installer} --user=ivy-http --password=YouSayHello\n" +
		"\n" +
		"echo -e\n" +
		"echo -e \"-->  Creating solution.zip\"\n" +
		"echo -e\n" +
		"\n" +
		"# Create and write the files required for a solution package\n" +
		"cd modules/solution\n" +
		"\n" +
		"cat > solutionVersion.yaml <<EOL\n" +
		"ohp_applications:\n" +
		solutionVersion +
		"EOL\n" +
		"\n" +
		"cat > solution.properties <<EOL\n" +
		"solution.applications=" + names + "\n" +
		"EOL\n" +
		"\n" +
		"cat > version.properties <<EOL\n" +
		"version.major=0\n" +
		"version.minor=1\n" +
		"version.servicepack=0\n" +
		"EOL\n" +
		"\n" +
		"cat > build.xml <<EOL\n" +
		"<project name='SolutionTest'>\n" +
		"  <import file='../tooling/build.xml'/>\n" +
		"</project>\n" +
		"EOL\n" +
		"\n" +
		"# Create a solution.zip package downloaded from Ivy, and move into the base url\n" +
		"ant create.custom.solution.package\n" +
		"sudo mv ${base_url}/modules/solution/solution.zip ${base_url}\n" +
		"\n" +
		"echo -e\n" +
		"echo -e \"-->  Installing Orion Health products with puppet-ohp module\"\n" +
		"echo -e\n" +
		"\n" +
		"cd ${base_url}\n" +
		"\n" +
		"# Write site.pp file in /manifests and environmental config file in /frontend\n" +
		"cat > manifests/site.pp <<EOL\n" +
		"node default {\n" +
		"  class { 'ohp':\n" +
		"    base_url => '${base_url}',\n" +
		"    installer => '${installer}',\n" +
		"    node_type => 'frontend',\n" +
		"    group_name => 'my_group',\n" +
		"    group_mode => 'standalone',\n" +
		"    " + applicationstr +
		"    " + application_versionsstr +
		"    install_dir => '/opt/orionhealth',\n" +
		"    admin_password => 'b',\n" +
		"  }\n" +
		"}\n" +
		"EOL\n" +
		"\n" +
		"cat > frontend/EnvironmentalConfig.xml.erb <<EOL\n" +
		"<?xml version='1.0' encoding='UTF-8'?><com.orchestral.core.configuration.api_6_0.ConfigurationService xmlns='http://www.orionhealth.com/configuration' version='3' type='SNAPSHOT' label='Environmental Configuration'>\n" +
		"  <!-- NB: This is a fixture used for the system tests for the OHP class, this file is not used to deploy any real solution -->\n" +
		"  <com.orchestral.core.database.impl.DatabaseServerImpl id='primaryServer'>\n" +
		"    <adminConnectionDetails>\n" +
		"      <com.orchestral.core.database.impl.ConnectionDetailsImpl>\n" +
		"        <driver null='true'/>\n" +
		"        <parameters null='true'/>\n" +
		"        <user>\n" +
		"          <com.orchestral.core.database.impl.UserDetailsImpl>\n" +
		"            <password null='true'/>\n" +
		"            <username null='true'/>\n" +
		"          </com.orchestral.core.database.impl.UserDetailsImpl>\n" +
		"        </user>\n" +
		"      </com.orchestral.core.database.impl.ConnectionDetailsImpl>\n" +
		"    </adminConnectionDetails>\n" +
		"    <defaultTablespace null='true'/>\n" +
		"    <displayName>Primary Database Server</displayName>\n" +
		"    <host><%=@config_database_hostname%></host>\n" +
		"    <port>1521</port>\n" +
		"    <serverType>ORACLE</serverType>\n" +
		"    <systemId><%=@config_database_instance%></systemId>\n" +
		"    <testStatement>select 1 from dual</testStatement>\n" +
		"  </com.orchestral.core.database.impl.DatabaseServerImpl>\n" +
		"\n" +
		"  <!-- Database Driver -->\n" +
		"  <com.orchestral.core.database.impl.OracleThinDatabaseDriver id='oracleDriver'>\n" +
		"    <className>oracle.jdbc.OracleDriver</className>\n" +
		"    <displayName>Oracle Thin</displayName>\n" +
		"    <type>ORACLE</type>\n" +
		"    <urlFormat>jdbc:oracle:thin:@&lt;%=host%&gt;&lt;%if port%&gt;:&lt;%=port%&gt;&lt;%else%&gt;:1521&lt;%end if%&gt;&lt;%if serviceId!=null &amp;&amp; serviceId.length()&gt;0%&gt;:&lt;%=serviceId%&gt;&lt;%end if%&gt;</urlFormat>\n" +
		"  </com.orchestral.core.database.impl.OracleThinDatabaseDriver>\n" +
		"  <com.orchestral.core.database.impl.DatabasePoolingProfileImpl id='defaultPoolingProfile'>\n" +
		"    <adjustPeriod>600</adjustPeriod>\n" +
		"    <connCheckLevel>2</connCheckLevel>\n" +
		"    <connMaxAge>5</connMaxAge>\n" +
		"    <maxConnPool>100</maxConnPool>\n" +
		"    <maxOpenTime>60</maxOpenTime>\n" +
		"    <maxPreparedStatements>20</maxPreparedStatements>\n" +
		"    <maxWaitTime>10</maxWaitTime>\n" +
		"    <maxWaiters>100</maxWaiters>\n" +
		"    <minConnPool>0</minConnPool>\n" +
		"    <name>Default Pooling Profile</name>\n" +
		"    <samplingPeriod>600</samplingPeriod>\n" +
		"  </com.orchestral.core.database.impl.DatabasePoolingProfileImpl>\n" +
		"\n" +
		"  <% { 'clinical' => 'com.orchestral.core.database.clinical',\n" +
		"    'application' => 'com.orchestral.core.database.platform',\n" +
		"    'messaging' => 'com.orchestral.foundation.messaging.archive',\n" +
		"    'audit' => 'java:comp/env/jdbc/orion/audit',\n" +
		"    'auth' => 'java:comp/env/jdbc/orion/authToken',\n" +
		"    'legacy' => 'java:comp/env/jdbc/orion/legacydemo',\n" +
		"    'demo'  => 'com.orchestral.service.demo.database',\n" +
		"    'demo1'  => 'com.orchestral.service.demo.database.different',\n" +
		"    'demo2'  => 'com.orchestral.service.demo.database.three'}.each do |user, id| %>\n" +
		"  <com.orchestral.core.database.PhysicalDatabase>\n" +
		"    <connectionDetails>\n" +
		"      <com.orchestral.core.database.impl.ConnectionDetailsImpl>\n" +
		"        <driver>\n" +
		"          <com.orchestral.core.database.impl.OracleThinDatabaseDriver refId='oracleDriver'/>\n" +
		"        </driver>\n" +
		"        <parameters null='true'/>\n" +
		"        <user>\n" +
		"          <com.orchestral.core.database.impl.UserDetailsImpl>\n" +
		"            <password><%=@config_database_password%></password>\n" +
		"            <username><%=@variables[user]%></username>\n" +
		"          </com.orchestral.core.database.impl.UserDetailsImpl>\n" +
		"        </user>\n" +
		"      </com.orchestral.core.database.impl.ConnectionDetailsImpl>\n" +
		"    </connectionDetails>\n" +
		"    <databaseName/>\n" +
		"    <databaseServer>\n" +
		"      <com.orchestral.core.database.impl.DatabaseServerImpl refId='primaryServer'/>\n" +
		"    </databaseServer>\n" +
		"    <id><%=id%></id>\n" +
		"    <initSql null='true'/>\n" +
		"    <poolingProfile>\n" +
		"      <com.orchestral.core.database.impl.DatabasePoolingProfileImpl refId='defaultPoolingProfile'/>\n" +
		"    </poolingProfile>\n" +
		"    <tablespace null='true'/>\n" +
		"  </com.orchestral.core.database.PhysicalDatabase>\n" +
		"  <% end %>\n" +
		"\n" +
		"  <!-- Configure SSO to have a long timeout so tokens are valid across the upgrade process -->\n" +
		"  <com.orchestral.core.session.UserDomainConfig>\n" +
		"    <securityDomain>restws</securityDomain>\n" +
		"    <timeUnit>HOURS</timeUnit>\n" +
		"    <timeout>15</timeout>\n" +
		"    <userDomain>PATIENT</userDomain>\n" +
		"  </com.orchestral.core.session.UserDomainConfig>\n" +
		"</com.orchestral.core.configuration.api_6_0.ConfigurationService>\n" +
		"EOL\n" +
		"\n" +
		"# Download and install Puppet on the VM\n" +
		"rpm -ivh http://yum.puppetlabs.com/el/6/products/x86_64/puppetlabs-release-6-7.noarch.rpm\n" +
		"yum install puppet -y\n" +
		"\n" +
		"# Install Puppet standard library for junit dependencies.\n" +
		"sudo puppet module install --force puppetlabs/stdlib --modulepath=/vagrant/modules/puppet-ohp\n" +
		"\n" +
		"# Retrieve ant dependencies in the puppet-ohp directory which contains the build.xml.\n" +
		"cd modules/puppet-ohp\n" +
		"ant retrieve.groovy.dependencies\n" +
		"\n" +
		"# Run Puppet installation of OHP, specifying module paths and manifest file.\n" +
		"cd ${base_url}\n" +
		"sudo puppet apply --modulepath=/vagrant/modules/puppet-ohp /vagrant/manifests/site.pp\n" +
		"\n" +
		"echo -e\n" +
		"echo -e \"-->  Checking status of OHP to verify successful installation\"\n" +
		"echo -e\n" +
		"\n" +
		"# Check status to verify successful installation\n" +
		"/opt/orionhealth/bin/server.sh status"
	);
}