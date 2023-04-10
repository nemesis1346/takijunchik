import React from 'react';
import LoginForm from '../forms/LoginForm';
import AlertMessageModal from '../modals/AlertMessageModal';
//You can use prop-types to document the intended types of properties passed to components. 
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
        console.log(data);
                // if (data) {
                //     this.setState({
                //         "modalMessage": errorMessage,
                //         "modalOpen": true
                //     });
                // } else {
                //     this.props.history.push("/mainMenu")
                // }
    } 
    render() {
        return (
            <div className='main-menu-container about-page-container'>
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
}
export default connect(null, { AuthAction })(LoginPage);