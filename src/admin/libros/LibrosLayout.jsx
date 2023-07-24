import { Routes, Route } from 'react-router-dom';

import { List, PrestamosList, AddEdit } from './index';
import {Alert} from "../../_components";
import React from "react";

export { LibrosLayout };

function LibrosLayout() {
    return (
        <div className="p-4">
            <div className="container">
                <Alert />
                <Routes>
                    <Route index element={<List />} />
                    <Route path="add" element={<AddEdit />} />
                    <Route path="edit/:id" element={<AddEdit />} />
                </Routes>
            </div>
        </div>
    );
}


