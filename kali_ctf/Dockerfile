FROM debian:latest

# Add non-root users for some installations
RUN useradd -m -s /bin/bash linuxbrew && \
    echo 'linuxbrew ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
RUN useradd -m -s /bin/bash sordidlist && \
    echo 'sordidlist ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# Configure debian
ENV DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true
ENV TERM xterm-256color

# Get package cache and upgrade packages
USER root
RUN rm -fR /var/lib/apt/ && \
    apt-get clean && \
    apt-get update -y && \
    apt-get upgrade -y

# Add NodeJS repo and install
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

# Add Kali package sources to /etc/apt/sources and import the public key
# This allows for installing tools normally distributed with the Kali Linux OS using apt
RUN apt-get install -y gnupg && \
    apt-key adv --recv-keys --keyserver keyserver.ubuntu.com ED444FF07D8D0BF6 && \
    echo "deb http://http.kali.org/kali kali-rolling main contrib non-free" >> /etc/apt/sources.list && \
    echo "# For source package access, uncomment the following line" >> /etc/apt/sources.list && \
    echo "# deb-src http://http.kali.org/kali kali-rolling main contrib non-free" >> /etc/apt/sources.list && \
    echo "# For source package access, uncomment the following line" >> /etc/apt/sources.list && \
    echo "deb http://old.kali.org/kali moto main non-free contrib" >> /etc/apt/sources.list && \
    echo "# For source package access, uncomment the following line" >> /etc/apt/sources.list && \
    echo "# deb-src http://old.kali.org/kali moto main non-free contrib" >> /etc/apt/sources.list && \
    apt-get update -y

# First batch of tools. Installing these in groups/separate Docker layers to avoid subsequent rebuilds taking forever.
RUN apt-get install -y 2to3 apt-utils build-essential cmake colordiff colortail curl enum4linux feroxbuster ftp git gnupg gobuster hashcat hydra ike-scan iptables iputils-ping john ltrace 

# Second batch of tools
RUN apt-get install -y man mlocate mysql-client nano nbtscan ncat net-tools nikto nmap onesixtyone openvpn oscanner pkg-config proxychains proxychains4 qtchooser rsync seclists sed sipvicious smbclient smbmap smtp-user-enum snmp snmpcheck sqlite3 sslscan strace telnet tmate tmux tnscmd10g tor unzip vim wget whatweb xterm zsh zstd

# Install python2 and necessary modules
RUN apt-get update -y && \
    apt-get install -y python2 && \
    wget https://bootstrap.pypa.io/pip/2.7/get-pip.py && \
    python2 get-pip.py && \
    rm get-pip.py
RUN git clone git://github.com/kennethreitz/requests.git && \
    cd requests && \
    python2 ./setup.py install && \
    cd ../ && \
    rm -rf requests && \
    apt-get update -y

# Install python3 and necessary modules
RUN apt-get install -y python3-setuptools && \
    apt-get install -y python3-pip && \
    pip3 install requests

# Install pwntools python3 package for exploit writing
RUN pip3 install jwt pwntools

# Install Metasploit Framework
RUN curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall && \
    chmod 755 msfinstall && \
    ./msfinstall

# Clone some tools fron github to our home dir
WORKDIR /home

# radare2 for binary reverse engineering and disassembly
RUN git clone https://github.com/radareorg/radare2.git && cd radare2 && sys/install.sh && cd /home

# ghidra binary decompile plugin for radare2
USER sordidlist
RUN /home/radare2/binr/r2pm/r2pm init
RUN /home/radare2/binr/r2pm/r2pm -ci r2ghidra

# pwncat post-exploitation framework by calebstewart (there is more than one major project called pwncat)
# Stabilizes unstable reverse shells, establishes real tty, facilitates file transfers between exploited hosts
RUN pip3 install git+https://github.com/calebstewart/pwncat.git

# Searchsploit exploit search tool
USER root
RUN git clone https://github.com/offensive-security/exploitdb.git /opt/exploit-database
RUN echo "alias searchsploit=/opt/exploit-database/searchsploit" >> ~/.bashrc && \
    echo "alias searchsploit=/opt/exploit-database/searchsploit" >> ~/.zshrc

# bat (alternative to cat)
RUN wget https://github.com/sharkdp/bat/releases/download/v0.18.2/bat_0.18.2_amd64.deb && \
    dpkg -i bat_0.18.2_amd64.deb && \
    rm bat_0.18.2_amd64.deb

