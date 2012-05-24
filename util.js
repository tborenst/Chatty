/***
* This file contains several useful tools to help organize web development in javascript.
*/

/***
* Includes javascript files on demand in the host environment in a <script> tag.
*/
function include(srcPath){
	//check that the file included ends with ".js"
	var end = srcPath.slice(srcPath.length-3, srcPath.length);
	if(end != ".js"){
		throw "srcPath included does not end with \".js\"";
	}
	//append file to head element
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = "text/JavaScript";
	script.src = srcPath;
	head.appendChild(script);
}