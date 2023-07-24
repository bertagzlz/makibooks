import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authActions } from '_store';
import { fetchWrapper } from '_helpers';

// create slice

const name = 'libros';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const libroActions = { ...slice.actions, ...extraActions };
export const librosReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        list: null,
        item: null
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_PHP}/libros`;

    return {
        create:create(),
        getAll: getAll(),
        getAllReservados: getAllReservados(),
        getById: getById(),
        update: update(),
        delete: _delete(),
        deleteReserva: _deleteReserva(), //con esto no borrA La reserva ??????
        updateReserva: updateReserva()
    };
    function create() {
        return createAsyncThunk(
            `${name}/create`,
            async (libro) => await fetchWrapper.post(`${baseUrl}/create.php`, libro)
        );
    }

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await fetchWrapper.get(`${baseUrl}/read.php`)
        );
    }

    function getById() {
        return createAsyncThunk(
            `${name}/getById`,
            async (id) => await fetchWrapper.get(`${baseUrl}/read.php/${id}`)
        );
    }

    function update() {
        return createAsyncThunk(
            `${name}/update`,
            async function ({ id, data }, { getState, dispatch }) {
                await fetchWrapper.put(`${baseUrl}/update.php/${id}`, data);

                // update stored user if the logged in user updated their own record
               /* const auth = getState().auth.value;
                if (id === auth?.id.toString()) {
                    // update local storage
                    const user = { ...auth, ...data };
                    localStorage.setItem('auth', JSON.stringify(user));

                    // update auth user in redux state
                    dispatch(authActions.setAuth(user));
                }*/
            }
        );
    }

    // prefixed with underscore because delete is a reserved word in javascript
    function _delete() {
        return createAsyncThunk(
            `${name}/delete`,
            async function (id, { getState, dispatch }) {
                await fetchWrapper.delete(`${baseUrl}/delete.php/${id}`);
                // auto logout if the logged in user deleted their own record
                /*if (id === getState().auth.value?.id) {
                    dispatch(authActions.logout());
                }*/
            }
        );
    }
    function getAllReservados() {
        return createAsyncThunk(
            `${name}/getAllReservados`,
            async (id) => await fetchWrapper.get(`${baseUrl}/read-reservados.php/${id}`)
        );
    }
    // prefixed with underscore because delete is a reserved word in javascript
    function _deleteReserva() {
        return createAsyncThunk(
            `${name}/deleteReserva`,
            async function (objUserLibro) {
                await fetchWrapper.delete(`${baseUrl}/delete-reserva.php/${objUserLibro.idUser}/${objUserLibro.idLibro}`);
            }
        );
    }
    function updateReserva() {
        return createAsyncThunk(
            `${name}/updateReserva`,
            async function ({id, data}) {
                await fetchWrapper.put(`${baseUrl}/update-reserva.php/${id}`, data);
            }
        );
    }
}

function createExtraReducers() {
    return (builder) => {
        getAll();
        getAllReservados();
        getById();
        _delete();
        //_deleteReserva();

        function getAll() {
            var { pending, fulfilled, rejected } = extraActions.getAll;
            builder
                .addCase(pending, (state) => {
                    state.list = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.list = { value: action.payload };
                })
                .addCase(rejected, (state, action) => {
                    state.list = { error: action.error };
                });
        }
        function getAllReservados() {
            var { pending, fulfilled, rejected } = extraActions.getAllReservados;
            builder
                .addCase(pending, (state) => {
                    state.list = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.list = { value: action.payload };
                })
                .addCase(rejected, (state, action) => {
                    state.list = { error: action.error };
                });
        }
        function getById() {
            var { pending, fulfilled, rejected } = extraActions.getById;
            builder
                .addCase(pending, (state) => {
                    state.item = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.item = { value: action.payload };
                })
                .addCase(rejected, (state, action) => {
                    state.item = { error: action.error };
                });
        }
        function _delete() {
            var { pending, fulfilled, rejected } = extraActions.delete;
            builder
                .addCase(pending, (state, action) => {
                    const libro = state.list.value.find(x => x.id === action.meta.arg);
                    libro.isDeleting = true;
                })
                .addCase(fulfilled, (state, action) => {
                    state.list.value = state.list.value.filter(x => x.id !== action.meta.arg);
                })
                .addCase(rejected, (state, action) => {
                    const libro = state.list.value.find(x => x.id === action.meta.arg);
                    libro.isDeleting = false;
                });
        }
        function _deleteReserva() {
            var { pending, fulfilled, rejected } = extraActions.deleteReserva;
            builder
                .addCase(pending, (state, action) => {
                    const libro = state.list.value.find(x => x.id === action.meta.arg);
                    libro.isDeleting = true;
                })
                .addCase(fulfilled, (state, action) => {
                    state.list.value = state.list.value.filter(x => x.id !== action.meta.arg);
                })
                .addCase(rejected, (state, action) => {
                    const libro = state.list.value.find(x => x.id === action.meta.arg);
                    libro.isDeleting = false;
                });
        }
    }
}
