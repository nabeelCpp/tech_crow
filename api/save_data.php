<?php
if(isset($_POST)){
	$_SESSION['questions'][] = $_POST;
	echo json_encode(['code'=>200, 'msg'=>'save success!']);
}else{
	echo json_encode(['code'=>400, 'msg'=>'save failed!']);
}