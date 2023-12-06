import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const queryValidationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    next();
};

export default queryValidationMiddleware;
