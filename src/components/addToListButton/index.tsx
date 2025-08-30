import React, { useState, useContext } from "react";
import { Button, Menu, MenuItem, Snackbar } from "@mui/material";
import { MoviesContext } from "../../contexts/moviesContext";
import { moveMovieToList } from "../../db/supabaseListsDB";
import { useAuth } from "../../contexts/authContext";
import { fetchUserLists } from "../../db/supabaseListsDB";

const listOptions: {
  name: string;
  type: "favourite" | "mustwatch" | "watched";
}[] = [
  { name: "Favourites", type: "favourite" },
  { name: "Must Watch", type: "mustwatch" },
  { name: "Watched", type: "watched" },
];

interface AddToListButtonProps {
  movieId: number;
}

const AddToListButton: React.FC<AddToListButtonProps> = ({ movieId }) => {
  const { user } = useAuth();
  const { setUserLists } = useContext(MoviesContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

const handleMenuItemClick = async (
  listType: "favourite" | "mustwatch" | "watched"
) => {
  handleClose();
  if (!user) {
    setSnackbarOpen(true);
    return;
  }

  // Update locally
  setUserLists((prev) => ({
    ...prev,
    favourite:
      listType === "favourite"
        ? [...prev.favourite.filter((id) => id !== movieId), movieId]
        : prev.favourite.filter((id) => id !== movieId),

    mustwatch:
      listType === "mustwatch"
        ? [...prev.mustwatch.filter((id) => id !== movieId), movieId]
        : prev.mustwatch.filter((id) => id !== movieId),

    watched:
      listType === "watched"
        ? [...prev.watched.filter((id) => id !== movieId), movieId]
        : prev.watched.filter((id) => id !== movieId),
  }));

  try {
    // Save also in the database
    await moveMovieToList(user.id, movieId, listType);
  } catch (err) {
    console.error("Error moving movie:", err);

    // In case of error refetch
    const fresh = await fetchUserLists(user.id);
    setUserLists(fresh);
  }
};

  return (
    <>
      <Button variant="outlined" color="secondary" onClick={handleClick}>
        Add to
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {listOptions.map((opt) => (
          <MenuItem
            key={opt.type}
            onClick={() => handleMenuItemClick(opt.type)}
          >
            {opt.name}
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
