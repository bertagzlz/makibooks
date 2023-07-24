import React, { Component } from 'react'
import { Button, Checkbox, Form, Radio, Input } from 'semantic-ui-react'

class Registro extends Component {

  state = {
    nombre: '',
    apellidos: '',
    nombreUsuario: '',
    telefono: '',
    correoElectronico: '',
    contrasena: '',
    repetirContrasena: '',
    aceptoTerminos: false,
    value: "1",
    errores: {}
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (this.state.errores[name]) {
      let errores = this.state.errores;
      delete errores[name];
      this.setState({ errores });
    }
  }

  handleChangeRadio = (e, { value }) => this.setState({ value })

  handleCheckboxChange = (e, { name, checked }) => this.setState({ [name]: checked });

  handleSubmit = (e) => {
    e.preventDefault();
    let errores = {};
    if (this.state.nombre === '') {
      errores.nombre = 'Nombre obligatorio';
    }
    if (this.state.apellidos === '') {
      errores.apellidos = 'Apellidos obligatorios';
    }
    if (this.state.nombreUsuario === '') {
      errores.nombreUsuario = 'Nombre de usuario obligatorio';
    }
    if (this.state.telefono === '') {
      errores.telefono = 'Teléfono obligatorio';
    }
    if (this.state.correoElectronico === '') {
      errores.correoElectronico = 'Correo electrónico obligatorio';
    }
    if (this.state.contrasena === '') {
      errores.contrasena = 'Contraseña obligatorio';
    }
    if (this.state.repetirContrasena === '') {
      errores.repetirContrasena = 'Contraseña obligatorio';
    }
    if (!this.state.aceptoTerminos) {
      errores.aceptoTerminos = 'Debes aceptar los términos y condiciones';
    }
    this.setState({ errores });
    const isValid = Object.keys(errores).length === 0;
    if (isValid) {
      // Aquí se realizaría la acción de registro
      console.log('Registro exitoso');
    }
  }

  render() {
    const { value, nombre, apellidos, nombreUsuario, telefono, correoElectronico, contrasena, repetirContrasena, aceptoTerminos, errores } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Field error={errores.nombre} control={Input} label='Nombre' placeholder='Nombre' name='nombre' value={nombre} onChange={this.handleChange} />
          <Form.Field error={errores.apellidos} control={Input} label='Apellidos' placeholder='Apellidos' name='apellidos' value={apellidos} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field error={errores.nombreUsuario} control={Input} label='Nombre de usuario' placeholder='Nombre de usuario' name='nombreUsuario' value={nombreUsuario} onChange={this.handleChange} />
          <Form.Field error={errores.telefono} control={Input} label='Teléfono' placeholder='Teléfono' name='telefono' value={telefono} onChange={this.handleChange} type="number" min='100000000' max='999999999' />
        </Form.Group>
        <Form.Field error={errores.correoElectronico} control={Input} label='Correo electrónico' placeholder='Correo electrónico' name='correoElectronico' value={correoElectronico} onChange={this.handleChange} />
        <Form.Group widths='equal'>
          <Form.Field error={errores.contrasena} type='password' control={Input} label='Contraseña' placeholder='Contraseña' name='contrasena' value={contrasena} onChange={this.handleChange} />
          <Form.Field error={errores.repetirContrasena} type='password' control={Input} label='Repetir contraseña' placeholder='Contraseña' name='repetirContrasena' value={repetirContrasena} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group inline>
          <label>Soy</label>
          <Form.Field
            control={Radio}
            label='Lector'
            value='1'
            checked={value === '1'}
            onChange={this.handleChangeRadio}
            name='soy'
          />
          <Form.Field
            control={Radio}
            label='Biblioteca'
            value='2'
            checked={value === '2'}
            onChange={this.handleChangeRadio}
            name='soy'
          />
        </Form.Group>
        <Form.Field 
          control={Checkbox} 
          label='Acepto los términos y condiciones' 
          name='aceptoTerminos' 
          checked={aceptoTerminos} 
          onChange={this.handleCheckboxChange}
          error={errores.aceptoTerminos && {
            content: errores.aceptoTerminos,
            pointing: 'left'
          }}
        />
        <br/>
        <Button type='submit' style={{ backgroundColor: "#5779E3", color: 'white' }}>Registrarse</Button>
      </Form>
    )
  }
}

export default Registro