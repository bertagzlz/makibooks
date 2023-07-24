import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { libroActions } from '_store';

export { List };

function List() {
    const libros = useSelector(x => x.libros.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(libroActions.getAll());
    }, []);

    return (
        <div>
            <h1>Libros ({ libros?.value?.length})</h1>
            <hr />
            <Link to="add" className="btn btn-sm btn-success mb-2">Add libro</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>ISBN</th>
                        <th style={{ width: '30%' }}>Autor</th>
                        <th style={{ width: '30%' }}>Título</th>
                        <th style={{ width: '30%' }}>Categoría</th>
                        <th style={{ width: '30%' }}>Descripción</th>
                        <th style={{ width: '30%' }}>Imagen</th>
                        <th style={{ width: '10%' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {libros?.value?.map(libro =>
                        <tr key={libro.id}>
                            <td>{libro.isbn}</td>
                            <td>{libro.autor}</td>
                            <td>{libro.titulo}</td>
                            <td>{libro.categoria}</td>
                            <td>{libro.descripcion}</td>
                            <td>{libro.imagen}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`edit/${libro.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                                <button onClick={() => dispatch(libroActions.delete(libro.id))}
                                        className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={libro.isDeleting}>
                                    {libro.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Borrar</span>
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
    );
}
