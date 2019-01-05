import React from 'react';
import AlertMessageModal from '../tools/AlertMessageModal';
//You can use prop-types to document the intended types of properties passed to components. 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadMp3Action } from '../../actions/UploadMp3Action';
import { parseResponse } from '../../utils/Utils';
import { VocabularyFirepoint } from '../../endpoints/vocabularyFirepoint';
class UploadFilePage extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
        }
    }
    onChange = (e) => {
        console.log(e);
        let files = e.target.files;
        console.warn("data: ", files);
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            console.log(e);
            console.log(this.props);
            //console.warn("data: ", e.target.result);
            let data_64 = e.target.result;
            console.log('above');
            //let vocabularyFirepoint=new VocabularyFirepoint();
            console.log('below');
            //  console.log(vocabularyFirepoint);

            // return this.props.uploadMp3(data_64)
            //     .then((resp) => {
            //         console.log(resp);
            //         let result = this.parseResponse(resp);
            //         console.log(result);
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });;
        }
    }

    render() {
        return (
            <div className="container" >
                <h4 className="center">Upload File</h4>
                <p>This function let the researcher to upload and ipa and mp3 file to process the data</p>
                <div onSubmit={this.onFormSubmit} className="file-path-wrapper">
                    <input className="file-path validate"  type="file" name="file" onChange={this.onChange}></input>
                </div>
            </div>
        );
    }

}
UploadFilePage.propTypes = {
    uploadMp3: PropTypes.func.isRequired
}
export default connect(null, { uploadMp3Action })(UploadFilePage);