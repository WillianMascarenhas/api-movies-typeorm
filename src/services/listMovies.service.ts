import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import {
  TMoviesPaginations,
  TMoviesResponse,
} from "../interfaces/movies.interfaces";
import { moviesSchemaResponse } from "../schemas/movies.schema";

const listMoviesService = async (
  pageValue: number,
  perPageValue: number,
  sortValue: string,
  orderValue: string
): Promise<TMoviesPaginations> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  let page: number | undefined = pageValue;
  let perPage: number | undefined = perPageValue;

  if (perPage <= 0 || perPage >= 5 || !perPage) {
    perPage = 5;
  }

  if (page <= 0 || !page) {
    page = 1;
  }

  let orderQuery: any = orderValue;
  let sort: any = sortValue;

  if (orderQuery === "undefined") {
    orderQuery = "asc";
  }

  let movies: Movie[] | undefined;

  if (sort === "price") {
    if (!page || !perPage) {
      movies = await movieRepository.find();
    } else {
      movies = await movieRepository.find({
        skip: (page - 1) * perPage,
        take: perPage,
        order: {
          price: orderQuery,
        },
      });
    }
  } else if (sort === "duration") {
    if (!page || !perPage) {
      movies = await movieRepository.find();
    } else {
      movies = await movieRepository.find({
        skip: (page - 1) * perPage,
        take: perPage,
        order: {
          duration: orderQuery,
        },
      });
    }
  } else {
    if (!page || !perPage) {
      movies = await movieRepository.find();
    } else {
      if (sort === "undefined") {
        orderQuery = "asc";
      }
      movies = await movieRepository.find({
        skip: (page - 1) * perPage,
        take: perPage,
        order: {
          id: orderQuery,
        },
      });
    }
  }

  const returnMovies: TMoviesResponse = moviesSchemaResponse.parse(movies);
  if (page - 1 == 0) {
    return {
      prevPage: null,
      nextPage: `http://localhost:3000/movies?page=${
        page + 1
      }&perPage=${perPage}`,
      count: await movieRepository.count(),
      data: returnMovies,
    };
  } else if (page + 1 >= 5 || movies.length < perPage) {
    return {
      prevPage: `http://localhost:3000/movies?page=${
        page - 1
      }&perPage=${perPage}`,
      nextPage: null,
      count: await movieRepository.count(),
      data: returnMovies,
    };
  }

  return {
    prevPage: `http://localhost:3000/movies?page=${
      page - 1
    }&perPage=${perPage}`,
    nextPage: `http://localhost:3000/movies?page=${
      page + 1
    }&perPage=${perPage}`,
    count: await movieRepository.count(),
    data: returnMovies,
  };
};

export default listMoviesService;
