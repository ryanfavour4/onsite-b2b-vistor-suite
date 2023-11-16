export const getDateFromTimestamp = timestamp => {
    console.log(timestamp);
    const date = new Date(`${timestamp}`);

    const day = date.getDate();
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    if (month && day && year) return `${month} ${day}, ${year}`;

    return "N/A";
};

export const getTimeFromTimestamp = timestamp => {
    // const new Date().to
    return new Date(`${timestamp}`).toLocaleTimeString();
};

export const formatMonthDigit = digit => {
    if (digit > 9) {
        return `${digit}`;
    } else {
        return `0${digit}`;
    }
};

export const getYMDFormat = date => {
    // console.log(date)

    return `${date.getFullYear()}-${formatMonthDigit(
        date.getMonth() + 1
    )}-${formatMonthDigit(date.getDate())}`;
};

const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
};

const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    // timeZoneName: "short",
};

// *========= TAKES IN : new Date() || new Date("2023-06-21T07:06:49.000Z") || "Mon Aug 21 2023 12:21:44 GMT+0100 (West Africa Standard Time)" ===========*

// !========= RETURNS : August 21, 2023 ===========*
export const formatDate = (date) => {
    if (date) {
        const dateObj = typeof date === "string" ? new Date(date) : date;
        return dateObj.toLocaleDateString("en-US", dateOptions);
    }
};

// !========= RETURNS : 12:17 PM GMT+1 ===========*
export const formatTime = (date) => {
    if (date) {
        const dateObj = typeof date === "string" ? new Date(date) : date;
        return dateObj.toLocaleTimeString("en-US", timeOptions);
    }
};
