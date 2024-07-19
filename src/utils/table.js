
const chalk = require('chalk');
const Table = require('cli-table3');
const Logger = require('../../config/logger');

function TableUtil(data) {

    if (!Object.entries(data)?.length) return Logger.Warning("record_not_exist");
    function toCapitalCamelCase(str) {
        const text =  str
            .toLowerCase()
            .replace(/(?:^|\s)\S/g, function(match) {
                return match.toUpperCase();
            })
            .replace(/\s+/g, '');
            return chalk.cyan(text)
    }
    
    const table = new Table({
        head: Object.entries(data?.[0]).map(([key, value]) => toCapitalCamelCase(key)),
    });
    
    data.forEach(row => {
        table.push(Object.entries(row).map(([key, value]) => value));
    });
    
    Logger.Table(table)
    return table.toString()
}

module.exports = TableUtil