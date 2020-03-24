var searchHistory = JSON.parse(localStorage.getItem("search-history"));
if (searchHistory === null) {
    searchHistory = []
}
renderSearchHistory();
function renderSearchHistory() {
    $("#search-history").empty();
    for (var i = 0; i < searchHistory.length; i++) {
        var button = $("<button type='button' class='btn btn-primary btn-large'>").text(searchHistory[i]);
        $("#search-history").append(button);
    }
}
$(button).on("click",function(){

})


$("#searchButton").on("click", function () {
    var searchTerm = $("#searchInput").val().trim();
    if (searchTerm ==="" ){
        alert("Please enter a city")
    }
    else {
        
        
        searchHistory.unshift(searchTerm);
        while (searchHistory.length > 10) {
            searchHistory.pop();
        }
        localStorage.setItem("search-history", JSON.stringify(searchHistory));
        console.log(searchHistory)
        renderSearchHistory();
    
        
    // use ajax call to retrieve data from weather API with users input
    // function displayWeatherInfo() {
        
        var apiKey = "4a9b28f76f4e0ba5b49ee1686de35d1c";
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid=" + apiKey;
        $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $(".card").empty();
        
        
        var todayHeader = $("<div>").attr("class", "card-header")
        var cityName = response.city.name;
        var nameDisplay = $("<h2>").text(cityName);
        var currentDay = moment().format("(" + "MM/DD/YYYY" + ")");
        var dayDisplay = $("<h2>").text(currentDay)
        
        var iconID = response.list["0"].weather["0"].icon;
        var iconURL = "https://openweathermap.org/img/wn/" + iconID + "@2x.png";
        var iconImg = $("<img>").attr("src", iconURL);

        $(todayHeader).append(nameDisplay)
        $(todayHeader).append(dayDisplay)
        $(todayHeader).append(iconImg)
        $("#todaysWeather").append(todayHeader)
        
        var todayCard = $("<div>").attr("class", "card-body");
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
        var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + cityLat + "&lon=" + cityLong
        $.ajax({
            url: uvUrl,
            method: "GET"
        }).then(function (uvResponse) {
            var uvIndex = uvResponse.value
            if (uvIndex > 8) {
                var uvDisplay = $("<button>").text("UV Index:" + uvIndex).attr("class", "btn-danger disabled")
            }
            else if (uvIndex < 8 && uvIndex > 4) {
                var uvDisplay = $("<button>").text("UV Index:" + uvIndex).attr("class", "btn-warning disabled")
            } else {
                var uvDisplay = $("<button>").text("UV Index:" + uvIndex).attr("class", "btn-success disabled")
                
            }
            todayCard.append(uvDisplay)
            $("#todaysWeather").append(todayCard);
            
            $("#forecastHeader").text("5 Day Forecast:")
            
            var day1Card = $("<div>").attr("class", "card text-white bg-primary mb-3")
            var todayPlus1 = moment().add(1, 'day').calendar("MM, DD, YYYY")
            var date1Display = $("<h5>").text(todayPlus1)
            day1Card.append(date1Display)
            var day1IconID = response.list[3].weather["0"].icon
            
            var day1iconURL = "https://openweathermap.org/img/wn/" + day1IconID + "@2x.png";
            var date1Img = $("<img>").attr("src", day1iconURL)
            day1Card.append(date1Img)
            var date1temp = Math.round((response.list["3"].main.temp * 9 / 5) - 459.67);
            var tempDisplay1 = $("<p>").text("Temp: " + date1temp + "°F")
            day1Card.append(tempDisplay1)
            var date1Humid = response.list[3].main.humidity
            var humidDisplay1 = $("<p>").text("Humidity: " + date1Humid + "%")
            day1Card.append(humidDisplay1)
            $("#day-1").append(day1Card)
            
            
            var day2Card = $("<div>").attr("class", "card text-white bg-primary mb-3")
            var todayPlus2 = moment().add(2, 'day').calendar("MM, DD, YYYY")
            var date2Display = $("<h5>").text(todayPlus2)
            day2Card.append(date2Display)
            var day2IconID = response.list[10].weather["0"].icon
            
            var day2iconURL = "https://openweathermap.org/img/wn/" + day2IconID + "@2x.png";
            var date2Img = $("<img>").attr("src", day2iconURL)
            day2Card.append(date2Img)
            var date2temp = Math.round((response.list["3"].main.temp * 9 / 5) - 459.67);
            var tempDisplay2 = $("<p>").text("Temp: " + date2temp + "°F")
            day2Card.append(tempDisplay2)
            var date2Humid = response.list[10].main.humidity
            var humidDisplay2 = $("<p>").text("Humidity: " + date2Humid + "%")
            day2Card.append(humidDisplay2)
            $("#day-2").append(day2Card)
            
            
            var day3Card = $("<div>").attr("class", "card text-white bg-primary mb-3")
            var todayPlus3 = moment().add(3, 'day').calendar("MM, DD, YYYY")
            var date3Display = $("<h5>").text(todayPlus3)
            day3Card.append(date3Display)
            var day3IconID = response.list[18].weather["0"].icon
            var day3iconURL = "https://openweathermap.org/img/wn/" + day3IconID + "@2x.png";
            var date3Img = $("<img>").attr("src", day3iconURL)
            day3Card.append(date3Img)
            var date3temp = Math.round((response.list["3"].main.temp * 9 / 5) - 459.67);
            var tempDisplay3 = $("<p>").text("Temp: " + date3temp + "°F")
            day3Card.append(tempDisplay3)
            var date3Humid = response.list[10].main.humidity
            var humidDisplay3 = $("<p>").text("Humidity: " + date3Humid + "%")
            day3Card.append(humidDisplay3)
            $("#day-3").append(day3Card)
            
            
            var day4Card = $("<div>").attr("class", "card text-white bg-primary mb-3")
            var todayPlus4 = moment().add(4, 'day').calendar("MM, DD, YYYY")
            var date4Display = $("<h5>").text(todayPlus4)
            day4Card.append(date4Display)
            var day4IconID = response.list[26].weather["0"].icon
            var day4iconURL = "https://openweathermap.org/img/wn/" + day4IconID + "@2x.png";
            var date4Img = $("<img>").attr("src", day4iconURL)
            day4Card.append(date4Img)
            var date4temp = Math.round((response.list["3"].main.temp * 9 / 5) - 459.67);
            var tempDisplay4 = $("<p>").text("Temp: " + date4temp + "°F")
            day4Card.append(tempDisplay4)
            var date4Humid = response.list[10].main.humidity
            var humidDisplay4 = $("<p>").text("Humidity: " + date4Humid + "%")
            day4Card.append(humidDisplay4)
            $("#day-4").append(day4Card)
            
            
            var day5Card = $("<div>").attr("class", "card text-white bg-primary mb-3")
            var todayPlus5 = moment().add(5, 'day').calendar("MM, DD, YYYY")
            var date5Display = $("<h5>").text(todayPlus5)
            day5Card.append(date5Display)
            var day5IconID = response.list[33].weather["0"].icon
            var day5iconURL = "https://openweathermap.org/img/wn/" + day5IconID + "@2x.png";
            var date5Img = $("<img>").attr("src", day5iconURL)
            day5Card.append(date5Img)
            var date5temp = Math.round((response.list["3"].main.temp * 9 / 5) - 459.67);
            var tempDisplay5 = $("<p>").text("Temp: " + date5temp + "°F")
            day5Card.append(tempDisplay5)
            var date5Humid = response.list[10].main.humidity
            var humidDisplay5 = $("<p>").text("Humidity: " + date5Humid + "%")
            day5Card.append(humidDisplay5)
            $("#day-5").append(day5Card)
        });
                
        
        
    })
}
// }
});











