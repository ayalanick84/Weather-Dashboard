// get the value of the input field and assign to variable
//add searchTerm to the queryUrl 
// ASIDE SECTION 
// when user clicks on the search button
$("#searchButton").on("click", function () {
    var searchTerm = $("#searchInput").val().trim();
    console.log(searchTerm)
    var apiKey = "4a9b28f76f4e0ba5b49ee1686de35d1c";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid=" + apiKey;
    // use ajax call to retrieve data from weather API with users input

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $(".card-body").empty();


        var todayCard = $("<div>").attr("class", "card-body");
        console.log(response)
        var cityName = response.city.name;
        var nameDisplay = $("<h2>").text(cityName).attr("float","left");
        var currentDay = moment().format("(" + "MM/DD/YYYY" + ")");
        var dayDisplay = $("<h2>").text(currentDay).attr("float","left")

        var iconID = response.list["0"].weather["0"].icon;
        var iconURL = "https://openweathermap.org/img/wn/" + iconID + "@2x.png";
        var iconImg = $("<img>").attr("src", iconURL).attr("float","left");

        $(todayCard).append(nameDisplay)
        $(todayCard).append(dayDisplay)
        $(todayCard).append(iconImg)

        var cityTemp = Math.round((response.list["0"].main.temp * 9 / 5) - 459.67);
        var tempDisplay = $("<p>").text("Temperature: " + cityTemp + "°F");
        todayCard.append(tempDisplay);

        var cityHumid = response.list["0"].main.humidity;
        var humidDisplay = $("<p>").text("Humidity: " + cityHumid + "%");
        todayCard.append(humidDisplay);

        var cityWind = response.list["0"].wind.speed;
        var windDisplay = $("<p>").text("Wind Speed: " + cityWind + "MPH");
        todayCard.append(windDisplay);

        var cityLat = response.city.coord.lat
        var cityLong = response.city.coord.lon
        var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + cityLat + "&lon=" + cityLong
        $.ajax({
            url: uvUrl,
            method: "GET"
        }).then(function (uvResponse) {
            var uvIndex = uvResponse.value
            if (uvIndex > 8) {
                var uvDisplay = $("<button>").text("UV Index:" + uvIndex).attr("class","btn-danger disabled")
            }
            else if (uvIndex <8 && uvIndex>4){
                var uvDisplay = $("<button>").text("UV Index:" + uvIndex).attr("class","btn-warning disabled")
            }else {
                var uvDisplay = $("<button>").text("UV Index:" + uvIndex).attr("class","btn-success disabled")

            }


            
            
            
            todayCard.append(uvDisplay)
            $(".card").append(todayCard);
        });
    })
    var tomorrowDate = moment().add(1, 'day').calendar("MM, DD, YYYY")
    console.log(tomorrowDate)



});







// when user clicks on the search button http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
// get the value of the input field and assign to var searchHistory

    // input searchHistory and add it to the queryUrl (look at bands activity in unit 6)
    // use ajax call to retrieve data from weather API from users input
    // create var for the response if need be (ex. response.data/ response.docs)
    // create response var for currenttemperature, currenthumidity, wind speed, UV index, currentDate, currentweathercasticon
    //create 1 bootstrap card that loops through the 5 day forecast (bands activity 11 unit 6)
        // create a container
        // create div with card class and class that changes background color to blue
            // create h1 with date and append to the div
            // create h2 with temp and append to the div
            // create h3 with humidity and append to the div
    // search history list
        // jQuery listen to document activity
        // document.addeventListener("click", INSERT CITY NAME, INSERT FUNCTION NAME)