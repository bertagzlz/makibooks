import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'semantic-ui-react'
import './componentes.css'
import {
  useNavigate
} from "react-router-dom";
import axios from 'axios';


const Login = ({ onIdentificar, url }) => {

  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [recordar, setRecordar] = useState(false);
  const [errores, setErrores] = useState({});

  const handleChange = (e, { name, value }) => {
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: null }));
    }
    switch (name) {
      case 'usuario':
        setUsuario(value);
        break;
      case 'contrasena':
        setContrasena(value);
        break;
      case 'recordar':
        setRecordar(!recordar);
        break;
      default:
        break;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errores = {};
    if (!usuario) {
      errores.usuario = 'Nombre de usuario o correo obligatorio';
    }
    if (!contrasena) {
      errores.contrasena = 'Contraseña obligatoria';
    }
    setErrores(errores);
    const isValid = Object.keys(errores).length === 0;
    if (isValid) {
      // Aquí se realizaría la acción de iniciar sesión
      console.log('Login exitoso');
    }
  };

  const login = () => {
    let nombre = document.getElementById("nombre").value;
    let clave = document.getElementById("clave").value;

    var sendData = {
        email:nombre,
        password:clave
    }
    /*const cabecera = {
        method:'POST',
        headers: { 'Content-Type': 'application/json'},             
        body: JSON.stringify({ accion:'entrar', usuario: sendData })
      };
      fetch(url, cabecera)
      .then(response => response.json())
      .then(result => {

        if (result.status===200) {
          console.log(result.data);*/
          /* esto es result.data:
                * { "success": 1,
                    "message": "You have successfully logged in.",
                    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2hvbWVcL2phdmFwcm9qZWN0c1wvZWNsaXBzZS1wcm9qZWN0c1wvMjAyMy0wNS0xMS1yZWFjdC1waHAtdGFuaWFcL3JlYWN0LXBocC1sb2dpblwvcGhwLWFwaVwvIiwiYXVkIjoiaHR0cDpcL1wvbG9jYWxob3N0XC9ob21lXC9qYXZhcHJvamVjdHNcL2VjbGlwc2UtcHJvamVjdHNcLzIwMjMtMDUtMTEtcmVhY3QtcGhwLXRhbmlhXC9yZWFjdC1waHAtbG9naW5cL3BocC1hcGlcLyIsImlhdCI6MTY4NDM0Nzg4NywiZXhwIjoxNjg0MzUxNDg3LCJkYXRhIjp7InVzZXJfaWQiOjE2fX0.jFt258wuFe5EnNIyL51WhYfaIQJlHdYz71VpmbFbAoc"
                }
                * */
       /*   alert(result.data);
            onIdentificar({"email":usuario.nombre,"token":result.data.token});
            Navigate('/');
        }else{
            console.log("Error on result.status calling to API")
        }});*/

    axios.post('http://localhost/home/javaprojects/eclipse-projects/2023-05-11-react-php-tania/react-php-login/php-api/login.php',sendData)
        .then((result)=>{
          /* esto es result.data:
          * { "success": 1,
              "message": "You have successfully logged in.",
              "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2hvbWVcL2phdmFwcm9qZWN0c1wvZWNsaXBzZS1wcm9qZWN0c1wvMjAyMy0wNS0xMS1yZWFjdC1waHAtdGFuaWFcL3JlYWN0LXBocC1sb2dpblwvcGhwLWFwaVwvIiwiYXVkIjoiaHR0cDpcL1wvbG9jYWxob3N0XC9ob21lXC9qYXZhcHJvamVjdHNcL2VjbGlwc2UtcHJvamVjdHNcLzIwMjMtMDUtMTEtcmVhY3QtcGhwLXRhbmlhXC9yZWFjdC1waHAtbG9naW5cL3BocC1hcGlcLyIsImlhdCI6MTY4NDM0Nzg4NywiZXhwIjoxNjg0MzUxNDg3LCJkYXRhIjp7InVzZXJfaWQiOjE2fX0.jFt258wuFe5EnNIyL51WhYfaIQJlHdYz71VpmbFbAoc"
          }
          * */
          if (result.status === 200) {
            console.log(result.status);
            window.localStorage.setItem('email', sendData.email,'esAdmin',result.data.esAdmin);
            onIdentificar({"email":sendData.email,"token":result.data.token});
            //Navigate('/');
            //window.localStorage.setItem('userName', (result.data.name+ ' ' +result.data.apellidos ));
            //navigate(-1); // va a firefox, anterior a InicioAdmin
            if (result.data.esAdmin===1) {
              navigate(`/Admin`);
            }
            else {
              navigate(`/`);
            }
            //return <div className="Welcome">Welcome {sendData.email}</div>;
          }
          else  {
            //props.history.push('/Inicio')
            //props.history.push('/Inicio') Redirect
            return <div className="Welcome">No existe el usuario</div>;
            //alert('Invalid User');
          }
        })


  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field
          fluid
          control={Input}
          error={errores.usuario}
          label="Usuario o correo electrónico"
          placeholder="Usuario o correo electrónico"
          id="nombre"
          name="usuario"
          value={usuario}
          onChange={handleChange}
        />
        <Form.Field
          fluid
          control={Input}
          error={errores.contrasena}
          label="Contraseña"
          type="password"
          placeholder="Contraseña"
          id="clave"
          name="contrasena"
          value={contrasena}
          onChange={handleChange}
        />
        <Form.Field
          control={Checkbox}
          label="Recordar contraseña"
          name="recordar"
          checked={recordar}
          onChange={handleChange}
        />
        <br/>
        <Button type='submit' style={{ backgroundColor: "#5779E3", color: 'white' }} onClick={ login } >Entrar</Button>
      </Form>
    </div>
  );
};

export default Login;
