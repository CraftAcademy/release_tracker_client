import React, { Component } from "react";
import axios from "axios";
import { Container, Image, Table } from "semantic-ui-react";
import DefaultPicture from '../images/defaultpic.jpeg'
import { addToTracked, removeFromTracked } from "../modules/tracking"

class Search extends Component {
  state = {
    searchResult: [],
    message: "",
  }

  searchReq = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/v1/searches", {
        params: { q: e.target.children.search.value },
      });
      this.setState({ searchResult: response.data.data });
    } catch (error) {
      let errorMessage = error.response.data.error_message || error.message;
      this.setState({ message: errorMessage });
    }
  };

  async trackHandler(id,add){
    if (add) {
      const response = await addToTracked(id)
      if (response.successful) {
        let searchResult = this.state.searchResult
        let index = searchResult.findIndex((result) => result.id == id )
        searchResult[index].tracked = true
        this.setState({ searchResult })
      } else {
        debugger
        this.setState({message: response.error })
      }
    } else {
      const response = await removeFromTracked(id)
    }
  }

  render() {
    let imgPath, sResult, button;
    let searchResult = this.state.searchResult;
  
    searchResult &&
      (sResult = searchResult.map((result) => {
        if (this.props.authenticated && !result.tracked) {
          button = (
            <td>
              <button id="track-btn" onClick={() => {this.trackHandler(result.id,true)}}>track</button> 
            </td>
          )
        } else if (this.props.authenticated){
          button = (
            <td>
              <button id="track-btn" onClick={() => {this.trackHandler(result.id,false)}}>untrack</button> 
            </td>
          )
        }
  
        imgPath = DefaultPicture
  
        return (
          <Table.Row key={"result-item-" + result.id} id={"result-item-" + result.id}>
            <Table.Cell>
              <Image src={imgPath} size="mini" alt={result.name} style={{paddingRight: "10px"}}/>
            </Table.Cell>
            <Table.Cell>
              <a
                data-id={result.id}
                id={"track-" + result.id}
                onClick={(e) => {
                  this.props.moviePersonShow(e);
                }}
              >
              {result.name}
              </a>
            </Table.Cell>
            <Table.Cell>{result.known_for_role === "Acting" ? "Actor" : "Director"} ({result.known_for_movie})</Table.Cell>
            {button}
          </Table.Row>
        );
      }));
  
    return (
      <Container align="left" style={{width: "50%"}}>
        <form onSubmit={this.searchReq}>
          <input
            type="text"
            id="search"
            name="searchText"
          />
          <button type="submit">
            Search
          </button>
        </form>
        <p id="message">{this.state.message}<br />{this.props.message}</p>
        <Table padded compact>{sResult}</Table>
      </Container>
    );

  }
};

export default Search;
