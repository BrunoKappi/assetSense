import React from 'react';
import './SectionTitle.css'

const SectionTitle = ({ children, Gap = 0, className = '' }) => {
    const SectionTitleStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: `${Gap}`
    };

    return (
        <h4 className={`SectionTitle ${className}`} style={SectionTitleStyle}>
            {children}
        </h4>
    );
};

export default SectionTitle;






