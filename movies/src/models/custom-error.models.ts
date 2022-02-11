export class CustomError {
    message!: string;
    status!: number;
    additionalInfo!: any;
    // collection = [{ status: 400, msg: 'messages' }, { status: 403, msg: 'messages' }, { status: 404, msg: 'messages' }]
    constructor(status: number = 500, additionalInfo: any = {}) {

        switch (status) {
            case 400:
                this.message = '400';
                break;
            case 403:
                this.message = '403';
                break;
            case 404:
                this.message = '404';
                break;
            default:
                this.message = 'Something went wrong';

        }


        this.status = status;
        // this.additionalInfo = additionalInfo
    }
}

export enum ErrorStatus {
    // Ok = 200,
    // Created = 201,
    NoData = 400,
    NotAuth = 403,
    WrongData = 404,

}



