import React, { Component } from "react";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Loader from "react-loader-spinner";

class SearchForm extends Component {

  render() {
    const loader = <Loader type="Oval" color="white" height={20} width={46} />

    return (
      <div className="card">
        <h3 className="card-header">Search</h3>
        <div className="card-body">
          <form onChange={this.props.handleInputChange} onSubmit={this.props.handleFormSubmit} className="search-form">
            <Input name="topic" id="topic" label="Topic" value={this.props.state.topic} /* autoFocus */ />
            <div className="row">
              <div className="col-6">
                <Input name="startYear" id="startYear" label="Start Year (optional)" value={this.props.state.startYear} />
              </div>
              <div className="col-6">
                <Input name="endYear" id="endYear" label="End Year (optional)" value={this.props.state.endYear} />    
              </div>
            </div>
            {/* <FormBtn>{this.props.state.loading ? loader : "Search"}</FormBtn> */}
            <div className="row">
              <div className="col-4 col-md-3 col-lg-2 ml-auto mx-sm-auto">
                <button className="btn btn-block btn-success">{/* this.props.state.loading ? loader : */ "Search"}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SearchForm;