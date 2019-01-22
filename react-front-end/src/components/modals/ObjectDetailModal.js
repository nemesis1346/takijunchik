import React from "react";
import { Modal, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUrlSoundAction } from "../../actions/SoundActions";

const style = {
  marginLeft: "30%",
  padding: "16px"
};

class ObjectDetailModal extends React.Component {
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
      nextProps.objectDetailData.objectId != null &&
      nextProps.objectDetailData.objectId != ""
    ) {
      nextProps.getUrlSoundAction(nextProps.objectDetailData.objectId);
    }
  }

  show = size => () => this.setState({ size });

  close = () => {
    this.props.objectDetailCloseCallback(false);
  };

  render() {
    const { objectDetailSize, objectDetailOpen, objectDetailData,audioUrl } = this.props;

    return (
      <Modal
        style={style}
        size={objectDetailSize}
        open={objectDetailOpen}
        onClose={this.close}
      >
        <Modal.Header>Detalle</Modal.Header>
        <Modal.Content>
          <div>
            <div>
              <b>Media Lengua: </b> {objectDetailData.mediaLenguaContent}
            </div>
            <div>
              <b>Spanish Content: </b> {objectDetailData.spanishContent}
            </div>
            <div>
              <b>Kichwa Content: </b> {objectDetailData.kichwaContent}
            </div>
            <div>
              <b>Elicit Sentence Content: </b>{" "}
              {objectDetailData.elicitSentenceContent}
            </div>
            <div>
              <b>Ipa Content: </b> {objectDetailData.ipaContent}
            </div>
          </div>
          <audio controls>
              <source src={audioUrl} type="audio/mp3" />
          </audio>
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

ObjectDetailModal.propTypes = {
  objectDetailSize: PropTypes.string.isRequired,
  objectDetailData: PropTypes.object.isRequired
};

const mapStateToPropsObjectDetailModal = state => {
  //In this case objects is gonna be applied to the props of the component
  return {
    audioUrl: state.databaseReducer.audioUrl,
  };
};

export default connect(
    mapStateToPropsObjectDetailModal,
  { getUrlSoundAction }
)(ObjectDetailModal);
