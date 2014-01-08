#!/bin/bash

##################################
# Setup Installation Environment #
##################################

# Remove firewalls to allow port forwarding
sudo service iptables stop

# Set up variables
portalversion='8.4.0.beta';
foundationversion='7.2.0.beta';
base_url='/vagrant';
installer='platform-linux-x64.sh';

cd ${base_url}

# Install dependencies, make modifications to cloned files
# ========================================================

# java-1.7.0-openjdk  Default Java version on Vagrant is 1.6, but 1.7 required.
# ant-apache-regexp   Fix error: "No supported regular expression matcher found: java.lang.ClassNotFoundException: org.apache.tools.ant.util.regexp.Jdk14RegexpRegexp"
# ant
# ant-jsch            Needed for "ant create.custom.solution.package" later.
sudo yum install java-1.7.0-openjdk ant-apache-regexp ant ant-jsch -y

# Specify that Java 1.7 should be used instead of the default 1.6
export JAVA_HOME=/usr/lib/jvm/jre-1.7.0

# These two jar files can also be found in the /lib directory in C:/apache-ant-1.9.2
# mv ant-junit.jar ./modules/PlatformBuild/anttasks
# mv jsch-0.1.50.jar ./modules/PlatformBuild/anttasks
wget http://ivy-rep-ro/apache/ant/1.9.2/jars/ant-junit.jar -P modules/PlatformBuild/anttasks --user=ivy-http --password=YouSayHello
wget http://ivy-rep-ro/opensource/com.jcraft.jsch/0.1.50/jars/com.jcraft.jsch-nodist.jar -P modules/PlatformBuild/anttasks --user=ivy-http --password=YouSayHello

# Line 21 in build-tasks.xml edited to include path to ant-junit jar file (remember \ delimiter for forward slashes and tabs)
sed -i -e '17s/.*/\t\t\t<taskdef name="junit" classname="org.apache.tools.ant.taskdefs.optional.junit.JUnitTask" classpath="${common.build.dir}\/anttasks\/ant-junit.jar"\/>/' ./modules/PlatformBuild/build-tasks.xml

# Provisioning installer
# ======================

# Download OHP provisioning installer from Ivy.
# To run manually inside vagrant: wget http://ivy-http:YouSayHello@ivy-rep-ro/orchestral/provisioning-insaller/7.2.0.beta/installers/platform-linux-x64.sh
wget http://ivy-rep-ro/orchestral/provisioning-installer/${foundationversion}/installers/${installer} --user=ivy-http --password=YouSayHello

# Solution zip
# ============

# Create and write the files required for a solution package
cd modules/solution
touch solutionVersion.yaml solution.properties version.properties build.xml

cat > solutionVersion.yaml <<EOL
ohp_applications:
  foundation: ${foundationversion}
  portal: ${portalversion}
puppet_modules:
  puppet-solution_test: 0.1.0.beta
EOL

cat > solution.properties <<EOL
solution.applications=foundation,portal
EOL

cat > version.properties <<EOL
version.major=0
version.minor=1
version.servicepack=0
EOL

cat > build.xml <<EOL
<project name="SolutionTest">
	<import file="../tooling/build-ocd-solution.xml"/>
</project>
EOL

# Create a solution.zip package downloaded from Ivy into the base url
cd modules/solution
ant create.custom.solution.package
sudo mv solution.zip /opt/orionhealth/solution.zip
sudo cp /opt/orionhealth/solution.zip /vagrant



##########################################
# Puppet install OHP with Puppet modules #
##########################################

# OHP Puppet Install configuration
# ================================

cd ${base_url}

# Write to the site.pp file in /manifests and the environmental config file in /frontend
touch manifests/site.pp
cat > manifests/site.pp <<EOL
node default {
  class { 'ohp':
    base_url => '${base_url}',
    installer => '${installer}',
    node_type => 'frontend',
    group_name => 'my_group',
    group_mode => 'standalone',
    applications => ['portal', 'foundation'],
    application_versions => { 'portal' => '${portalversion}', 'foundation' => '${foundationversion}' },
    install_dir => '/opt/orionhealth',
    admin_password => 'b',
  }
}
EOL

