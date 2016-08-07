function clickButtonFunc(){
  $("#quote").animate({
        opacity: 0
          }, 200);
  $.ajax({
    type: "GET",
    url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
    success: function (json) {
      var html = "";
      var tweet = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=";
      json.forEach(function(val) {
        var keys = Object.keys(val);
        keys.forEach(function(key) {
          if(key =="content"){
            html += "<blockquote>" + val[key] + "</blockquote>";
            tweet += $(val[key]).text();
          }
        });
        keys.forEach(function(key) {
          if(key =="title"){
            html += "<cite>-" + val[key] + "</cite>";
            tweet += "-"+ val[key];
          }
        });
      });
      $("#quote").animate({
        opacity: 1
          }, 500);
      $("#quote").html(html);
      tweet = tweet.replace(/\s/g,"%20");
      $("a#tweet-quote").attr("href",tweet);
    },
    dataType: "json",
    cache: false
  });
}

$(document).ready(function() {
  clickButtonFunc(); 
  $(".centerButton").on("click",clickButtonFunc);
});