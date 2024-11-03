import React from "react";
import { Modal, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUrlSoundAction } from "../../actions/SoundActions";
import AudioPlayer from "react-h5-audio-player";

const style = {
  marginLeft: "30%",
  padding: "16px"
};

class MediaLenguaDetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      open: false,
      size: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.objectDetailData.objectId !== prevProps.objectDetailData.objectId &&
      this.props.objectDetailData.objectId != null &&
      this.props.objectDetailData.objectId !== ""
    ) {
      this.props.getUrlSoundAction(this.props.objectDetailData.objectId);
    }

    if (this.props.audioUrl !== prevProps.audioUrl) {
      console.log('CHANGED');
    }
  }

  show = size => () => this.setState({ size });

  close = () => {
    this.props.objectDetailCloseCallback(false);
  };

  render() {
    const { objectDetailSize, objectDetailOpen, objectDetailData, audioUrl } = this.props;
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
            <div><b>Media Lengua Content: </b> {objectDetailData.mediaLenguaContent}</div>
            <div><b>Spanish Content: </b> {objectDetailData.spanishContent}</div>
            <div><b>Kichwa Content: </b> {objectDetailData.kichwaContent}</div>
            <div><b>Elicit Sentence Content: </b> {objectDetailData.elicitSentenceContent}</div>
            <div><b>Ipa Content: </b> {objectDetailData.ipaContent}</div>
          </div>
          <AudioPlayer
            autoPlay
            src={audioUrl}
            onPlay={e => console.log("onPlay")}
          />
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

MediaLenguaDetailModal.propTypes = {
  objectDetailSize: PropTypes.string.isRequired,
  objectDetailOpen: PropTypes.bool.isRequired,
  objectDetailData: PropTypes.object.isRequired,
  objectDetailCloseCallback: PropTypes.func.isRequired,
  getUrlSoundAction: PropTypes.func.isRequired,
  audioUrl: PropTypes.string
};

const mapStateToProps = state => ({
  audioUrl: state.mediaLenguaDatabaseReducer.audioUrl,
});

export default connect(
  mapStateToProps,
  { getUrlSoundAction }
)(MediaLenguaDetailModal);