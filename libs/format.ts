//translate miliseconds so you humans can read it
export const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const secondsAgo = Math.floor((now - timestamp) / 1000);

    switch (true) {
        case secondsAgo < 60:
            return secondsAgo === 1
                ? `${secondsAgo} second ago`
                : `${secondsAgo} seconds ago`;
        case secondsAgo < 3600:
            const minutesAgo = Math.floor(secondsAgo / 60);
            return minutesAgo === 1
                ? `${minutesAgo} minute ago`
                : `${minutesAgo} minutes ago`;
        case secondsAgo < 86400:
            const hoursAgo = Math.floor(secondsAgo / 3600);
            return hoursAgo === 1
                ? `${hoursAgo} hour ago`
                : `${hoursAgo} hours ago`;
        case secondsAgo < 2592000: //about 30 days
            const daysAgo = Math.floor(secondsAgo / 86400);
            return daysAgo === 1 ? `${daysAgo} day ago` : `${daysAgo} days ago`;
        case secondsAgo < 31536000: //about 365 days
            const monthsAgo = Math.floor(secondsAgo / 2592000); //about 30 days per month
            return monthsAgo === 1
                ? `${monthsAgo} month ago`
                : `${monthsAgo} months ago`;
        default:
            const yearsAgo = Math.floor(secondsAgo / 31536000); //about 365 days per year
            return yearsAgo === 1
                ? `${yearsAgo} year ago`
                : `${yearsAgo} years ago`;
    }
};
