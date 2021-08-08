import React from 'react';
import './App.css';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';
import Weather from './Weather';
import Movies from './Movies';


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
      weatherData: [],
      displayWeather: false,
      displayWeatherError: false,
      weatherErrMessage: '',
      movieData: [],
      displayMovies: false,
      movieErrMessage: '',
    }
  };

  handleChange = (e) => {
    this.setState({ city: e.target.value })
  };

  getCityInfo = async (e) => {
    e.preventDefault();
    try {
      let cityResults = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);
      // console.log(cityResults);
      this.setState({
        lat: cityResults.data[0].lat,
        lon: cityResults.data[0].lon,
        name: cityResults.data[0].display_name,
        renderLatLon: true,
        displayError: false,        
      })
      this.getMovieInfo();
    } catch (error) {
      this.setState({
        renderLatLon: false,
        displayError: true,
        displayWeather: false,
        displayMovies: false,        
        errorMessage: `Error: ${error.response.status}, ${error.response.data.error}`
      })
    }
    this.getWeatherInfo();
  };

  getWeatherInfo = async (e) => {
    try {
      let weatherResults = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather?lat=${this.state.lat}&lon=${this.state.lon}&searchQuery=${this.state.city}`);
      this.setState({
        weatherData: weatherResults.data,
        displayWeather: true,
        displayWeatherError: false,
      })
    } catch (error) {
      this.setState({
        displayWeather: false,
        displayWeatherError: true,
        weatherErrMessage: `Error: ${error.response.status}, ${error.response.data}`,
      })
      console.log(error.response);
    }
  }

  getMovieInfo = async (e) => {
    try {
      let movieResults = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies?searchQuery=${this.state.city}`);
      console.log(movieResults);
      this.setState({
        movieData: movieResults.data,
        displayMovies: true,
        displayMovieError: false,
      });

      console.log(this.state.movieResults);
    } catch (error) {
      console.log(error);
      this.setState({
        displayMovies: false,
        displayMovieError: true,
        movieErrMessage: `${error}`
      })
    }
  }

  render() {

    let weatherArrToRender = this.state.weatherData.map((weatherByDate, index) => (
      <Weather
        key={index}
        description={weatherByDate.description}
        date={weatherByDate.date}
      />)
    )

    let movieArrToRender = this.state.movieData.map((movie, index) => (
      <Movies
        key={index}
        title={movie.title}
        image_url={movie.image_url}
        overview={movie.overview}
        releasedOn={movie.releasedOn}
      />
    ))

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
          <ListGroup as="ul" className="text-center">
            <ListGroup.Item as="li" active>{this.state.name}</ListGroup.Item>
            <ListGroup.Item as="li">Latitude: {this.state.lat}; Longitute: {this.state.lon}</ListGroup.Item>
            {this.state.displayWeather ?
              <ListGroup.Item as="li">Weather Forecast by Date
                <CardColumns>
                  {weatherArrToRender}
                </CardColumns>
              </ListGroup.Item> : ''}
            {this.state.displayWeatherError ? <h3>{this.state.weatherErrMessage}</h3> : ''}
            <ListGroup.Item as="li"><Image alt='city' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.lat},${this.state.lon}&zoom=12`} rounded /></ListGroup.Item>
          </ListGroup> : ''}
        {this.state.displayError ? <h3>{this.state.errorMessage}</h3> : ''}
        {this.state.displayMovies ?
          <Container>
          {movieArrToRender.length > 0 ? 
            <CardColumns>
              {movieArrToRender}
            </CardColumns>
          : <h3>No movies were found matching your search input</h3>}
          </Container> : ''
        }
        {this.state.displayMovieError ? <h3>{this.state.movieErrMessage}</h3> : ''}
      </>
    )
  }
}
export default App;
