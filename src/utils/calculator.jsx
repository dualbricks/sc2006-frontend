export const calculateById = (start, end, id) => {
    const minute = 1000 * 60;
    var remainingTime = end.getTime() - start.getTime();
    var cost = 0;
    var newStart = start;
    if (id === "1") {
        let firstEntry = true;
        while(remainingTime > 0) {
            if(newStart.getDay() < 5) {
                if(newStart.getHours() <= 17 && newStart.getHours() >= 7) {
                    if(firstEntry) {
                        cost += 2.20;
                        firstEntry = false;
                        remainingTime -= minute * 60;
                        newStart = new Date(newStart.getTime() + minute * 60);
                    }
                    else {
                        cost += 1.10;
                        remainingTime -= minute * 30;
                        newStart = new Date(newStart.getTime() + minute * 30);
                    }
                }
                else if(newStart.getHours() >= 17 ) {
                    if(firstEntry) {
                        cost += 2.20;
                        firstEntry = false;
                    }
                    remainingTime -= minute * 60;
                    newStart = new Date(newStart.getTime() + minute * 60);
                }
                else {
                    cost += 1.10;
                    remainingTime -= minute * 60;
                    newStart = new Date(newStart.getTime() + minute * 60);
                }
            }
            else {
                cost += 1.10;
                remainingTime -= minute * 60;
                newStart = new Date(newStart.getTime() + minute * 60);
            }
        }
        return cost;
    }
    else if (id === "2") {
        let firstEntry = true;
        
        while(remainingTime > 0) {
            if(newStart.getDay() <= 4) {
                let hours = 0;
                if(newStart.getHours() <= 17 && newStart.getHours() >= 7) {
                    if(hours < 2) {
                        cost += 2.20;
                        hours += 1;
                        remainingTime -= minute * 60;
                        newStart = new Date(newStart.getTime() + minute * 60);
                    }
                    else {
                        cost += 1.10;
                        remainingTime -= minute * 30;
                        newStart = new Date(newStart.getTime() + minute * 30);
                    }
                }
                else if(newStart.getHours() >= 17 || newStart.getHours() === 1 || newStart.getHours() === 2 || newStart.getHours() === 0) {
                    if(firstEntry) {
                        cost += 2.20;
                        firstEntry = false;
                    }
                    remainingTime -= minute * 60;
                    newStart = new Date(newStart.getTime() + minute * 60);
                }
                else {
                    cost += 1.10;
                    remainingTime -= minute * 30;
                    newStart = new Date(newStart.getTime() + minute * 30);
                }
            }else{
                let hours = 0;
                if(newStart.getHours() >= 7 || newStart.getHours() === 1 || newStart.getHours() === 2 || newStart.getHours() === 0) {
                    if(hours < 2) {
                        cost += 2.40;
                        hours += 1;
                        remainingTime -= minute * 60;
                        newStart = new Date(newStart.getTime() + minute * 60);
                    }
                    else if(hours < 4) {
                        cost += 1.20;
                        hours += 1;
                        remainingTime -= minute * 60;
                        newStart = new Date(newStart.getTime() + minute * 60);
                    }
                    else {
                        cost += 1.40;
                        remainingTime -= minute * 30;
                        newStart = new Date(newStart.getTime() + minute * 30);
                    }
                }else {
                    cost += 1.10;
                    remainingTime -= minute * 30;
                    newStart = new Date(newStart.getTime() + minute * 30);
                }
            }
        }
        return cost;
    }
  
}