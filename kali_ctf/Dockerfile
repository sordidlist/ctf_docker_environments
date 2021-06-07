FROM ubuntu:latest

# Configure debian
ARG DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true
ENV TERM xterm-256color

# Get package cache and upgrade packages
RUN rm -fR /var/lib/apt/ && \
    apt-get clean && \
    apt-get update -y && \
    apt-get upgrade -y

# Add NodeJS repo and install
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -

# First batch of tools. Installing these in groups/separate Docker layers to avoid subsequent rebuilds taking forever.
RUN apt-get install -y git cmake qtchooser wget gnupg colordiff colortail unzip vim tmux xterm zsh curl telnet strace ltrace tmate build-essential wget python3-setuptools python3-pip tor proxychains proxychains4 zstd  yarnpkg net-tools iputils-ping ncat john hashcat nano openvpn xterm pkg-config 

# More tools
RUN apt-get install -y nmap hydra

# Clone some tools fron github to our home dir
WORKDIR /home

# seclists wordlist collection
# Frequently used as a wordlist source for bruteforcing
RUN git clone https://github.com/danielmiessler/SecLists.git

# radare2 for binary reverse engineering and disassembly
RUN git clone https://github.com/radareorg/radare2.git && cd radare2 && sys/install.sh && cd /home

# ghidra binary decompile plugin for radare2
RUN /home/radare2/binr/r2pm/r2pm init
RUN /home/radare2/binr/r2pm/r2pm -ci r2ghidra

# pwncat post-exploitation framework by calebstewart (there is more than one major project called pwncat)
# Stabilizes unstable reverse shells, establishes real tty, facilitates file transfers between exploited hosts
RUN pip install git+https://github.com/calebstewart/pwncat.git

# AutoRecon enumeration toolkit
# Performs a set of port scans, vulnerability scans, and service identifications
RUN pip install toml && \
    pip install appdirs
RUN git clone https://github.com/Tib3rius/AutoRecon.git

# feroxbuster
# Recursive web app directory discovery tool
RUN git clone https://github.com/epi052/feroxbuster.git
RUN /home/feroxbuster/install-nix.sh

# Privilege Escalation Awesome Scripts Suite
# Upload these scripts to exploited hosts and run to discover potential vectors of privesc
RUN git clone https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite.git

# overflow_with_joy
# Linux stack-based buffer overflow practice repo
RUN git clone https://github.com/LauraWartschinski/overflow_with_joy.git

# Clean up
RUN apt-get autoremove -y && \
    apt-get clean 

# Expose ports for shinanegans
EXPOSE 22 80 8080

# Copy the ovpn file for HTB
# COPY lab_leadOctopus.ovpn /home

# Reconfigure the shell prompt to have useful info and fancy colors
RUN echo "PS1='\[\e[32m\][\[\e[m\]\[\e[31m\]\u\[\e[m\]\[\e[33m\]@\[\e[m\]\[\e[32m\]\h\[\e[m\]:\[\e[36m\]\w\[\e[m\]\[\e[32m\]]\[\e[m\]\[\e[32;39m\]\\$\[\e[m\] '" >> ~/.bashrc



