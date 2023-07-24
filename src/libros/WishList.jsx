import React, {useEffect, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Icon, Item} from "semantic-ui-react";
import {useSelector} from "react-redux";
//import { useSelector, useDispatch } from 'react-redux';

//import { libroActions } from '_store';
//import {createAsyncThunk} from "@reduxjs/toolkit";

export { WishList };

function WishList() {
    const auth = useSelector(x => x.auth.value);
    //let libros = JSON.parse(localStorage.getItem("wishList")) || [];
    //const dispatch = useDispatch();
    const [wishList, setWishList] = useState(0);
    const [removingWL,setRemovingWL]=useState(false);
    const [libros,setLibros]=useState(JSON.parse(localStorage.getItem("wishList-"+auth.id)) || []);

    useEffect(() => {
     //libros = JSON.parse(localStorage.getItem("wishList")) || [];
        //dispatch(libroActions.getAllWishList());
    }, []);


    function _removeWL(id) {
        setRemovingWL(true);
        const timeoutId = setTimeout(function(){
            setRemovingWL(false);
            clearTimeout(timeoutId);
        }, 500);

        const librosFiltered=libros.filter(x => x.id !==id);
        setLibros(librosFiltered);
        // update local storage
        localStorage.removeItem('wishList-'+auth.id);
        localStorage.setItem('wishList-'+auth.id, JSON.stringify(librosFiltered));
    }

    return (
        <div className="p-4">
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-nav">
                    <NavLink to="/libros/deseos" className="nav-item nav-link">Lista deseos</NavLink>
                    {auth ? <NavLink to="/libros/prestamos" className="nav-item nav-link">Préstamos</NavLink>:''}
                </div>
            </nav>
            <h1>Libros de mi lista de deseos ({libros.length})</h1>
            <hr />
            <table className="table table-striped">
                <thead>
                    <tr>
                        {/*<th style={{ width: '30%' }}>ISBN</th>*/}
                        <th>Autor</th>
                        <th>Título</th>
                        <th>Categoría</th>
                        <th>Descripción</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/*{libros?.value?.map(libro =>  no funciona....*/}
                    {libros && libros.map(libro =>
                        <tr key={libro.id}>
                            <td>{libro.autor}</td>
                            <td>{libro.titulo}</td>
                            <td>{libro.categoria}</td>
                            <td>{libro.descripcion}</td>
                            <td><Item.Image size="small" src={process.env.PUBLIC_URL + libro.imagen} />
                            </td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                {/*<Link to={`edit/${libro.id}`} className="btn btn-sm btn-primary me-1">Remove form WishList</Link>*/}
                                <Icon
                                    link
                                    size="large"
                                    name="like"
                                    style={{ color: '#F09960', marginLeft: '10px',marginRight: '20px' }}
                                /*    onClick={() => addToWishList(libro.libro)}*/
                                >
                                    {/*<span className="cart wishlist" style={{ color: "white" }}>{wishList}</span>*/}
                                </Icon>
                                <button onClick={() => _removeWL(libro.id)} className="btn btn-sm btn-danger"
                                        style={{ width: '60px' }} disabled={removingWL}>
                                    {removingWL
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Quitar</span>
                                    }
                                </button>
                            </td>

                        </tr>
                    )}
                    {libros?.loading &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
        </div>
    );
}
