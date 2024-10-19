import React, { useState } from "react";
import PropTypes from "prop-types";
import { Table, Form } from "react-bootstrap";

const KichwaVocabularyTable = ({ objectList, objectSelectedCallback }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleRowSelect = (id) => {
    setSelectedId(id);
    const selectedObject = objectList.find(obj => obj.id === id);
    objectSelectedCallback(selectedObject);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{ width: "50px" }}></th>
          <th>Kichwa</th>
          <th>Spanish</th>
        </tr>
      </thead>
      <tbody>
        {objectList.map((obj) => (
          <tr key={obj.id} onClick={() => handleRowSelect(obj.id)}>
            <td>
              <Form.Check
                type="radio"
                checked={selectedId === obj.id}
                onChange={() => {}}
              />
            </td>
            <td>{obj.spanish}</td>
            <td>{obj.kichwa1}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

KichwaVocabularyTable.propTypes = {
  objectList: PropTypes.array.isRequired,
  objectSelectedCallback: PropTypes.func.isRequired
};

export default KichwaVocabularyTable;