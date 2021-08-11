import React, { Component } from "react";
import API from "../../utils/API";
import SearchForm from "../../components/SearchForm";
import Results from "../../components/Results";

class Home extends Component {
  state = {
    topic: "",
    startYear: "",
    endYear: "",
    results: [],
    loading: false,
    noResults: false,
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFormSubmit = event => {
    event.preventDefault();

    // First, set loading to true, then to false once results come back.
    this.setState({ loading: true }, () => {
      // Search for articles in the NYT API
      API.search({
        q:          this.state.topic,
        begin_date: this.state.startYear ? this.state.startYear + "0101" : undefined,
        end_date:   this.state.endYear   ? this.state.endYear + "1231" : undefined,
      })
      .then(res => {
        const docs = res.data.response.docs;
        const topFiveResults = docs.length ? docs.slice(0, 5) : [];
        const noResults = topFiveResults.length === 0 ? true : false;
        this.setState({
          results: topFiveResults,
          loading: false,
          noResults,
        })
      })
      .catch(err => console.log(err));
    })

  }

  // Accept an article and save it to MongoDB
  saveArticle = async (article) => {
    console.log("In Home.SaveArticle");
    // The properties of an article in MongoDB are (title, date, url)
    const newArticle = {
      title:  article.headline.main,
      date:   new Date(article.pub_date),
      url:    article.web_url
    }

    let saveSuccess = false;

    await API.saveArticle(newArticle)
    .then(res => {
      console.log(res);
      saveSuccess = true;
    })
    .catch(err => console.log(err));

    return saveSuccess;
  }

  render() {
    return (
      <div className="text-center row">
        <div className="col-lg-12">
          <SearchForm 
            handleInputChange={this.handleInputChange} 
            handleFormSubmit={this.handleFormSubmit} 
            state={this.state}
          />
        </div>
        <div className="col-lg-12">
          <Results results={this.state.results} saveArticle={this.saveArticle} loading={this.state.loading} noResults={this.state.noResults} />
        </div>
      </div>
    )
  }
}

export default Home;