import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import { MovieListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
};

const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = ({
  title,
  movies,
  pageNum,
  setPageNum,
  action,
}) => {

  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} pageNum={pageNum} setPageNum={setPageNum} />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList action={action} movies={movies} />
      </Grid>
    </Grid>
  );
};
export default MovieListPageTemplate;
