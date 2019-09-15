var resolution;
var collections = [];

$( document ).ready(function() {
    
    
  initResolution();
  
  // Update the selector when device orientation changes
  $(window).on('orientationchange', function() {
    $(window).one('resize', function() {
        initSelector();
    });
  });
  
  // Cache collection info
  $.ajax({
    url:"http://sipekilili.com/sipekilili.com/php/getCollections.php",
    type:"GET",
    dataType:"json",
    success:function(collectionList){
      for(var i=0; i < collectionList.length; i++){
        var collectionMap = new Map();
        collectionMap.set('id', collectionList[i].id);
        collectionMap.set('name', collectionList[i].name);
        collectionMap.set('imgFolder', collectionList[i].imgFolder);
        collectionMap.set('numOfImgs', collectionList[i].numOfImgs);
        collectionMap.set('description', collectionList[i].description);
        collections.push(collectionMap);
      }
      initSelector();
      initGallery();
    }
  });
  
  

  // Navigation scroll functions
  $('#homeNav > p > span').click(function(){
    document.querySelector('#home').scrollIntoView({ 
      behavior: 'smooth' 
    });
  });

  $('#aboutNav > p > span').click(function(){
    document.querySelector('#about > .wrapper').scrollIntoView({ 
      behavior: 'smooth'
    });
  });

  $('#projectsNav > p > span').click(function(){
    document.querySelector('#projects > .wrapper').scrollIntoView({ 
      behavior: 'smooth' 
    });
  });

  $('#contactNav > p >span').click(function(){
    document.querySelector('#contact > .wrapper').scrollIntoView({ 
      behavior: 'smooth' 
    });
  });



  // Selector on-click handler
  $('#selector > .container > .card').click(function() {
      
    setGallery($(this).attr('data-index'));
      
    // Scroll gallery into view  
    document.querySelector('#collection > .wrapper > .title').scrollIntoView({ 
      behavior: 'smooth' 
    });
  });
    
    

  // Selector movement handler
  $('#projects > .wrapper > .left.arrow').click(function() {
    leftShiftSelector();
  });
  $('#projects > .wrapper > .right.arrow').click(function() {
    rightShiftSelector();
  });

});



// Used to load pictures based on screen resolution
function initResolution() {
  if (window.innerHeight > 1080) {
    resolution = "high";
  }
  else if (window.innerHeight > 720) {
    resolution = "medium";
  }
  else {
    resolution = "low";
  }
}



function initSelector() {
    
  setSelectorSize();
  
  // Reset selector values
  $('#selector > .container').css('left', '0');
  $('#selector').attr('data-position', '0');
  var index = 0;
  // Set each card
  $('#selector > .container > .card').each(function() {
    var url = 'url(sipekilili.com/media/' + collections[index].get('imgFolder') + '/' + resolution + '/0.jpg';
    $(this).children('.picture').css('background-image', url);
    $(this).children('.name').text(collections[index].get('name'));
    index++;
  });
  
  setPageIndicator();
  
}



function setSelectorSize() {
  var orientation = screen.msOrientation || screen.mozOrientation || (screen.orientation || {}).type;
  
  // The selector only shows 1 card at a time on mobile/tablet portrait
  if (window.innerWidth <= 1024 && (orientation === "portrait-secondary" || orientation === "portrait-primary")) {
    $('#selector').attr('data-size', '1');
  }
  // Selector shows 4 cards
  else {
    $('#selector').attr('data-size', '4');
  }  
}



function setPageIndicator() {
  // Reset page indicator
  $('#pageIndicator > .dot').removeClass('active');
  $('#pageIndicator > .dot').css('display', 'inline-block');
  $('#pageIndicator > .dot[data-index=0]').addClass('active');
  // Show the right number of dots
  for (var i = (collections.length - $('#selector').attr('data-size') + 1); i < collections.length; i++) {
    $('#pageIndicator > .dot[data-index=' + i + ']').css('display', 'none');
  }    
}



function initGallery() {
  for (var i = 0; i < collections.length; i++) {
    for (var j = 0; j < collections[i].get('numOfImgs'); j++) {
      $('#' + collections[i].get("id") + '> .card:nth-child(' + (j+1) + ') > .picture')
        .css('background-image', 'url("sipekilili.com/media/' + collections[i].get("imgFolder") + '/' + resolution + '/' + j + '.jpg")');
    }
    for (var j = 0; j < 5; j++) {
      $('#' + collections[i].get("id") + '> .card:nth-child(' + (collections[i].get('numOfImgs') + j + 1) + ') > .picture').
        css('background-image', 'url("sipekilili.com/media/' + collections[i].get("imgFolder") + '/' + resolution + '/' + j + '.jpg")');
    }
  }
}



function setGallery(index) {

  // hide all galleries
  $('#gallery > .container').css('display', 'none');
    
  // update title and description
  $('#collection > .wrapper > .title').text(collections[index].get('name'));
  $('#description > p').text(collections[index].get('description'));
    
  // show selected gallery
  $('#gallery > .container[data-index=' + index + ']').css('display', 'inline-flex');    
}



function leftShiftSelector() {
  var position = $('#selector').attr('data-position');
  // The full width of a card
  var shiftAmount = parseInt($('#selector > .container > .card').css('width')) + 2 * parseInt($('#selector > .container > .card').css('margin-left'));
  // If we can slide left
  if (position > 0) {
    position--;
    $('#selector').attr('data-position', position);
    var shift = (-1) * position * shiftAmount;
    shift = shift + "px";
    $('#selector > .container').css('left', shift);
    $('.dot').removeClass('active');
    $('.dot').each(function(){
      if ($(this).attr('data-index') == position) {
        $(this).addClass('active');
      }
    });
  }
  // If we are at the edge, do a jerk animation
  else {
    $('#selector > .container').css('left', '20px');
    setTimeout(function() {
        $('#selector > .container').css('left', '0');
    }, 300);
  }
  // when only 1 card is visible, automatically update gallery instead of waiting for a click
  if ($('#selector').attr('data-size') == 1) {
      setGallery($('#selector').attr('data-position'));
  }
}

function rightShiftSelector() {
  var position = $('#selector').attr('data-position');
  // The full width of a card
  var shiftAmount = parseInt($('#selector > .container > .card').css('width')) + 2 * parseInt($('#selector > .container > .card').css('margin-left'));
  // If we can slide right
  if (position < collections.length - parseInt($('#selector').attr('data-size'))){
    position++;
    $('#selector').attr('data-position', position);
    var shift = (-1) * position * shiftAmount;
    shift = shift + "px";
    $('#selector > .container').css('left', shift);
    $('.dot').removeClass('active');
    $('.dot').each(function(){
      if ($(this).attr('data-index') == position) {
        $(this).addClass('active');
      }
    });
  }
  // If we are at the edge, do a jerk animation
  else {
    var backShift = (-1) * position * shiftAmount;
    var shift = backShift - 20;
    shift = shift + "px";
    backShift = backShift + "px";
    $('#selector > .container').css('left', shift);
    setTimeout(function() {
        $('#selector > .container').css('left',backShift);
    }, 300);
  }
  // when only 1 card is visible, automatically update gallery instead of waiting for a click
  if ($('#selector').attr('data-size') == 1) {
    setGallery($('#selector').attr('data-position'));
  }
}