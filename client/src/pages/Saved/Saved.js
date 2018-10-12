import React, { Component } from "react";
import API from "../../utils/API";
import moment from "moment";

class Saved extends Component {
  state = {
    saved: []
  }

  componentWillMount() {
    // Retrieve all saved articles from database.
    this.loadSavedArticles();
  }

  loadSavedArticles = () => {
    API.getArticles()
    .then(res => {
      const dbArticles = res.data;
      this.setState({
        saved: dbArticles
      })
    })
    .catch(err => console.log(err));
  }

  deleteArticle = (id) => {
    API.deleteArticle(id)
    .then(res => {
      console.log(res);
      this.loadSavedArticles();
    })
    .catch(err => console.log(err))
  }


  render() {
    return (
      <div className="card">
        <h3 className="card-header text-center">Saved Articles</h3>
        <div className="card-body">
          {this.state.saved.map(article => {
            return (
              <div className="articleItem">
                <div key={article._id} className="row text-left">
                  <div className="col-10">
                    <h5><a href={article.url}>{article.title}</a></h5>
                    <p>Published {moment(article.date).format("MMM Do, YYYY")}</p>
                  </div>
                  <div className="col-2">
                    <button 
                      className="btn btn-danger" 
                      onClick={ () => this.deleteArticle(article._id) }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Saved;