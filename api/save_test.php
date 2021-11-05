<?php
$_SESSION['basicInfo'] = $_POST['basicInfo'];
$_SESSION['questionRound'] = $_POST['questionRound'];
$filename = $site_url.'json/results.json';
if(file_exists($filename)){
	$json_file = file_get_contents($filename);
	$results_json = json_decode($json_file, true);
	$data[] = $_SESSION;
	$new_results = array_merge($results_json, $data);
	$new_json = json_encode($new_results, JSON_PRETTY_PRINT);
	file_put_contents($filename, $new_json);
	session_destroy();
	echo json_encode(['code'=>200, 'msg'=>'Thankyou for test!']);
	exit;
}else{	
	$fp = fopen($filename, 'w');
	$data[] = $_SESSION;
	if(fwrite($fp, json_encode($data, JSON_PRETTY_PRINT))){
		session_destroy();
		echo json_encode(['code'=>200, 'msg'=>'Thankyou for test!']);
		exit;
	}
	fclose($fp);
}
