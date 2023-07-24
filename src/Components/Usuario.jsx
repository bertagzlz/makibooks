import React from 'react';
import { Icon, Item } from 'semantic-ui-react';
import ModalConfirmacion from './ModalConfirmacion';
import ModalUsuario from './ModalUsuario';

const Usuario = () => {
  const [openUsuario, setOpenUsuario] = React.useState(false);
  const [openConfirmacion, setOpenConfirmacion] = React.useState(false);

  const handleClose = () => {
    setOpenUsuario(false);
    setOpenConfirmacion(false);
  };

  return (
    <React.Fragment>
      <Item.Group>
        <Item>
          <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
          <Item.Content verticalAlign='middle'>
            <Item.Header as='a'>Nombre Apellidos</Item.Header>
          </Item.Content>
        </Item>
      </Item.Group>
      <Icon
        link
        size="large"
        name="edit"
        style={{ color: '#F04D60', marginLeft: '24%' }}
        onClick={() => setOpenUsuario(true)}
      />
      <Icon
        link
        size="large"
        name="remove user"
        style={{ color: '#F04D60'}}
        onClick={() => setOpenConfirmacion(true)}
      />
      <ModalUsuario open={openUsuario} handleClose={handleClose} setOpen={setOpenUsuario} />
      <ModalConfirmacion elemento='al usuario' open={openConfirmacion} handleClose={handleClose} setOpen={setOpenConfirmacion} />
    </React.Fragment>
  );
};

export default Usuario;
