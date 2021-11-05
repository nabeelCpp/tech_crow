<?php
session_start();
include '../config/config.php';
$request = $_SERVER['REQUEST_URI'];
switch ($request) {
	case '/'.$sub_folder.'/':
		session_destroy();
		include $site_url.'views/inc/header.html';
		include $site_url.'views/question_1.html';
		include $site_url.'/views/inc/footer.html';
		break;
	case '/'.$sub_folder.'/api/load_question':
		$q_no = $_POST['question_no'];
		include $site_url.'api/question_1.php';
		break;
	case '/'.$sub_folder.'/api/question/save':
		include $site_url.'api/save_data.php';
		break;
	case '/'.$sub_folder.'/api/save/test':
		include $site_url.'api/save_test.php';
		break;

	case '/'.$sub_folder.'/admin':
		include $site_url.'views/inc/header.html';
		if(isset($_SESSION['username'])){
			include $site_url.'views/admin.html';
		}else{
			header('location:'.$base_url.'login');
			exit;
		}
		include $site_url.'views/inc/footer.html';
		break;

	case '/'.$sub_folder.'/login':
		include $site_url.'views/inc/header.html';
		include $site_url.'views/login.html';
		include $site_url.'views/inc/footer.html';
		break;
	case '/'.$sub_folder.'/api/check/login':
		unset($_SESSION['username']);
		if($_POST['username'] == 'admin' && $_POST['password'] == 'admin'){
			$data = ['code'=>200, 'msg'=>'success', 'href'=>$base_url.'admin'];
			$_SESSION['username'] = $_POST['username'];
		}else{
			$data = ['code'=>400, 'msg'=>'Invalid Credentials Provided'];
		}
		echo json_encode($data);
		break;

	case '/'.$sub_folder.'/api/test/show':
		$json = file_get_contents($site_url.'json/results.json');
		echo $json;
		break;

	case '/'.$sub_folder.'/animation':
		include $site_url.'views/inc/header.html';
		include $site_url.'views/dice_roll.html';
		include $site_url.'/views/inc/footer.html';
		break;


	
	default:
		echo "404 Page Not Found";
		break;
}