import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


class ObjectTable extends React.Component {
    constructor() {
        super();
        this.selectRowProp = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: this.onRowSelect,
        };
    }

    onRowSelect = (row, isSelected, e) => {

        this.props.objectSelectedCallback(row);
    }

    render() {
        console.log(this.props);

        return (
            <BootstrapTable data={this.props.objectList} selectRow={this.selectRowProp}>
                <TableHeaderColumn width='200' dataField='mediaLenguaContent' isKey>Media Lengua</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='spanishContent'>Spanish</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='kichwaContent'>Kichwa</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='elicitSentenceContent'>Elicit Sentence</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='ipaContent'>Ipa</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

ObjectTable.propTypes = {
    objectList: PropTypes.array.isRequired,
    objectSelectedCallback: PropTypes.func.isRequired
}

export default ObjectTable;