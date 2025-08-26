import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";

interface AddToListButtonProps {
    user: any;  // do {currenUser} after
    movieId: number;
}

const AddToListButton: React.FC<AddToListButtonProps> = ({ user, movieId }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (listName: string) => {
        handleClose();
        if (!user) {
            setSnackbarOpen(true);
            return;
        }
        console.log(`Add movie ${movieId} to list ${listName}`)
    };

    
    return (
        <>
            <Button variant="outlined" color="secondary" onClick={handleClick}>
                Add to
            </Button>
            <Menu 
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {["Favourites", "Must Watch", "Watched", "+ Custom List"].map(name => (
                    <MenuItem key={name} onClick={() => handleMenuItemClick(name)}>
                        {name}
                    </MenuItem>
                ))}
            </Menu>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Please sign in to use lists"
            />
        </>
    );
};

export default AddToListButton;

