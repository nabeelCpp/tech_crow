<?php
$json = file_get_contents($site_url.'json/question_1.json');
$json = json_decode($json, true);
$questionRound = $json['data']['questionRound'];
$question_detail = $json['data']['question'][$q_no];
$total_questions = count($json['data']['question']);
$res['data'] = $question_detail;
$res['current'] = $q_no;
$res['next'] = ($q_no < $total_questions-1)?$q_no+1:$total_questions;
$res['total_questions'] = $total_questions;
$res['questionRound'] = $questionRound;
echo json_encode($res);