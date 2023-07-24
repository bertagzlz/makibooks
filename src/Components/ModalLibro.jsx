import React from 'react';
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react';

function ModalLibro({ open, handleClose, setOpen }) {

    const handleCloseModal = () => { // actualizar el nombre de la función
        handleClose(); // actualizar la llamada a la función
      }
  
    return (
      <Modal
        onClose={handleCloseModal}
        open={open}
        trigger={
            <div onClick={() => setOpen(true)}>
              {/*<Icon name='cart' />*/}
            </div>
          }
      >
      <Modal.Header>Reservar libro</Modal.Header>
      <Modal.Content image>
        <Image size='small' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
        <Modal.Description>
          <Header>¿Deseas reservar este libro?</Header>
          <p>
            Nombre del libro
          </p>
          <p>Descripción del libro</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button
          content="Reservar"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default ModalLibro;
