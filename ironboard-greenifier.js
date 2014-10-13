// ==UserScript==
// @name       Ironboard Greenifier
// @author     molgin
// @namespace  http://github.com/molgin
// @version    0.1
// @description  Greenifies your stubbornly grey labs
// @match      http://learn.flatironschool.com/learn/ruby-006/web-development/labs
// @copyright  2014+, molgin
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// (function ($) {
//    $(document);
// }(jQuery));

// the guts of this userscript
function main() {
  // Note, jQ replaces $ to avoid conflicts.
  // alert("There are " + jQ('tbody.assignment-table-body tr').length + " labs on this page.");
  var labs = jQ('tbody.assignment-table-body tr');
  // console.log(labs);
    
  // List the exact names of your broken userscripts here
  var brokenLabs = ["Playlister Cli", "Code Coverage", "Find Missing Pet", "Cartoon Collections", "Oo Basics", "Oo Counting Sentences", "Scraping Kickstarter", "Email Guesser", "Spotify Api Todo", "Artist Song Modules"];

  for (var i = 0; i < labs.length; i++) {
    var $lab = jQ(labs[i]);
    var labName = $lab.find("span.lab-index-lab-title").text();
    if (jQ.inArray(labName, brokenLabs) != -1) {
      var progressBar = $lab.find("div.progress-bar");
      for (var j = 0; j < progressBar.length; j++) {
        var $bar = jQ(progressBar[j]);
        if($bar.hasClass("progress-bar-fis-gray")){
          $bar.removeClass("progress-bar-fis-gray")
          $bar.addClass("progress-bar-success");
        };
      };
      $check = jQ($lab.find("i.fa-ban"));
      if ($check.hasClass("fa-ban")) {
        $check.removeClass("fa-ban")
        $check.addClass("fa-check")
      };
    };
  };
}

// load jQuery and execute the main function
addJQuery(main);