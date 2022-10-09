import React from 'react';
import Upload from '../components/Upload/Upload';

function Drusas() {
    const page_id = 1;
    return (
        <div style={{width: '100%', height: '100%'}}>
            <h1>Segmentación Drusas</h1>
            <Upload page_id={page_id}></Upload>
        </div>
    );
};

export default Drusas;