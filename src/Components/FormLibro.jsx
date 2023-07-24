import React, { Component } from 'react'
import { Button, Checkbox, Form, Radio, Input, TextArea, Select } from 'semantic-ui-react'

class FormLibro extends Component {

  state = {
    isbn: '',
    titulo: '',
    autor: '',
    descripcion: ''
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    // Lógica para manejar la presentación del formulario
  };

  render() {

    const { isbn, titulo, autor, descripcion } = this.state;
    const categoria = [
        { key: 'a', value:'arte', text: 'Arte e ilustración' },
        { key: 'b', value:'consulta', text: 'Consulta y referencia' },
        { key: 'c', value:'divulgacion', text: 'Divulgación' },
        { key: 'd', value:'literatura', text: 'Literatura' },
        { key: 'e', value:'infantil', text: 'Infantil' },
        { key: 'f', value:'texto', text: 'Libros de texto' }
      ];
    
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Field required control={Input} label='ISBN' placeholder='ISBN' name='isbn' value={isbn} onChange={this.handleChange} />
          <Form.Field required
            control={Select}
            options={categoria}
            label={{ children: 'Categoría', htmlFor: 'form-categoria' }}
            placeholder='Categoría'
            search
            searchInput={{ id: 'form-categoria' }}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field required control={Input} label='Título' placeholder='Título' name='titulo' value={titulo} onChange={this.handleChange} />
          <Form.Field required control={Input} label='Autor' placeholder='Autor' name='autor' value={autor} onChange={this.handleChange} />
        </Form.Group>
        <Form.Field required control={TextArea} maxlength="200" label='Descripción' placeholder='Descripción' name='descripcion' value={descripcion} onChange={this.handleChange} type="number" min='100000000' max='999999999' />
        <br/>
      </Form>
    )
  }
}

export default FormLibro