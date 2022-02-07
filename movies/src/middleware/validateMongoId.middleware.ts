
import mongoose from 'mongoose';

function checkIdValid(id: string): boolean {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (isValid) {
        return true;
    }
    return false;


}

export default checkIdValid;