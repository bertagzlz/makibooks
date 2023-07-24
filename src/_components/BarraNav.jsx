import {NavLink} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '_store';
import {libroActions} from "../_store";
import React, {useEffect} from "react";
export {BarraNav} ;

function BarraNav() {
    const auth = useSelector(x => x.auth.value);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    //const sizeLibros = useSelector(x => x.libros.list.size);

    /*useEffect(() => {
        dispatch(libroActions.getAll());
    }, []);*/


    // only show nav when logged in
    //if (!auth) return null;
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home" style={{'text-align': 'center'}}>
                    <img
                        alt=""
                        src={process.env.PUBLIC_URL + '/imgs/library-book.svg'}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    <p>Biblioteca</p>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                       {/*{auth ? <NavLink to="/" className="nav-item nav-link">Home</NavLink> : ''}*/}
                        {!auth ? <NavLink to="/account/login" className="nav-item nav-link">Login</NavLink> : ''}
                        <NavLink to="/" className="nav-item nav-link">Inicio</NavLink>
                        <NavLink to="/libros" className="nav-item nav-link">Nuestros Libros {/*({ sizeLibros}) ({ libros?.value?.length})*/}</NavLink>
                        {auth && auth.biblioteca === 1 ?
                            <NavDropdown title="Administrador" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#">
                                    <NavLink to="/libroslogged">Libros</NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#">
                                    <NavLink to="/users">Users</NavLink>
                                </NavDropdown.Item>
                            </NavDropdown>
                            : ''}
                        {auth ?
                            <NavDropdown title="Logout" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#">
                                    Logueado como: {auth?.name}
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#">
                                    <button onClick={logout}>Logout</button>
                                </NavDropdown.Item>
                            </NavDropdown>
                            : ''}
                    </Nav>
                    {/*<Nav>
                            <Nav.Link href="#deets">More deets</Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                Dank memes
                            </Nav.Link>
                        </Nav>*/}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
