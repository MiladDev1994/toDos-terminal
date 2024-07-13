module.exports = function listChoices({list}) {
    // console.log(list)
    const newList = {...list}
    delete newList?.dynamic
    return Object.entries(newList).map(([key, value]) => value.title)
}