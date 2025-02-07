import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handelValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
    const error: TErrorSource = Object.values(err.errors).map((value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: value?.path,
            message: value?.message
        }
    });

    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        error,
    }
};

export default handelValidationError;