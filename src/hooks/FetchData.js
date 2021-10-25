import { useState, useEffect} from 'react';
import { formatForcastData } from '../utils/utils';
import { API_KEY, API_BASE_URL } from '../apis/keys';

const FetchData = (initialUrl) => {
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState(initialUrl);
  const [city, setCity] = useState('');
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [uvi, setUvi] = useState(0);

  //fetching city to use later; lon and lat to get uvi index later
  useEffect(() => {
    if(!url) return;
    setIsLoading(true);
    setData('');
    setError('');

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setIsLoading(false);
            if(data.cod >= 400) {
                setError(data.message);
                return;
            }
            setCity(data.city.name);  
            setLat(data.city.coord.lat.toFixed(2));
            setLon(data.city.coord.lon.toFixed(2));
        })
        .catch((error) => {
            setIsLoading(false);
            setError(error);
        });  
  }, [url]);

  //fetching uvi index and the rest of data we need
  useEffect(() => {
    if(!lon) return;
    setIsLoading(true);

    fetch(`${API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data2) => {
            setIsLoading(false);
            if(data2.cod >= 400) {
                setError(data2.message);
                return;
            }
            setUvi(data2.current.uvi);
        })
        .catch((error) => {
            setIsLoading(false);
            setError(error);
        });  

    fetch(`${API_BASE_URL}/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`)
        .then((response) => response.json())
        .then((data) => {
            setIsLoading(false);
            if(data.cod >= 400) {
                setError(data.message);
                return;
            }
            //add uvi to data 
            data.uvi = uvi;
            console.log(uvi)
            setData(formatForcastData(data));
        })
        .catch((error) => {
            setIsLoading(false);
            setError(error);
        });
  }, [lon, lat, uvi, city]);


console.log(data)
  return { data, error, isLoading, setUrl };
};

export default FetchData;