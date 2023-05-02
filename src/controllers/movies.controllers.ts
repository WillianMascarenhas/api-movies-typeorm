import { Request, Response } from "express";
import { TMovie, TMovieRequest, TMoviesPaginations, TUpdateMovieRequest } from "../interfaces/movies.interfaces";
import createMovieService from "../services/createMovie.service";
import listMoviesService from "../services/listMovies.service";
import updateMovieService from "../services/updateMovie.service";
import dellMovieService from "../services/dellMovie.service";

const createMovieController = async (req: Request, res: Response): Promise<Response> => {

    const movieData: TMovieRequest = req.body
    const createUser:TMovie = await createMovieService(movieData)

    return res.status(201).json(createUser)

}

const listMoviesController = async (req: Request, res: Response): Promise<Response> => {
    const page: number = Number(req.query.page)
    const perPage: number = Number(req.query.perPage)
    const sort: string = String(req.query.sort)
    const order: string = String(req.query.order)

    const listMovies: TMoviesPaginations = await listMoviesService(page, perPage, sort, order)

    return res.json(listMovies)
}

const updateMovieController = async (req: Request, res: Response): Promise<Response> => {
    const id: number = Number(req.params.id)
    const updateData: TUpdateMovieRequest = req.body
    const updateMovie = await updateMovieService(id, updateData)

    return res.json(updateMovie)
}

const dellMovieController = async(req: Request, res: Response): Promise<Response> => {
    const idUser: number = Number(req.params.id)

    await dellMovieService(idUser)

    return res.status(204).json()
}

export { createMovieController, listMoviesController, updateMovieController, dellMovieController}