import React, {PropTypes} from 'react'
import {Segment, Header, Table} from 'semantic-ui-react'


function GameHelp() {
    return (
        <div className="GameHelp">
            <Header size="small">Game Help</Header>
            <Table>
                <Table.Row>
                    <Table.Cell>arrows</Table.Cell>
                    <Table.Cell>move</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>e</Table.Cell>
                    <Table.Cell>eat</Table.Cell>
                </Table.Row>
            </Table>
        </div>
    )
}


export default GameHelp
