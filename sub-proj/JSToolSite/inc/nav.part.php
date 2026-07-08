<?php
$header_title_app_list = "<a href=\"../vsc/\">Visual Studio Code</a>";
?>
<div id="headerTitle">
    <div class="headerContent">
        <img id="logo" src="../imgs/icon_048.png"/>
        <div id="title">JSTool - A JavaScript tool for <?php echo $header_title_app_list; ?></div>
    </div>
</div>
<div id="navWrapper" class="appBorder">
    <div class="headerContent">
        <div id="navLeft">
            <a href="#top">
                <img id="logo" src="../imgs/icon_048.png"/>
            </a>
        </div>
        <ul id="navRight">
            <li>
                <a href="../vsc/?redirect_src=<?php echo $current_app; ?>">Visual Studio Code</a>
            </li>
            <li>
                <a href="#help">Help</a>
            </li>
            <?php
if ($current_app == "npp") {
?>
            <li>
                <a href="#download">Download</a>
            </li>
<?php
} else if ($current_app == "vsc") {
?>
            <li>
                <a href="#install">Install</a>
            </li>
<?php
}
?>
            <li>
                <a href="#intro">Intro</a>
            </li>
        </ul>
        <div class="clear"></div>
    </div>
</div>
