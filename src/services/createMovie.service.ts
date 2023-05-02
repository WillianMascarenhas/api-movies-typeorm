import { Repository } from "typeorm";
import { Movie } from "../entities";
import { TMovieRequest } from "../interfaces/movies.interfaces";
import { AppDataSource } from "../data-source";
import { movieSchema } from "../schemas/movies.schema";

const createMovieService = async (data: TMovieRequest): Promise<Movie> =>{

    const movieRepository: Repository<Movie>= AppDataSource.getRepository(Movie)

    const newMovie: Movie = movieRepository.create(data)
    await movieRepository.save(newMovie)

    const retunMovie = movieSchema.parse(newMovie)

    return retunMovie

}

export default createMovieService