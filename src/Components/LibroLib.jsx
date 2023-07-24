import React, { useState } from 'react';
import { Icon, Item } from 'semantic-ui-react';
import ModalEdicion from './ModalEdicion';
import ModalConfirmacion from './ModalConfirmacion';

const LibroLib = () => {
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
                  style={{ color: '#F04D60', marginLeft: '10px' }}
                  onClick={handleOpenModalConfirmacion}
                />
                <Icon
                  link
                  size="large"
                  name="edit"
                  style={{ color: '#F04D60', marginLeft: '20px' }}
                  onClick={handleOpenModalEdicion}
                />
              </div>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
      <ModalEdicion open={openEdicion} handleClose={handleCloseEdicion} setOpen={setOpenEdicion} />
      <ModalConfirmacion elemento='este libro' open={openConfirmacion} handleClose={handleCloseConfirmacion} setOpen={setOpenConfirmacion} />
    </React.Fragment>
  );
};

export default LibroLib;
