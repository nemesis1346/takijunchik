import React from 'react';
import { Button, Container, Input } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import { PropTypes } from 'prop-types';
class TraductorForm extends React.Component {

    state = {
        data: {},
        loading: false,
        errors: {}
    }

    translate = () => {
        // const errors = this.validate(this.state.data);
        // this.setState({ errors });
        // if (Object.keys()) {
            this.state.data.type='annotationId';
            this.props.submit(this.state.data);
       // }
    }

    vaslidate = () => {
        const errors = {}

    }

    onChange = e => this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value }
    });

    render() {
        const { data, errors } = this.state;
        return (
            <Container>
                <Input
                    placeholder='Kichwa Word'
                    type='text'
                    id='object'
                    name='object'
                    value={data.object}
                    onChange={this.onChange} />
                {errors.object && <InlineError text={errors.object} />}
                <Button primary onClick={this.translate}>Search</Button>

            </Container>
        );
    }
}

export default TraductorForm;