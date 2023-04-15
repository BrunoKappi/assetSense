import React from 'react'
import './Warning.css';
import { UilCommentInfoAlt } from '@iconscout/react-unicons';

const Warning = ({ children, className = '', Text }) => {
    return (
        <div className='Warning'>
            <div className='Warning-Item'>
                <UilCommentInfoAlt />
                <span>{Text}</span>
            </div>
        </div>
    );
};

export default Warning;



