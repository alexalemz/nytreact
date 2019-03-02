import React, { Component } from "react";
import { Input, TextArea, FormBtn } from "../../components/Form";

class SearchForm extends Component {

  render() {
    return (
      <div className="card">
        <h3 className="card-header">Search</h3>
        <div className="card-body">
          <form onChange={this.props.handleInputChange} onSubmit={this.props.handleFormSubmit}>
            <Input name="topic" id="topic" label="Topic" value={this.props.state.topic} />
            <Input name="startYear" id="startYear" label="Start Year (optional)" value={this.props.state.startYear} />
            <Input name="endYear" id="endYear" label="End Year (optional)" value={this.props.state.endYear} />
            <FormBtn>Search</FormBtn>
          </form>
        </div>
      </div>
    )
  }
}

export default SearchForm;