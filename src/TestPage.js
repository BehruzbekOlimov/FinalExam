import React from 'react';

const TestPage = () => {
    return (
        <div>
            {JSON.stringify(navigator.userAgent)}
        </div>
    );
};

export default TestPage;
