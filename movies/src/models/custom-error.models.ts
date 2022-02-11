export class CustomError {
    message!: string;
    status!: number;
    additionalInfo!: any;
    // collection = [{ status: 400, msg: 'messages' }, { status: 403, msg: 'messages' }, { status: 404, msg: 'messages' }]
    constructor(status: number = 500, message:string, additionalInfo: any = {}) {
        this.message = message;
            this.status = status;
        this.additionalInfo = additionalInfo;
    }
}

export enum ErrorStatus {
    // Ok = 200,
    // Created = 201,
    NoData = 400,
    NotAuth = 403,
    WrongData = 404,

}



