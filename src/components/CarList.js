import React, { Component } from "react";
import { load } from "../helpers/spreadsheet";
import config from "../config";

class CarList extends Component {
  state = {
    cars: [],
    error: null
  };
  componentDidMount() {
    // 1. Load the JavaScript client library.
    window.gapi.load("client", this.initClient);
  }

  initClient = () => {
    // 2. Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: config.apiKey,
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: config.discoveryDocs
      })
      .then(() => {
        // 3. Initialize and make the API request.
        load(this.onLoad);
      });
  };

  onLoad = (data, error) => {
    if (data) {
      const cars = data.cars;
      this.setState({ cars });
    } else {
      this.setState({ error });
    }
  };

  render() {
    const { cars, error } = this.state;
    if (error) {
      return <div>{error}</div>;
    }
    return (
      <ul>
        {cars.map((car, i) => (
          <li key={i}>
            {car.year} {car.make} {car.model}
          </li>
        ))}
      </ul>
    );
  }
}

export default CarList;



// WEBPACK FOOTER //
// ./src/components/CarList.js