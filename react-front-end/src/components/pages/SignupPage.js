import React from 'react';
import SignupForm from '../forms/SignupForm';
//You can use prop-types to document the intended types of properties passed to components. 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../../actions/signup';
class SignupPage extends React.Component {

    submit = (data) => {
        return this.props.signup(data)
        .then((result) => {
            console.log(result);
            this.props.history.push("/")
        })
        .catch((err)=>{
            console.log(err);
        });
    }//Then is the function that executes after the promise
    render() {
        return (
            <div>
                <h1>Signup Page</h1>
                <SignupForm submit={this.submit} />
            </div>
        );
    }
}
SignupPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    signup: PropTypes.func.isRequired
};


export default connect(null, { signup })(SignupPage);