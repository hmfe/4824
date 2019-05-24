import React from "react";
import './styles.css';

const ListItem = ({searchTerm, date, onClick}) => (
  <li>
    <span>{searchTerm}</span>
    <span>{date}</span>
    <button onClick={onClick}>X</button>
  </li>			
)

export default ListItem;