touch frontend/EnvironmentalConfig.xml.erb
cat > frontend/EnvironmentalConfig.xml.erb <<EOL
<?xml version="1.0" encoding="UTF-8"?><com.orchestral.core.configuration.api_6_0.ConfigurationService xmlns="http://www.orionhealth.com/configuration" version="3" type="SNAPSHOT" label="Environmental Configuration">
  <!-- NB: This is a fixture used for the system tests for the OHP class, this file is not used to deploy any real solution -->
  <com.orchestral.core.database.impl.DatabaseServerImpl id="primaryServer">
    <adminConnectionDetails>
      <com.orchestral.core.database.impl.ConnectionDetailsImpl>
        <driver null="true"/>
        <parameters null="true"/>
        <user>
          <com.orchestral.core.database.impl.UserDetailsImpl>
            <password null="true"/>
            <username null="true"/>
          </com.orchestral.core.database.impl.UserDetailsImpl>
        </user>
      </com.orchestral.core.database.impl.ConnectionDetailsImpl>
    </adminConnectionDetails>
    <defaultTablespace null="true"/>
    <displayName>Primary Database Server</displayName>
    <host><%=@config_database_hostname%></host>
    <port>1521</port>
    <serverType>ORACLE</serverType>
    <systemId><%=@config_database_instance%></systemId>
    <testStatement>select 1 from dual</testStatement>
  </com.orchestral.core.database.impl.DatabaseServerImpl>

  <!-- Database Driver -->
  <com.orchestral.core.database.impl.OracleThinDatabaseDriver id="oracleDriver">
    <className>oracle.jdbc.OracleDriver</className>
    <displayName>Oracle Thin</displayName>
    <type>ORACLE</type>
    <urlFormat>jdbc:oracle:thin:@&lt;%=host%&gt;&lt;%if port%&gt;:&lt;%=port%&gt;&lt;%else%&gt;:1521&lt;%end if%&gt;&lt;%if serviceId!=null &amp;&amp; serviceId.length()&gt;0%&gt;:&lt;%=serviceId%&gt;&lt;%end if%&gt;</urlFormat>
  </com.orchestral.core.database.impl.OracleThinDatabaseDriver>
  <com.orchestral.core.database.impl.DatabasePoolingProfileImpl id="defaultPoolingProfile">
    <adjustPeriod>600</adjustPeriod>
    <connCheckLevel>2</connCheckLevel>
    <connMaxAge>5</connMaxAge>
    <maxConnPool>100</maxConnPool>
    <maxOpenTime>60</maxOpenTime>
    <maxPreparedStatements>20</maxPreparedStatements>
    <maxWaitTime>10</maxWaitTime>
    <maxWaiters>100</maxWaiters>
    <minConnPool>0</minConnPool>
    <name>Default Pooling Profile</name>
    <samplingPeriod>600</samplingPeriod>
  </com.orchestral.core.database.impl.DatabasePoolingProfileImpl>

  <% { 'clinical' => 'com.orchestral.core.database.clinical',
    'application' => 'com.orchestral.core.database.platform',
    'messaging' => 'com.orchestral.foundation.messaging.archive',
    'audit' => 'java:comp/env/jdbc/orion/audit',
    'auth' => 'java:comp/env/jdbc/orion/authToken',
    'legacy' => 'java:comp/env/jdbc/orion/legacydemo',
    'demo'  => 'com.orchestral.service.demo.database',
    'demo1'  => 'com.orchestral.service.demo.database.different',
    'demo2'  => 'com.orchestral.service.demo.database.three'}.each do |user, id| %>
  <com.orchestral.core.database.PhysicalDatabase>
    <connectionDetails>
      <com.orchestral.core.database.impl.ConnectionDetailsImpl>
        <driver>
          <com.orchestral.core.database.impl.OracleThinDatabaseDriver refId="oracleDriver"/>
        </driver>
        <parameters null="true"/>
        <user>
          <com.orchestral.core.database.impl.UserDetailsImpl>
            <password><%=@config_database_password%></password>
            <username><%=@variables[user]%></username>
          </com.orchestral.core.database.impl.UserDetailsImpl>
        </user>
      </com.orchestral.core.database.impl.ConnectionDetailsImpl>
    </connectionDetails>
    <databaseName/>
    <databaseServer>
      <com.orchestral.core.database.impl.DatabaseServerImpl refId="primaryServer"/>
    </databaseServer>
    <id><%=id%></id>
    <initSql null="true"/>
    <poolingProfile>
      <com.orchestral.core.database.impl.DatabasePoolingProfileImpl refId="defaultPoolingProfile"/>
    </poolingProfile>
    <tablespace null="true"/>
  </com.orchestral.core.database.PhysicalDatabase>
  <% end %>

  <!-- Configure SSO to have a long timeout so tokens are valid across the upgrade process -->
  <com.orchestral.core.session.UserDomainConfig>
    <securityDomain>restws</securityDomain>
    <timeUnit>HOURS</timeUnit>
    <timeout>15</timeout>
    <userDomain>PATIENT</userDomain>
  </com.orchestral.core.session.UserDomainConfig>
</com.orchestral.core.configuration.api_6_0.ConfigurationService>
EOL

# Download and install Puppet on the VM
rpm -ivh http://yum.puppetlabs.com/el/6/products/x86_64/puppetlabs-release-6-7.noarch.rpm
yum install puppet -y

# Install Puppet standard library for junit dependencies.
sudo puppet module install --force puppetlabs/stdlib --modulepath=/vagrant/modules/puppet-ohp
#sudo puppet module install --force puppetlabs/stdlib

# Run puppet install with specified module paths and manifest file.
sudo puppet apply --modulepath=/vagrant/modules/puppet-ohp /vagrant/manifests/site.pp

# Make the OHP provisioning installer executable.
chmod +x /vagrant/platform-linux-x64.sh

# Retrieve dependencies in the puppet-ohp directory with the build.xml file.
cd modules/puppet-ohp
ant retrieve.groovy.dependencies

chown orion /opt/orionhealth/response.varfile
sudo -i -u orion
/opt/orionhealth/platform-linux-x64.sh -q -varfile /opt/orionhealth/response.varfile
cd /opt/orionhealth
/opt/orionhealth/jre/bin/java -cp ohp-groovy-configure-lib/* #groovy.ui.GroovyMain configure-ohp.groovy
/opt/orionhealth/bin/server.sh start



#################################
# Check the installation of OHP #
#################################

/opt/orionhealth/bin/server.sh status
wget "http://localhost:19080/conductor"
wget "http://localhost:19080/concerto"