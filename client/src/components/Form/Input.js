import React from "react";

export const Input = props => (
  <div className="form-group">
    {/* <label htmlFor={props.name}>{props.label}</label> */}
    {/* Alternate version, using dangerouslySetInnerHTML for the label. */}
    <label htmlFor={props.name} dangerouslySetInnerHTML={{ __html: props.label }}></label>
    <input className="form-control" {...props} />
  </div>
);
