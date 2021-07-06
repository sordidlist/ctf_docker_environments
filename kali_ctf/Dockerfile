FROM ubuntu:latest

# Configure debian
ENV DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true
ENV TERM xterm-256color

# Get package cache and upgrade packages
RUN rm -fR /var/lib/apt/ && \
    apt-get clean && \
    apt-get update -y && \
    apt-get upgrade -y


## TODO
## Should maybe not necessarily run all of the following as root even in a Docker container (r2 complains about this for instance)


# Add NodeJS repo and install
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -

# Add Kali package sources to /etc/apt/sources and import the public key
RUN apt-get install -y gnupg && \
    apt-key adv --recv-keys --keyserver keyserver.ubuntu.com ED444FF07D8D0BF6 && \
    echo "deb http://http.kali.org/kali kali-rolling main contrib non-free" >> /etc/apt/sources.list && \
    echo "# For source package access, uncomment the following line" >> /etc/apt/sources.list && \
    echo "# deb-src http://http.kali.org/kali kali-rolling main contrib non-free" >> /etc/apt/sources.list && \
    # echo "deb http://http.kali.org/kali sana main non-free contrib" >> /etc/apt/sources.list && \
    # echo "deb http://security.kali.org/kali-security sana/updates main contrib non-free" >> /etc/apt/sources.list && \
    echo "# For source package access, uncomment the following line" >> /etc/apt/sources.list && \
    # echo "# deb-src http://http.kali.org/kali sana main non-free contrib" >> /etc/apt/sources.list && \
    # echo "# deb-src http://security.kali.org/kali-security sana/updates main contrib non-free" >> /etc/apt/sources.list && \
    echo "deb http://old.kali.org/kali moto main non-free contrib" >> /etc/apt/sources.list && \
    echo "# For source package access, uncomment the following line" >> /etc/apt/sources.list && \
    echo "# deb-src http://old.kali.org/kali moto main non-free contrib" >> /etc/apt/sources.list && \
    apt-get update -y


# First batch of tools. Installing these in groups/separate Docker layers to avoid subsequent rebuilds taking forever.
RUN apt-get install -y 2to3 apt-utils build-essential cmake colordiff colortail curl enum4linux feroxbuster ftp git gnupg gobuster hashcat hydra ike-scan iptables iputils-ping john ltrace mlocate nano nbtscan ncat net-tools nikto nmap onesixtyone openvpn oscanner pkg-config proxychains proxychains4 qtchooser seclists sipvicious smbclient smbmap smtp-user-enum snmp snmpcheck sslscan strace telnet tmate tmux tnscmd10g tor unzip vim wget whatweb xterm yarnpkg zsh zstd


# Install python2 and necessary modules
RUN apt-get update -y && \
    apt-get install -y python2 && \
    apt-get install -y python-pip && \
    apt-get update -y
RUN git clone git://github.com/kennethreitz/requests.git && \
    cd requests && \
    python ./setup.py install && \
    cd ../ && \
    rm -rf requests && \
    apt-get update -y


# Install python3 and necessary modules
RUN apt-get install -y python3-setuptools && \
    apt-get install -y python3-pip && \
    pip install requests
RUN pip3 install jwt pwntools


# Install Metasploit Framework
RUN curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall && \
    chmod 755 msfinstall && \
    ./msfinstall


# WordPress scanner
#RUN apt-add-repository -y ppa:rael-gc/rvm && \
#    apt-get update -y && \
#    apt-get install -y rvm && \
#    usermod -a -G rvm $USER && \
#    rvm user gemsets && \
#    rvm install ruby && \
#    gem install wpscan


# Clone some tools fron github to our home dir
WORKDIR /home

# radare2 for binary reverse engineering and disassembly
RUN git clone https://github.com/radareorg/radare2.git && cd radare2 && sys/install.sh && cd /home

# ghidra binary decompile plugin for radare2
RUN /home/radare2/binr/r2pm/r2pm init
RUN /home/radare2/binr/r2pm/r2pm -ci r2ghidra

# pwncat post-exploitation framework by calebstewart (there is more than one major project called pwncat)
# Stabilizes unstable reverse shells, establishes real tty, facilitates file transfers between exploited hosts
RUN pip install git+https://github.com/calebstewart/pwncat.git

# Searchsploit exploit search tool
RUN git clone https://github.com/offensive-security/exploitdb.git /opt/exploit-database
RUN echo "alias searchsploit=/opt/exploit-database/searchsploit" >> ~/.bashrc

# AutoRecon enumeration toolkit
# Performs a set of port scans, vulnerability scans, and service identifications
RUN pip install toml && \
    pip install appdirs
RUN git clone https://github.com/Tib3rius/AutoRecon.git

# Privilege Escalation Awesome Scripts Suite
# Upload these scripts to exploited hosts and run to discover potential vectors of privesc
RUN git clone https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite.git

# Linux Smart Enumeration
# Automated scan for potential privesc
RUN git clone https://github.com/diego-treitos/linux-smart-enumeration.git

# Reverse Shell Generation Tool
RUN git clone https://github.com/Lukashku/shellgen.git

# Enum4Linux
RUN git clone https://github.com/CiscoCXSecurity/enum4linux.git


# Install Microsoft Powershell
        # Update the list of packages
RUN apt-get update && \
        # Install pre-requisite packages.
    apt-get install -y wget apt-transport-https software-properties-common && \
        # Download the Microsoft repository GPG keys
    wget -q https://packages.microsoft.com/config/ubuntu/16.04/packages-microsoft-prod.deb && \
        # Register the Microsoft repository GPG keys
    dpkg -i packages-microsoft-prod.deb && \
        # Update the list of packages after we added packages.microsoft.com
    apt-get update && \
        # Install PowerShell
    apt-get install -y powershell


# Clean up
RUN apt-get autoremove -y && \
    apt-get clean 

# Expose ports for shinanegans
EXPOSE 22 80 8080

# Reconfigure the shell prompt to have useful info and fancy colors
RUN echo "PS1='\[\e[32m\][\[\e[m\]\[\e[31m\]\u\[\e[m\]\[\e[33m\]@\[\e[m\]\[\e[32m\]\h\[\e[m\]:\[\e[36m\]\w\[\e[m\]\[\e[32m\]]\[\e[m\]\[\e[32;39m\]\\$\[\e[m\] '" >> ~/.bashrc


# alias build_ctf_container='sudo docker build . -t ctf_image'
# alias build_ctf_container_clean='sudo docker build . --no-cache -t ctf_image'
# alias run_ctf_container='sudo docker run --name ctf1 -it -d --cap-add=NET_ADMIN --device /dev/net/tun --sysctl net.ipv6.conf.all.disable_ipv6=0 ctf_image "/bin/bash"'
# alias enter_ctf_container='sudo docker exec -it ctf1 "/bin/bash"'

# An alias to make using feroxbuster easier
# Usage: $ ctf_ferox -u http://<TARGET_IP>
RUN echo "alias ctf_ferox='feroxbuster -x html,css,js,ts,php,py,pdf,txt,rb,asp,aspx -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt'" >> ~/.bashrc

# An alias to make starting AutoRecon faster
RUN echo "alias ctf_autorecon='cd /home/AutoRecon/src/autorecon; python3 autorecon.py '" >> ~/.bashrc