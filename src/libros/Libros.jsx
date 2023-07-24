import React, { useState, useEffect } from 'react';
import MenuLateral from '../Components/MenuLateral';
import Libro from '../Components/Libro';
import { Divider, Header } from 'semantic-ui-react'
import './paginas.css';

import axios from "axios";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

export { Libros };

const Libros = () => {
    const auth = useSelector(x => x.auth.value);

    const menuItems = [
    { name: 'Arte e ilustración', route: '#a' },
    { name: 'Consulta y referencia', route: '#b' },
    { name: 'Divulgación', route: '#c' },
    { name: 'Literatura', route: '#d' },
    { name: 'Infantil', route: '#e' },
    { name: 'Libros de texto', route: '#f' }
  ];

    const [reservado, setReservado] = useState(0);
    const childToParent = (childdata) => {
        setReservado(childdata);
        //alert(childdata);
    }


  const [libros, setLibros] = useState([]);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_PHP}/libros/read.php`)
      .then(result => {
          setLibros(result.data.data);
          setData(result.data.data)
      })
      .catch(err=>console.log("Error en axios get: "+err))
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
        if (lowercasedValue === "") setLibros(data);
        else {
            const filteredData = libros.filter(item => {
                return Object.keys(item).some(key =>
                    excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
                );
            });
            setLibros(filteredData);
        }
    }



  return (

      <div className="p-4">
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-nav">
                    {auth ? <NavLink to="/libros/deseos" className="nav-item nav-link">Lista deseos</NavLink>:''}
                    {auth ? <NavLink to="/libros/prestamos" className="nav-item nav-link">Préstamos</NavLink>:''}
                </div>
            </nav>

            <h2>Búsqueda por campos:</h2>
            <label className="form-label">ISBN | AUTOR | CATEGORIA...</label>
            <input className="form-control"
                                        type="search"
                                        placeholder="escriba iniciales..."
                                        name="searchText"
            value={searchText}
                                        onChange={e => handleChange(e.target.value)} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0%' }}>
          {/*{!auth &&
          <div className="menu-lateral-container" style={{ position: 'fixed', left: '10%', top: '10%', width: '100%' }} >
          <MenuLateral menus={menuItems} />
        </div>} :''}*/}


        {/*<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>*/}
<div className="p-5 bg light">
          {libros && libros.map(libro =>
              <div key={libro.id}>{/* className='secciones-libros' id='a' style={{ marginTop: '14%' }}>*/}
              <br/>
              <Header as='h3'>Categoría: {libro.categoria}</Header>
                  <Libro libro={libro} childToParent={childToParent}/>
                </div>
          )}
          {!libros &&
          <div>
            <p  className="text-center">
              <div className="spinner-border spinner-border-lg align-center"></div>
            </p>
          </div>
          }
          {libros && !libros.length &&
          <div>
              <p className="p-2 text-center">No hay libros para presentar</p>
          </div>
          }
        </div>
      </div>
      </div>
      </div>
      /*</div>*/
  );
};

