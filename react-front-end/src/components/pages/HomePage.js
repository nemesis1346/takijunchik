import React from 'react';
import { Link } from "react-router-dom"
import { Button } from 'semantic-ui-react';

const HomePage = () => (
    <div>
        <h1>Home Page</h1>

        <Link to="/login">
            <Button primary>
                Login
            </Button>
        </Link>

        <Link to="/signup">
            <Button primary>
                Signup
            </Button>
        </Link>


    </div>
);
export default HomePage;