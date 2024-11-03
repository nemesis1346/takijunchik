import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import MDSpinner from "react-md-spinner";
import TraductorForm from "../forms/TraductorForm";
import MediaLenguaDetailModal from "../modals/MediaLenguaDetailModal";
import MediaLenguaTable from "../tables/MediaLenguaTable";
import {
  getObjects,
  getObjectsByQuery,
  setObjectDetail,
  setSpinnerVisibility
} from "../../actions/FirebaseDatabaseActions";
import "../styles/media-lengua-page.css";

const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
};

class MediaLenguaPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      objectDetailOpen: false,
      objectDetailSize: "tiny",
      hideObjectDetail: true,
      hideResultMessage: true
    };
  }

  componentDidMount() {
    this.props.getObjects();
  }

  objectDetailCloseCallback = closeAlert => {
    this.setState({
      objectDetailOpen: closeAlert
    });
  };

  submit = async (data) => {
    this.props.setSpinnerVisibility(true);
    try {
      if (!isEmpty(data)) {
        await this.props.getObjectsByQuery(data.object.trim().toLowerCase());
      } else {
        await this.props.getObjects();
      }
    } finally {
      this.props.setSpinnerVisibility(false);
    }
  };

  objectSelectedCallback = objectSelected => {
    console.log('On Click search button')
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
    console.log('Media Lengua Page');
    console.log(this.props);

    return (
      <div className="main-container">
        <TraductorForm submit={this.submit} objectList={objects} />

        {hideSpinner ? null : (
          <div className="spinner-container">
            <MDSpinner />
            <span style={{ marginLeft: '4%' }}>Searching...</span>
          </div>
        )}

        <Message hidden={hideResultMessage}>
          <Message.Header>Error</Message.Header>
          <p>There are no results</p>
        </Message>

        {hideSpinner ? (
          <MediaLenguaTable
            objectList={objects}
            objectSelectedCallback={this.objectSelectedCallback}
          />
        ) : null}

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

MediaLenguaPage.propTypes = {
  getObjectsByQuery: PropTypes.func.isRequired,
  getObjects: PropTypes.func.isRequired,
  setObjectDetail: PropTypes.func.isRequired,
  objects: PropTypes.array.isRequired,
  hideResultMessage: PropTypes.bool.isRequired,
  hideSpinner: PropTypes.bool.isRequired,
  objectDetailData: PropTypes.object
};

const mapStateToProps = state => ({
  objects: state.mediaLenguaDatabaseReducer.objects,
  hideResultMessage: state.mediaLenguaDatabaseReducer.hideResultMessage,
  hideSpinner: state.mediaLenguaDatabaseReducer.hideSpinner,
  objectDetailData: state.mediaLenguaDatabaseReducer.objectDetailData
});

export default connect(
  mapStateToProps,
  { getObjectsByQuery, getObjects, setObjectDetail ,setSpinnerVisibility}
)(MediaLenguaPage);