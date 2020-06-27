import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ percentage }) => {
    return (
        <div className='progress'>
            <div
                className='progress-bar progress-bar-striped bg-success'
                role='progressbar'
                style={{ width: `${percentage}%` }}
            >
                {percentage}%
      </div>
        </div>
    );
};

Progress.propTypes = {
    percentage: PropTypes.number.isRequired
};

export default Progress;

//---
// {

//     onUploadProgress: ProgressEvent => {
//         setUploadPercentage(
//             parseInt(
//                 Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
//             )
//         );

//         // Clear percentage
//         setTimeout(() => setUploadPercentage(0), 5000);
//     }
// }