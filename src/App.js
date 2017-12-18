import React, { Component } from 'react';
import './App.css';
import './bootstrap.css';
import './weather-icons-master/css/weather-icons.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
        weathers: [],
        city: "",
        country: ""

    };
  }
  componentDidMount(){
    fetch('http://api.openweathermap.org/data/2.5/forecast/daily?q=Richardson,us&cnt=6&APPID=71c32854c184fc76cc993c70fb76fa64&units=metric&mode=JSON')
      .then(response => response.json())
      .then(data => this.setState({ weathers: data.list, city: data.city.name, country: data.city.country}))
      .catch(error => console.log(error) );
  }
  render(){
      const {weathers, city, country} = this.state;
      var divStyle = {
        margin: '0px 20px 0px -20px',
        textAlign: 'center',
        backgroundColor: '#f2f2f2',
        overflow: 'auto'
      };
      var iconStyle ={
        fontSize: 50
      };
      return(  
        <div className="container">
          <div className="row col-md-8">
            <h4>{city}, {country}</h4>
          </div>
          <div className="row" style={divStyle}>
              {weathers.map(weather =>
                  <div key={weather.dt} className="col-md-2">
                      <i className={"wi wi-owm-" + weather.weather[0].id +" wi-fw"} style={iconStyle}></i>
                      <h5>{weather.weather[0].description}</h5>
                      <h5>{Math.round(weather.temp.max)}° <small className="text-muted">{Math.round(weather.temp.min)}°</small></h5>
                 </div>
             )}
          </div>
        </div>
     );
  }
}

export default App;
