import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
const style = {
    marginLeft: '30%',
    padding:'16px'
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
        
        return (
                <Modal style={style} size={this.props.objectDetailSize} open={this.props.objectDetailOpen} onClose={this.close}>
                    <Modal.Header>Detalle</Modal.Header>
                    <Modal.Content>
                        <div>
                            <b>Media Lengua: </b> {this.props.objectDetailData.mediaLenguaContent}
                        </div>
                        <div>
                            <b>Spanish Content: </b>  {this.props.objectDetailData.spanishContent}
                        </div>
                        <div>
                            <b>Kichwa Content: </b> {this.props.objectDetailData.kichwaContent}
                        </div>
                        <div>
                            <b>Elicit Sentence Content: </b> {this.props.objectDetailData.elicitSentenceContent}
                        </div>
                        <div>
                            <b>Ipa Content: </b>  {this.props.objectDetailData.ipaContent}
                        </div>
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