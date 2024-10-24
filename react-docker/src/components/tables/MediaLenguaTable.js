import React, { useState } from "react";
import PropTypes from "prop-types";
import { Table, Form } from "react-bootstrap";
// TODO: figure what I wanted to do with the checkbox

const ObjectTable = ({ objectList, objectSelectedCallback }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleRowSelect = (objectId) => {
    setSelectedId(objectId);
    const selectedObject = objectList.find(obj => obj.objectId === objectId);
    objectSelectedCallback(selectedObject);
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {/* <th style={{ width: "50px" }}></th> */}
          <th>Media Lengua</th>
          <th>Spanish</th>
          <th>Kichwa</th>
          <th>Elicit Sentence</th>
          <th>IPA</th>
        </tr>
      </thead>
      <tbody>
        {objectList.map((obj) => (
          <tr key={obj.objectId} onClick={() => handleRowSelect(obj.objectId)}>
            {/* <td>
              <Form.Check
                type="radio"
                checked={selectedId === obj.objectId}
                onChange={() => {}}
              />
            </td> */}
            <td>{obj.mediaLenguaContent}</td>
            <td>{obj.spanishContent}</td>
            <td>{obj.kichwaContent}</td>
            <td>{obj.elicitSentenceContent}</td>
            <td>{obj.ipaContent}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

ObjectTable.propTypes = {
  objectList: PropTypes.array.isRequired,
  objectSelectedCallback: PropTypes.func.isRequired
};

export default ObjectTable;