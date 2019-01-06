import React from 'react';
import SignupForm from '../forms/SignupForm';
//You can use prop-types to document the intended types of properties passed to components. 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SignupAction } from '../../actions/UserActions';
import AlertMessageModal from '../tools/AlertMessageModal';

class SignupPage extends React.Component {

    constructor() {
        super();
        this.state = {
            data: {},
            loading: false,
            errors: {},
            modalMessage: "Default Message",
            modalOpen: false,
            modalSize: "tiny"
        }
    }
    loginCallback = (closeAlert) => {
        this.setState({
            "modalOpen": closeAlert
        });
        this.props.history.push("/");

    }

    submit = (data) => {
        return this.props.signup(data)
            .then((resp) => {
                console.log(resp);
                console.log('Result in SignUp Page');
                let result = this.parseResponse(resp);
                console.log(result);
                this.setState({
                    "modalMessage": result,
                    "modalOpen": true
                });

            })
            .catch((err) => {
                console.log(err);
            });
    }//Then is the function that executes after the promise
    render() {
        return (
            <div>
                <h1>Signup Page</h1>
                <SignupForm submit={this.submit} />
                <AlertMessageModal
                    modalMessage={this.state.modalMessage}
                    modalSize={this.state.modalSize}
                    modalOpen={this.state.modalOpen}
                    modalCallback={this.loginCallback}>
                </AlertMessageModal>
            </div>
        );
    }
    parseResponse(response) {
        let body = JSON.parse(response);
        console.log(body);
        if (body.status == '200') {
            return body.data;
        } else {
            return body.message;
        }
    }
}
SignupPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    signup: PropTypes.func.isRequired
};


export default connect(null, { SignupAction })(SignupPage);