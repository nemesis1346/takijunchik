import React from 'react';
import { Button, Container, Input } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';
import { PropTypes } from 'prop-types';
import '../styles/traductorFormStyle.css';

class TraductorForm extends React.Component {

    constructor() {
        super();
        this.state = {
            data: {},
            loading: false,
            errors: {},
            list: []
        }

    }

    translate = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.submit(this.state.data);
        }
    }

    validate = (data) => {
        const errors = {};
        if (!data.object) errors.object = 'Cant be blank';
        return errors;
    }

    onChange = e => this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value }
    });

    _handleKeyPress=(e) =>{
        if (e.key === 'Enter') {
          this.translate();
        }
      }
    render() {
        //console.log(this.props.objectList.length);
        const { data, errors } = this.state;
        return (
            <Container>
                <Input
                    placeholder='Kichwa Word'
                    type='text'
                    id='object'
                    name='object'
                    value={data.object}
                    onChange={this.onChange}
                    onKeyPress={this._handleKeyPress}  />
                {errors.object && <InlineError text={errors.object} />}
                <Button primary onClick={this.translate}>Search</Button>
            </Container>
        );
    }
}

TraductorForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default TraductorForm;