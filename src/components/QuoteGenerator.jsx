import React, { Component } from "react";
import API from "../API";

class QuoteGenerator extends Component {
  state = {
    quoteData: [],
    characterData: "",
    isLoaded: false,
    randomNum: 0
  };

  render() {
    const { quoteData } = this.state;
    const { characterData } = this.state;

    return (
      <>
        {!this.state.isLoaded ? null : (
          <>
            <section className="quoteSection">
              <h2 className="quote">
                {quoteData[this.state.randomNum].dialog}
              </h2>
              <p className="quotedBy">-- {characterData}</p>
            </section>
            <button className="randomise-btn" onClick={this.handleRandomise}>
              Randomise
            </button>
          </>
        )}
      </>
    );
  }

  componentDidMount() {
    this.fetchQuoteDataOnMount();
  }

  fetchQuoteDataOnMount = () => {
    API.get("/quote")
      .then(({ data: { docs } }) => {
        this.setState({ quoteData: docs });
      })
      .then(() => {
        this.setState(currentState => {
          const randomNum = Math.floor(
            Math.random() * currentState.quoteData.length - 1
          );
          return { randomNum };
        });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.randomNum !== this.state.randomNum) {
      this.fetchCharacterById();
    }
  }

  fetchCharacterById = () => {
    const { quoteData, randomNum } = this.state;
    API.get(`/character/${quoteData[randomNum].character}`).then(
      ({ data: { name } }) => {
        if (name === "MINOR_CHARACTER") {
          name = "Unknown";
        }
        this.setState({ characterData: name, isLoaded: true });
      }
    );
  };

  handleRandomise = () => {
    const { quoteData } = this.state;
    const randomNum = Math.floor(Math.random() * quoteData.length - 1);
    this.setState({ randomNum });
  };
}

export default QuoteGenerator;
