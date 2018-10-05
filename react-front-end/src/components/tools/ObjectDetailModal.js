import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

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

    close = () => this.setState({ open: false })

    onOkButton = () => {
        this.props.modalCallback(false);
    }

    onPlay=()=>{

    }

    render() {
        console.log(this.props);
        return (
            <div>
                <Modal size={this.props.modalSize} open={this.props.modalOpen} onClose={this.close}>
                    <Modal.Header>Message</Modal.Header>
                    <Modal.Content>
                        <p>{this.props.modalData.mediaLengua}</p>
                        <p>{this.props.modalData.spanishContent}</p>
                        <p>{this.props.modalData.kichwaContent}</p>
                        <p>{this.props.modalData.elicitSentenceContent}</p>
                        <p>{this.props.modalData.ipaContent}</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive icon='checkmark' labelPosition='right' content='Play' onClick={this.onOkButton} />
                        <Button positive icon='checkmark' labelPosition='left' content='Close' onClick={this.onPlay} />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

ObjectDetailModal.propTypes = {
    modalSize: PropTypes.string.isRequired,
    modalData: PropTypes.object.isRequired
}

export default ObjectDetailModal;