<?php
class DistUpgradePlugin extends Plugin{
    public function __construct(){
        //this is required by the plugin system to get working properly. This adds all the below events to global like {Class}::{onEventName};
        parent::__construct(); //Required
        return true;
    }

    public function initialize(){
        return true;
    }

    // here we can override javascript functions like apt_update
    public function onHeadEnd($sess) {
        echo '<script src="plugins/DistUpgrade/DistUpgradePlugin.js"></script>'."\n";
        return true;
    }
   // here we can insert menuitems to the regular menus using javascript DOM manipulation
    public function onFootEnd($sess) {
        echo '<script src="plugins/DistUpgrade/DistUpgradeMenuitem.js"></script>'."\n";
        return true;
    }

    public function onCustomPageLinks($sess){
        /* Hopefully the javascript DOM manipulation succeeded to add our menuitem so we dont need this
        echo '<li><a href="#" onclick="pageLoad(\'distupgrade\');"><i class="fa fa-archive fa-fw"></i> Packages Dist-Upgrade</a></li>';
        */
        return true;
    }

    public function onPageLoad($sess, &$post){
        if($post['page'] == "packages"){
            $aptupdates = OpenRSD::getPackageUpdates();
            $updates_count = $aptupdates['count'];
            $updates_array = $aptupdates['array'];
            if ($updates_count > 0) {
                $updates_summary = $aptupdates['updsum_arr'][0];
                if ( $updates_summary['cnt_notup'] > 0 ) {
                    echo '<div class="alert alert-info"><a href="#" onclick="pageLoad(\'distupgrade\');"><i class="fa fa-archive fa-fw"></i> Packages Dist-Upgrade</a></div>';
                }
            }

        }
        return true;
    }

    public function onCustomPage($sess,&$post){
        if($post['page'] == "distupgrade"){
            include('DistUpgradePage.php');
        }
        return true;
    }
}
?>
