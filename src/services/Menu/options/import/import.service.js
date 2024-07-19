
const path = require("path")
const { readFileSync } = require("fs");
var XLSX = require('xlsx')


async function json(filePath) {
    const readFile = readFileSync(filePath, "utf-8")
    return JSON.parse(readFile)
}

function xlsx(filePath) {
    const  workbook = XLSX.readFile(filePath);
    const  sheets = workbook.SheetNames;
    const data = {}
    sheets.forEach((sheet, index) => {
        data[sheet.toLowerCase()] = XLSX.utils.sheet_to_json(workbook.Sheets[sheets[index]])
    })
    return data
}


module.exports = {
    json,
    xlsx
}