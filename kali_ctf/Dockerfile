FROM kalilinux/kali-rolling:latest

ENV DEBIAN_FRONTEND noninteractive
ENV TERM xterm-256color

# Install Kali Full
RUN rm -fR /var/lib/apt/ && \
    apt-get clean && \
    apt-get update -y #&& \
    apt-get install -y software-properties-common kali-linux-full --fix-missing && \
    echo 'VERSION_CODENAME=kali-rolling' >> /etc/os-release

# Add NodeJS repo
# RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -

# Some system tools
RUN apt-get install -y git colordiff colortail unzip vim tmux xterm zsh curl telnet strace ltrace tmate build-essential wget python3-setuptools python3-pip tor proxychains proxychains4 zstd nodejs npm yarnpkg net-tools iputils-ping ncat john hashcat nano metasploit-framework

# secLists
# RUN git clone https://github.com/danielmiessler/SecLists /usr/share/seclists

# radare2
RUN git clone https://github.com/radare/radare2 && cd radare2 && sys/install.sh

RUN git clone https://github.com/the-c0d3r/buffer-overflow.git /home

# ynetd
RUN YNETD_VERSION=v0.14 && \
    wget -qO /tmp/ynetd.zip https://github.com/rwstauner/ynetd/releases/download/$YNETD_VERSION/ynetd-linux-amd64.zip \
    && unzip -d /usr/local/bin/ /tmp/ynetd.zip \
    && rm -f /tmp/ynetd.zip

# w3af - web app auditing
# RUN git clone https://github.com/andresriancho/w3af.git /opt/w3af && \
#    apt-get install -y libssl-dev libxml2-dev libxslt1-dev zlib1g-dev python-dev python-pybloomfiltermmap ; \
#    /opt/w3af/w3af_console ; \
#    bash /tmp/w3af_dependency_install.sh ; \
#    echo 'export PATH=/opt/w3af:$PATH' >> /etc/profile

# ngrok - secure introspectable tunnels to localhost
# RUN curl https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip | gunzip - > /usr/bin/ngrok && \
#    chmod +x /usr/bin/ngrok

# Tor refresh every 5 requests
# RUN echo MaxCircuitDirtiness 10 >> /etc/tor/torrc && \
#    update-rc.d tor enable

# Use random proxy chains / round_robin_chain for pc4
#RUN sed -i 's/^strict_chain/#strict_chain/g;s/^#random_chain/random_chain/g' /etc/proxychains.conf && \
#    sed -i 's/^strict_chain/#strict_chain/g;s/^round_robin_chain/round_robin_chain/g' /etc/proxychains4.conf

# Clean up
RUN apt-get autoremove -y && \
    apt-get clean 

COPY hackme3 /home
COPY ynetd /home

# Expose a port for shinanegans
EXPOSE 8080

# CMD "/bin/zsh"
