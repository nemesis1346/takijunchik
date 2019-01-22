import React from "react";
import TraductorForm from "../forms/TraductorForm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { translateFirebaseAction } from "../../actions/TranslateActions";
import {
  saveObjectDatabase,
  getObjects,
  saveObjectFirestore
} from "../../actions/FirebaseDatabaseActions";
import ObjectDetailModal from "../modals/ObjectDetailModal";
import ObjectTable from "../forms/ObjectTable";
import { Message } from "semantic-ui-react";
import MDSpinner from "react-md-spinner";
import "../styles/traductorPageStyle.css";

class TraductorPage extends React.Component {
  state = {
    errors: {},
    objectDetailOpen: false,
    objectDetailSize: "tiny",
    hideObjectDetail: true
  };
  constructor() {
    super();
    this.spinnerStyle = { display: "none" };
  }
  componentWillMount() {
    //Here we can call to the props
    this.props.getObjects();
  }

  objectDetailCloseCallback = closeAlert => {
    this.setState({
      objectDetailOpen: closeAlert
    });
  };

  submit = data => {
    // return this.props.TranslateFirebase(data.object.trim().toLowerCase())
  };

  objectSelectedCallback = objectSelected => {
    console.log("PAGE");
    console.log(objectSelected);
    this.setState({
      objectDetailOpen: true,
      objectDetailData: objectSelected
    });
  };

  render() {
    const {
      objects,
      hideResultMessage,
      hideSpinner,
      objectDetailData
    } = this.props;
    this.spinnerStyle = hideSpinner ? { display: "none" } : {};

    return (
      <div className="traductor-page-container">
        {/* Submit is the callback */}
        <TraductorForm submit={this.submit} objectList={objects} />

        <Message hidden={hideResultMessage}>
          <Message.Header>Error</Message.Header>
          <p>There is no results</p>
        </Message>

        <ObjectTable
          objectList={objects}
          objectSelectedCallback={this.objectSelectedCallback}
        />
        <MDSpinner style={this.spinnerStyle} />

        {/* This is the component that pops up to show the detail and reproduce the song*/}
        <ObjectDetailModal
          objectDetailSize={this.state.objectDetailSize}
          objectDetailOpen={this.state.objectDetailOpen}
          objectDetailData={objectDetailData}
          objectDetailCloseCallback={this.objectDetailCloseCallback}
        />
      </div>
    );
  }
}
//This is just validation of the props
TraductorPage.propTypes = {
  translateFirebaseAction: PropTypes.func.isRequired,
  getObjects: PropTypes.func.isRequired
};

const mapStateToPropsTraductorPage = state => {
  //In this case objects is gonna be applied to the props of the component
  return {
    objects: state.databaseReducer.objects,
    hideResultMessage: state.databaseReducer.hideResultMessage,
    hideSpinner: state.databaseReducer.hideSpinner
  };
};

export default connect(
  mapStateToPropsTraductorPage,
  { translateFirebaseAction, getObjects }
)(TraductorPage);
