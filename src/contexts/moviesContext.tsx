import React, { useState, useEffect  } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";
import { useAuth } from "./authContext";

import { fetchUserLists } from "../db/supabaseListsDB";

interface UserLists {
  favourite: number[];
  mustwatch: number[];
  watched: number[];
}

interface MovieContextInterface {
  userLists: UserLists;
  setUserLists: React.Dispatch<React.SetStateAction<UserLists>>;
  addReview: (movie: any, review: any) => void; // adjust later if needed
}

const initialContextState: MovieContextInterface = {
  userLists: {
    favourite: [],
    mustwatch: [],
    watched: [],
  },
  setUserLists: async () => {},
  addReview: (movie, review) => {
    movie.id;
    review;
  },
};


export const MoviesContext = React.createContext<MovieContextInterface>(
  initialContextState
);

export const MoviesContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();

  const [userLists, setUserLists] = useState<UserLists>(
    initialContextState.userLists
  );

  useEffect(() => {
    if (user) {
      // fetch lists for logged in user
      fetchUserLists(user.id).then((lists) => setUserLists(lists));
    } else {
      // reset to defaults on logout or no user
      setUserLists(initialContextState.userLists);
    }
  }, [user]);  


  const [myReviews, setMyReviews] = useState<Review[]>([]);

  const addReview = (movie: BaseMovieProps, review: Review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  return (
    <MoviesContext.Provider
      value={{
        userLists,
        setUserLists,
        addReview,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