# Install homebrew package manager
RUN apt-get update && \
    apt-get install build-essential curl file git ruby-full locales --no-install-recommends -y && \
    rm -rf /var/lib/apt/lists/*
    # Homebrew complains if we don't add localedef
RUN localedef -i en_US -f UTF-8 en_US.UTF-8
    # Complete the homebrew install
USER linuxbrew
RUN /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
USER root
ENV PATH="/home/linuxbrew/.linuxbrew/bin:${PATH}"

# Install dtool development tool (like cyber chef but local and via CLI)
USER linuxbrew
RUN brew install guoxbin/guoxbin/dtool

# Install wpscan WordPress scanning tool
RUN brew install wpscanteam/tap/wpscan

# Install ripgrep (grep alternative)
RUN brew install ripgrep && \
    echo "alias grep=rg'" >> ~/.bashrc && \
    echo "alias grep=rg'" >> ~/.zshrc

# AutoRecon enumeration toolkit
# Performs a set of port scans, vulnerability scans, and service identifications
USER root
RUN git clone --branch beta https://github.com/Tib3rius/AutoRecon && \
    apt install seclists curl enum4linux feroxbuster nbtscan nikto nmap onesixtyone oscanner smbclient smbmap snmp sslscan sipvicious tnscmd10g whatweb && \
    # apt install wkhtmltopdf && \
    cd AutoRecon && \
    python3 -m pip install -r requirements.txt && \
    echo "alias ctf_autorecon='cd /home/AutoRecon/src/autorecon; python3 autorecon.py '" >> ~/.bashrc

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

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs -y | sh
ENV PATH=$PATH:/root/.cargo/bin

# tldr Shortened simplified man pages
RUN cargo install tealdeer

# indexa interactive file system index tool
RUN cargo install --git https://github.com/mosmeh/indexa

# LSD alternative to ls
RUN wget https://github.com/Peltoche/lsd/releases/download/0.20.1/lsd_0.20.1_amd64.deb && \
    dpkg -i lsd_0.20.1_amd64.deb && \
    rm lsd_0.20.1_amd64.deb && \
    echo "alias ls='lsd -lA'" >> ~/.bashrc && \
    echo "alias ls='lsd -lA'" >> ~/.zshrc

# fdfind alternative to find
RUN cargo install fd-find

# tiny IRC clinet
RUN cargo install --git https://github.com/osa1/tiny

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

# An alias to make using feroxbuster easier
# Usage: $ ctf_ferox -u http://<TARGET_IP>
RUN echo "alias ctf_ferox='feroxbuster -x html,css,js,ts,php,py,pdf,txt,rb,asp,aspx -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt'" >> ~/.bashrc && \
    echo "alias ctf_ferox='feroxbuster -x html,css,js,ts,php,py,pdf,txt,rb,asp,aspx -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt'" >> ~/.zshrc


# Oh My Zsh!
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" && \
    sed -i 's/robbyrussell/random/g' ~/.zshrc

# Set up liquidprompt
# Note: liquidprompt doesn't appear to track path changes inside Docker containers at the moment, disabling :(
#RUN git clone --branch stable https://github.com/nojhan/liquidprompt.git ~/liquidprompt && \
#    echo "source /root/liquidprompt/liquidprompt" >> ~/.bashrc && \
#    echo "source /root/liquidprompt/liquidprompt" >> ~/.zshrc && \
#    echo "source /root/liquidprompt/themes/powerline/powerline.theme" >> ~/.bashrc && \
#    echo "source /root/liquidprompt/themes/powerline/powerline.theme" >> ~/.zhrc && \
#    echo "lp_theme powerline" >> ~/.bashrc && \
#    echo "lp_theme powerline" >> ~/.zshrc

# Update locate database
RUN updatedb

# Reconfigure the shell prompt to have useful info and fancy colors
# RUN echo "PS1='\[\e[32m\][\[\e[m\]\[\e[31m\]\u\[\e[m\]\[\e[33m\]@\[\e[m\]\[\e[32m\]\h\[\e[m\]:\[\e[36m\]\w\[\e[m\]\[\e[32m\]]\[\e[m\]\[\e[32;39m\]\\$\[\e[m\] '" >> ~/.bashrc && \
#    echo "PS1='$\e[0;32m[\e[0;31m\u\e[33m\e[0m'" >> ~/.zshrc

# The Sublime Text Color Highlight plugin will highlight these values with their corresponding colors
# below and in the reconfigure command above, making interpreting the colors much easier.
# \e[30m]
# \e[31m]
# \e[32m]
# \e[33m]
# \e[34m]
# \e[35m]
# \e[36m]
# \e[37m]

