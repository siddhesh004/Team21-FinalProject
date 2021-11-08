<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT game.field_name, game.game_time, assignment.status, assignment.referee_id, assignment.a_id FROM game INNER JOIN assignment

  ON game.game_id = assignment.game_id

  WHERE  assignment.status = "Unassigned" ';
$vars = [];
$stmt = $db->prepare($sql);
$stmt->execute($vars);

$games = $stmt->fetchAll();

if (isset($_GET['format']) && $_GET['format'] == 'csv' ) {

    header('Content-Type: text/csv');

    echo "AssignmentID, Field Name, Referee ID, Game Date,\"Status\"\r\n";



    foreach($games as $u) {

        echo $u['a_id'] . "," .$u['field_name'].','.$u['referee_id']. "," .$u['game_time']. "," .$u['status']."\r\n";

    }



} else {



  // Step 3: Convert to JSON
  $json = json_encode($games, JSON_PRETTY_PRINT);

  // Step 4: Output
  header('Content-Type: application/json');
  echo $json;

}
