import React, {useEffect, useState} from 'react';
import { Icon, Item } from 'semantic-ui-react';
import ModalLibro from './ModalLibro';
import { Button } from 'semantic-ui-react';
import axios from "axios";
import {useSelector} from "react-redux";

  //const Libro = ( libro, childToParent) => {
export default function Libro ( libro, childToParent) {

  const auth = useSelector(x => x.auth.value);

  const [open, setOpen] = useState(false);
  const handleClose = () => { setOpen(false); };
  const handleOpenModal = () => { setOpen(true); };
  const [reservado, setReservado] = useState(0);
  const [wishList, setWishList] = useState(0);

  const reservar = async (idLibro) => {
    const idUser = JSON.parse(localStorage.getItem("auth")).id;
    if (idUser===null || idUser===undefined) {alert ("No está logueado para reservar libro");}
    else {

    const baseUrl = `${process.env.REACT_APP_PHP}/libros`;

    const libro = {iduser: idUser, idlibro: idLibro, tiempo: 7};
    await axios.post(`${baseUrl}/reservar.php`, libro)
        .then((result) => {
          if (result.status === 201) { // standard response
            console.log("reserva status: " + result.status);
            //id = result.data.id;
            //setReservado(1);
          } else {
            alert('Invalid reserva');
          }
        });
    }
  }
  const liberar = async (idLibro) => {
    const idUser = JSON.parse(localStorage.getItem("auth")).id;
    if (idUser===null || idUser===undefined) {alert ("No está logueado para liberar este libro");}
    else {
      const baseUrl = `${process.env.REACT_APP_PHP}/libros`;
      let id = -1;
      const libro = {iduser: idUser, idlibro: idLibro};
      await axios.delete(`${baseUrl}/delete-reserva.php?iduser=`+idUser+'&idlibro='+idLibro, {data:libro})
          .then((result)=> {
            if (result.status === 200) { // standard response
              console.log("delete status: "+result.status);
              console.log("delete success: "+result.data.success);
              console.log("delete message: "+result.data.message);
              //id= result.data.id;
              //setReservado(0);
            }
            else  {
              alert('Invalid delete');
            }
          });
    }
  }
  useEffect(() => {
    checkWWishList();
    checkReservado();
  }, []);

  function isAuthenticated() {
    if (localStorage.hasOwnProperty("auth")){
      let token=JSON.parse(localStorage.getItem("auth")).token;
      return (auth.token === token)
    } else { return false;}
  }

  function checkWWishList() {
    // array in local storage for registered users
    //if(localStorage.getItem('auth') === undefined || localStorage.getItem('auth')===null){
    if(!isAuthenticated()){
      return;
    }
    const idUser = JSON.parse(localStorage.getItem("auth")).id;
    let libros = JSON.parse(localStorage.getItem("wishList-"+idUser)) || [];

    const newArr = libros.map(x => (x !==null && x.id===libro.libro.id) ? 1 : 0 );
    const existe = libros.find(x => x.id===libro.libro.id);
    if  (existe ===undefined) {
      setWishList(0)
    } else {
      setWishList(1)
    }
  }
  function checkReservado() {
    if(!isAuthenticated()){
      return;
    }
    const item=localStorage.getItem("reservado-"+auth.id+"-"+libro.libro.id);
    if (item === undefined || item===null){
      setReservado(0);
    } else {
      setReservado(1)
    }
  }

  function addToremoveFromLSWishList() {
    // array in local storage for registered users
    const idUser = JSON.parse(localStorage.getItem("auth")).id;
    let libros = JSON.parse(localStorage.getItem("wishList-"+idUser)) || [];

    if (wishList) {
      setWishList(0);
      libros=libros.filter(x => x.id !==libro.libro.id);

    } else {
      setWishList(1);
      libros.push(libro.libro);
    }
    localStorage.removeItem("wishList-"+idUser);
    localStorage.setItem("wishList-"+idUser, JSON.stringify(libros));
  }
  function addToremoveFromLSReservados() {
    let libroLS = JSON.parse(localStorage.getItem("reservado-"+auth.id+"-"+libro.libro.id)) || [];

    if (reservado && (libroLS !==undefined || libroLS !==null)) {
      setReservado(0);
      localStorage.removeItem("reservado-"+auth.id+"-"+libro.libro.id);
      liberar(libro.libro.id)
    } else {
      setReservado(1);
      localStorage.setItem("reservado-"+auth.id+"-"+libro.libro.id, JSON.stringify(libro.libro));
      reservar(libro.libro.id);
    }
  }
  return (
    <React.Fragment>
      <Item.Group>
        <Item>
          {/*<Item.Image size="small" src={`${process.env.PUBLIC_URL}/imgs/book_1.jpg`} />*/}
          <Item.Image size="small" src={process.env.PUBLIC_URL + libro.libro.imagen} />
          <Item.Content>
            <Item.Header>{libro.libro.autor}</Item.Header>
            <Item.Meta>ISBN: {libro.libro.isbn}</Item.Meta>
            <Item.Header>{libro.libro.titulo}</Item.Header>
            <Item.Description>{libro.libro.descripcion}</Item.Description>

            <Item.Extra>
              <div>
                <br />
                {auth && auth.biblioteca===0 ?
                <Icon
                  link
                  size="large"
                  name="like"
                  style={{ color: '#F09960', marginLeft: '10px',marginRight: '20px' }}
                  onClick={() => addToremoveFromLSWishList()}>
                  <span className="cart wishlist" style={{ color: "white" }}>
                    {wishList}
                  </span>
                </Icon>
                    :''}

                {auth && auth.biblioteca===0 ?
                <Icon
                  link
                  size="large"
                  name="shop"
                  style={{ color: '#F04D60', marginLeft: '10px',marginRight: '20px' }}
                  value="hello!"
                  onClick={() => { addToremoveFromLSReservados()}}>
                  <span className="cart" style={{ color: "white" }}>
                    {reservado}
                  </span>
                </Icon>
                :''}
                {/*onClick={e => alert(e.target.value)}*/}
                {/*onClick={handleOpenModal}*/}
                {/*<Button primary onClick={() => childToParent(1)}>Click Child</Button>*/}
                {/*{auth && {reservado} ?
                <Button primary onClick={() => liberar(libro.libro.id)}>Liberar Reserva</Button>
               :''}*/}
              </div>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
      {/*<ModalLibro open={open} handleClose={handleClose} setOpen={setOpen} />*/}
    </React.Fragment>
  );
};

//export default Libro;
