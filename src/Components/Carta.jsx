import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const Carta = ({ titulo, contenido, link, imagen }) => (
  <Card style={{ textAlign: 'left', maxWidth: '250px', fontSize: '14px', margin: '10px',  boxShadow: '0 0  0 2px rgb(255,255,255), 0.3em 0.3em 1em rgba(0,0,0,0.3)' }}>
    <Image src={imagen} wrapped ui={false}  />
    <Card.Content>
      <Card.Header style={{ color: "#F04D60" }}>{titulo}</Card.Header>
      <br/>
      <Card.Description>{contenido}</Card.Description>
      <br/><br/>
      <a style={{ color: "#5779E3" }}>{link}</a>
    </Card.Content>
  </Card>
)

export default Carta