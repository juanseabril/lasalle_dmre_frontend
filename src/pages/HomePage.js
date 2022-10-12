import React from 'react';

function HomePage(props) {
    return (
        <div style={{width: '100%', height: '100%'}}>
            <h1>Universidad de La Salle</h1>
            <h2>{props.userEmail}</h2>
        </div>
    );
};

export default HomePage;