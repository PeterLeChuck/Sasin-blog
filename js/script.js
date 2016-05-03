/*
Tole je, da se meni skrije!
$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});
*/

(function (global) {

var dc = {};//????

var homeHtmlUrl = "snippets/home-snippet.html";
var postTile = "snippets/post-tile.html";
var aboutSnippet = "snippets/about.html";
var usefulStuffSnippet = "snippets/useful_stuff.html";
var allPosts = "snippets/posts.json";

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Return substitute of '{{propName}}' 
// with propValue in given 'string' 
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}


// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {
  // On first load, show home view
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    allPosts, 
    buildAndShowAllPosts, 
    true); // Explicitely setting the flag to get JSON from server processed into an object literal
});

function buildAndShowAllPosts(posts){//,type
  // Load home snippet page
  $ajaxUtils.sendGetRequest(
    homeHtmlUrl,
    function (homeHtml) {
      $ajaxUtils.sendGetRequest(
        postTile,
        function (postTile) {
          var html="";
          posts.filter(isOfAType);
          for (var i = posts.length - 1; i >= 0; i--) {
            //console.log(posts[i]);
            var part = insertProperty(postTile, "title", posts[i].title);
            part = insertProperty(part, "image", posts[i].image);
            part = insertProperty(part, "date", posts[i].date);
            html+=part;
            insertHtml("#main-content", html);
          }},false);
    },
    false);
}

function isOfAType(post, type){
  return post.type===type;
}


  $('.tile .col-md-4 .col-sm-6 .col-xs-12').click(function() {
    alert("Hello!");
    console.log(this);
  });

dc.filterProperty = function () {
  showLoading("#main-content");
  console.log(this);
};

dc.loadAbout = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    aboutSnippet,
    function(snippet){
      insertHtml("#main-content", snippet);
    },
    false)
};

dc.loadUsefulStuff = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    usefulStuffSnippet,
    function(snippet){
      insertHtml("#main-content", snippet);
    },
    false);
};


$(document).ready(function() {
  $('.tile').click(function() {
    alert("Hello!");
    console.log(this);
  });
});

global.$dc = dc;

})(window);