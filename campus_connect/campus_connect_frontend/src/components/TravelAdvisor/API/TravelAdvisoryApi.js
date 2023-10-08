import axios from "axios";

export function Restaurants() {
  const params = {
    key: "O4GYtaGGQncWgXnrAh9vasuGmzEf0mo2",
    location: "Atlanta",
    latitude: 33.7531,
    longitude: -84.385388,
    limit: 100,
    radius: 50000,
  };
  const options = {
    url: `https://api.tomtom.com/search/2/categorySearch/restaurant.json?key=${params.key}&limit=${params.limit}&lat=${params.latitude}&lon=${params.longitude}`,
  };
  try {
    const promise = axios.get(options.url);
    const dataPromise = promise.then((response) => response.data.results);
    console.log(dataPromise);
    return dataPromise;
  } catch (error) {
    console.log(error);
  }
}
