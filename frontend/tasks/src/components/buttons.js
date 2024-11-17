import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function ButtonSizes({onClick, label='Click'}) {
  return (
    <Box sx={{ '& button': { m: 1 } }}>
      <div>
        <Button onClick={onClick} size="small">{label}</Button>
      </div>
    </Box>
  );
}
