export const getCurrentTime = () => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    return dateTime
}
// Date expected to be in format: 5/19/2020, 10:30:18 PM
export const formatDate = (date) => {
    let day, time, period;
    console.log(date);
    [day, time] = date.split(',');
    day = day.trim();
    time = time.trim();
    [time, period] = time.split(' ');
    console.log(day, time, period);
    return { day, time, period }
}

export const sortByDate = (array) => {
    array.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.time) - new Date(a.time);
    });
}