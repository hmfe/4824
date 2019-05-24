import React from "react";
import "./styles.css";
import PropTypes from "prop-types";

const ListItem = ({ searchInput, date, onClick }) => (
  <li>
    <span>{searchInput}</span>
    <span>{date}</span>
    <button className="button__remove-item" onClick={onClick}>
      X
    </button>
  </li>
);

ListItem.propTypes = {
  searchInput: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ListItem;
