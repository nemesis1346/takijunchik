import React from 'react';
import TraductorForm from '../forms/TraductorForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TranslateFirebaseAction } from '../../actions/TranslateActions';
import {saveObject} from '../../actions/FirebaseDatabaseActions'
import ObjectDetailModal from '../tools/ObjectDetailModal';
import ObjectTable from '../forms/ObjectTable';
import { Message } from 'semantic-ui-react'
import MDSpinner from 'react-md-spinner';
import { parseResponse } from '../../utils/Utils';

class TraductorPage extends React.Component {
    state = {
        data: [],
        loading: false,
        errors: {},
        objectDetailData: {
            mediaLengua: "",
            spanishContent: "",
            kichwaContent: "",
            elicitSentenceContent: "",
            ipaContent: ""
        },
        objectDetailOpen: false,
        objectDetailSize: "tiny",
        hideResultMessage: true,
        hideSpinner: true,
        hideObjectDetail: true
    }
    constructor() {
        super();

        this.spinnerStyle = { display: 'none' };
    }

    objectDetailCloseCallback = (closeAlert) => {
        this.setState({
            "objectDetailOpen": closeAlert
        });
    }


    submit = (data) => {
        this.setState({ "hideSpinner": false });
        console.log(this.props);
        console.log('submit on traductor Page: ');
        console.log(data);

// let test = this.props.TranslateFirebaseAction(data.object.trim().toLowerCase());
console.log(test);
let test = this.props.saveObject(data.object.trim().toLowerCase());


// return this.props.TranslateFirebase(data.object.trim().toLowerCase())
        //     .then((resp) => {
        //         this.setState({ "hideSpinner": true });

        //         console.log('Result in Traductor Page');
        //         let data = parseResponse(resp);

        //         console.log(data);
        //         //Here we update the data for the ObjectTable
        //         if (data && data.length > 0 && typeof data[0] === 'object') {
        //             this.setState({
        //                 "data": data,
        //                 "hideResultMessage": true,
        //             });

        //         } else {
        //             this.setState({
        //                 "data": [],
        //                 "hideResultMessage": false,
        //             });
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }

    objectSelectedCallback = (objectSelected) => {
        this.setState({
            "objectDetailOpen": true,
            "objectDetailData": objectSelected
        });

    }

    render() {
        this.spinnerStyle = this.state.hideSpinner ? { display: 'none' } : {};

        return (
            <div>
                {/* Submit is the callback */}
                <TraductorForm submit={this.submit} objectList={this.state.data} />

                <Message hidden={this.state.hideResultMessage}>
                    <Message.Header>Error</Message.Header>
                    <p>There is no results</p>
                </Message>

                <ObjectTable
                    objectList={this.state.data}
                    objectSelectedCallback={this.objectSelectedCallback} />
                <MDSpinner style={this.spinnerStyle} />

                {/* This is the component that pops up to show the detail and reproduce the song*/}
                <ObjectDetailModal
                    objectDetailSize={this.state.objectDetailSize}
                    objectDetailOpen={this.state.objectDetailOpen}
                    objectDetailData={this.state.objectDetailData}
                    objectDetailCloseCallback={this.objectDetailCloseCallback} />
            </div>
        );
    }

    // parseResponse(response) {
    //     let body = JSON.parse(response);

    //     if (body.status == '200') {
    //         return body.data;
    //     } else {
    //         return body.message;
    //     }
    // }
}
//This is just validation of the props
TraductorPage.propTypes = {
    TranslateFirebaseAction: PropTypes.func.isRequired
};

export default connect(null, { TranslateFirebaseAction })(TraductorPage);