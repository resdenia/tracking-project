export const formatDate = (date: string) => {
    let dateObj = new Date(Date.parse(date));

    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`

};