import React from 'react';
import { Card } from 'react-bootstrap';

const WeatherCard = ({ imageURL, city, dayOfWeek, temperature, description, humidity }) => {
  return (
    <Card style={{width: '10rem', margin: 'auto'}}>
      <Card.Img
        variant="top"
        src={ imageURL}
      />
      <Card.Body>
        <Card.Title> {city}</Card.Title>
        <p> {dayOfWeek} </p>
        <p> {temperature} °F</p>
        <p> {description} </p>
        <p> Humidity: {humidity}% </p>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;