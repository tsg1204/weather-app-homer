import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import SearchByZip from './components/SearchByZip';
import { API_KEY, API_BASE_URL } from './apis/keys';
import FiveDaysForcast from './components/FiveDaysForcast';
import FetchData from './hooks/FetchData';

function App() {
  const {data, error, isLoading, setUrl} = FetchData();
  const zipSearch = (zipcode) => setUrl(`${API_BASE_URL}/data/2.5/forecast?zip=${zipcode}&appid=${API_KEY}&units=imperial`);

  const getContent = () => {
    if(error) return <h3>Error fetching data: zip code not found</h3>
    if(!data && isLoading) return <h4>LOADING...</h4>
    if(!data) return null;
    return <FiveDaysForcast forcast={data} />
  };

  return (
    <Container className="App">
      <SearchByZip onSearch={zipSearch} />
      {getContent()}
    </Container>
  );
}

export default App;
