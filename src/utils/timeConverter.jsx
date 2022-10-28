export const timeConverterForPrediction = (d=new Date()) => {
    let minute = d.getMinutes();
    let hour = d.getHours();
    let day = d.getDay();
    if(minute >= 30) {
        minute = 0;
        hour = (hour + 1) % 24;
    }
    else {
        minute = 30;
    }
    return {minute: minute, hour: hour, day: day};
}