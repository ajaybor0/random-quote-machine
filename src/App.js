import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const API =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

class App extends React.Component {
  state = {
    quotes: [
      {
        quote:
          "Life isn’t about getting and having, it’s about giving and being.",
        author: "Kevin Kruse"
      }
    ],
    index: 0
  };

  componentDidMount() {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        this.setState(
          {
            quotes: res.quotes
          },
          this.getRandomIndex
        );
      });
  }

  getRandomIndex = () => {
    const { quotes } = this.state;

    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({
        index
      });
    }
  };

  render() {
    const { quotes, index } = this.state;
    const quote = quotes[index];
    const tweetURL = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote.quote} ~ ${quote.author}`;

    return (
      <div className=" d-flex justify-content-center align-items-center vh-100">
        <div className="col-6 box p-4 rounded" id="quote-box">
          {quote && (
            <div className="mb-4">
              <h4 className="" id="text">
                <strong>
                  <i className="fa fa-quote-left fa-2x"></i> {quote.quote}
                </strong>
              </h4>
              <cite className="d-block text-end" id="author">
                {" "}
                ~ {quote.author}
              </cite>
            </div>
          )}

          <div className="d-flex justify-content-between">
            <a
              href={tweetURL}
              className="btn btn-sm btn-primary"
              id="tweet-quote"
              target="_top"
            >
              <i className="fab fa-twitter"></i> Tweet
            </a>
            <button
              onClick={this.getRandomIndex}
              className="btn btn-sm btn-primary"
              id="new-quote"
            >
              <i className="fas fa-random"></i> Get Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;