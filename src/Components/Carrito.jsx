import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import Lista from './Lista'

function Carrito() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Icon name='shop' style={{ marginLeft: '20px' }} />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon='shop' content='Libros en tu carrito' />
      <Modal.Content>
        <p>
          <Lista />
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='remove' /> Cancelar
        </Button>
        <Button color='green' onClick={() => setOpen(false)}>
          <Icon name='checkmark' /> Reservar
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default Carrito