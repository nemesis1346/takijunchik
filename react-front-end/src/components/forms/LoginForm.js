import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import Validator from "validator";
import InlineError from "../messages/InlineError";
import { PropTypes } from 'prop-types';
//import {UserModel} from '../../models/userModel.js';

class LoginForm extends React.Component {
    //The following variables are being initialized

    state = {
        data: {},
        loading: false,
        errors: {}
    }
    onSubmit = () => {
        // const userModel = new UserModel({
        //      name: 'asf',
        //     email: 'saf',
        //     pwd: 'asdf'
        // });
        // console.log(userModel);
        console.log("is getting to onSubmit");
        //TODO: Resolve the validation
        const errors = this.validate(this.state.data);
        this.setState({ errors });

        //TODO: send actual data
        //The condition is that if there is no methods on errors, it is validated
        if (Object.keys(errors).length === 0) {
            this.props.submit(this.state.data);
        }
        //      this.props.submit(this.state.data);

    }
    //This methos is a series of validations on errors object
    validate = (data) => {

        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
        if (!data.password) errors.password = "Cant be blank";

        return errors;
    }
    onChange = e => this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value }
    });
    render() {
        const { data, errors } = this.state;
        return (

            <Form onSubmit={this.onSubmit}>
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@example.com"
                        value={data.email}
                        onChange={this.onChange} />
                    {errors.email && <InlineError text={errors.email} />}
                </Form.Field>
                <Form.Field error={errors.password}>
                    <label htmlFor="passwornd">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Make it secure"
                        value={data.password}
                        onChange={this.onChange} />
                    {errors.password && <InlineError text={errors.password} />}

                </Form.Field>
                <Button primary>Login</Button>
            </Form>

        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};
export default LoginForm;