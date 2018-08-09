export default function caculateDate() {
    var date = new Date;
    var currentYear = date.getFullYear(),
        years = [],
        month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    for (let i = 2016; i <= parseInt(currentYear); i++) {
        years.push((i).toString());
    }
    return {
        year: years,
        month: month
    }
}