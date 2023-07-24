import React, { useState } from 'react';
import { Button, Header, Image, Modal, Icon, Input } from 'semantic-ui-react';
import Tabla from './Tabla';
import './componentes.css';

function ModalUsuario({ open, handleClose, setOpen }) {
  const [nombre, setNombre] = useState('Pepe Pérez');
  const [usuario, setUsuario] = useState('pepel');
  const [correo, setCorreo] = useState('pepelib@example.com');
  const [telefono, setTelefono] = useState('6664441122');
  const [faltas, setFaltas] = useState('0');

  const [initialNombre, setInitialNombre] = useState(nombre);
  const [initialUsuario, setInitialUsuario] = useState(usuario);
  const [initialCorreo, setInitialCorreo] = useState(correo);
  const [initialTelefono, setInitialTelefono] = useState(telefono);
  const [initialFaltas, setInitialFaltas] = useState(faltas);

  const handleCloseModal = () => {
    setNombre(initialNombre);
    setUsuario(initialUsuario);
    setCorreo(initialCorreo);
    setTelefono(initialTelefono);
    setFaltas(initialFaltas);
    handleClose();
  };

  const handleSaveChanges = () => {
    // Realizar acciones para guardar los cambios

    // Cerrar el modal
    setOpen(false);
  };

  return (
    <div id='modalUsuario'>
      <Modal onClose={handleCloseModal} open={open}>
        <Modal.Header>Información de usuario</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Editar datos</Header>
            <Tabla
              header1='Nombre'
              header2='Usuario'
              header3='Correo electrónico'
              header4='Teléfono'
              header5='Faltas'
              data1={<Input value={nombre} onChange={(e) => setNombre(e.target.value)} />}
              data2={<Input value={usuario} onChange={(e) => setUsuario(e.target.value)} />}
              data3={<Input value={correo} onChange={(e) => setCorreo(e.target.value)} />}
              data4={<Input value={telefono} onChange={(e) => setTelefono(e.target.value)} />}
              data5={<Input value={faltas} onChange={(e) => setFaltas(e.target.value)} />}
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

export default ModalUsuario;
