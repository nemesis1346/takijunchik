import React from 'react';
import { Button, Container, Input } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';
import { PropTypes } from 'prop-types';
import '../styles/traductorFormStyle.css';

class TraductorForm extends React.Component {

    state = {
        data: {},
        loading: false,
        errors: {},
        list: []
    }

    translate = (e) => {
        e.preventDefault();
            this.props.submit(this.state.data);
        
    }


    onChange = e => this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value }
    });


    render() {
        //console.log(this.props.objectList.length);
        const { data, errors } = this.state;
        return (
            <div className='container'>
                <form onSubmit={this.translate}>
                    <input
                        placeholder='Kichwa Word'
                        type='text'
                        id='object'
                        name='object'
                        onChange={this.onChange}
                    />
                    <Button >Search</Button>
                </form>
            </div>
        );
    }
}

TraductorForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default TraductorForm;