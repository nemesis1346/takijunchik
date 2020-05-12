import React from "react";
import { Modal, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const style = {
  marginLeft: "30%",
  padding: "16px"
};

class KichwaVocabularyDetailModal extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "",
      open: false,
      size: ""
    };
  }


  componentWillReceiveProps(nextProps) {
    if (
      nextProps.kichwaVocabularyDetailData.id != null &&
      nextProps.kichwaVocabularyDetailData.id != ""
    ) {
    }

  }

  show = size => () => this.setState({ size });

  close = () => {
    this.props.kichwaWordDetailCloseCallback(false);
  };

  render() {
    const { kichwaVocabularyDetailSize, kichwaVocabularyDetailOpen, kichwaVocabularyDetailData } = this.props;
    return (
      <Modal
        style={style}
        size={kichwaVocabularyDetailSize}
        open={kichwaVocabularyDetailOpen}
        onClose={this.close}
      >
        <Modal.Header>Detalle</Modal.Header>
        <Modal.Content>
          <div>
            <div>
              <b>Spanish: </b> {kichwaVocabularyDetailData.spanish}
            </div>
            <div>
              <b>Kichwa: </b> {kichwaVocabularyDetailData.kichwa1}
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Close"
            onClick={this.close}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

KichwaVocabularyDetailModal.propTypes = {
  kichwaVocabularyDetailSize: PropTypes.string.isRequired,
  kichwaVocabularyDetailData: PropTypes.object.isRequired
};

const mapStateToPropsMediaLenguaDetailModal = state => {
  //In this case objects is gonna be applied to the props of the component
  return {
  };
};

export default connect(
  mapStateToPropsMediaLenguaDetailModal,
  {  }
)(KichwaVocabularyDetailModal);
