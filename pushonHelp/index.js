let latitude;
let longitude;
let request = new XMLHttpRequest();

const findLocation = () => {
  const success = (position) => {
    console.log(position.coords.latitude, position.coords.longitude);
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  };
  const error = () => {
    console.log("error");
  };
  navigator.geolocation.getCurrentPosition(success, error);
};
const query_params = {
  api_key: "b792d8fba1513b1d3b9501102a39fd5a",
  unit: "imperial",
};

const reset = (weatherInformation) => {
  weatherInformation.weatherCondition = [];
  weatherInformation.temperature = [];
  weatherInformation.windSpeed = [];
  weatherInformation.precipitation = [];
  weatherInformation.humidity = [];
  weatherInformation.date = [];
  weatherInformation.imageURL = [];
};
const weatherInformation = {
  location: "", // done
  weatherCondition: [], // done
  temperature: [], // done
  windSpeed: [],
  precipitation: [],
  humidity: [], //done
  date: [], // done
  imageURL: [], // done
};
const displayWeather = (weatherInformation) => {
  let it = 0;
  let locations = document.querySelectorAll('*[id^="location"]');
  let temps = document.querySelectorAll('*[id^="temperature"]');
  let weatherConditions = document.querySelectorAll(
    '*[id^="weatherCondition"]'
  );
  let windSpeed = document.querySelectorAll('*[id^="windSpeed"]');
  let prec = document.querySelectorAll('*[id^="cop"]');
  let humid = document.querySelectorAll('*[id^="humid"]');
  let currDay = document.querySelectorAll('*[id^="currTime"]');
  let imageURL = document.querySelectorAll('*[id^="imageId"]');

  for (const element of locations) {
    element.innerHTML = weatherInformation.location;
  }
  for (const element of temps) {
    element.innerHTML = `${weatherInformation.temperature[it]}°C`;
    it++;
  }
  it = 0;
  for (const element of weatherConditions) {
    element.innerHTML = `${weatherInformation.weatherCondition[it]}`;
    it++;
  }
  it = 0;
  for (const element of windSpeed) {
    element.innerHTML = `Wind Speed: ${weatherInformation.windSpeed[it]} km/h`;
    it++;
  }
  it = 0;
  for (const element of prec) {
    element.innerHTML = `Chance of precipitation: ${weatherInformation.precipitation[it]}%`;
    it++;
  }
  it = 0;
  for (const element of humid) {
    element.innerHTML = `Humidity: ${weatherInformation.humidity[it]}%`;
    it++;
  }

  it = 0;
  for (const element of currDay) {
    element.innerHTML = `${weatherInformation.date[it]}`;
    it++;
  }
  it = 0;
  for (const element of imageURL) {
    element.src = `https://openweathermap.org/img/wn/${weatherInformation.imageURL[it]}@2x.png`;
    it++;
  }

  reset(weatherInformation);
};

const storeApiData = (data) => {
  weatherInformation.location = data.city.name;
  for (let i = 0; i < data.list.length; i++) {
    if ((i + 1) % 7 == 0) {
      const date = new Date(data.list[i].dt_txt);
      const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = weekday[date.getDay()];
      weatherInformation.weatherCondition.push(data.list[i].weather[0].main);
      weatherInformation.temperature.push(data.list[i].main.temp);
      weatherInformation.windSpeed.push(data.list[i].wind.speed);
      weatherInformation.precipitation.push(data.list[i].pop * 100);
      weatherInformation.humidity.push(data.list[i].main.humidity);
      weatherInformation.date.push(day);
      weatherInformation.imageURL.push(data.list[i].weather[0].icon);
    }
  }
  displayWeather(weatherInformation);
};

const getApiData = () => {
  let city = document.getElementById("city").value;
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${query_params.api_key}&units=${query_params.unit}`;
  let dict_arr = [];
  let dict = {};
  let dateAssertionMap = [];
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      storeApiData(data);
      // const todays_date = data.list[0].dt_txt.substring(0, 10);
      // for (const element of data.list) {
      //   let newDate = element.dt_txt.substring(0, 10);
      //   dict = {
      //     date: element.dt_txt,
      //     weatherCondition: element.weather[0].main,
      //     temperature: element.main.temp,
      //     windSpeed: element.wind.speed,
      //     pop: element.pop * 100,
      //     humidity: element.main.humidity,
      //     icon: element.weather[0].icon,
      //   };
      //   dict_arr.push(dict);
      //   if (newDate != todays_date) {
      //     dateAssertionMap.push(dict_arr);
      //     dict_arr = [];
      //   }
      // }
      // console.log(dateAssertionMap);
    });
  document.getElementById("weatherData").style.display = "inline";
};

document.getElementById("search").addEventListener("click", getApiData);
