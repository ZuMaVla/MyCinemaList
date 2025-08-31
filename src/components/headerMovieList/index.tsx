import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 1.5,
  },
};

interface HeaderProps {
  title: string;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
}

const Header: React.FC<HeaderProps> = ({ title, pageNum, setPageNum }) => {
  const handleDecrement = () => setPageNum((prev) => Math.max(1, prev - 1));
  const handleIncrement = () => setPageNum((prev) => prev + 1);

  const pageMap: Record<string, string> = {
    "Discover Movies": `— Page ${pageNum}`,
    "Upcoming Movies": `— Page ${pageNum}`,
  };
  const pageInfo = pageMap[title] || "";

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back" onClick={handleDecrement}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
        {title} {pageInfo}
      </Typography>

      <IconButton aria-label="go forward" onClick={handleIncrement}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Header;
