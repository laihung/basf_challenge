import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function ComboBox({data, label}) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={data}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label={label}/>}
    />
  );
}

export default ComboBox;