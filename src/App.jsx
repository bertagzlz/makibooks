import React from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { history } from '_helpers';
import { BarraNav, Alert, PrivateRoute } from '_components';

import { UsersLayout } from './admin/users';
import { LibrosLayout } from './admin/libros';

import { AccountLayout } from 'account';
import { Inicio, PrestamosList,Libros, WishList } from './libros';


export { App };

function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <div className="app-container bg-light">
            <BarraNav />
            <Alert />
            <div className="container pt-4 pb-4">
                <Routes>
                    {/* private */}
                    <Route element={<PrivateRoute />}>
                        <Route path="users/*" element={<UsersLayout />} />
                        <Route path="libroslogged/*" element={<LibrosLayout />} />
                    </Route>
                    {/* public */}
                    <Route path="account/*" element={<AccountLayout />} />
                    {/*<Route path="librosInicio/*" element={<LibrosInicio />} /> */}
                    <Route path="/" element={<Inicio />} />
                    <Route path="libros/deseos" element={<WishList />} />
                    <Route path="libros/prestamos" element={<PrestamosList />} />
                    <Route path="libros/*" element={<Libros />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
}
