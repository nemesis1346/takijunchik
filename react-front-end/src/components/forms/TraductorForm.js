import React from 'react';
import { Button, Container, Input, Item, List } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import { PropTypes } from 'prop-types';


class TraductorForm extends React.Component {

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

    render() {
        console.log(this.props);
        const { data, errors } = this.state;
        let children = [];
        let Children = null;

        if (this.props.objectList && this.props.objectList.length > 0) {
            children = this.props.objectList;
            Children = children.map((child) => <List.Item className="child-list-item" as="a" key={child.objectId}>{child.objectId}</List.Item>);
        }

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

                <List link divided size={"massive"}>
                    {Children}
                </List>
            </Container>
        );
    }
}

TraductorForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default TraductorForm;