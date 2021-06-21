class Weather {
  constructor() {
    this.key = "0KmlN8zgb7uU96vGD4Q9GMW9uFAXndSs";
    this.weatherURI =
      "https://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURI =
      "https://dataservice.accuweather.com/locations/v1/cities/search";
  }
  async updateCity(city) {
    const cityDetails = await this.getCity(city);
    const weather = await this.getWeather(cityDetails.Key);

    return {
      cityDetails,
      weather,
    };
  }
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const res = await fetch(this.cityURI + query);
    const data = await res.json();

    return data[0];
  }
  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const res = await fetch(this.weatherURI + query);
    const data = await res.json();

    return data[0];
  }
}

export default Weather;
