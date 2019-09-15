<?php
require_once 'dbconnect.php';

$subcategArray = array();
$sql="SELECT * FROM collections ORDER BY indexNumber;";
$stmt = $conn->prepare($sql);
$stmt->execute();

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  array_push($subcategArray, array("id" => $row["id"], "name" => $row["name"], "imgFolder" => $row["imgFolder"], "numOfImgs" => $row["numOfImgs"], "description" => $row["description"]));
}

echo json_encode($subcategArray);

?>