import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import WeatherCard from './WeatherCard';

const FiveDaysForcast = ({ forcast }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [currentUVI, setCurrentUVI] = useState('');

  const toggleWeather = (e) => {
    setSelectedIndex(e);
  }
  const UVI = forcast[0].uvi;
  console.log(UVI)
  
  useEffect(() => {
    switch (UVI) {
      case (UVI >= 3 && UVI <= 5):
        console.log(UVI)
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
        console.log(currentUVI)
    }
    return currentUVI;
  }, [forcast[0].uvi]);

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

