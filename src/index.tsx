import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import SiteHeader from './components/siteHeader';
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import MustWatchMoviesPage from "./pages/mustWatchPage";
import { AuthProvider } from "./contexts/authContext";
import ChangePasswordPage from "./pages/changePasswordPage";
import AuthPage from "./pages/authPage";
import ProtectedRoute from "./components/protectedRoute";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000, // 1 hour
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <SiteHeader />      {/* New Header  */}
            <MoviesContextProvider>
              <Routes>
                <Route path="/login" element={<AuthPage />} />
                <Route path="/movies/favourites" element={
                  <ProtectedRoute>
                    <FavouriteMoviesPage />
                  </ProtectedRoute>
                  }
                />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/reviews/:id" element={<MovieReviewPage/>} />
                <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
                <Route path="/movies/mustwatch" element={
                  <ProtectedRoute>
                    <MustWatchMoviesPage />
                  </ProtectedRoute>
                  }
                />
                <Route path="/" element={<HomePage />} />
                <Route path="/changepassword" element={<ChangePasswordPage />} />
                <Route path="/authpage" element={<AuthPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </MoviesContextProvider>
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

