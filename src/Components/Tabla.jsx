import React from 'react'
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'

const Tabla = ({ header1, header2, header3, header4, header5, data1, data2, data3, data4, data5 }) => (
  <Table compact celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>{header1}</Table.HeaderCell>
        <Table.HeaderCell>{header2}</Table.HeaderCell>
        <Table.HeaderCell>{header3}</Table.HeaderCell>
        <Table.HeaderCell>{header4}</Table.HeaderCell>
        <Table.HeaderCell>{header5}</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>{data1}</Table.Cell>
        <Table.Cell>{data2}</Table.Cell>
        <Table.Cell>{data3}</Table.Cell>
        <Table.Cell>{data4}</Table.Cell>
        <Table.Cell>{data5}</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export default Tabla