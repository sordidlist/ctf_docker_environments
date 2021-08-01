release=$(lsb_release -cs)
#if ($release == 'kali rolling')

# Terminator Terminal
sudo add-apt-repository ppa:gnome-terminator
sudo apt-get update -y
sudo apt-get install -y terminator

# Sublime Text Editor
wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
sudo apt-get install -y apt-transport-https
echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
sudo apt-get update -y
sudo apt-get install -y sublime-text

# Docker
sudo apt-get update -y
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
echo echo 'deb [arch=amd64] https://download.docker.com/linux/debian buster stable' | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt-get update -y
sudo apt-get install -y docker-ce

# Various tools
sudo apt-get install -y cherrytree python3-pip git flameshot xclip mlocate

# Pwncat
pip install git+https://github.com/calebstewart/pwncat.git

# Setup CTF aliases
echo "alias run_ctf_container='sudo docker run --name ctf1 -it -d --cap-add=NET_ADMIN --device /dev/net/tun --sysctl net.ipv6.conf.all.disable_ipv6=0 ctf_image \"/bin/bash\"'
alias build_ctf_container='sudo docker build . -t ctf_image'
alias enter_ctf_container='sudo docker exec -it ctf1 \"/bin/bash\"'" >> ~/.bashrc

# BurpSuite Community Download Link To Current Version
# https://portswigger.net/burp/communitydownload

# Install Microsoft Powershell
# Update the list of packages
sudo apt-get update -y
# Install pre-requisite packages.
sudo apt-get install -y wget apt-transport-https software-properties-common
# Download the Microsoft repository GPG keys
wget -q https://packages.microsoft.com/config/ubuntu/16.04/packages-microsoft-prod.deb
# Register the Microsoft repository GPG keys
sudo dpkg -i packages-microsoft-prod.deb
# Update the list of packages after we added packages.microsoft.com
sudo apt-get update -y
# Install PowerShell
sudo apt-get install -y powershell
# Start PowerShell
pwsh