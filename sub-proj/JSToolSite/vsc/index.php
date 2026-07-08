<?php
include_once "../inc/common.inc.php";

$current_app = "vsc";

$download_array = parse_ini_file("../inc/version.ini", true);
$cur_version = $download_array["JSMinNpp"]["version"];

?>
<!DOCTYPE html>
<html>
<head>
    <title>JSTool - A JavaScript tool for Visual Studio Code</title>
    <?php include "../inc/head.part.php" ?>
</head>
<body>
    <div id="divMainContent" class="<?php echo $current_app; ?>">
        <?php include "../inc/nav.part.php" ?>
        <div class="pageWrapper">
            <div class="divListwHeader">
                <div class="listHeader">
                    <div class="listHeaderTitle"><a name="intro" title="Intro"></a>Intro</div>
                </div>
                <div class="listContainer">
                    <p>A JavaScript (JSON) tool for <a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a>.</p>
                    <ul class="indentList discList">
                        <li><a href="http://www.crockford.com/Javascript/jsmin.html" target="_blank">Douglas Crockford's JSMin</a> algorithm to minimize JavaScript code.</li>
                        <li>My own algorithm to format JavaScript code.</li>
                        <li>A JSON tree viewer.</li>
                    </ul>
                    <p>&nbsp;</p>
                    <p>Really helpful to JavaScript coder on Visual Studio Code. Easy to <a class="smoothAnchor" href="#help">use</a> it.</p>
                    <p>Made in China.</p>
                    <p>License: <a href="http://www.gnu.org/licenses/gpl-2.0.html" target="_blank">GPL 2.0</a></p>
                    <p>&nbsp;</p>
                    <p>Features:</p>
                    <ul class="indentList discList">
                        <li>JavaScript minify.</li>
                        <li>JavaScript/JSON format.</li>
                        <li>Sort JSON data alphabetically.</li>
                        <li>JSON tree viewer.</li>
                    </ul>
                    <p>&nbsp;</p>
                    <p><a href='https://ko-fi.com/Y8Y72L3FZ' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi4.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a></p>
                </div>
            </div>
            <div class="divListwHeader">
                <div class="listHeader">
                    <div class="listHeaderTitle"><a name="install" title="Install"></a>Install</div>
                </div>
                <div class="listContainer">
                    <p>Install JSTool from Extensions:</p>
                    <ol class="indentList">
                        <li>Run Visual Studio Code.</li>
                        <li>Open "Extensions" from Activity Bar.<br/><img src="../imgs/extensions-view-icon.png" width="48" height="48" /></li>
                        <li>Search "jstool".<br/><img src="../imgs/extensions-jstool.png" /></li>
                        <li>Click "Install" button. After install finished, then click "Reload".<br/><img src="../imgs/extensions-jstool-reload.png" /></li>
                    </ol>
                    <p>Or install JSTool manually, see <a class="smoothAnchor" href="#help">Help</a>.</p>
                    <p>&nbsp;</p>
                    <p>Other files:</p>
                    <ul class="indentList discList">
                        <li>
                        README: <a href="https://github.com/sunjw/jstool/blob/master/JSToolJS/README.md" target="_blank">https://github.com/sunjw/jstool/blob/master/JSToolJS/README.md</a>
                        </li>
                        <li>
                        Change log: <a href="https://github.com/sunjw/jstool/blob/master/JSToolJS/CHANGELOG.md" target="_blank">https://github.com/sunjw/jstool/blob/master/JSToolJS/CHANGELOG.md</a>
                        </li>
                        <li>
                        Source code: <a href="https://github.com/sunjw/jstool" target="_blank">https://github.com/sunjw/jstool</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="divListwHeader">
                <div class="listHeader">
                    <div class="listHeaderTitle"><a name="help" title="Help"></a>Help</div>
                </div>
                <div class="listContainer">
                    <ul class="indentList discList">
                        <li>
                            <div>
                                <p>Install JSTool manually</p>
                                <ol class="indentList">
                                    <li>Visit JSTool page in <a href="https://marketplace.visualstudio.com/items?itemName=sunjw.jstool" target="_blank">Visual Studio Marketplace</a>.</li>
                                    <li>Click "Download Extension" on right side.</li>
                                    <li>Run Visual Studio code.</li>
                                    <li>Using the "Install from VSIX..." command in the Extensions view command drop-down, or the "Extensions: Install from VSIX..." command in the Command Palette.</li>
                                    <li>Select sunjw.jstool-x.y.z.vsix you just downloaded.</li>
                                </ol>
                            </div>
                        </li>
                    </ul>
                    <p>&nbsp;</p>
                    <ul class="indentList discList">
                        <li>
                            <div>
                                <p>Uninstall JSTool</p>
                                <ol class="indentList">
                                    <li>Run Visual Studio Code.</li>
                                    <li>Open "Extensions" from Activity Bar.</li>
                                    <li>Under "Enabled" section, select "JSTool".</li>
                                    <li>Click "Uninstall" button.</li>
                                </ol>
                            </div>
                        </li>
                    </ul>
                    <p>&nbsp;</p>
                    <ul class="indentList discList">
                        <li>
                            <div>
                                <p>How to use JSTool</p>
                                <p>Minimize source code:</p>
                                <ol class="indentList">
                                    <li>Open you JavaScript source code file in Visual Studio Code.</li>
                                    <li>Using the "Minimize JavaScript" command in the Command Palette.</li>
                                    <li>If you want to put minimized source code in a new file, using the "Minimize JavaScript (New file)" command.</li>
                                </ol>
                                <p>&nbsp;</p>
                                <p>Format all code in a source code file:</p>
                                <ol class="indentList">
                                    <li>Open you JavaScript source code file in Visual Studio Code.</li>
                                    <li>Using the "Format JavaScript (JSON)" command in the Command Palette.</li>
                                </ol>
                                <p>&nbsp;</p>
                                <p>Format selected code in a source code file:</p>
                                <ol class="indentList">
                                    <li>Open you JavaScript source code file in Visual Studio Code.</li>
                                    <li>Select source code lines which you want to format.</li>
                                    <li>Using the "Format JavaScript (JSON)" command in the Command Palette.</li>
                                </ol>
                                <p>&nbsp;</p>
                                <p>Sort JSON data alphabetically:</p>
                                <ol class="indentList">
                                    <li>Open you JSON data file in Visual Studio Code.</li>
                                    <li>Using the "JSON Sort" command in the Command Palette.</li>
                                    <li>If you want to put sorted JSON data in a new file, using the "JSON Sort (New file)" command.</li>
                                </ol>
                                <p>&nbsp;</p>
                                <p>Show and refresh JSON tree view:</p>
                                <ol class="indentList">
                                    <li>Open you JSON data file in Visual Studio Code.</li>
                                    <li>Using the "Refresh JSON Tree View" command in the Command Palette.</li>
                                    <li>Or right click ROOT node in "JSTool: JSON Tree", click "Refresh" in context menu.</li>
                                </ol>
                            </div>
                        </li>
                    </ul>
                    <p>&nbsp;</p>
                    <ul class="indentList discList">
                        <li>
                            <div>
                                <p>How to bind shortcuts to JSTool command</p>
                                <p>Visit <a href="https://code.visualstudio.com/docs/getstarted/keybindings" target="_blank">Key Bindings for Visual Studio Code</a> and follow the steps.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="divFooter" class="center">
                <?php include "../inc/footer.part.php" ?>
            </div>
        </div>
    </div>
    <?php include "../inc/js.part.php" ?>
</body>
</html>
