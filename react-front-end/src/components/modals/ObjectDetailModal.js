import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
const style = {
    marginLeft: '30%',
    padding: '16px'
};

class ObjectDetailModal extends React.Component {

    constructor() {
        super();
        this.state = {
            message: "",
            open: false,
            size: ""
        }
    }

    show = size => () => this.setState({ size })

    close = () => {
        this.props.objectDetailCloseCallback(false);
    }

    onPlay = () => {
        console.log('play');
    }

    render() {
        console.log(this.props);
        const {objectDetailSize, objectDetailOpen,objectDetailData} = this.props;
        return (
            <Modal style={style} size={objectDetailSize} open={objectDetailOpen} onClose={this.close}>
                <Modal.Header>Detalle</Modal.Header>
                <Modal.Content>
                    <div>
                        <div>
                            <b>Media Lengua: </b> {objectDetailData.mediaLenguaContent}
                        </div>
                        <div>
                            <b>Spanish Content: </b>  {objectDetailData.spanishContent}
                        </div>
                        <div>
                            <b>Kichwa Content: </b> {objectDetailData.kichwaContent}
                        </div>
                        <div>
                            <b>Elicit Sentence Content: </b> {objectDetailData.elicitSentenceContent}
                        </div>
                        <div>
                            <b>Ipa Content: </b>  {objectDetailData.ipaContent}
                        </div>
                    </div>
                    <audio controls>
                        <source src={objectDetailData.audioUrl} type="audio/mp3"></source>
                    </audio>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive icon='checkmark' labelPosition='right' content='Play' onClick={this.onPlay} />
                    <Button positive icon='checkmark' labelPosition='right' content='Close' onClick={this.close} />
                </Modal.Actions>
            </Modal>
        );
    }
}

ObjectDetailModal.propTypes = {
    objectDetailSize: PropTypes.string.isRequired,
    objectDetailData: PropTypes.object.isRequired
}

export default ObjectDetailModal;