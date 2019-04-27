// Create variable to store API Key
var apiKey = "lemIAcyH7dnOHVveWFdqrbpb7Wu2ApWf";

// Create variables to hold search variables and the returned article cout
var searchTerm = "";
var numRecords = 0;
var startYear = 0;
var endYear = 0;
var articleCounter = 0;

// Send Search Term to NY Times
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  apiKey + "&q=";

function runQuery(numArticles, queryURL) {

$.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(NYTData) {

    // ConsoleLOG URL
    console.log("------------------------------------");
    console.log("URL: " + queryURL);
    console.log("------------------------------------");

    // ConsoleLOG NYT Data
    console.log(NYTData);
    console.log("------------------------------------");

    // Loop to create correct number of articles
    for (var i = 0; i < numArticles; i++) {

      // Add to counter for each loop
      articleCounter++;

      // Create section variable and add article data
      var topArticles = $("<div>");
      wellSection.addClass("well");
      wellSection.attr("id", "article-well-" + articleCounter);
      $("#topArticles").append(topArticles);

      // Confirm article has all details and grabs headline if it has one
      if (NYTData.response.docs[i].headline !== "null") {
        $("#article-well-" + articleCounter)
          .append(
            "<h3 class='articleHeadline'><span class='label label-primary'>" +
            articleCounter + "</span><strong> " +
            NYTData.response.docs[i].headline.main + "</strong></h3>"
          );

        // ConsoleLOG Headline of first article
        console.log(NYTData.response.docs[i].headline.main);
      }

      // If the article has a byline include the headline in the HTML
      if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
        $("#article-well-" + articleCounter)
          .append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");

        // ConsoleLOG Author of first article
        console.log(NYTData.response.docs[i].byline.original);
      }

      // Grab Fields: Section Name, Date, URL
      $("#articleWell-" + articleCounter)
        .append("<h5>Section: " + NYTData.response.docs[i].section_name + "</h5>");
      $("#articleWell-" + articleCounter)
        .append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
      $("#articleWell-" + articleCounter)
        .append(
          "<a href='" + NYTData.response.docs[i].web_url + "'>" +
          NYTData.response.docs[i].web_url + "</a>"
        );

      // ConsoleLOG Published Date, Section Name and Web URL of first article
      console.log(NYTData.response.docs[i].pub_date);
      console.log(NYTData.response.docs[i].section_name);
      console.log(NYTData.response.docs[i].web_url);
    }
  });

}

// Add event for clicking on search button
$("#btnSearch").on("click", function(event) {
  // Add to use submit or ENTER
  event.preventDefault();

  // Clear article counter
  articleCounter = 0;

  // Clear top articles
  $("#topArticles").empty();

  // Grab text input for search
  searchTerm = $("#searchTerm").val().trim();
  var queryURL = queryURLBase + searchTerm;

  // Grab number unput for records to return
  numRecords = $("#numRecords").val();

  // Grab number Start Year
  startYear = $("#startYear").val().trim();

  // Grab number End Year
  endYear = $("#endYear").val().trim();

  // Add Start Year to query if it has a value
  if (parseInt(startYear)) {
    queryURL = queryURL + "&begin_date=" + startYear + "0101";
  }

  // Add End Year to query if it has a value
  if (parseInt(endYear)) {
    queryURL = queryURL + "&end_date=" + endYear + "0101";
  }

  // Add Number of Records to query and run
  runQuery(numRecords, queryURL);
});

// Clears the top articles
$("#btnClear").on("click", function() {
  articleCounter = 0;
  $("#topArticles").empty();
});
