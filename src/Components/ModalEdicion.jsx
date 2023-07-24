import React, { useState } from 'react';
import { Button, Header, Image, Modal, Input } from 'semantic-ui-react';
import Tabla from './Tabla';
import './componentes.css';

function ModalEdicion({ open, handleClose, setOpen }) {
  const [initialIsbn, setInitialIsbn] = useState('9788432103456');
  const [initialTitulo, setInitialTitulo] = useState('Enciclopedia de historia');
  const [initialAutor, setInitialAutor] = useState('Laura González');
  const [initialCategoria, setInitialCategoria] = useState('Consulta y referencia');
  const [initialDescripcion, setInitialDescripcion] = useState('Una enciclopedia exhaustiva que abarca diferentes períodos y eventos históricos.');

  const [isbn, setIsbn] = useState(initialIsbn);
  const [titulo, setTitulo] = useState(initialTitulo);
  const [autor, setAutor] = useState(initialAutor);
  const [categoria, setCategoria] = useState(initialCategoria);
  const [descripcion, setDescripcion] = useState(initialDescripcion);

  const handleCloseModal = () => {
    setIsbn(initialIsbn);
    setTitulo(initialTitulo);
    setAutor(initialAutor);
    setCategoria(initialCategoria);
    setDescripcion(initialDescripcion);
    handleClose();
  };

  const handleSaveChanges = () => {
    // Realizar acciones para guardar los cambios

    // Cerrar el modal
    setOpen(false);
  };

  return (
    <div id='modalEdicion'>
      <Modal onClose={handleCloseModal} open={open}>
        <Modal.Header>Editar información</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <Tabla
              header1='ISBN'
              header2='Título'
              header3='Autor'
              header4='Categoría'
              header5='Descripción'
              data1={<Input value={isbn} onChange={(e) => setIsbn(e.target.value)} />}
              data2={<Input value={titulo} onChange={(e) => setTitulo(e.target.value)} />}
              data3={<Input value={autor} onChange={(e) => setAutor(e.target.value)} />}
              data4={<Input value={categoria} onChange={(e) => setCategoria(e.target.value)} />}
              data5={<Input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            content='Guardar cambios'
            onClick={handleSaveChanges}
            style={{ backgroundColor: "#5779E3", color: 'white' }}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalEdicion;
