release=$(lsb_release -cs)
#if ($release == 'kali rolling')

#Ensure Tools directory has been created (it should be this directory's parent directory)
cd ~/Tools

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
echo 'deb [arch=amd64] https://download.docker.com/linux/debian buster stable' | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt-get update -y
sudo apt-get install -y docker-ce

# Various tools
sudo apt-get install -y cherrytree python3-pip git flameshot xclip mlocate
sudo apt install -y bat

# Pwncat
pip install git+https://github.com/calebstewart/pwncat.git

# Setup CTF aliases
echo "alias run_ctf_container='sudo docker run --name ctf1 -it -d --cap-add=NET_ADMIN --device /dev/net/tun --sysctl net.ipv6.conf.all.disable_ipv6=0 ctf_image \"/bin/bash\"'" >> ~/.bashrc
echo "alias build_ctf_container='cd ~/Tools/ctf_docker_environments/kali_ctf/; sudo docker build . -t ctf_image'" >> ~/.bashrc
echo "alias enter_ctf_container='sudo docker exec -it ctf1 \"/bin/bash\"'" >> ~/.bashrc

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
# pwsh


# Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/frightenedoctopus/.zprofile
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Zenith interactive resource tool (like top but more features)
mkdir ~/Tools/zenith; cd ~/Tools/zenith;
wget -q https://github.com/bvaisvil/zenith/releases/download/0.12.0/zenith_0.12.0-1_amd64.deb
ar -x zenith_0.12.0-1_amd64.deb; xz -d data.tar.xz; tar -xvf data.tar; cp ./usr/bin/zenith .;
echo "alias zenith=~/Tools/zenith/zenith" >> ~/.bashrc
rm -rf ./usr; rm control.tar.xz data.tar zenith_0.12.0-1_amd64.deb ./debian-binary;
cd ~/Tools;

# bottom (alternative to top, interactive)
cargo install serial-monitor

# dust Rust-based file size visualizer
cargo install du-dust

# tldr Shortened simplified man pages
cargo install tealdeer

# tiny IRC chat client
cargo install --git https://github.com/osa1/tiny

# tickrs Ticker data for CLI
cargo install tickrs

# USB interaction tool
cargo install serial-monitor

# dtool is a Rust based package for calculating hashes, encrypting files, and other development tasks
brew install guoxbin/guoxbin/dtool

