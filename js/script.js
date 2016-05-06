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
            
            $('#main-content').append('<div class="col-md-4 col-sm-6 col-xs-12"><div id='+posts[i].id+' class="tile"><img src=images/'
              +posts[i].id+'.jpg><span class="date-tile">'
              +posts[i].date+'</span><span class="title-tile">'+posts[i].title+'</span></div></div>');
            }//href="posts/'+posts[i].id+'.html"
      for (var i = posts.length - 1; i >= 0; i--) {
        $('#'+posts[i].id).hover(function(){
          $(this).addClass("nosepia");
          $('span',this).animate({opacity: 0, 'boxShadowX': '10px',
    'boxShadowY':'10px',
    'boxShadowBlur': '20px'});
          },function(){
          $(this).removeClass("nosepia");
          $('span',this).animate({opacity: 1, 'boxShadowX': '0px',
    'boxShadowY':'0px',
    'boxShadowBlur': '0px'});
          });


        $('#'+posts[i].id).click(function(){
          //$(this).animate({height: '550px',right:"100px",  width: '150px'});
          var html = "posts/"+this.id+".html";
          $('#main-content').load(html);
        });
      }
  });
  }

  function move(start, finish, speed){
    var x = finish.position().top- start.position().top;
    var y = finish.position().left- start.position().left;
    var w = finish.width() - start.width();
    var h = finish.width() - start.width();
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