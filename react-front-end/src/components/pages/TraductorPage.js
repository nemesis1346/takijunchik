import React from 'react';
import TraductorForm from '../forms/TraductorForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translateFirebaseAction } from '../../actions/TranslateActions';
import { saveObjectDatabase, getObjects, saveObjectFirestore } from '../../actions/FirebaseDatabaseActions'
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
    componentWillMount() {
        console.log('PROPS: ');
        console.log(this.props);
        this.props.getObjects();
    }


    objectDetailCloseCallback = (closeAlert) => {
        this.setState({
            "objectDetailOpen": closeAlert
        });
    }


    submit = (data) => {
        // return this.props.TranslateFirebase(data.object.trim().toLowerCase())
    }

    objectSelectedCallback = (objectSelected) => {
        this.setState({
            "objectDetailOpen": true,
            "objectDetailData": objectSelected
        });
    }

    render() {
        this.spinnerStyle = this.state.hideSpinner ? { display: 'none' } : {};
        const { objects ,hideResultMessage} = this.props;
        console.log(hideResultMessage);
        return (

            <div>
                {/* Submit is the callback */}
                <TraductorForm submit={this.submit} objectList={objects} />

                <Message hidden={hideResultMessage}>
                    <Message.Header>Error</Message.Header>
                    <p>There is no results</p>
                </Message>

                <ObjectTable
                    objectList={objects}
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

}
//This is just validation of the props
TraductorPage.propTypes = {
    translateFirebaseAction: PropTypes.func.isRequired,
    getObjects: PropTypes.func.isRequired,
};

const mapStateToPropsTraductorPage = (state) => {
    console.log(state)
    //In this case objects is gonna be applied to the props of the component
    return {
        objects: state.databaseReducer.objects,
        hideResultMessage: state.databaseReducer.hideResultMessage
    }
}

export default connect(mapStateToPropsTraductorPage, { translateFirebaseAction, getObjects })(TraductorPage);
