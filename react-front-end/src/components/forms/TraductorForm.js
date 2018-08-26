import React from 'react';
import { Button } from 'semantic-ui-react';
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
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys()) {
            this.props.submit(this.state.data);
        }
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
                    id='word_kichwa'
                    name='word_kichwa'
                    value={data.workd_kichwa}
                    onChange={this.onChange} />
                {errors.word_kichwa && <InlineError text={errors.workd_kichwa} />}
                <Button primary onClick={this.translate}>Translate</Button>

            </Container>
        );
    }
}

export default TraductorForm;