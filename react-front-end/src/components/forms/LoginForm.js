import React from 'react';
import { Form, Button } from 'semantic-ui-react';
//import {UserModel} from '../../models/userModel.js';

class LoginForm extends React.Component {
    //The following variables are being initialized

    constructor() {
        super();
        this.state = {
            data: {},
            loading: false,
            errors: {}
        }
    }

    onSubmit = () => {
            this.props.submit(this.state.data);
            console.log(this.state.data);
    }
    //e stands for event
    //... is a property spread anotation. It spreads out the properties in props as discrete properties on the Input element
    //So then onChange is universal
    onChange = e => {
        console.log(e);
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    };
    render() {
        //This makes this.state common to all values
        const { data, errors } = this.state;
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@example.com"
                        value={data.email}
                         />                    
                </Form.Field>
                <Form.Field>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Make it secure"
                        value={data.password}
                       />
                </Form.Field>
                <Button primary>Login</Button>
            </Form>

        );
    }
}

export default LoginForm;