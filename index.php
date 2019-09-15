<?php

 ob_start();

?>

<!doctype html>

<html lang="en">
<head>
  
  <title>Sipeki Lili</title>

  <meta charset="utf-8">
  <meta name="description" content="Sipeki Lili">
  <meta name="author" content="DavidSipeki">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link href="sipekilili.com/css/reset.css" type="text/css" rel="stylesheet">
  <link href="sipekilili.com/css/style.css" type="text/css" rel="stylesheet">
  <link rel="icon" type="image/png" href="sipekilili.com/media/etc/logo_small.png"/>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script type="text/javascript" src="sipekilili.com/js/main.js"></script>
  
</head>



<body>

  <div id="main">
      
    <?php require_once 'sipekilili.com/php/header.php'; ?>
      
    <div id="home"></div>
    
    <?php require_once 'sipekilili.com/php/about.php'; ?>
    
    <hr>

    <?php require_once 'sipekilili.com/php/projects.php'; ?>
 
    <?php require_once 'sipekilili.com/php/collection.php'; ?>
      
    <hr>

    <?php require_once 'sipekilili.com/php/contact.php'; ?>
    
  </div>
</body>
</html>

<?php ob_end_flush(); ?>