
function DateforDb(): string {
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return year + '-' + month + '-01';


}

export default DateforDb;