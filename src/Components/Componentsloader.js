import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';


export default function CircularIndeterminate() {
  return (
    <div className='Progress'>
         <CircularProgress sx={{height: '25px'}}/>
    </div>
  );
}