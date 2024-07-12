module.exports = function listChoices({list}) {
    // console.log(list)
    return Object.entries(list).map(([key, value]) => value.title)
}