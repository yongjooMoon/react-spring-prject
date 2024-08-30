// NavigateComponent.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const NavigateComponent = ({ to }) => {
    return <Navigate to={to} />;
};

export default NavigateComponent;
