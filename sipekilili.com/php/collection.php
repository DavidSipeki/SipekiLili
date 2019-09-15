<?php
  require_once 'dbconnect.php';

  $collectionQuery = "SELECT id, name, indexNumber, numOfImgs FROM collections ORDER BY indexNumber";
  $collection = $conn->query($collectionQuery);
  $collectionArray = array();
  while($row = $collection->fetch()) {
    array_push($collectionArray, array("id" => $row["id"], "name" => $row["name"], "indexNumber" => $row["indexNumber"], "numOfImgs" => $row["numOfImgs"]));
  }
  
  $mainCollectionQuery = "SELECT name, description FROM collections WHERE indexNumber = 0";
  $mainCollection = $conn->query($mainCollectionQuery);
  $mainCollectionArray = array();
  while($row = $mainCollection->fetch()) {
    array_push($mainCollectionArray, array("name" => $row["name"], "description" => $row["description"]));
  }
  
?>

<div id="collection">
  <div class="wrapper">
    <?php echo('<div class="title">'.$mainCollectionArray[0]["name"].'</div>'); ?>
    
    <div id="gallery">
      <?php
        foreach ($collectionArray as $collection) {
          $numOfImgs = $collection["numOfImgs"] + 5;
          echo ('<div id="'.$collection["id"].'" class="container" data-index="'.$collection["indexNumber"].'">');
          for ($i = 0; $i < $numOfImgs; $i++) {
            echo('<div class="card"><div class="picture"></div></div>');
          }
          echo ('</div>');
        }
      ?>
    </div>
    
    <?php echo('<div id="description"><p>'.$mainCollectionArray[0]["description"].'</p></div>'); ?>
  </div>
</div>