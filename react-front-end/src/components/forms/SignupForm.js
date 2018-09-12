import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import Validator from "validator";
import InlineError from "../messages/InlineError";
import { PropTypes } from 'prop-types';

class SignupForm extends React.Component {
    //The following variables are being initialized

    state = {
        data: {},
        loading: false,
        errors: {}
    }
    onSubmit = () => {
        //TODO: For now eveytone is type PROFESSOR

        const errors = this.validate(this.state.data);
        this.setState({ errors });
        //The condition is that if there is no methods on errors, it is validated
        if (Object.keys(errors).length === 0) {
            this.state.data.userType = 'PROFESSOR';
            this.props.submit(this.state.data).then((res) => {
                console.log('Result in SignUpForm');
                console.log(res);
            });
        }

        // this.state.data.userType = 'PROFESSOR';
        // this.props.submit(this.state.data)
        //     .then((res) => {
        //         console.log('Result in SignUpForm');
        //         console.log(res);
        //     });;

    }
    //This methos is a series of validations on errors object
    validate = (data) => {

        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
        if (!data.password) errors.password = "Cant be blank";
        if (!data.name) errors.name = 'Cant be blank';
        if (!data.email) errors.email = 'Cant be blank';

        return errors;
    }
    onChange = e => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    };
    render() {
        const { data, errors } = this.state;
        return (

            <Form onSubmit={this.onSubmit}>
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="id"
                        name="email"
                        placeholder="example@example.com"
                        value={data.email}
                        onChange={this.onChange} />
                    {errors.email && <InlineError text={errors.email} />}
                </Form.Field>
                <Form.Field error={!!errors.name}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={data.name}
                        onChange={this.onChange} />
                    {errors.name && <InlineError text={errors.name} />}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Make it secure"
                        value={data.password}
                        onChange={this.onChange} />
                    {errors.password && <InlineError text={errors.password} />}
                </Form.Field>
                <Button primary>SignUp</Button>
            </Form>

        );
    }
}

SignupForm.propTypes = {
    submit: PropTypes.func.isRequired
};
export default SignupForm;