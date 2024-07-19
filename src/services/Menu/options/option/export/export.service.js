const { existsSync, mkdirSync } = require("fs")
const path = require("path")
const timestamp2FullDate = require("../../../../../utils/timestamp2FullDate")
const Excel = require('excel4node');
const USERS = require("../../../../../singleton/users.singleton");
const PROJECTS = require("../../../../../singleton/projects.singleton");
const TASKS = require("../../../../../singleton/tasks.singleton");

async function savePathChecker(directory) {
    const folderName = `terminal_todos_${timestamp2FullDate(Date.now()).replace(/[\/ :]/g, '_')}`
    const savePath = path.join(directory, folderName)
    if (!existsSync(savePath)) mkdirSync(savePath)
    return savePath
}

async function excelStructure(savePath) {
    const users = USERS.getAll()
    const projects = PROJECTS.getAll()
    const tasks = TASKS.getAll()
    tasks.map(task => {
        const fullDate = timestamp2FullDate(task.Deadline)
        task.Deadline = fullDate
    })

    const workbook = new Excel.Workbook();
    const sheetsOptions = {sheetView: {rightToLeft: true}}
    const usersSheet = workbook.addWorksheet('Users', sheetsOptions);
    const projectsSheet = workbook.addWorksheet('Projects', sheetsOptions);
    const tasksSheet = workbook.addWorksheet('Tasks', sheetsOptions);

    const jsonData = [
        {data: users, sheet: usersSheet},
        {data: projects, sheet: projectsSheet},
        {data: tasks, sheet: tasksSheet},
    ]

    const publicStyles = {
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        },
        border: {
            left: {
                style: "thin",
                color: 'black'
            },
            right: {
                style: "thin",
                color: 'black'
            },
            top: {
                style: 'thin',
                color: 'black'
            },
            bottom: {
                style: 'thin',
                color: 'black'
            }
        }

    }

    jsonData.map(({data, sheet}) => {
        if (!data.length) return;
        const titles = Object.keys(data[0])
        titles.forEach((ele, index) => {
            sheet.row(index+1).setHeight(24.75)
            sheet.cell(1, index+1).string(ele).style({
                ...publicStyles,
                fill: {
                    type: 'pattern',
                    fgColor: "868686",
                    patternType: 'solid',
                    bold: true,
                },
                font: {
                    name:"Calibri",
                    color: "ffffff",
                    size: 12,
                    bold: true,
                }
            });
        })
        data.forEach((ele, index) => {
            Object.entries(ele).forEach(([keys, value], itemIndex) => {
                sheet.row(index+2).setHeight(17.25)
                sheet.cell(index+2, itemIndex+1).string(String(value)).style({
                    ...publicStyles,
                    fill: {
                        type: 'pattern',
                        fgColor: index % 2 ? "c3c3c3" : "ffffff",
                        patternType: 'solid',
                    },
                    font: {
                        name:"Calibri",
                        color: "black",
                        size: 10,
                    }
                })
            })
        })
    })

    workbook.write(path.join(savePath, `todos.xlsx`));

}

module.exports = {
    savePathChecker,
    excelStructure
}