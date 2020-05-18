import React, { Component } from "react";
import { Container, Grid, List } from "semantic-ui-react";
import Genres from './Genres'

export class ViewTracker extends Component {
  render() {
    let releaseTable;

    releaseTable = this.props.trackedInfo.movies.map((result) => {
      let imgPath = result.image;

      return (
        <>
          <List.Item
            id={
              "release-item-" +
              (1 + this.props.trackedInfo.movies.indexOf(result))
            }
          >
            <List.Icon name="marker" />
            <List.Content>
              <List.Header>
                {result.title}--{result.release_date}
              </List.Header>
              <List.Description>
                <p>{result.description}</p>
                <b>Role:</b>
                {result.role} <b>Tracked genres: </b>
                {result.genres.join(", ")}
                <p>
                  <b>Tracked people: </b>
                  {result.name}
                </p>
                <img src={imgPath} height="35" alt={result.title} />
              </List.Description>
            </List.Content>
          </List.Item>
        </>
      );
    });

    return (
      <Container>
        <Grid columns={2} divided fluid relaxed>
          <Grid.Row>
            <Grid.Column>
              <Genres genresHandler={this.props.genresHandler}/>
            </Grid.Column>
            <Grid.Column>
              <h1 id="release-header">Upcoming Releases</h1>
              <div style={{ height: "55%", overflow: "scroll" }}>
                <List>{releaseTable}</List>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default ViewTracker;
