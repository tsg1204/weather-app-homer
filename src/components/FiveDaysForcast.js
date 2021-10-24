import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import WeatherCard from './WeatherCard';

const FiveDaysForcast = ({ forcast }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [currentUVI, setCurrentUVI] = useState('');

  const toggleWeather = (e) => {
    setSelectedIndex(e);
  }
  //console.log(forcast[0].uvi)
  
  useEffect(() => {
    switch (forcast[0].uvi) {
      case (forcast[0].uvi >= 3 && forcast[0].uvi <= 5):
        setCurrentUVI('Moderate UV index');
        break;
      case (forcast[0].uvi >= 6 && forcast[0].uvi <= 7):
        setCurrentUVI('High UV index');
        break;
      case (forcast[0].uvi >= 8 && forcast[0].uvi <= 10):
        setCurrentUVI('Very High UV index');
        break;
      case (forcast[0].uvi >= 11):
        setCurrentUVI('Extreme UV index');
        break;
      default:
        setCurrentUVI('Low UV index');
    }
  }, [forcast]);

  return (
    <>
      <Row>Currently: {currentUVI}</Row>
      <Row>
          {forcast.map((weather, index) => (
              <Col key={index}  onClick={() => toggleWeather(index)}>
                {weather.date} {weather.dayOfWeek}
                {selectedIndex === index ? <WeatherCard 
                  imageURL={weather.imageURL} 
                  city={weather.city} 
                  temperature={weather.temperature}
                  description={weather.description}  
                  humidity={weather.humidity}
                /> : null}
              </Col>
          ))} 
      </Row>
    </>
  )
}

export default FiveDaysForcast;

