import moment from 'moment';

export const formatForcastData = (result) => {
  let forcast = [];
  
  for(let i = 0; i < result.list.length; i++) {
    //we need the time to match with the time of the forcast
    let timeOfDay = moment.unix(result.list[0].dt).format('h:mm:ss a');

    //we get the time of the data element to match with the time of forcast
    let timeToMatch = moment.unix(result.list[i].dt).format('h:mm:ss a');

    //if timeOfDay matches timeToMatch, get the data to display the 5 days forcast
    if (timeOfDay === timeToMatch) {
      //convert value from the data to a format we can use 
      let timestamp =  moment.unix(result.list[i].dt);

      const forcastObj = {};

      forcastObj.city = result.city.name;
      forcastObj.state = '';
      forcastObj.country = result.city.country;
      forcastObj.temperature = Math.round(result.list[i].main.temp);
      forcastObj.description = result.list[i].weather[0].main;
      forcastObj.humidity = result.list[i].main.humidity;
      forcastObj.date = moment(result.list[i].dt_txt).format('ll');

      let iconCode = result.list[i].weather[0].icon;

      let iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      forcastObj.imageURL = iconURL;
      
      let dayOfWeek = moment(timestamp).format('dddd');

      forcastObj.dayOfWeek = dayOfWeek;
      forcastObj.uvi = result.uvi;
      //console.log(result.uvi);

      forcast.push(forcastObj);
    }
   }   
  //console.log('Forcast from utils:', forcast);
  return forcast;

}