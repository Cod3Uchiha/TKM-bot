require("./module")

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
	return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

global.color = color
global.bgcolor = bgcolor
global.sleep = sleep