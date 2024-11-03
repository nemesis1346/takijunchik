import React from "react";
import TraductorForm from "../forms/TraductorForm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getKichwaWords,
  getKichwaWordsByQuery,
  setKichwaWordDetail
} from "../../actions/KichwaVocabularyActions";
import KichwaVocabularyDetailModal from "../modals/KichwaVocabularyDetailModal";
import KichwaVocabularyTable from "../tables/KichwaVocabularyTable";
import { Message } from "semantic-ui-react";
import MDSpinner from "react-md-spinner";
import "../styles/media-lengua-page.css";
const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}
class KichwaVocabularyPage extends React.Component {
  state = {
    errors: {},
    kichwaVocabularyDetailOpen: false,
    objectDetailSize: "tiny",
    hideObjectDetail: true
  };
  constructor() {
    super();
    this.spinnerStyle = { display: "none" };
  }
  componentWillMount() {
    //Here we can call to the props
    this.props.getKichwaWords();
  }

  kichwaVocabularyDetailCloseCallback = closeAlert => {
    this.setState({
      kichwaVocabularyDetailOpen: closeAlert
    });
  };

  submit = data => {
    if (!isEmpty(data)) {
      return this.props.getKichwaWordsByQuery(data.object.trim().toLowerCase())
    } else {
      return this.props.getKichwaWords();
    }
  };

  objectSelectedCallback = objectSelected => {
    console.log('It did click in the search button')
    this.setState({
      kichwaVocabularyDetailOpen: true,
      hideSpinner: false
    });
    this.props.setKichwaWordDetail(objectSelected);
  };

  render() {

    const {
      objects,
      hideResultMessage,
      hideSpinner,
      kichwaVocabularyDetailData
    } = this.props;
    this.spinnerStyle = hideSpinner ? { display: "none" } : {};
    return (
      <div className="traductor-page-container">
        <TraductorForm submit={this.submit} objectList={objects} />
        <MDSpinner style={this.spinnerStyle} />

        <Message hidden={hideResultMessage}>
          <Message.Header>Error</Message.Header>
          <p>There is no results</p>
        </Message>

        <KichwaVocabularyTable
          objectList={objects}
          objectSelectedCallback={this.objectSelectedCallback}
        />

        {/* This is the component that pops up to show the detail and reproduce the song*/}
        <KichwaVocabularyDetailModal
          kichwaVocabularyDetailSize={this.state.objectDetailSize}
          kichwaVocabularyDetailOpen={this.state.kichwaVocabularyDetailOpen}
          kichwaVocabularyDetailData={kichwaVocabularyDetailData}
          kichwaVocabularyDetailCloseCallback={this.kichwaVocabularyDetailCloseCallback}
        />
      </div>
    );
  }
}
//This is just validation of the props
KichwaVocabularyPage.propTypes = {
  getKichwaWordsByQuery: PropTypes.func.isRequired,
  getKichwaWords: PropTypes.func.isRequired
};

const mapStateToPropsKichwaVocabularyPage = state => {
  //In this case objects is gonna be applied to the props of the component
  return {
    objects: state.kichwaVocabularyDatabaseReducer.objects,
    hideResultMessage: state.kichwaVocabularyDatabaseReducer.hideResultMessage,
    hideSpinner: state.kichwaVocabularyDatabaseReducer.hideSpinner,
    kichwaVocabularyDetailData: state.kichwaVocabularyDatabaseReducer.kichwaVocabularyDetailData
  };
};

export default connect(
  mapStateToPropsKichwaVocabularyPage,
  { getKichwaWordsByQuery, getKichwaWords, setKichwaWordDetail }
)(KichwaVocabularyPage);
