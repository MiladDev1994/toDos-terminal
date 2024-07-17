const inquirer = require('inquirer');
const backUtil = require("../../../utils/back");
const findKey = require('../../../utils/findKey');
const option = require("./option/option")


function query_by(props) {
    const {config, back, ended} = props
    
    inquirer.prompt(config.prompt())
    .then( async (answers) => {
        const {Query} = answers
        const {list} = config
        const res = findKey(list, Query)
        option[res]({
            config: list[res].child,
            back: ended,
            ended: () => query_by(props)
        })
    })

}


module.exports = {
    back: backUtil,
    query_by
}