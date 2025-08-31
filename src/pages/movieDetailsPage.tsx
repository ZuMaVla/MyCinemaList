import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import TemplateMoviePage from "../components/templateMoviePage";
import { fetchStarring, getMovie } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { MovieDetailsProps } from "../types/interfaces";

const MovieDetailsPage: React.FC = () => {
  const movieId = Number(useParams<{ id: string }>().id!);

  const {
    data: movie,
    error,
    isLoading,
    isError,
  } = useQuery<MovieDetailsProps, Error>(["movie", movieId], () => getMovie(movieId)
  );

  const {
    data: starring,
    isLoading: isStarringLoading,
    isError: isStarringError,
  } = useQuery<{ id: number; name: string; character: string }[], Error>(["starring", movieId], () => fetchStarring(movieId));

  if (isLoading || isStarringLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  if (isStarringError) {
    return <h1>Could not load actors</h1>;
  }

  if (!movie) {
    return <p>Waiting for movie details</p>;
  }

  // add actors into movie object
  const enrichedMovie: MovieDetailsProps = {
    ...movie,
    starring: (starring || []).map((actor) => ({
      id: actor.id, //
      name: actor.name,
      character: actor.character, // fallback if character is missing
    })),
  };
  console.log(enrichedMovie);
  return (
    <TemplateMoviePage movie={enrichedMovie}>
      <MovieDetails {...enrichedMovie} />
    </TemplateMoviePage>
  );
};

export default MovieDetailsPage;
