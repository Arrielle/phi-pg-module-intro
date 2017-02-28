console.log('sourced!');
$(document).ready(function(){
  console.log('jquery was correctly sourced!');
  getBookData();
  function getBookData() {
    $.ajax({
      type: 'GET',
      url: '/books',
      success: function(response) {
        console.log('response', response);
        $('#bookShelf').empty();
        for (var i = 0; i < response.length; i++) {
          $('#bookShelf').append('<li>Title: ' + response[i].title + ', Author: ' + response[i].author + ', Edition: ' + response[i].edition + ', Publisher: ' + response[i].publisher + '</li>');
        }
      }
    });
  }

  $('#newBookButton').on('click', function(){
    var newBookObject = {};
    newBookObject.title = $('#newBookTitle').val();
    newBookObject.author = $('#newBookAuthor').val();
    newBookObject.edition = $('#newBookEdition').val();
    newBookObject.publisher = $('#newBookPublisher').val();
    $.ajax({
      type: 'POST',
      url: '/books/new',
      data: newBookObject,
      success: function(response){
        console.log(response);
        getBookData();
      }
    });
  });
});
