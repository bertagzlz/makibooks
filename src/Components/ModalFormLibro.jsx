import React, { useState } from 'react';
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react';
import FormLibro from './FormLibro';

function ModalFormLibro({ open, handleClose }) {
  const [modalOpen, setModalOpen] = useState(open);

  const handleCloseModal = () => {
    handleClose();
    setModalOpen(false);
  };

  return (
    <Modal
      onClose={handleCloseModal}
      open={modalOpen}
      trigger={
        <div onClick={() => setModalOpen(true)}>
          <Button style={{ backgroundColor: "#5779E3", color: 'white' }}>Añadir libro</Button>
        </div>
      }
    >
      <Modal.Header>Agregar un nuevo libro</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <FormLibro />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setModalOpen(false)}>
          Cancelar
        </Button>
        <Button type='submit' style={{ backgroundColor: "#5779E3", color: 'white' }} onClick={() => setModalOpen(false)}>Agregar</Button>

      </Modal.Actions>
    </Modal>
  );
}

export default ModalFormLibro;
