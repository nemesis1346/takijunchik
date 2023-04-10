import React from 'react';
import AlertMessageModal from '../modals/AlertMessageModal';
//You can use prop-types to document the intended types of properties passed to components. 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {uploadFilesAction } from '../../actions/SoundActions';
import '../styles/uploadFilePageStyle.css'

class UploadFilePage extends React.Component {

    state = {
        eafFile: null,
        mp3File: null
    }

    onChangeEaf = (e) => {
        this.setState({
            eafFile: e.target.files[0]
        });
    }
    onChangeMp3 = (e) => {
        this.setState({
            mp3File: e.target.files[0]
        });
    }

    onClickButton = () => {
        if (this.state.eafFile != null && this.state.mp3File != null) {

            const data = new FormData();
            data.append('eafFile', this.state.eafFile, this.state.eafFile.name);
            data.append('mp3File', this.state.mp3File, this.state.mp3File.name);
            this.props.uploadFilesAction(data);
        } else {
            console.log('something is missing ');
        }
    }
    render() {
        return (
            <div className="container upload-file-page-container" >
                <h4 className="center">Upload File</h4>
                <p>This function let the researcher to upload and ipa and mp3 file to process the data</p>
                <div onSubmit={this.onFormSubmit} className="file-path-wrapper">
                    Submit Eaf File 
                    <input className="file-path validate" type="file" name="file" onChange={this.onChangeEaf} accept=".eaf"></input>
                </div>
                <div onSubmit={this.onFormSubmit} className="file-path-wrapper">
                    Submit Mp3 File 
                    <input className="file-path validate" type="file" name="file" onChange={this.onChangeMp3} accept=".mp3"></input>
                </div>
                <button onClick={this.onClickButton}>Submit</button>
            </div>
        );
    }
}
UploadFilePage.propTypes = {
    uploadFilesAction: PropTypes.func.isRequired
}
export default connect(null, { uploadFilesAction })(UploadFilePage);