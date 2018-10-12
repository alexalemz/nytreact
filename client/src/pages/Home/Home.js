import React, { Component } from "react";
import API from "../../utils/API";
import SearchForm from "../../components/SearchForm";
import Results from "../../components/Results";

class Home extends Component {
  state = {
    topic: "",
    startYear: "",
    endYear: "",
    results: []
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFormSubmit = event => {
    event.preventDefault();

    // Search for articles in the NYT API
    API.search({
      q:          this.state.topic,
      begin_date: this.state.startYear ? this.state.startYear + "0101" : null,
      end_date:   this.state.endYear   ? this.state.startYear + "1231" : null
    })
    .then(res => {
      const topFiveResults = res.data.response.docs.slice(0, 5);
      this.setState({
        results: topFiveResults
      })
    })
    .catch(err => console.log(err));
  }

  // Accept an article and save it to MongoDB
  saveArticle = (article) => {
    console.log("In Home.SaveArticle");
    // The properties of an article in MongoDB are (title, date, url)
    const newArticle = {
      title:  article.headline.main,
      date:   new Date(article.pub_date),
      url:    article.web_url
    }

    API.saveArticle(newArticle)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="text-center">
        <SearchForm 
          handleInputChange={this.handleInputChange} 
          handleFormSubmit={this.handleFormSubmit} 
          state={this.state}
        />
        <Results results={this.state.results} saveArticle={this.saveArticle} />
      </div>
    )
  }
}

export default Home;