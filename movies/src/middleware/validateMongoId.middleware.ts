
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { CustomError } from '../models/custom-error.models';



export function checkIdValid(id: string): boolean {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (isValid) {
        return true;
    }
    return false;
}

const checkValidMongoId = (req:Request, res:Response, next:NextFunction) => {
    
    if(! checkIdValid(req.params.id)){
        throw  new CustomError(400,'Wrond Id')
    }
    
    return next();
}

export default checkValidMongoId
