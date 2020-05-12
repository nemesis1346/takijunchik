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
    console.log('NEXT PROPS');
    if (
      nextProps.kichwaVocabularyDetailData.objectId != null &&
      nextProps.kichwaVocabularyDetailData.objectId != ""
    ) {
    }

  }

  show = size => () => this.setState({ size });

  close = () => {
    this.props.kichwaWordDetailCloseCallback(false);
  };

  render() {
    console.log('RENDER');
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
              <b>Spanish Content: </b> {kichwaVocabularyDetailData.spanishContent}
            </div>
            <div>
              <b>Kichwa Content: </b> {kichwaVocabularyDetailData.kichwaContent}
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
