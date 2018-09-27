import React from 'react';
import { Button, Container, Input, Item, List, Table } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import { PropTypes } from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
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
                    onChange={this.onChange} />
                {errors.object && <InlineError text={errors.object} />}
                <Button primary onClick={this.translate}>Search</Button>

                {/* <List link divided size={"massive"}>
                    {Children}
                </List> */}
                <BootstrapTable data={this.props.objectList} >
                    <TableHeaderColumn width='150' dataField='mediaLenguaContentArray' isKey>Media Lengua</TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='spanishContentArray'>Spanish</TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='kichwaContentArray'>Kichwa</TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='elicitSentenceContentArray'>Elicit Sentence</TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='ipaContentArray'>Ipa</TableHeaderColumn>
                </BootstrapTable>
            </Container>
        );
    }
}

TraductorForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default TraductorForm;