import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { DiscoverMovies } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { globalStore } from "../util";

const UpcomingMoviesPage: React.FC = () => {
  const [pageNum, setPageNum] = useState(globalStore.upPageNum || 1); // start at page 1
    useEffect(() => {
      globalStore.upPageNum = pageNum;
    }, [pageNum]);
  
const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    ["upcoming", pageNum],
    () => getUpcomingMovies(pageNum),
    {
      enabled: !!pageNum,
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const movies = data ? data.results : [];

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      pageNum={pageNum}
      setPageNum={setPageNum}

    />
  );
};
export default UpcomingMoviesPage;
