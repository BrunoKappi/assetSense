import React from 'react'
import './Info.css';
import { UilInfoCircle   } from '@iconscout/react-unicons';

const Info = ({ children, className = '', Text }) => {
    return (
        <div className='Info'>
            <div className='Info-Item'>
                <UilInfoCircle   />
                <span>{Text}</span>
            </div>
        </div>
    ); 
};

export default Info;



