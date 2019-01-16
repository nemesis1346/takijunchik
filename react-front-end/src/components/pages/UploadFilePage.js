import React from 'react';
import AlertMessageModal from '../modals/AlertMessageModal';
//You can use prop-types to document the intended types of properties passed to components. 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadMp3Action ,uploadEafAction} from '../../actions/SoundActions';
import { parseResponse } from '../../utils/Utils';
import '../styles/uploadFilePageStyle.css'
import {processData} from '../../utils/ProcessData';

const style = {
    'display': 'none'
}
const callaback = (result) => {
    console.log(result);
}
const callabackError = (result) => {
    console.log(result);
}
class UploadFilePage extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
        }
    }
    onChange = (e) => {
        console.log(e)
        let files = e.target.files;
        //This is the file
        console.log(files);
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            console.log('ON LOAD');
            console.log(e);
            //let data_64 = e.target.result;
           // this.props.uploadMp3Action(data_64);
            this.props.uploadEafAction('test');
        }
        //processData(null, callaback, callabackError);
    }


    render() {
        return (
            <div className="container upload-file-page-container" >
                <h4 className="center">Upload File</h4>
                <p>This function let the researcher to upload and ipa and mp3 file to process the data</p>
                <div onSubmit={this.onFormSubmit} className="file-path-wrapper">
                    <input className="file-path validate" type="file" name="file" onChange={this.onChange} accept=".eaf"></input>
                </div>
            </div>
        );
    }

}
UploadFilePage.propTypes = {
    uploadMp3Action: PropTypes.func.isRequired
}
export default connect(null, { uploadMp3Action,uploadEafAction })(UploadFilePage);