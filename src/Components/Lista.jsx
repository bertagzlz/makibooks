import React from 'react'
import { Comment } from 'semantic-ui-react'

const Lista = () => (
  <Comment.Group>
    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Nombre libro</Comment.Author>
        <Comment.Text>
          <p>Nombre autor</p>
        </Comment.Text>
      </Comment.Content>
    </Comment>
  </Comment.Group>
)

export default Lista