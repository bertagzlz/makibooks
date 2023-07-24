import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '_store';

export { List };

function List() {
    const users = useSelector(x => x.users.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    return (
        <div>
            <h1>Users ({ users?.value?.length})</h1>
            <Link to="add" className="btn btn-sm btn-success mb-2">Add User</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Nombre</th>
                        <th style={{ width: '30%' }}>Apellidos</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '30%' }}>Administrador</th>
                        <th style={{ width: '30%' }}>Faltas</th>
                        <th style={{ width: '10%' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.value?.map(user =>
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.apellidos}</td>
                            <td>{user.email}</td>
                            <td>{user.biblioteca}</td>
                            <td>{user.faltas}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`edit/${user.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                                <button onClick={() => dispatch(userActions.delete(user.id))}
                                        className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Borrar</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {users?.loading &&
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
