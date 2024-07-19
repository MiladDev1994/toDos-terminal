module.exports = function listChoices({list}) {
    const newList = {...list}
    delete newList?.dynamic
    return Object.entries(newList).map(([key, value]) => value.title)
}