import React, { Component } from "react";
import moment from "moment";

class Results extends Component {
  render() {
    return (
      <div className="card">
        <h3 className="card-header">Results</h3>
        <div className="card-body">
          {this.props.results.map(result => {
            return (
              <div className="articleItem">
                <div key={result._id} className="row text-left">
                  <div className="col-md-10">
                    <a href={result.web_url}><p>{result.headline.main}</p></a>
                    <p>Published {moment(result.pub_date).format("MMM Do, YYYY")}</p>
                  </div>
                  <div className="col-md-2 text-md-right">
                    <button 
                      className="btn btn-primary my-1" 
                      onClick={ async () => {
                        await this.props.saveArticle(result);
                      } }
                    >
                      Save
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

export default Results;