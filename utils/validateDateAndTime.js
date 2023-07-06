export const validTime = (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/;
    return regex.test(time);
}

export const validDate = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
}

