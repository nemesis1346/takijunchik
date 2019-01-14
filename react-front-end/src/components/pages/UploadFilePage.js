import React from 'react';
import AlertMessageModal from '../modals/AlertMessageModal';
//You can use prop-types to document the intended types of properties passed to components. 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadMp3Action } from '../../actions/SoundActions';
import { parseResponse } from '../../utils/Utils';
import { VocabularyFirepoint } from '../../endpoints/vocabularyFirepoint';
import '../styles/uploadFilePageStyle.scss'

const style={
    'display':'none'
}
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

        // reader.readAsDataURL('/home/nemesis1346/Documents/UniversityProjects/takijunchik/react-front-end/data/audioFiles/audio.mp3');

        reader.onload = (e) => {
            console.log(e);
            console.log(this.props);
            //console.warn("data: ", e.target.result);
            let data_64 = e.target.result;
            console.log('above');
            //let vocabularyFirepoint=new VocabularyFirepoint();
            console.log('below');
            //  console.log(vocabularyFirepoint);
            this.props.uploadMp3Action(data_64);
        }

        //this.props.uploadMp3Action('test');

    }

    render() {
        return (
            <form action="#">
                <div className="field-field input-field">
                    <div className="btn">
                        <span>File</span>
                        <input type="file" className="upload_btn" onChange={this.onChange}></input>
                    </div>
                    <div className="file-path-wrapper">
                    </div>
                </div>
            </form>



        );
    }

}
UploadFilePage.propTypes = {
    uploadMp3Action: PropTypes.func.isRequired
}
export default connect(null, { uploadMp3Action })(UploadFilePage);