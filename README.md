# vpnpure
A CLI application for managing PureVPN OPVN configuration for the Raspberry Pi.

When it comes to having a tool to easily connect Raspberry Pi to OpenVPN, there is a dearth. VPNPURE attempts to solved that. With two inputs, you will be able to configure VPNPURE to select the VPN profiles to connect.

Input configuration files require:

(A) OVPN (extension) files from your VPN Provider - these shld have the server and crt certificates embedded in them. Each OVPN will support connections to a server linked to another country. 

E.g, as a subscriber of PureVPN, ukl2-OVPN-UDP.ovpn connects to their UK London server. 

Usually, you have a bunch of these in a folder after downloading from the VPN service providers. 

(B) Auth.txt file you create with first line, <your VPN username> and second line <your VPN password>. 

How to use VPNPURE? 

Step 1: Download the OVPN files from your VPN providers. Extract them if compressed, into a folder of your choice. Remember the path of the folder readily, since you need to hook up PUREVPN to access this folder. 

Step 2: Create an 'auth.txt' file as per (B), and make sure it resides at '/etc/openvpn'. Remember to change the permission using 'sudo chmod 600 /etc/openvpn/auth.txt'. Usage of '600' means owner has full rights to write and read the file, and not anyone else. Do this for security. 

Step 3: Run VPNPURE, it will ask you to set the folder where the OVPN files are located. It will based this upon the Current Working Directory of running the VPNPURE. So make sure you have navigate to the right folder in the first place, before running VPNPURE. 

Step 4: VPNPURE will ask you next which of the VPN profile/country to link to. It will present all the OPVN files and asked you to pick one. Do it, and in the background VPNPURE will do its magic and connect you. As easy as that. 

Version - Limitations:
* 0.0.1 - Not indication of successful connection, use 'tail -f /var/log/syslog' to inspect any connection errors for now. 

Use of program is provided for free and "as-in". 
