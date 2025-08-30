import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import WriteReview from "../components/cardIcons/writeReview";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const FavouriteMoviesPage: React.FC = () => {
  const { userLists } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  const movieIds: number[] = userLists.favourite || [];

const favouriteMovieQueries = useQueries(
  movieIds.map((movieId: number) => ({
    queryKey: ["movie", movieId],
    queryFn: async () => {
      const data = await getMovie(movieId.toString());
      return {
        ...data,
        genre_ids: data.genres.map((g: any) => g.id),
      };
    },
  }))
);

  const isLoading = favouriteMovieQueries.some((q) => q.isLoading);

  if (isLoading) return <Spinner />;

  const allFavourites = favouriteMovieQueries.map((q) => q.data).filter(Boolean);
  const displayedMovies = filterFunction(allFavourites);
  console.log(allFavourites)

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={displayedMovies}
        action={(movie) => (
          <WriteReview {...movie} />
        )}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default FavouriteMoviesPage;
