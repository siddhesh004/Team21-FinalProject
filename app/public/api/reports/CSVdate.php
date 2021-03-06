<?php

// if (($_SERVER['REQUEST_METHOD'] ?? '') != 'POST') {
//     header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed");
//     exit;
// }

try {
    $_POST = json_decode(
                file_get_contents('php://input'),
                true,
                2,
                JSON_THROW_ON_ERROR
            );
} catch (Exception $e) {
    header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
    // print_r($_POST);
    // echo file_get_contents('php://input');
    exit;
}

require("class/DbConnection.php");

// Step 0: Validate the incoming data
// This code doesn't do that, but should ...
// For example, if the date is empty or bad, this insert fails.

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
// Note the use of parameterized statements to avoid injection
$stmt = $db->prepare(
  'SELECT game.field_name, game.game_time, assignment.status, assignment.referee_id, assignment.a_id FROM game INNER JOIN assignment

    ON game.game_id = assignment.game_id

    where assignment.referee_id = ?  AND game.game_time>? AND game.game_time<? ;'
);

$stmt->execute([
    $_POST['referee_id'],
    $_POST['start_date'],
    $_POST['end_date']
]);

$dategames = $stmt->fetchAll();
header('Content-Type: text/csv');

echo "Assignment ID, Field Name, Referee ID, Game Date,\"Status\"\r\n";



foreach($dategames as $u) {

    echo $u['a_id'] . "," .$u['field_name'].','.$u['referee_id']. "," .$u['game_time']. "," .$u['status']."\r\n";
}
