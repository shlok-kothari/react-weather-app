import React, { Component } from 'react';
import './App.css';
import './bootstrap.css';
import './weather-icons-master/css/weather-icons.css';
import {DebounceInput} from 'react-debounce-input';

class App extends Component {
  constructor(){
    super();
    this.state = {
        weathers: [],
        city: "",
        country: ""
    };
  }

  getWeather(cityName){
    var h5 = document.getElementById("h5");
    h5.style.display = "none";
    
    fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName},us&cnt=6&APPID=71c32854c184fc76cc993c70fb76fa64&units=metric&mode=JSON`)
      .then(response => response.json())
      .then(data => this.setState({ weathers: data.list, city: data.city.name, country: data.city.country}))
      .catch(error => console.log(error) );
    var city = document.getElementById("city");
    city.style.display= "block";
  }

  timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    return time;
  }
  render(){
      const {weathers, city, country} = this.state;
      var divStyle = {
        margin: '0px 20px 0px -20px',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        overflow: 'auto'
      };
      var iconStyle ={
        fontSize: 60,
        color: '#02388e'
      };
      
      return(  
        <div className="container">
          <br/>
          <div className="row">
            <div className="col-md-8">
              <h5 id="h5">Enter a city to get started </h5>
            </div>
            <div className="col-md-4 fixed">
              <DebounceInput minLength={2} className="input-sm" debounceTimeout={300} onChange={event => this.getWeather(event.target.value)} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <h4 style={{display: 'none'}} id="city">{city}, {country}</h4>
            </div>
            
          </div>
          <div className="row" style={divStyle}>
              {weathers.map(weather =>
                  <div key={weather.dt} className="col-md-2">
                    <h5>{this.timeConverter(weather.dt)}</h5>
                    <br/>
                    <i className={"wi wi-owm-" + weather.weather[0].id +" wi-fw"} style={iconStyle}></i>
                    <br/><br/>
                    <h5>{weather.weather[0].description}</h5>
                    <h5>{Math.round(weather.temp.max)}° <small className="text-muted">{Math.round(weather.temp.min)}°</small></h5>
                    <h5>Humidity: {weather.humidity}%</h5>
                 </div>
             )}
          </div>
        </div>
     );
  }
}

export default App;