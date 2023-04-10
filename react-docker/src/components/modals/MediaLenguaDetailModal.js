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
      nextProps.objectDetailData.objectId != null &&
      nextProps.objectDetailData.objectId != ""
    ) {
      nextProps.getUrlSoundAction(nextProps.objectDetailData.objectId);
    }

    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.audioUrl !== this.state.audioUrl) {
      console.log('CHANGED');
    }
  }

  show = size => () => this.setState({ size });

  close = () => {
    this.props.objectDetailCloseCallback(false);
  };

  render() {
    console.log('RENDER');
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
            <div>
              <b>Media Lengua Content: </b> {objectDetailData.mediaLenguaContent}
            </div>
            <div>
              <b>Spanish Content: </b> {objectDetailData.spanishContent}
            </div>
            <div>
              <b>Kichwa Content: </b> {objectDetailData.kichwaContent}
            </div>
            <div>
              <b>Elicit Sentence Content: </b>
              {objectDetailData.elicitSentenceContent}
            </div>
            <div>
              <b>Ipa Content: </b> {objectDetailData.ipaContent}
            </div>
          </div>
          <AudioPlayer
            autoPlay
            src={audioUrl}
            onPlay={e => console.log("onPlay")}
          // other props here
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
  objectDetailData: PropTypes.object.isRequired
};

const mapStateToPropsMediaLenguaDetailModal = state => {
  //In this case objects is gonna be applied to the props of the component
  return {
    audioUrl: state.mediaLenguaDatabaseReducer.audioUrl,
  };
};

export default connect(
  mapStateToPropsMediaLenguaDetailModal,
  { getUrlSoundAction }
)(MediaLenguaDetailModal);
