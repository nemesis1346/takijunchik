import React from 'react';
import TraductorForm from '../forms/TraductorForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from '../../actions/translate';

class TraductorPage extends React.Component {

    constructor() {
        super();
        this.state = {
            data: {},
            loading: false,
            errors: {}
        }
    }


    submit = (data) => {
        console.log(data);
        return this.props.translate(data)
            .then((resp) => {
                console.log('Result in Traductor Page');
                let data = this.parseResponse(resp);
                console.log(data);

                if (data) {
                    this.setState({
                        "data": data
                    });
                } else {
                    //TODO: Make an alert for no results
                    console.log(data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <h1>Database Page</h1>
                <TraductorForm submit={this.submit} objectList={this.state.data}/>
            </div>
        );
    }

    parseResponse(response) {
        let body = JSON.parse(response);

        if (body.status == '200') {
            return body.data;
        } else {
            return body.message;
        }
    }
}

TraductorPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    translate: PropTypes.func.isRequired
};

export default connect(null, { translate })(TraductorPage);