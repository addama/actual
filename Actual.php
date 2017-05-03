<?php
	$logDir = './logs/';
	$logExt = '.log';
	
	function checkDir($dir) {
		$path = pathinfo($dir, PATHINFO_DIRNAME);
		@mkdir($path, 0777, true);
	}
	
	function save($file, $data) {
		checkDir($file);
		echo file_put_contents($file, $data); 
	}
	
	function load($file) { 
		echo file_get_contents($file); 
	}
	
	function out($message, $type) {
		$shortDate = date('Y-m-d');
		$longDate = date("Y-m-d\TH:i:sO");
		$file = $GLOBALS['logDir'].$shortDate.$GLOBALS['logExt'];
		checkDir($file);
		file_put_contents(
			$file, 
			$longDate . "\t" . $type . "\t" . $message . "\r\n", 
			FILE_APPEND
		);
	}
	
	if (!isset($_GET['op'])) {
		echo 'false';
		exit;
	}
	
	switch ($_GET['op']) {
		// Logging
		case 'log': {
			if (!isset($_GET['m'])) $_GET['m'] = '';
			if (!isset($_GET['t'])) $_GET['t'] = '';
			out($_GET['m'], $_GET['t']);
			break;
		}
		
		// Loading the contents of a file
		case 'load': {
			if (!isset($_GET['f'])) echo 'false';
			load($_GET['f']);
			break;
		}
		
		// Saving content to a file (will overwrite)
		case 'save': {
			if (!isset($_GET['f'])) echo 'false';
			if (!isset($_GET['d'])) echo 'false';
			save($_GET['f'], $_GET['d']);
			break;
		}
		
		default: echo 'false'; break;
	}

?>