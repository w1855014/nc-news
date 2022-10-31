export function elapsedSince(date)
{
    const secs = Math.floor((new Date() - new Date(date) / 1000));
    
    let interval = secs / 31536000;
    if (interval > 1) return Math.floor(interval) + " years";
    
    interval = secs / 2592000;
    if (interval > 1) return Math.floor(interval) + " months";

    interval = secs / 86400;
    if (interval > 1) return Math.floor(interval) + " days";

    interval = secs / 3600;
    if (interval > 1) return Math.floor(interval) + " hours";

    interval = secs / 60;
    if (interval > 1) return Math.floor(interval) + " minutes";

    return Math.floor(interval) + " seconds";
}