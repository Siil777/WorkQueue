import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import CreateIcon from '@mui/icons-material/Create';

export default function InputWithIcon(props) {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          Enter task
        </InputLabel>
        <Input
          id={props.id}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          startAdornment={
            <InputAdornment position="start">
              <CreateIcon/>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}
