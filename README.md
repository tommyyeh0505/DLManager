# DLManager
Google Chrome Extension that sorts downloads into respective type folders.

## Installation
1. Open Developer mode in Google Chrome Extensions
2. Use Load Unpacked Extension to add DLManager extension
3. Open a website with a download option.
4. Proceed to download file as normal. 

## Current Issues
Downloads all files contained in website (need to filter permanent downloads to only after user selection)
Does not cancel original download to Downloads folder, downloads a copy into respective type folder in Downloads. (need to intercept original webrequest and cancel it before it proceeds with origihnal download)
