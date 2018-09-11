import React from 'react';
import TraductorForm from '../forms/TraductorForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from '../../actions/translate';

class TraductorPage extends React.Component {

    submit = (data) => {
        console.log('Data Request TraductorPage');
        console.log(data);
        return this.props.translate(data)
            .then((result) => {
                console.log('Result in Traductor Page');
                console.log(result);

            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <h1>Database Page</h1>
                <TraductorForm submit={this.submit} />
            </div>
        );
    }
}

TraductorPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    translate: PropTypes.func.isRequired
};

export default connect(null, { translate })(TraductorPage);