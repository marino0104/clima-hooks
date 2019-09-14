import React from 'react';

const Error = ({mensaje}) => {
    return (
        <div className="card-panel red error col s12">
            {mensaje}
        </div>
    );
};

export default Error;