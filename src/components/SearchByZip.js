import React, {useState} from 'react';
import { Row, Col, FormControl, Button } from 'react-bootstrap';

const SearchByZip = ({ onSearch }) => {
  const [zipcode, setZipCode] = useState('');

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      onSearch(zipcode);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h2>Search by zipcode</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={3} className="text-center">
          <FormControl
            placeholder="Enter zipcode"
            onChange={(event) => setZipCode(event.target.value)}
            value={zipcode}
            onKeyDown={onKeyDown}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => onSearch(zipcode)}>Check Weather</Button>
        </Col>
      </Row>
    </>
  );
};

export default SearchByZip;