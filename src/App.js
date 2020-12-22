import React from 'react';

import './App.css';
  
  let apiQuotes = [];
  
  function newQuote() {
    // Pick a random quote from data array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
      document.getElementById('author').innerText = 'Unknown';
    } else {
      document.getElementById('author').innerText = quote.author;
    } 
    if (quote.text.length > 50) {
      document.getElementById('quote').classList.add('long-quote')
    } else {
      document.getElementById('quote').classList.remove('long-quote');
    }
    document.getElementById('quote').innerText = quote.text;
  }

   async function getQuote() {
      /*const proxyUrl = 'https://cors-anywhere.herokuapp.com/'*/
      const apiUrl = 'https://type.fit/api/quotes';
      try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote(apiQuotes);
      } catch (error) {
        //Catch Error Here
          console.log('whoops, noquote', error);
      }
   }

  //  Tweet Quote 
  function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${document.getElementById('quote').innerText} - ${document.getElementById('author').innerText}`;
    window.open(twitterUrl, '_blank');
  }
      // loading();
    getQuote(); 
  function App(){
    return (
        <div className="quote-container" id="quote-container">
          {/* Quote */}
            <div className="quote-text">
              <i className="fas fa-quote-left"></i>
              <span id="quote" />
            </div>
            {/* Author */}
            <div className="quote-author" >
              <span id='author'></span>
            </div>
          {/* Buttons */}
          <div className="button-container">
            <button className="twitter-button" onClick={()=> tweetQuote()} id="twitter" title="Tweet This!">
              <i className="fab fa-twitter"></i>
            </button>
            <button onClick={()=> newQuote()} id="new-quote">New Quote</button>
          </div>
        </div>
      );
    }


export default App;
