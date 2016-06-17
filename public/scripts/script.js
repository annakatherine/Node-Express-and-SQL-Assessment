
$(document).ready(function(){

  // event listener for add button
  $('#addBtn').on('click', function(){
    // get new animal from input
    var animalType = $('#animalIn').val();
    var animalCount = randomNumber(1,100);
    // create new object to post
    var animalToSend = {
      "type": animalType,
      "count": animalCount
    }; // end object animalToSend
    // send object to server as a post
    $.ajax({
      type: 'post',
      url: '/addAnimal',
      data: animalToSend
    }); // end ajax
    location.reload();
  }); // end addBtn

  // receive data of all animals from db
  $.ajax({
    type: 'GET',
    url: '/getAnimals',
    success: function(data){
    showAnimals(data);
    } // end success
  }); //end ajax

  // display all animals in dom when app loads
  function showAnimals(animals){
    for(i=0; i<animals.length; i++){
      var animalRow = '<td>' + animals[i].id + '</td>' + '<td>' + animals[i].type + '</td>' + '<td>' + animals[i].count + '</td>';
      document.getElementById('displayAnimals').innerHTML += '<tr>' + animalRow + '<tr>';
    } // end for loop
  } // end showAnimals
}); // end jquery

function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}
