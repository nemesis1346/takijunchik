import React from 'react';
import {Modal,Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class AlertMessageModal extends React.Component {
    constructor() {
        super();
        this.state = {
            "message": "",
            "open": false,
            "size": ""
        }
     
    }
    show = size => () => this.setState({ size })

    close = () => this.setState({ open: false })

    render() {
        console.log('ALERT MESSAGE MODAL');
        console.log(this.props);
        return (
            <div>
                <Modal size={this.props.modalSize} open={this.props.modalOpen} onClose={this.close}>
                    <Modal.Header>Message</Modal.Header>
                    <Modal.Content>
                        <p>{this.props.modalMessage}</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive icon='checkmark' labelPosition='right' content='ok'/>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

AlertMessageModal.propTypes = {
    modalSize: PropTypes.string.isRequired,
    modalMessage: PropTypes.string.isRequired
}

export default AlertMessageModal;