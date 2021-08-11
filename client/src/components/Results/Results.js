import React, { Component } from "react";
import moment from "moment";
import Loader from "react-loader-spinner";

class ArticleItem extends Component {
  state = {
    saved: false,
  }

  render() {
    const result = this.props.article;

    return (
      <div className="articleItem">
        <div className="row text-left">
          <div className="col-md-10">
            <a href={result.web_url}><p>{result.headline.main}</p></a>
            <p>Published {moment(result.pub_date).format("MMM Do, YYYY")}</p>
          </div>
          <div className="col-md-2 text-right">
            <button 
              className={`btn btn-${this.state.saved ? "secondary" : "primary"} my-1`}
              onClick={ async () => {
                // Only save if the article hasn't been saved.
                // After sucessfully saving, set to saved.
                if (!this.state.saved) {
                  const success = await this.props.saveArticle(result);
                  if (success) this.setState({ saved: true })
                }
              } }
            >
              {this.state.saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

class Results extends Component {
  render() {
    const loader = <Loader type="Oval" color="gray" width={50} height={50} />

    console.log('current results', this.props.results)

    return (
      <div className="card">
        <h3 className="card-header">Results</h3>
        <div className="card-body">{
          this.props.loading ? loader : 
          this.props.noResults ? <p><strong>No results found</strong></p> :
          this.props.results.length === 0 ? 
            <p style={{color: '#606060'}}>You haven't searched for anything yet.</p> : 
              this.props.results.map(result => { return (
                <ArticleItem key={result._id} article={result} saveArticle={this.props.saveArticle} />
              )})
        }</div>
      </div>
    )
  }
}

export default Results;