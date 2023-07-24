import React, {useEffect, useState} from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import './componentes.css'
import { history } from '../_helpers';
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { libroActions, alertActions } from '_store';
import NavDropdown from "react-bootstrap/NavDropdown";

export {FormBusqueda};

const FormBusqueda = () => {

  let libros = useSelector(x => x.libros.list);
  const dispatch = useDispatch();

  //const [libros, setLibros] = useState([]);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
  dispatch(libroActions.getAll());
  setData(libros)
}, []);

  // exclude column list from filter
  const excludeColumns = ["id", "imagen"];

// handle change event of search input
const handleChange = value => {
  setSearchText(value);
  filterData(value);
};

// filter records by search text
const filterData = (value) => {
  const lowercasedValue = value.toLowerCase().trim();
  if (lowercasedValue === "") libros=data;
  else {
    const filteredData = libros.filter(item => {
      return Object.keys(item).some(key =>
          excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
      );
    });
    libros=filteredData;
  }
}

    return (



        <div>
    <h2>Búsqueda por campos:</h2>
    <label className="form-label">ISBN | AUTOR | CATEGORIA...</label>
    <input className="form-control"
           type="search"
           placeholder="escriba iniciales..."
           name="searchText"
           value={searchText}
           onChange={e => handleChange(e.target.value)} />
        </div>

    )
};
