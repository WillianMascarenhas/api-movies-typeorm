import { z } from "zod"
import { movieSchema, movieSchemaRequest, movieUpdateSchemaRequest, moviesSchemaResponse } from "../schemas/movies.schema"
import { DeepPartial } from "typeorm"

type TMovie = z.infer<typeof movieSchema>

type TMovieRequest = z.infer<typeof movieSchemaRequest>

type TMoviesResponse = z.infer<typeof moviesSchemaResponse>

type TMoviesPaginations = {
    count: number,
    data:TMoviesResponse,
    nextPage?: string | null,
    prevPage?: string | null
}

type TUpdateMovieRequest = DeepPartial<TMovieRequest> 

export { TMovie, TMovieRequest, TMoviesResponse, TMoviesPaginations, TUpdateMovieRequest }