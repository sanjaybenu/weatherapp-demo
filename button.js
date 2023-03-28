$(document).ready(function(){
  var buttonContainer = $(".col-4")
buttonContainer.click(function(event){
var buttonClicked = event.target
if (buttonClicked.matches(".cityBtn"))
   console.log("button")
  myFunction()
})

function myFunction(){
  var abc = event.target.id
  var cityWeather = []
var index = 0
var weatherForecast = []
fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + abc + "&limit=5&units=metric&appid=7ceb463b0dbb74278996f51113e27ee3", {
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
        namePara.text(abc.toUpperCase())
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
        for (i = 0; i < displayData.length; i++) {
          var cityDiv = $("<div></div>")
          cityDiv.addClass("col-md-3 custom mx-2 my-2")
          var datePara = $("<p></p>");
          var dateDis = dayjs(displayData[i].date).format("ddd")
          datePara.text(dateDis)
          $(cityDiv).append(datePara)
          var maxTempPara = $("<p></p>");
          var maxTempDis = displayData[i].maxTemp
          maxTempPara.text(maxTempDis)
          $(cityDiv).append(maxTempPara)
          var tempPara = $("<p></p>");
          var tempDis = displayData[i].temp
          tempPara.text(tempDis)
          $(cityDiv).append(tempPara)
          $("#addData").append(cityDiv)
        }
  })
};
});