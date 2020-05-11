import React from "react";
import TraductorForm from "../forms/TraductorForm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getObjects,
  getObjectsByQuery,setObjectDetail 
} from "../../actions/FirebaseDatabaseActions";
import MediaLenguaDetailModal from "../modals/MediaLenguaDetailModal";
import MediaLenguaTable from "../tables/MediaLenguaTable";
import { Message } from "semantic-ui-react";
import MDSpinner from "react-md-spinner";
import "../styles/traductorPageStyle.css";
const  isEmpty=(obj)=> {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
class MediaLenguaPage extends React.Component {
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
      if(!isEmpty(data)){
        return this.props.getObjectsByQuery(data.object.trim().toLowerCase())
      }else{
        return this.props.getObjects();
      }
    };

  objectSelectedCallback = objectSelected => {
    this.setState({
      objectDetailOpen: true,
    });
    this.props.setObjectDetail(objectSelected);
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
        <TraductorForm submit={this.submit} objectList={objects} />

        <Message hidden={hideResultMessage}>
          <Message.Header>Error</Message.Header>
          <p>There is no results</p>
        </Message>

        <MediaLenguaTable
          objectList={objects}
          objectSelectedCallback={this.objectSelectedCallback}
        />
        <MDSpinner style={this.spinnerStyle} />

        {/* This is the component that pops up to show the detail and reproduce the song*/}
        <MediaLenguaDetailModal
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
MediaLenguaPage.propTypes = {
  getObjectsByQuery: PropTypes.func.isRequired,
  getObjects: PropTypes.func.isRequired
};

const mapStateToPropsTraductorPage = state => {
  //In this case objects is gonna be applied to the props of the component
  return {
    objects: state.mediaLenguaDatabaseReducer.objects,
    hideResultMessage: state.mediaLenguaDatabaseReducer.hideResultMessage,
    hideSpinner: state.mediaLenguaDatabaseReducer.hideSpinner,
    objectDetailData:state.mediaLenguaDatabaseReducer.objectDetailData
  };
};

export default connect(
  mapStateToPropsTraductorPage,
  { getObjectsByQuery, getObjects,setObjectDetail }
)(MediaLenguaPage);
