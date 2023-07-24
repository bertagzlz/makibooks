import axios from 'axios';
export { backend };

// array in local storage for registered users
// let users = JSON.parse(localStorage.getItem(usersKey)) || [];
//let users=getArrayUsers();
// const usersKey = 'makibooks-users';

const usersKey = 'makibooks-users';

const baseUrlUsers = `${process.env.REACT_APP_PHP}/users`;
const baseUrlLibros = `${process.env.REACT_APP_PHP}/libros`;

var users =[];
getArrayUsers();
function getArrayUsers() {
  axios.get(`${baseUrlUsers}/read.php`)
    .then((result)=>{ users= result.data.data;
    if (result.status === 200) {
      console.log(result.status); console.log("users: "+users);
    } else {console.log(result.status+" Error en lectura de usuarios");}
  });
}

var libros =[];
getArrayLibros();
var sizeLibros=-1;
function getArrayLibros() {
  axios.get(`${baseUrlLibros}/read.php`)
    .then((result)=>{
        libros= result.data.data;
        if (result.status === 200) {
            console.log(result.status+" libros: " + libros);
            sizeLibros=libros.length;
    } else {console.log(result.status+" Error en lectura de libros");}
  });
}


function backend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);
            // route functions
            function handleRoute() {
                switch (true) {

                    //   U S U A R I O S
                    case url.endsWith('/users/authenticate.php') && opts.method === 'POST':
                        return authenticate();
                    case url.endsWith('/users/register.php') && opts.method === 'POST':
                        return register();
                    case url.endsWith('/users/create.php') && opts.method === 'POST':
                        return create();
                    case url.endsWith('/users/read.php') && opts.method === 'GET':
                        return getUsers();

                    //   NO SE USA: SÓLO UPDATE O CREATE
                    //case url.match(/\/users\/\d+$/) && opts.method === 'GET':
                    case url.match('/users/read.php/') && opts.method === 'GET':
                        return getUserById();
                    //case url.match(/\/users\/\d+$/) && opts.method === 'PUT':
                    case url.match('/users/update') && opts.method === 'PUT':
                        return updateUser();
                    //case url.match(/\/users\/\d+$/) && opts.method === 'DELETE':
                    case url.match('/users/delete') && opts.method === 'DELETE':
                        return deleteUser();

                    //   L I B R O S
                    // `${baseUrl}/create.php`, libro
                    case url.endsWith('/libros/create.php') && opts.method === 'POST':
                        return createLibro();
                    // `${baseUrl}/read.php`
                    case url.endsWith('/libros/read.php') && opts.method === 'GET':
                        return getLibros();
                    // `${baseUrl}/read.php/${id}`
                    case url.match('/libros/read.php?') && opts.method === 'GET':
                        return getLibroById();
                    // `${baseUrl}/update.php/${id}`, data
                    case url.match('/libros/update.php/') && opts.method === 'PUT':
                        return updateLibro();
                    // `${baseUrl}/delete.php/${id}`
                    case url.match('/libros/delete.php/') && opts.method === 'DELETE':
                        return deleteLibro();
                    // `${baseUrl}/read-reservados.php/${id}`
                    case url.match('/libros/read-reservados.php/') && opts.method === 'GET':
                        return getAllReservados();
                    // `${baseUrl}/delete-reserva.php/${objUserLibro.idUser}/${objUserLibro.idLibro}`
                    case url.match('/libros/delete-reserva.php') && opts.method === 'DELETE':
                        return deleteReserva();
                    // `${baseUrl}/update-reserva.php/${id}`, data
                    case url.match('/libros/update-reserva.php') && opts.method === 'PUT':
                        return updateReserva();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            //   U S E R S
            function authenticate() {
                const { email, password } = body();
                const sendData = { email:email, password:password }
                axios.post(`${baseUrlUsers}/authenticate.php`, sendData)
                    .then((result) => {
                        if (result.status === 200) {
                            console.log(result.status);
                            if (!result.data.ok) {
                                return error('Username or password is incorrect');
                            } else {
                                const user = users.find(x => x.email === email);
                                return ok({
                                    ...basicDetails(user),
                                    token: result.data.token //'fake-jwt-token'
                                });
                            }
                        } else {
                            alert('Invalid User');
                        }
                    });
            }
            function register() {
                let user = body(); // name apellidos email password

                if (users.find(x => x.email === user.email)) {
                    return error('Username "' + user.email + '" is already taken')
                }

                //{ "ok": true, "message": "You have successfully registered.", "id": "23" }
                axios.post(`${baseUrlUsers}/register.php`,user)
                    .then((result)=> {
                        if (result.status === 200) { // standard response
                            console.log("register status: "+result.status);
                            user.id=Number(result.data.id);
                            users.push(user);
                            localStorage.setItem(usersKey, JSON.stringify(users));
                            return ok();
                        }
                        else  {
                            alert('Invalid register');
                        }
                    });
            }

            //   C R U D
            function create() {
                const user = body(); // name apellidos email password....
                if (users.find(x => x.email === user.email)) {
                    return error('Username "' + user.email + '" is already taken')
                }
                //{ "ok": true, "message": "You have successfully registered.", "id": "23" }
                axios.post(`${baseUrlUsers}/create.php`,user)
                    .then((result)=> {
                        if (result.status === 201) { // standard response
                            console.log("register status: "+result.status);
                            console.log("create message: "+result.data.message);
                            user.id=Number(result.data.id);;
                            users.push(user);
                            localStorage.setItem(usersKey, JSON.stringify(users));
                            return ok();
                        }
                        else  {
                            alert('Invalid create');
                        }
                    });
            }
            function getUsers() {
                if (!isAuthenticated()) return unauthorized();
                return ok(users.map(x => basicDetails(x)));
            }
            function getUserById() {
                if (!isAuthenticated()) return unauthorized();

                const user = users.find(x => x.id === idFromUrl(1));
                return ok(basicDetails(user));
            }
            function updateUser() {
                if (!isAuthenticated()) return unauthorized();
                let params = body();
                let user = users.find(x => x.id === idFromUrl(1));
                // only update password if entered
                if (!params.password) {
                    delete params.password;
                }
                // if email changed check if taken
                if (params.email !== user.email && users.find(x => x.email === params.email)) {
                    return error('Email "' + params.email + '" ya en uso')
                }
                // update and save user
                Object.assign(user, params);
                //const baseUrl = `${process.env.REACT_APP_PHP}/users`;
                axios.put(`${baseUrlUsers}/update.php`,user)
                    .then((result)=> {
                        if (result.status === 200) { // standard response
                            console.log("update status: "+result.status);
                        }
                        else  {
                            alert('Invalid update');
                        }
                    });
                localStorage.setItem(usersKey, JSON.stringify(users));
                return ok();
            }
            function deleteUser() {
                if (!isAuthenticated()) return unauthorized();
                //const baseUrl = `${process.env.REACT_APP_PHP}/users`;
                // el php lo tengo configurado para coger por GET
                axios.delete(`${baseUrlUsers}/delete.php?id=`+idFromUrl(1),{data:{id:idFromUrl(1)}})
                    .then((result)=> {
                        if (result.status === 200) { // standard response
                            console.log("delete status: "+result.status);
                            console.log("delete success: "+result.data.success);
                            console.log("delete message: "+result.data.message);
                        }
                        else  {
                            alert('Invalid delete');
                        }
                    });
                users = users.filter(x => x.id !== idFromUrl(1));
                localStorage.setItem(usersKey, JSON.stringify(users));
                return ok();
            }

            // //   C R U D   L I B R O S
            function createLibro() {
                const libro = body(); // name apellidos email password....

                //{ "ok": true, "message": "You have successfully registered.", "id": "23" }
                const baseUrl = `${process.env.REACT_APP_PHP}/libros`;
                let id=-1;
                axios.post(`${baseUrl}/create.php`,libro)
                    .then((result)=> {
                        if (result.status === 201) { // standard response
                            console.log("register status: "+result.status);
                            console.log("create message: "+result.data.message);
                            id= Number(result.data.id);
                            if ( id !== -1) {
                                libro.id=id;
                                //user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
                                libros.push(libro);
                                //localStorage.setItem(usersKey, JSON.stringify(users));
                                return ok();
                            } else {
                                return error("No se ha podido crear al libro");
                            }
                        }
                        else  {
                            alert('Invalid create');
                        }
                    });
            }
            function getLibros() {
                //if (!isAuthenticated()) return unauthorized();
                axios.get(`${baseUrlLibros}/read.php`)
                    .then((result)=>{
                        libros= result.data.data;
                        if (result.status === 200) {
                            console.log(result.status+" libros: " + libros);
                            sizeLibros=libros.length;
                            return ok(libros.map(x => basicDetailsLibro(x)));
                        } else {console.log(result.status+" Error en lectura de libros");}
                    });

            }
            function getLibroById() {
                if (!isAuthenticated()) return unauthorized();

                const libro = libros.find(x => x.id === idFromUrl(1));
                return ok(basicDetailsLibro(libro));
            }
            function updateLibro() {
                if (!isAuthenticated()) return unauthorized();
                let params = body();
                let libro = libros.find(x => x.id === idFromUrl(1));
                // only update password if entered
                if (!params.isbn) {
                    delete params.isbn;
                }
                // if email changed check if taken
                /*if (params.email !== user.email && users.find(x => x.email === params.email)) {
                    return error('Email "' + params.email + '" ya en uso')
                }*/
                // update and save user
                Object.assign(libro, params);

                axios.put(`${baseUrlLibros}/update-libro.php`,libro)
                    .then((result)=> {
                        if (result.status === 200) { // standard response
                            console.log("update status: "+result.status);
                        }
                        else  {
                            alert('Invalid update');
                        }
                    });
                //localStorage.setItem(usersKey, JSON.stringify(users));
                return ok();
            }
            function deleteLibro() {
                if (!isAuthenticated()) return unauthorized();
                // el php lo tengo configurado para coger por GET
                axios.delete(`${baseUrlLibros}/delete.php?id=`+idFromUrl(1))
                    .then((result)=> {
                        if (result.status === 200) { // standard response
                            console.log("delete status: "+result.status);
                            console.log("delete success: "+result.data.success);
                            console.log("delete message: "+result.data.message);
                        }
                        else  {
                            alert('Invalid delete');
                        }
                    });
                libros = libros.filter(x => x.id !== idFromUrl(1));
                //localStorage.setItem(usersKey, JSON.stringify(users));
                return ok();
            }

            function getAllReservados() {
                if (!isAuthenticated()) return unauthorized();
                axios.get(`${baseUrlLibros}/read-reservados.php?iduser=`+idFromUrl(1))
                    .then((result)=> {
                        if (result.status === 200) { // standard response
                            console.log("read reservados STATUS: "+result.status);
                            if (result.data.success===1) {
                                libros=result.data.data;
                                return ok(libros.map(x => basicDetailsLibroReservado(x)));
                            } else if (result.data.success===0) { //No record found
                                return error('No hay libros reservados');
                            }
                        }
                        else  {
                            alert('Invalid read reservados');
                        }
                    });
            }
            function deleteReserva() {
                let idUser =  idFromUrl(2);
                let idLibro = idFromUrl(1);
                axios.delete(`${baseUrlLibros}/delete-reserva.php?iduser=`+idUser+'&idlibro='+idLibro)
                    .then((result)=> {
                        if (result.status === 200) { // standard response
                            console.log("delete reserva: "+result.status+" delete success: "+result.data.success+" delete message: "+result.data.message);
                            return ok();
                        }
                        else  {
                            alert('Invalid delete-reserva');
                        }
                    });
            }
            function updateReserva() {
                if (!isAuthenticated()) return unauthorized();
                let params = body();
                axios.put(`${baseUrlLibros}/update-reserva.php`,params)
                    .then((result)=> {
                        if (result.status === 200) { // standard response
                            console.log("update status: "+result.status);
                        }
                        else  {
                            alert('Invalid update');
                        }
                    });
                return ok();
            }


            // helper functions

            function ok(body) {
                resolve({ ok: true, ...headers(), json: () => Promise.resolve(body) })
            }

            function unauthorized() {
                resolve({ status: 401, ...headers(), json: () => Promise.resolve({ message: 'Unauthorized' }) })
            }

            function error(message) {
                resolve({ status: 400, ...headers(), json: () => Promise.resolve({ message }) })
            }

            function basicDetails(user) {
                const { id, email, name, apellidos, biblioteca, faltas } = user;
                return { id, email, name, apellidos, biblioteca, faltas };
            }
            function basicDetailsLibro(libro) {
                const { id, isbn, autor, titulo, categoria, descripcion, imagen } = libro;
                return { id, isbn, autor, titulo, categoria, descripcion, imagen };
            }
            function basicDetailsLibroReservado(reserva) {
                const { id, isbn, autor, titulo, categoria, descripcion, imagen , id_reserva, id_usuario, tiempo } = reserva;
                return { id, isbn, autor, titulo, categoria, descripcion, imagen, id_reserva , id_usuario, tiempo };
            }

            function isAuthenticated() {
                let token='Bearer '+JSON.parse(localStorage.getItem("auth")).token;
                return opts.headers['Authorization'] === token; //'Bearer fake-jwt-token';
            }

            function body() {
                return opts.body && JSON.parse(opts.body);
            }

            // caso normal debe valer 1
            function idFromUrl(pos) {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - pos]);
            }

            function headers() {
                return {
                    headers: {
                        get(key) {
                            return ['application/json'];
                        }
                    }
                }
            }
        });
    }
}
