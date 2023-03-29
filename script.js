
$(document).ready(function () {
  $(".btn").click(function (event) {
    event.preventDefault()
    $("#addData").empty()
    $("#cityName").empty()
    var cityWeather = []
    var index = 0
    var weatherForecast = []
    var El = $("#nameEl").val();
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + El + "&limit=5&units=metric&appid=7ceb463b0dbb74278996f51113e27ee3", {
      method: 'GET',
      redirect: 'follow',
    })
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {

        cityWeather.push(data);
        console.log(cityWeather);

        var namePara = $("<div></div>")
        namePara.addClass("text-center")
        namePara.text(El.toUpperCase())
        $("#cityName").append(namePara)

        for (i = 0; i < 5; i++) {
          var temp = cityWeather[0].list[index].main.temp
          var maxTemp = cityWeather[0].list[index].main.temp_max
          var city = cityWeather[0].city.name
          var rawDate = dayjs.unix(cityWeather[0].list[index].dt)
          var date = rawDate.format("MMM D, YYYY");
          var icon = cityWeather[0].list[index].weather[0].icon;
          weatherForecast.push({ "temp": temp, "city": city, "date": date, "icon": icon, "maxTemp": maxTemp });
          index += 8;
          localStorage.setItem("forecast", JSON.stringify(weatherForecast));
          console.log(weatherForecast);

        };

        var myBtn = $("<button></button>")
        var ElUpper = El.toUpperCase()
        myBtn.text(ElUpper)
        $("#attBtn").append(myBtn);
        myBtn.attr("id", El);
        myBtn.css("width", "100%");
        myBtn.attr("class", "btn btn-info mt-2 cityBtn")

        var displayData = JSON.parse(localStorage.getItem("forecast"));
        var currentTemp = $("<div></div>")
        currentTemp.addClass("text-center")
        var currentTempEl = displayData[0].temp
        currentTemp.text(currentTempEl+"°C")
        $("#cityName").append(currentTemp)

        for (i = 0; i < displayData.length; i++) {
          var cityDiv = $("<div></div>")
          cityDiv.addClass("col-md-3 custom mx-2 my-2")
          var img = $("<img>")
          img.attr('src', 'https://openweathermap.org/img/wn/'+displayData[i].icon+'@2x.png')
          img.css({'width': '50px', 'height': '50px'})
          $(cityDiv).append(img)
          var datePara = $("<p></p>");
          var dateDis = dayjs(displayData[i].date).format("ddd")
          datePara.text(dateDis)
          $(cityDiv).append(datePara)
          var maxTempPara = $("<p></p>");
          var maxTempDis = displayData[i].maxTemp
          maxTempPara.text(maxTempDis+"°C ")
          $(cityDiv).append(maxTempPara)
          var tempPara = $("<p></p>");
          var tempDis = displayData[i].temp
          tempPara.text(tempDis+"°C ")
          $(cityDiv).append(tempPara)
          $("#addData").append(cityDiv)
        }
      })
  });

  //     New Start

  $("#attBtn").click(function (event) {
    var buttonClicked = event.target
    if (buttonClicked.matches(".cityBtn"))
      console.log("button")
    //event.stopPropagation()
    var abc = event.target.id
    var cityWeather = []
    var index = 0
    var weatherForecast = []
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + abc + "&limit=5&units=metric&appid=7ceb463b0dbb74278996f51113e27ee3", {
      method: 'GET',
      redirect: 'follow',
    })
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {

        cityWeather.push(data);
        console.log(cityWeather);


        //              Latest                 //
        $("#addData").empty()
        $("#cityName").empty()
      
        var El = $(buttonClicked).text()
        var namePara = $("<div></div>")
        namePara.addClass("text-center")
        namePara.text(El.toUpperCase())
        $("#cityName").append(namePara)

        for (i = 0; i < 5; i++) {
          var temp = cityWeather[0].list[index].main.temp
          var maxTemp = cityWeather[0].list[index].main.temp_max
          var city = cityWeather[0].city.name
          var rawDate = dayjs.unix(cityWeather[0].list[index].dt)
          var date = rawDate.format("MMM D, YYYY");
          var icon = cityWeather[0].list[index].weather[0].icon;
          weatherForecast.push({ "temp": temp, "city": city, "date": date, "icon": icon, "maxTemp": maxTemp });
          index += 8;
          localStorage.setItem("forecast", JSON.stringify(weatherForecast));
          console.log(weatherForecast);
  
        }
        var displayData = JSON.parse(localStorage.getItem("forecast"));
        var currentTemp = $("<div></div>")
        currentTemp.addClass("text-center")
        var currentTempEl = displayData[0].temp
        currentTemp.text(currentTempEl+"°C ")
        $("#cityName").append(currentTemp)
        for (i = 0; i < displayData.length; i++) {
          var cityDiv = $("<div></div>")
          cityDiv.addClass("col-md-3 custom mx-2 my-2")
          var img = $("<img>")
          img.attr('src', 'https://openweathermap.org/img/wn/'+displayData[i].icon+'@2x.png')
          img.css({'width': '50px', 'height': '50px'})
          $(cityDiv).append(img)
          var datePara = $("<p></p>");
          var dateDis = dayjs(displayData[i].date).format("ddd")
          datePara.text(dateDis)
          $(cityDiv).append(datePara)
          var maxTempPara = $("<p></p>");
          var maxTempDis = displayData[i].maxTemp
          maxTempPara.text(maxTempDis+"°C ")
          $(cityDiv).append(maxTempPara)
          var tempPara = $("<p></p>");
          var tempDis = displayData[i].temp
          tempPara.text(tempDis+"°C ")
          $(cityDiv).append(tempPara)
          $("#addData").append(cityDiv)
          event.stopPropagation()
        }

        
      })



  })
})






