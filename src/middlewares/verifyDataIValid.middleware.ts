import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod"

const verifyDataIValidMiddleware = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validadeData = schema.parse(req.body)

    req.body = validadeData

    return next()
}

export default verifyDataIValidMiddleware