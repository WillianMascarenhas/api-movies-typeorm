import { Repository } from "typeorm"
import { TMovie, TUpdateMovieRequest } from "../interfaces/movies.interfaces"
import { Movie } from "../entities"
import { AppDataSource } from "../data-source"
import { movieSchema } from "../schemas/movies.schema"

const updateMovieService = async (userId:number, updateData:TUpdateMovieRequest): Promise<Movie> =>{ 
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    
    const oldMovieData: Movie | null = await movieRepository.findOne({
        where: {
            id: userId
        }
    }
    )
    
    const newMoviedata: Movie = await movieRepository.create({
        ... oldMovieData,
        ... updateData
    })
    await movieRepository.save(newMoviedata)

    const returnMovie: TMovie = movieSchema.parse(newMoviedata)


    return returnMovie
}

export default updateMovieService