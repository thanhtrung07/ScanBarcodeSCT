// const toMMDDDate = (objDate) => {
//     const monthEng = ["January","February","March","April","May","June","July","August","September","October","November","December"];
//     const monthNum = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
//     var strDate = monthNum[objDate.getMonth()] + "/" + objDate.getDate() + "/" + objDate.getFullYear();
//     return strDate;
// }

const FILE_PREFIX = 'return';
const monthEng = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthNum = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const utility = {
    convertDateObjectToMMDDYYString: (objDate) => {
        var strDate = monthNum[objDate.getMonth()] + "/" + objDate.getDate() + "/" + objDate.getFullYear();
        return strDate;
    },
}

export default utility;

export const makeName = (ext) => {
    let rand_name = Math.floor(Math.random() * 100);
    let date = new Date();
    let dateStr = date.getDate().toString();
    let monthStr = monthNum[date.getMonth()];
    let yearStr = date.getFullYear().toString();
    let name = `${FILE_PREFIX}${rand_name}${dateStr}${monthStr}${yearStr}${ext}`;
    return name;
}

export const getMonth = (date) => {
    return monthNum[date.getMonth()]
}

export const getMMDDYYYYStr = (date) => {
    var strDate = monthNum[date.getMonth()] + "/" + date.getDate() + "/" + date.getFullYear();
    return strDate;
}

export const shopsForPicker = (shops) => {
    let items = shops.map((ele, index) => ({
        label: ele.name, value: ele._id
    }))
    return items;
}

export const delay = (delaytime) => {
    if (delaytime > 0)
        return new Promise(resolve => {
            setTimeout(resolve, delaytime);
        })
    else
        return null;
}