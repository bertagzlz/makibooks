import React, {useEffect, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { libroActions } from '_store';
import {unwrap} from "idb";

export { PrestamosList };

function PrestamosList() {
    const libros = useSelector(x => x.libros.list);
    const auth = useSelector(x => x.auth.value);
    const dispatch = useDispatch();
    const [deleted, setDeleted]=useState(0);

    useEffect(() => {
        //if (!deleted)
            dispatch(libroActions.getAllReservados(auth.id));
        //dispatch(libroActions.getAllReservados(auth.id));
        setDeleted(0);
    //}, [deleted]);
    }, [deleted]);

    function myTimeout() {
        setDeleted(0);
        const timeoutId = setTimeout(function () {
            setDeleted(1);
            clearTimeout(timeoutId);
        }, 500);
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
            <h1>Libros prestados ({ libros?.value?.length})</h1>
            <hr />
            {/*<Link to="add" className="btn btn-sm btn-success mb-2">Add libro</Link>*/}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>ISBN</th>
                        <th style={{ width: '30%' }}>Autor</th>
                        <th style={{ width: '30%' }}>Título</th>
                        {/*<th style={{ width: '30%' }}>Categoría</th>
                        <th style={{ width: '30%' }}>Descripción</th>*/}
                        {/*<th style={{ width: '30%' }}>Imagen</th>*/}
                        <th style={{ width: '10%' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {/*libros.value es un array*/}
                    {libros?.value?.map(libro =>
                        <tr key={libro.id}>
                            <td>{libro.isbn}</td>
                            <td>{libro.autor}</td>
                            <td>{libro.titulo}</td>
                            {/*<td>{libro.categoria}</td>
                            <td>{libro.descripcion}</td>*/}
                            {/*<td>{libro.imagen}</td>*/}
                            <td style={{ whiteSpace: 'nowrap' }}>
                                {/*<Link to={`edit/${libro.id}`} className="btn btn-sm btn-primary me-1">Solicitar ampliación</Link>*/}

                                <button onClick={() =>
                                {
                                    dispatch(libroActions.updateReserva(
                                        {id:libro.id_reserva, data:{id_reserva:libro.id_reserva,tiempo:14}}
                                        )
                                    ).unwrap();
                                    alert("Se amplía 7 días mas su préstamo");
                                    //setDeleted(1);
                                }
                                }
                                        className="btn btn-sm btn-primary me-1" disabled={libro.isDeleting}>
                                    {libro.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Solicitar ampliación</span>
                                    }
                                </button>


                                <button onClick={() =>
                                {
                                    localStorage.removeItem("reservado-"+auth.id+"-"+libro.id);
                                    myTimeout();
                                    dispatch(libroActions.deleteReserva({idUser:auth.id,idLibro:libro.id}));
                                    //setDeleted(0);
                                }
                                }
                                        className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={libro.isDeleting}>
                                    {libro.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Devolver</span>
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
