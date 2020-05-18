import React, { Component } from "react";

export class MoviePerson extends Component {
  render() {
    let moviePersonTable;

    moviePersonTable = this.props.moviePersonResult.map((result) => {
      debugger
      let imgPath = result.image;

      return (
        <>
          <h1 id="release-header">Upcoming Releases</h1>
          <div
            id={
              "release-item-" +
              (1 + this.props.moviePersonResult.indexOf(result))
            }
          >
            <h2>{result.title}</h2>
            <h3>{result.release_date}</h3>
            <h3>Tracked people: {this.props.activeName}</h3>
            <h3>{result.role}</h3>
            <h3>Tracked genres: {result.genres.join(", ")}</h3>
            <img src={imgPath} height="35" alt={result.title} />
            <h4>{result.description}</h4>
          </div>
        </>
      );
    });

    return (
      <div>
        {moviePersonTable}
        <button id="btn-back" onClick={() => this.props.resetMoviePerson()}>
          Back
        </button>
      </div>
    );
  }
}

export default MoviePerson;
