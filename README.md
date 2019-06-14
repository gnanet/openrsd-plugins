# Plugin Repository for OpenRSD

### What is OpenRSD

OpenRSD or ORSD is a set of PHP scripts, JS, HTML, and BootStrap CSS to create a beautiful, easy to use, responsive Dashboard to manage Raspbian based distros for the RPi2-3.

### Why a separate Repository for Plugins

Following the introduction of the Plugin Interface, the requirement to keep OpenRSD codebase clean got more important. The .gitignore of the core project would hide all custom made plugins from being commited. The obvious way was to create a repository that follows the folder-structure of the core project, but holds the plugins code, and .gitignore-s the core files instead.

### Important NOTICE

**Most plugins published in this repository are proof-of-concept code, and may contain bugs, or mistakes caused by the learning procedure i went trough to create the code.**

### How to install & Use

After installing OpenRSD, you should follow the instructions in the [PLUGINS](PLUGINS.MD) documentation.

For plugins that require special steps to install, the additonal instructions wil be placed to the folder of the plugin itself.

The first plugin published here enables the **dist-upgrade** of the system, in case some packages would not update the usual way.
Specialities of the plugin besides the initial goal of dist-upgrade, are:

 - it replaces a javascrript function from the core
 - it can place iit's menu entry using DOM manipulation below the Packages menuitem
 - Using the **download-only** mode it preloads the upgraded packages
 - It tries to display the package changelog using the downloaded packages.

     for the package changelog to function you are required to install  **apt-listchanges** and it is suggested to install **needrestart**:
     `sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get -y install apt-listchanges needrestart`

### Documentation / Screenshots

There may be more detail about the plugins, but to get a quick impression, [i made some screenshots, you can see them here.](docs/screenshots.md)