import { NextFunction, Request, Response, } from 'express';

const globalErrorHandler = (err: any, req: Request, res: Response, next : NextFunction) => {
    if (err.name === 'ZodError') {
        const formattedErrors = err.issues.reduce((acc: any, issue: any) => {
            acc[issue.path[0]] = {
                message: issue.message,
                name: issue.code,
                properties: {
                    message: issue.message,
                    type: issue.code,
                },
                value: issue.received
            };
            return acc;
        }, {});

         res.status(400).json({
            message: "Validation failed",
            success: false,
            error: {
                name: 'ValidationError',
                errors: formattedErrors,
            },
        });
    }

    // Default error response for other errors
     res.status(400).json({
        success: false,
        message: 'An unexpected error occurred.',
        error: err.message || err,
    });
    next()
};

export default globalErrorHandler;
