const fs = require('fs/promises')

async function writeDataHeandler(contactsArrData, dbPath) {
    const respData = JSON.stringify(contactsArrData)
    try {
        return await fs.writeFile(dbPath, respData, "utf8")
    } catch (err) {
        console.log(`\n${err.name}!!!\n${err.message}\n`);
    }
}

module.exports = writeDataHeandler