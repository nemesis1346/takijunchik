import React from 'react';
import LoginForm from '../forms/LoginForm';
import AlertMessageModal from '../tools/AlertMessageModal';
//You can use prop-types to document the intended types of properties passed to components. 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AuthAction } from '../../actions/UserActions';
class LoginPage extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            loading: false,
            errors: {},
            modalMessage: "Default Message",
            modalOpen: false,
            modalSize: "tiny"
        }
    }

    modalCallback = (closeAlert) => {
        this.setState({
            "modalOpen": closeAlert
        });
    }
    submit = (data) => {
        return this.props.AuthAction(data)
            .then((resp) => {
                console.log('Result in LoginPage');
                console.log(resp);
                let errorMessage = this.parseResponse(resp);
                console.log(errorMessage);
                if (errorMessage) {
                    this.setState({
                        "modalMessage": errorMessage,
                        "modalOpen": true
                    });
                } else {
                    this.props.history.push("/mainMenu")
                }
            });
    }//Then is the function that executes after the promise
    
    render() {
        return (
            <div>
                <h1>Login Page</h1>
                <LoginForm submit={this.submit} />
                <AlertMessageModal
                    modalMessage={this.state.modalMessage}
                    modalSize={this.state.modalSize}
                    modalOpen={this.state.modalOpen}
                    modalCallback={this.modalCallback}>
                </AlertMessageModal>
            </div>
        );
    }
    parseResponse(response) {
        let body = JSON.parse(response);

        if (body.status == '200') {
            return null;
        } else {
            return body.message;
        }
    }

}

//The PropTypes is for validating the props when being passed to the component
//The inside properties are the props
LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
};


export default connect(null, { AuthAction })(LoginPage);