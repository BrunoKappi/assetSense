import React from 'react';
import './SubSectionTitle.css'

const SubSectionTitle = ({ children, Gap = 0, className = '' }) => {
    const SubSectionTitleStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: `${Gap}`
    };

    return (
        <h5 className={`SubSectionTitle ${className}`} style={SubSectionTitleStyle}>
            {children}
        </h5>
    );
};

export default SubSectionTitle;






