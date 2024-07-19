

var XLSX = require('xlsx')

const  workbook = XLSX.readFile('C:\\Users\\milad\\Desktop\\terminal_todos_2024_7_19_13_12\\todos.xlsx');
    const  sheets = workbook.SheetNames;
    const data = {}
    sheets.forEach((sheet, index) => {
        data[sheet.toLowerCase()] = XLSX.utils.sheet_to_json(workbook.Sheets[sheets[index]])
})
console.log(data);