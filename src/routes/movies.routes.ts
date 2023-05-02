import { Router } from "express";
import { createMovieController, dellMovieController, listMoviesController, updateMovieController } from "../controllers/movies.controllers";
import verifyDataIValidMiddleware from "../middlewares/verifyDataIValid.middleware";
import { movieSchemaRequest, movieUpdateSchemaRequest, moviesSchemaResponse } from "../schemas/movies.schema";
import verifyNameExistsMiddleware from "../middlewares/verifyNameExists.middleware";
import verifyIdExistsMiddleware from "../middlewares/verifyIdExists.middleware";

const moviesRoutes: Router = Router()

moviesRoutes.post("", verifyDataIValidMiddleware(movieSchemaRequest), verifyNameExistsMiddleware, createMovieController)
moviesRoutes.get("",  listMoviesController)
moviesRoutes.patch("/:id", verifyDataIValidMiddleware(movieUpdateSchemaRequest), verifyIdExistsMiddleware, verifyNameExistsMiddleware, updateMovieController)
moviesRoutes.delete("/:id", verifyIdExistsMiddleware, dellMovieController)


export default moviesRoutes