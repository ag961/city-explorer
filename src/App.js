import React from 'react';
import './App.css';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      lat: 0,
      lon: 0,
      name: '',
      renderLatLon: false,
      displayError: false,
      errorMessage: '',
    }
  };

  handleChange = (e) => {
    this.setState({ city: e.target.value })
  };

  getCityInfo = async (e) => {
    e.preventDefault();
    try {
      let cityResults = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);
      console.log(cityResults);
      this.setState({
        lat: cityResults.data[0].lat,
        lon: cityResults.data[0].lon,
        name: cityResults.data[0].display_name,
        renderLatLon: true,
        displayError: false,
        
      })
    } catch (error) {
      this.setState({
        renderLatLon: false,
        displayError: true,
        errorMessage: `Error: ${error.response.status}, ${error.response.data.error}` 
      })
    }
  };

  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <Container className="cont">
          <Form onSubmit={this.getCityInfo}>
            <Form.Group>
              <Form.Control size="md" className="input" onChange={this.handleChange}></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Explore!</Button>
          </Form>
        </Container>
        {this.state.renderLatLon ?
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>{this.state.name}</ListGroup.Item>
            <ListGroup.Item as="li">Latitude: {this.state.lat}</ListGroup.Item>
            <ListGroup.Item as="li">Longitute: {this.state.lon}</ListGroup.Item>
            <Image alt='city' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.lat},${this.state.lon}&zoom=12`} rounded />
          </ListGroup> : ''}
        {this.state.displayError ? <h3>{this.state.errorMessage}</h3> : ''}
      </>
    )
  }
}
export default App;
