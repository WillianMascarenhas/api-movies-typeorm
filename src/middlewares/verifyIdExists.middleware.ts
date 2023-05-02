import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../erros";

const verifyIdExistsMiddleware = async (req: Request, res: Response, next:NextFunction): Promise<void> =>{
    const idTest: number | undefined = Number(req.params.id)

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    const verifyId: Movie | null = await movieRepository.findOne({
        where:{
            id: idTest
        }
    })

    if(!verifyId){
        throw new AppError("Movie not found", 404)
    }

    return next()
}

export default verifyIdExistsMiddleware