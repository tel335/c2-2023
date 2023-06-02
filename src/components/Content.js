import React from 'react';

// import Template from './contentComponents/Template';
import Pregunta1 from './contentComponents/Pregunta1';



function Content() {
    return (
        <div style={{ display: 'grid', justifyContent: 'center' }}>
            {/* <Template /> */}
            <Pregunta1 />
        </div>
    );
}

export default Content;