import { z } from "zod"

const movieSchema = z.object({
    id: z.number(),
    name: z.string().max(50),
    description: z.string().nullish(),
    duration: z.number().positive(),
    price: z.number().positive().int()
})

const movieSchemaRequest = movieSchema.omit({ id: true })

const moviesSchemaResponse = z.array(movieSchema)

const movieUpdateSchemaRequest = movieSchema.omit({ id: true }).partial()

export { movieSchema, movieSchemaRequest, moviesSchemaResponse, movieUpdateSchemaRequest }