import { Repository } from "typeorm"
import { Movie } from "../entities"
import { AppDataSource } from "../data-source"

const dellMovieService = async (idUser: number): Promise<void> =>{

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    let movies: Movie[] = await movieRepository.find()

    await movieRepository.delete({
        id: idUser
    })


}
export default dellMovieService