<?php
$data = json_decode(file_get_contents('php://input'), true);
file_put_contents('../state.json', json_encode($data));
echo json_encode(["success" => true]);