FROM ubuntu:latest

# Configure debian
ARG DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true
ENV TERM xterm-256color

# Get package cache and upgrade packages
RUN rm -fR /var/lib/apt/ && \
    apt-get clean && \
    apt-get update -y && \
    apt-get upgrade -y

# Add NodeJS repo
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -

# Some tools
RUN apt-get install -y git cmake qtchooser wget gnupg colordiff colortail unzip vim tmux xterm zsh curl telnet strace ltrace tmate build-essential wget python3-setuptools python3-pip tor proxychains proxychains4 zstd  yarnpkg net-tools iputils-ping ncat john hashcat nano openvpn xterm pkg-config 

# More tools
RUN apt-get install -y nmap

# Clone some tools fron github to our home dir
WORKDIR /home

# seclists wordlist collection
RUN git clone https://github.com/danielmiessler/SecLists.git

# radare2 for binary reverse engineering
RUN git clone https://github.com/radareorg/radare2.git && cd radare2 && sys/install.sh && cd /home

# ghidra binary decompile plugin for radare2
RUN /home/radare2/binr/r2pm/r2pm init
RUN /home/radare2/binr/r2pm/r2pm -ci r2ghidra
# RUN pip install r2env && \
#    r2env init && \
#    r2env add radare2 && \
#    r2env use radare2@git && \
#    r2env shell r2 -v

# pwncat post-exploitation framework by calebstewart (there is more than one major project called pwncat)
RUN pip install git+https://github.com/calebstewart/pwncat.git

# AutoRecon enumeration toolkit
RUN pip install toml && \
    pip install appdirs
RUN git clone https://github.com/Tib3rius/AutoRecon.git

# feroxbuster
RUN git clone https://github.com/epi052/feroxbuster.git
RUN /home/feroxbuster/install-nix.sh

# Privilege Escalation Awesome Scripts Suite
RUN git clone https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite.git

# Clean up
RUN apt-get autoremove -y && \
    apt-get clean 

# Expose ports for shinanegans
EXPOSE 22 80 8080

# Copy the ovpn file for HTB
COPY lab_leadOctopus.ovpn /home

# Reconfigure the shell prompt to have useful info and fancy colors
RUN echo "PS1='\[\e[32m\][\[\e[m\]\[\e[31m\]\u\[\e[m\]\[\e[33m\]@\[\e[m\]\[\e[32m\]\h\[\e[m\]:\[\e[36m\]\w\[\e[m\]\[\e[32m\]]\[\e[m\]\[\e[32;39m\]\\$\[\e[m\] '" >> ~/.bashrc



