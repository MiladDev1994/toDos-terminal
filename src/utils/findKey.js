module.exports = function findKey(list, itemSelected) {
    return Object.entries(list).find(([key, value]) => (value?.title ? value.title : value) === itemSelected).shift()
}