import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MainMenuPage extends React.Component {

    render() {
        return (
            <div>
                <h1>Main Menu</h1>
                <Link to="/translate">
                    <Button primary>
                        Database
                    </Button>
                </Link>
            </div>
        );
    }

}


export default MainMenuPage;