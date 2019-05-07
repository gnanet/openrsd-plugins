if ( document.body.contains(document.getElementById("myNavbar")) ) {
    var basicmenu = document.querySelector('#myNavbar > ul:nth-child(1) > li:nth-child(2) > ul');
    if ( ! basicmenu.contains(document.getElementById("distupgradeMenuitem")) ) {
        var distupgradeMenuitem = document.createElement("LI");
        distupgradeMenuitem.setAttribute("id", "distupgradeMenuitem");
        distupgradeMenuitem.innerHTML = '<a href="#" onclick="pageLoad(\'distupgrade\');"><i class="fa fa-archive fa-fw"></i> Packages Dist-Upgrade</a>';
        basicmenu.insertBefore(distupgradeMenuitem, basicmenu.childNodes[4]);
    }
}
