import React from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class KichwaVocabularyTable extends React.Component {
  constructor() {
    super();
    this.selectRowProp = {
      mode: "radio",
      clickToSelect: true,
      onSelect: this.onRowSelect
    };
  }

  onRowSelect = (row, isSelected, e) => {
    this.props.objectSelectedCallback(row);
  };

  render() {
    return (
      <BootstrapTable
        data={this.props.objectList}
        selectRow={this.selectRowProp}
      >
        <TableHeaderColumn width="200" dataField="objectId" isKey={true} hidden={true}>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn width="200" dataField="mediaLenguaContent">
          Kichwa
        </TableHeaderColumn>
        <TableHeaderColumn width="200" dataField="spanishContent">
          Spanish
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

KichwaVocabularyTable.propTypes = {
  objectList: PropTypes.array.isRequired,
  objectSelectedCallback: PropTypes.func.isRequired
};

export default KichwaVocabularyTable;
