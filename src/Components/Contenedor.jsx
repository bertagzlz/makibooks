import React from 'react'
import { Container, Header } from 'semantic-ui-react'

const Contenedor = ({ titulo, contenido }) => (
  <Container text textAlign='left' style={{ backgroundColor: "#F5F9FA", width: '35%', padding: '2% 5% 2% 5%' }}>
    <Header as='h1'>{titulo}</Header>
    {contenido}
  </Container>
)

export default Contenedor