import type { Meta, StoryObj } from '@storybook/react';
import MovieListHeader from "../components/headerMovieList";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import { AuthProvider } from "../contexts/authContext";

const meta = {
    title: 'Home Page/Header',
    component: MovieListHeader,
    decorators: [
      (Story) => 
      <MemoryRouter initialEntries={["/"]}>
        <AuthProvider>
          <MoviesContextProvider>
            <Story/>
          </MoviesContextProvider>
        </AuthProvider>
      </MemoryRouter>,
    ],
  } satisfies Meta<typeof MovieListHeader>;
  
  export default meta;

  type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args:{ 
    title:'Discover Movies',
    pageNum: 1, 
    setPageNum: () => {},
  }

};
Basic.storyName = "Default";

