import React from 'react';
import './App.css';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      lat: 0,
      lon: 0,
      name: '',
      renderLatLon: false,
    }
  };

  handleChange = (e) => {
    this.setState({ city: e.target.value })
  };

  getCityInfo = async (e) => {
    e.preventDefault();

    let cityResults = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);
    console.log(cityResults);
    this.setState({
      lat: cityResults.data[0].lat,
      lon: cityResults.data[0].lon,
      name: cityResults.data[0].display_name,
      renderLatLon: true,
    })
  };


  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <Form onSubmit={this.getCityInfo}>
          <Form.Control onChange={this.handleChange}></Form.Control>

          <Button variant="primary" type="submit">Explore!</Button>
        </Form>
        <ListGroup as="ul">
          {this.state.renderLatLon ? <ListGroup.Item as="li" active>{this.state.name}</ListGroup.Item> : ''}
          {this.state.renderLatLon ? <ListGroup.Item as="li">Latitude: {this.state.lat}</ListGroup.Item> : ''}
          {this.state.renderLatLon ? <ListGroup.Item as="li">Longitute: {this.state.lon}</ListGroup.Item> : ''}
        </ListGroup>
      </>
    )
  }
}
export default App;
