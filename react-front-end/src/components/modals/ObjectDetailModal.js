import React from "react";
import { Modal, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUrlSound } from "../../actions/SoundActions";

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

  show = size => () => this.setState({ size });

  close = () => {
    this.props.objectDetailCloseCallback(false);
  };

  onPlay = () => {
    console.log("play");
  };

  render() {
    console.log(this.props);
    const { objectDetailSize, objectDetailOpen, objectDetailData } = this.props;
    console.log(objectDetailData.audioUrl);
    if (
      objectDetailData.objectId != null &&
      objectDetailData.objectId != ""
    ) {
      this.props.getUrlSound(objectDetailData.audioUrl);
    }
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
          {/* <source src="https://firebasestorage.googleapis.com/v0/b/media-lengua.appspot.com/o/soundFiles%2Fe0cbdcf2-1e04-11e9-ba81-c5eb05e90385.mp3?alt=media&token=23c62de0-6a69-4d8b-888c-6db45c46c920" type="audio/mp3" /> */}

            <source src={objectDetailData.audioUrl} type="audio/mp3" />
          </audio>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Play"
            onClick={this.onPlay}
          />
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

export default connect(
  null,
  { getUrlSound }
)(ObjectDetailModal);
