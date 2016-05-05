$(function(){

  var post_tile = "snippets/post-tile.html";
  var about = "snippets/about.html";
  var useful_stuff = "snippets/useful_stuff.html";
  var posts_json = "snippets/posts.json";

function changeSapia(image,procent){
  image.css("-webkit-filter", 'sepia('+procent+'%)');
}



function loadTiles(type){
    var isOfAType = function(post){return post.type==type;}  
    $.getJSON(posts_json, function(posts){
      if(type!='all')posts = posts.filter(isOfAType);
      $('#main-content').empty();
      for (var i = posts.length - 1; i >= 0; i--) {
            
            $('#main-content').append('<div id='+posts[i].id+' class="tile col-md-4 col-sm-6 col-xs-12"><img src=images/'
              +posts[i].id+'.jpg><span class="title">'+posts[i].title+'</span><br><span class="date">'
              +posts[i].date+'</span></div>');
            }
      for (var i = posts.length - 1; i >= 0; i--) {
        $('#'+posts[i].id+' > img').mouseenter(function(){
          $(this).addClass("nosepia");
          });
        $('#'+posts[i].id+' > img').mouseleave(function(){
          $(this).removeClass("nosepia");
          });

        $('#'+posts[i].id).click(function(){
          //$(this).animate({height: '150px',  width: '150px'});
          var html = "posts/"+this.id+".html";
          $('#main-content').load(html);
        });
      }
  });
  }




  $('.navbar-brand').click(function(){loadTiles("all")});
  $('#foods').click(function(){loadTiles("food")});
  $('#places').click(function(){loadTiles("place")});
  loadTiles("all")
  

/*
  $.getJSON(posts_json, function(posts){
      posts.filter(isOfAType)
      $.get(post_tile, function(tile){
          console.log(tile);
          for (var i = posts.length - 1; i >= 0; i--) {
            
            console.log(posts[i]);
            
            //console.log(tile.getElementById('.tile'));
            $('#main-content').append('tile');
            $('tile')
            //var part = insertProperty(tile, "title", posts[i].title);
            //part = insertProperty(part, "image", posts[i].image);
            //part = insertProperty(part, "date", posts[i].date);
            //html += part;
            //$('#main-content').append(part);
          }
      });
  });

  function posts(){
    for (var i = posts_json.length - 1; i >= 0; i--) {
      console.log(posts_json[i]);
      var part = post_tile(post_tile, "title", posts[i].title);
      part = insertProperty(part, "image", posts[i].image);
      part = insertProperty(part, "date", posts[i].date);
      html += part;
      $('#main-content').append(html);
    }}

    posts();
*/

  $('#about').click(function(){
    $('#main-content').load(about);
  });

  $('#useful').click(function(){
    $('#main-content').load(useful_stuff);
  });
});