import React from 'react';
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react';
import Tabla from './Tabla';
import './componentes.css'

function ModalConfirmacion({ open, handleClose, setOpen, elemento }) {

    const handleCloseModal = () => { // actualizar el nombre de la función
        handleClose(); // actualizar la llamada a la función
      }
  
    return (
      <div id='modalConfirmacion'>
        <Modal
          basic
          size='small'
          onClose={handleCloseModal}
          open={open}
        >
          <Header icon>
            <Icon name='warning sign' />
          <br/>
            ¿Estas seguro que deseas eliminar {elemento}? 
          </Header>
          <Modal.Content>
            <p style={{ textAlign: 'center' }}>
              El elemento se eliminará de manera permamente.
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={() => setOpen(false)}>
              <Icon name='remove' /> No
            </Button>
            <Button color='blue' inverted onClick={() => setOpen(false)}>
              <Icon name='checkmark' /> Sí
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
  );
}

export default ModalConfirmacion;
