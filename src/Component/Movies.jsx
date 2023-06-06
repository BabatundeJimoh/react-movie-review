import React, { Component } from "react";
import axios from "axios";

class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    this.fetchMovies();

    // Start polling for updated data every 5 seconds
    this.pollingInterval = setInterval(this.fetchMovies, 5000);
  }

  componentWillUnmount() {
    // Clear the polling interval before unmounting the component
    clearInterval(this.pollingInterval);
  }

  fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=5lxLQcOAXQDPmylMT3tQ3mytXCEGACNi"
      );

      const data = await response.data.results;

      this.setState({ movies: await data });
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  render() {
    const { movies } = this.state;

    return (
      <div>
        {movies.map((movie, index) => (
          <div key={index} className="movie">
            <p>
              <b>Title:</b> {movie.display_title}
            </p>
            <p>
              <b>Byline:</b> {movie.byline}
            </p>
            <p>
              <b>Critics Pick:</b> {movie.critics_pick}
            </p>
            <p>
              <b>Headline:</b> {movie.headline}
            </p>
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

export default React.memo(Movies);
