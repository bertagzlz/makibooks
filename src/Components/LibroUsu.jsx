import React, { useState } from 'react';
import { Icon, Item } from 'semantic-ui-react';
import ModalEdicion from './ModalEdicion';
import ModalConfirmacion from './ModalConfirmacion';

const LibroUsu = () => {
  const [openEdicion, setOpenEdicion] = useState(false);
  const [openConfirmacion, setOpenConfirmacion] = useState(false);

  const handleCloseEdicion = () => {
    setOpenEdicion(false);
  };

  const handleCloseConfirmacion = () => {
    setOpenConfirmacion(false);
  };

  const handleOpenModalEdicion = () => {
    setOpenEdicion(true);
  };

  const handleOpenModalConfirmacion = () => {
    setOpenConfirmacion(true);
  };

  return (
    <React.Fragment>
      <Item.Group>
        <Item>
          <Item.Image size="small" src={process.env.PUBLIC_URL + '/imgs/libros/libro1.jpg'} />
          <Item.Content>
            <Item.Header>Nombre libro</Item.Header>
            <Item.Description>Descripción</Item.Description>
            <Item.Meta>Metadata</Item.Meta>
            <Item.Extra>
              <div>
                <br />
                <Icon
                  link
                  size="large"
                  name="remove"
                  style={{ color: '#F04D60', marginLeft: '70px' }}
                  onClick={handleOpenModalConfirmacion}
                />
              </div>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
      <ModalConfirmacion elemento='este libro' open={openConfirmacion} handleClose={handleCloseConfirmacion} setOpen={setOpenConfirmacion} />
    </React.Fragment>
  );
};

export default LibroUsu;
