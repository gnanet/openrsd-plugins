<?php
if (!isset($_SESSION)) {
    session_start();
};
if (basename(dirname(__FILE__)) == 'app') {
    require_once('functions.php');
} else if (basename(dirname(__DIR__)) == 'plugins') {
    require_once('../../app/functions.php');
};

if (!isset($_SESSION['username'])) {
    die("You must be logged in to view this page!");
}
switch ($_POST['type']) {
    case "distupgradestream":
        distupgradestream();
        break;
    case "distdownloadstream":
        distdownloadstream();
        break;
    default:
        echo "XHR Error";
        break;
}

function distupgradestream()
{
    ob_start();
    set_time_limit(0);

    while (@ ob_end_flush()); // end all output buffers if any
    $descriptorspec = array(
       0 => array("pipe", "r"),  // stdin is a pipe that the child will read from
       1 => array("pipe", "w"),  // stdout is a pipe that the child will write to
       2 => array("pipe", "w") // stderr is a pipe that the child will write to
    );
    $cwd = '/tmp';
    $env = array('PATH' => '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin', 'SHELL' => '/bin/bash', 'DEBIAN_FRONTEND' => 'noninteractive');
//    $ourcmd = "sudo LC_ALL=C apt-get -s dist-upgrade";
    $ourcmd = "sudo LC_ALL=C DEBIAN_FRONTEND=noninteractive apt-get -o DPkg::Options::=--force-confdef -y dist-upgrade";
    $process = proc_open($ourcmd, $descriptorspec, $pipes, $cwd, $env);
    if (is_resource($process)) {
        $unblockstdin = stream_set_blocking( $pipes[0] , false );
        $unblockstdout = stream_set_blocking( $pipes[1] , false );
        $unblockstderr = stream_set_blocking( $pipes[2] , false );

        while (!feof($pipes[1])) {
            echo fgets($pipes[1], 1024);
            @ ob_flush();
            @ flush();
        }
        fclose($pipes[1]);
        fclose($pipes[0]);
        $processerrors = stream_get_contents($pipes[2]);
        fclose($pipes[2]);
        $return_value = proc_close($process);
        if ( strlen($processerrors) > 0 ) {
            echo "Errors if happened during run:\n";
            @ ob_flush();
            @ flush();
            echo $processerrors;
            @ ob_flush();
            @ flush();
            if ( $return_value > 0 ) {
                echo "Command returned $return_value\n";
                @ ob_flush();
                @ flush();
            }
        }
    }
            @ ob_flush();
            @ flush();

}
function distdownloadstream()
{
    ob_start();
    set_time_limit(0);

    while (@ ob_end_flush()); // end all output buffers if any
    $descriptorspec = array(
       0 => array("pipe", "r"),  // stdin is a pipe that the child will read from
       1 => array("pipe", "w"),  // stdout is a pipe that the child will write to
       2 => array("pipe", "w") // stderr is a pipe that the child will write to
    );
    $cwd = '/tmp';
    $env = array('PATH' => '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin', 'SHELL' => '/bin/bash', 'DEBIAN_FRONTEND' => 'noninteractive');
//    $ourcmd = "sudo LC_ALL=C apt-get -s dist-upgrade";
    $ourcmd = "sudo LC_ALL=C DEBIAN_FRONTEND=noninteractive apt-get -o DPkg::Options::=--force-confdef -y --download-only upgrade";
    $process = proc_open($ourcmd, $descriptorspec, $pipes, $cwd, $env);
    if (is_resource($process)) {
        $unblockstdin = stream_set_blocking( $pipes[0] , false );
        $unblockstdout = stream_set_blocking( $pipes[1] , false );
        $unblockstderr = stream_set_blocking( $pipes[2] , false );

        while (!feof($pipes[1])) {
            echo fgets($pipes[1], 1024);
            @ ob_flush();
            @ flush();
        }
        fclose($pipes[1]);
        fclose($pipes[0]);
        $processerrors = stream_get_contents($pipes[2]);
        fclose($pipes[2]);
        $return_value = proc_close($process);
        if ( strlen($processerrors) > 0 ) {
            echo "Errors (if happened during run):\n";
            @ ob_flush();
            @ flush();
            echo $processerrors;
            @ ob_flush();
            @ flush();
            if ( $return_value > 0 ) {
                echo "Command returned $return_value\n";
                @ ob_flush();
                @ flush();
            }
        }
    }
            @ ob_flush();
            @ flush();

}
