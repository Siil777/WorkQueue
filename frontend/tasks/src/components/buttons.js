import React from "react";
import Button from '@mui/material/Button';

const Buttons = ({children, ...props}) => {
    return(
        <Button {...props} color="secondary">{children}</Button>
    )
}
export default Buttons;