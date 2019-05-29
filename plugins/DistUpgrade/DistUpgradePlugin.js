function deCapitalizeFirstLetter(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
}
function dashAddUpgradeLink() {
    var anchor = document.querySelectorAll("#pageContent > div > div > div > div > div.panel-body > p > a");
    var i;
    for (i = 0; i < anchor.length; i++) {
        if ( anchor[i].text == "Go to Packages" ) {
            var t = document.createTextNode(" | ");
            anchor[i].after(t);
            var dulink = document.createElement("a");
            dulink.text = "or to Distupgrade";
            dulink.setAttribute("onclick", "pageLoad('distupgrade');");
            dulink.href = "#";
            t.after(dulink);
        }
    }
}
pageLoad = function(page){
    document.title = "Loading..."
    document.getElementById("pageContent").innerHTML = "<p>Loading " + page + ", Please wait...</p>";
    load(true);
    $.ajax({
        method:'post',
        url:'./page.php',
        data:{
            page:page
        },
        success:function(result) {
            document.getElementById("pageContent").innerHTML = result;
            document.title = capitalizeFirstLetter(page);
            load(false);
            if ( page == "dashboard" ) { dashAddUpgradeLink(); }
        }
        }).fail(function(e) {
            document.getElementById("pageContent").innerHTML = "Loading the page failed. Please try again.";
            genModal("Error", "Loading the page failed. Please try again.");
            load(false);
        });
}
apt_update = function (){
    $('#pageContent > div.row > div.col-lg-12 > h1 > small > button.btn.btn-raised.btn-info').removeClass('btn-info').addClass('btn-outline-info disabled');
    $('#pageContent > div.row > div.col-lg-12 > h1 > small > button.btn.btn-raised.btn-warning').removeClass('btn-warning').addClass('btn-outline-warning disabled');
    $('#pageContent > div.row > div.col-lg-12 > table.table').hide();
    var contentrow = document.createElement('div'),
        contentcol = document.createElement('div'),
        contentpre = document.createElement('textarea');
    var winheight = $( window ).height(),
        navheight = $('nav.navbar.navbar-default').outerHeight(),
        footnavheight = $('nav.navbar.navbar-inverse.navbar-fixed-bottom').outerHeight(),
        navheadheight = $('#pageContent > div > div > h1.page-header').outerHeight() + 30,
        viscontheight = ( winheight - (navheight + footnavheight + navheadheight) - 180 );
        contentpre.setAttribute('id', 'updatestreamcnt');
        contentpre.setAttribute('rows', '1');
        contentpre.setAttribute('cols', '160');
        contentpre.setAttribute('readonly', true);
        contentpre.style.maxHeight = viscontheight + 'px';
        contentpre.style.height = viscontheight + 'px';
        contentrow.className = 'row';
        contentcol.className = 'col-lg-12';
        contentcol.appendChild(contentpre);
        contentrow.appendChild(contentcol);
        $('#pageContent').append(contentrow);
    var pkgbutton = document.createElement('button');
        pkgbutton.setAttribute('onClick','pageLoad(\''+ deCapitalizeFirstLetter(document.title) +'\');');
        pkgbutton.innerHTML = 'reload Package Updates';
        pkgbutton.className = 'btn btn-raised btn-success';
    var lastResponseLength = false;
    var ajaxRequest = $.ajax({
        type: 'post',
        url: './app/packages.php',
        data:{
            type:'updatestream'
        },
        xhrFields: {
            onprogress: function(e)
            {
                var progressResponse;
                var response = e.currentTarget.response;
                if(lastResponseLength === false)
                {
                    progressResponse = response;
                    lastResponseLength = response.length;
                }
                else
                {
                    progressResponse = response.substring(lastResponseLength);
                    lastResponseLength = response.length;
                }
                $('#updatestreamcnt').val( $('#updatestreamcnt').val() + progressResponse);
                contentpre.scrollTop = contentpre.scrollHeight;
            }
        }
    });
    ajaxRequest.done(function(data)
    {
        $('#updatestreamcnt').after(pkgbutton);
        console.log('Response Complete');
    });
    ajaxRequest.fail(function(error){
        $('#updatestreamcnt').after(pkgbutton);
        console.log('Error: ', error);
    });
    console.log('Request Sent');
}
function apt_distupgrade(){
    $('#pageContent > div.row > div.col-lg-12 > h1 > small > button.btn.btn-raised.btn-info').removeClass('btn-info').addClass('btn-outline-info disabled');
    $('#pageContent > div.row > div.col-lg-12 > h1 > small > button.btn.btn-raised.btn-danger').removeClass('btn-danger').addClass('btn-outline-danger disabled');
    $('#pageContent > div.row > div.col-lg-12 > table.table').hide();
    var contentrow = document.createElement('div'),
        contentcol = document.createElement('div'),
        contentpre = document.createElement('textarea');
    var winheight = $( window ).height(),
        navheight = $('nav.navbar.navbar-default').outerHeight(),
        footnavheight = $('nav.navbar.navbar-inverse.navbar-fixed-bottom').outerHeight(),
        navheadheight = $('#pageContent > div > div > h1.page-header').outerHeight() + 30,
        viscontheight = ( winheight - (navheight + footnavheight + navheadheight) - 180 );
        contentpre.setAttribute('id', 'upgradestreamcnt');
        contentpre.setAttribute('rows', '1');
        contentpre.setAttribute('cols', '160');
        contentpre.setAttribute('readonly', true);
        contentpre.style.maxHeight = viscontheight + 'px';
        contentpre.style.height = viscontheight + 'px';
        contentrow.className = 'row';
        contentcol.className = 'col-lg-12';
        contentcol.appendChild(contentpre);
        contentrow.appendChild(contentcol);
        $('#pageContent').append(contentrow);
    var pkgbutton = document.createElement('button');
        pkgbutton.setAttribute('onClick','pageLoad(\'distupgrade\');');
        pkgbutton.innerHTML = 'reload Package Updates';
        pkgbutton.className = 'btn btn-raised btn-success';
    var lastResponseLength = false;
    var ajaxRequest = $.ajax({
        type: 'post',
        url: './plugins/DistUpgrade/DistUpgradeFunc.php',
        data:{
            type:'distupgradestream'
        },
        xhrFields: {
            onprogress: function(e)
            {
                var progressResponse;
                var response = e.currentTarget.response;
                if(lastResponseLength === false)
                {
                    progressResponse = response;
                    lastResponseLength = response.length;
                }
                else
                {
                    progressResponse = response.substring(lastResponseLength);
                    lastResponseLength = response.length;
                }
                $('#upgradestreamcnt').val( $('#upgradestreamcnt').val() + progressResponse);
                contentpre.scrollTop = contentpre.scrollHeight;
            }
        }
    });
    ajaxRequest.done(function(data)
    {
        $('#upgradestreamcnt').after(pkgbutton);
        console.log('Response Complete');
    });
    ajaxRequest.fail(function(error){
        $('#upgradestreamcnt').after(pkgbutton);
        console.log('Error: ', error);
    });
    console.log('Request Sent');
}
function apt_downloadupdates() {
    $('#pageContent > div.row > div.col-lg-12 > h1 > small > button.btn.btn-raised.btn-info').removeClass('btn-info').addClass('btn-outline-info disabled');
    $('#pageContent > div.row > div.col-lg-12 > h1 > small > button.btn.btn-raised.btn-danger').removeClass('btn-danger').addClass('btn-outline-danger disabled');
    $('#pageContent > div.row > div.col-lg-12 > table.table').hide();
    $('#pageContent > div.row > div.col-lg-12 > button.btn.btn-raised.btn-info').hide();
    var contentrow = document.createElement('div'),
        contentcol = document.createElement('div'),
        contentpre = document.createElement('textarea');
    var winheight = $( window ).height(),
        navheight = $('nav.navbar.navbar-default').outerHeight(),
        footnavheight = $('nav.navbar.navbar-inverse.navbar-fixed-bottom').outerHeight(),
        navheadheight = $('#pageContent > div > div > h1.page-header').outerHeight() + 30,
        viscontheight = ( winheight - (navheight + footnavheight + navheadheight) - 180 );
        contentpre.setAttribute('id', 'downloadstreamcnt');
        contentpre.setAttribute('rows', '1');
        contentpre.setAttribute('cols', '160');
        contentpre.setAttribute('readonly', true);
        contentpre.style.maxHeight = viscontheight + 'px';
        contentpre.style.height = viscontheight + 'px';
        contentrow.className = 'row';
        contentcol.className = 'col-lg-12';
        contentcol.appendChild(contentpre);
        contentrow.appendChild(contentcol);
        $('#pageContent').append(contentrow);
    var pkgbutton = document.createElement('button');
        pkgbutton.setAttribute('onClick','pageLoad(\'distupgrade\');');
        pkgbutton.innerHTML = 'reload Package Updates';
        pkgbutton.className = 'btn btn-raised btn-success';
    var lastResponseLength = false;
    var ajaxRequest = $.ajax({
        type: 'post',
        url: './plugins/DistUpgrade/DistUpgradeFunc.php',
        data:{
            type:'distdownloadstream'
        },
        xhrFields: {
            onprogress: function(e)
            {
                var progressResponse;
                var response = e.currentTarget.response;
                if(lastResponseLength === false)
                {
                    progressResponse = response;
                    lastResponseLength = response.length;
                }
                else
                {
                    progressResponse = response.substring(lastResponseLength);
                    lastResponseLength = response.length;
                }
                $('#downloadstreamcnt').val( $('#downloadstreamcnt').val() + progressResponse);
                contentpre.scrollTop = contentpre.scrollHeight;
            }
        }
    });
    ajaxRequest.done(function(data)
    {
        $('#downloadstreamcnt').after(pkgbutton);
        console.log('Response Complete');
    });
    ajaxRequest.fail(function(error){
        $('#downloadstreamcnt').after(pkgbutton);
        console.log('Error: ', error);
    });
    console.log('Request Sent');
}
