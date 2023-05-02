import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../erros";

const verifyNameExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const movieName: string = req.body.name
console.log(movieName)
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    const movie: Movie | null = await movieRepository.findOne({
        where: {
            name: movieName,
        }
    })

    if(movieName === undefined){
        return next()
    }

    if(movie){
        throw new AppError("Movie already exists.", 409)
    }
    return next()

}

export default verifyNameExistsMiddleware