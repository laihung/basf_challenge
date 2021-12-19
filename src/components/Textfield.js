import * as React from 'react';
import TextField from '@mui/material/TextField';

function BasicTextFields({label, onChange}) {
  return (
    <TextField style ={{width: '100%'}} label={label} variant="outlined" onChange={onChange}/>
  );
}

export default BasicTextFields;