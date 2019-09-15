<?php
  require_once 'dbconnect.php';

  $collectionQuery = "SELECT indexNumber FROM collections ORDER BY indexNumber";
  $collection = $conn->query($collectionQuery);
  $collectionArray = array();
  
  while($row = $collection->fetch()) {
    array_push($collectionArray, array("index" => $row["indexNumber"]));
  }
?>

<div id="projects">
  <div class="wrapper">
    <div class="title">Projects</div>
    
    <div class="left arrow"><img src="sipekilili.com/media/etc/arrow_left.png"></div>
    <div id="selector" data-position="0" data-size="4">
      <div class="container">
        <?php
          foreach ($collectionArray as $collection) {
            echo ('<div class="card" data-index="'.$collection["index"].'"><div class="picture"></div><div class="name"></div></div>');
          }
        ?>
      </div>
    </div>
    <div class="right arrow"><img src="sipekilili.com/media/etc/arrow_right.png"></div>

    <div id="pageIndicator">
      <?php
        foreach ($collectionArray as $collection) {
          echo ('<div class="dot" data-index="'.$collection["index"].'"></div>');
        }
      ?>
    </div>
  </div>
</div>
