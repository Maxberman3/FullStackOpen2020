import React from "react";
import {setFilter} from "../reducers/filterReducer";
import {connect} from "react-redux";

const MappedFilter = props => {
  const handleChange = event => {
    // input-field value is in variable event.target.value
    props.setFilter(event.target.value);
  };
  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  setFilter
};
const ConnectedFilter = connect(null, mapDispatchToProps)(MappedFilter);
export default ConnectedFilter;
