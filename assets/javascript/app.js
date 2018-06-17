//key api_key=TwlppnQpOq7ftDo9xld5ozv0AIThDwbc
    
//Variable to hold the strings array of topics
var topics = ["mario", "donkey kong", "yoshi", "samus", "bowser", "zelda"];

    
function doItAll(){
  
  render();
  getGifs();
        
    function getGifs(){
      
      $(".category-btn").on("click", function() {
        
        var gifs = $(this).attr("category-name");
          
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifs + "&api_key=TwlppnQpOq7ftDo9xld5ozv0AIThDwbc&limit=10";
      
        console.log(queryURL);
        
        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          
          console.log(response);

          var results = response.data
        
          for (var i = 0; i < results.length; i++) {
    
            //Make a div with jQuery and store it in a variable named animalDiv.
            var gifsDiv = $("<div style='float:left;'>");
            //Set the inner text of the paragraph to the rating of the image in results[i].
            var p = $("<p>").text("Rating: " + results[i].rating )
            //Make an image tag with jQuery and store it in a variable named animalImage.
            var gifsImage = $("<img>")
             // Adding a class of movie-btn to our button
            gifsImage.addClass("image-animate");
            //Set the image's src to results[i]'s fixed_height.url.
            gifsImage.attr("src", results[i].images.fixed_height_still.url)
            gifsImage.attr('data-animate', results[i].images.fixed_height.url)
            gifsImage.attr('data-still', results[i].images.fixed_height_still.url)
            .attr('data-state', 'still');
          
           //Append the p to the gifsDiv.
            gifsDiv.append(p);
            //Append the gifs images to the gifsDiv
            gifsDiv.append(gifsImage);
            //Append the gifs gifsalot div.
            $("#gifsalot").prepend(gifsDiv);

          }

          $('.image-animate').on('click', function() {

            var state = $(this).attr('data-state'); 
            
            console.log(this);

            if (state == 'animate') {

            $(this).attr('src', $(this).data('still'));

            $(this).attr('data-state', 'stil');

          } 
      
          else {

            $(this).attr('src', $(this).data('animate'));

            $(this).attr('data-state', 'animate');
          
          }

        });

      });

    });

}


  //Function that displays the buttons for the categories
  function render() {

    //Gets rid of the buttons already displayed to prevent doubles
    $("#buttons-display").empty();

    // Loop to create a new button for every category in the topics array
    for (var i = 0; i < topics.length; i++) {

          //Adds buttons dynamically
          var category = $("<button>");
          // Adding a class of movie-btn to our button
          category.addClass("category-btn");
          // Adding a data-attribute
          category.attr("category-name", topics[i]);
          // Providing the initial button text
          category.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-display").append(category);
      }
      
  }

  // Click function to add a new button category
  $("#add").click(function() {
  
    //Gets the text from the input field
    var topic = $("#new-topic").val().trim();

    //Pushes the new category into the array
    topics.push(topic);
      render();
      getGifs();
    });

  }
    
     
  
