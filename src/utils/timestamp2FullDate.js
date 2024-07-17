function timestamp2FullDate(timestamp) {
    const date = new Date(timestamp)
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hour}:${minutes}`
}

module.exports = timestamp2FullDate