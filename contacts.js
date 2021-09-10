const path = require('path')
const fs = require('fs/promises')

const DATABASE = "contacts.json"
const contactsPath = path.resolve(__dirname, "db", DATABASE)

async function listContacts() {
    try {
        const recvData = await fs.readFile(contactsPath, "utf-8")
        const parsedData = JSON.parse(recvData)
        if (parsedData.length) {
            return console.table(parsedData)
        } else {
            return console.log("\nno contacts found...\n")
        }
    } catch (err) {
        console.log(`\n${err.name}!!!\n${err.message}\n`);
    }
}

async function getContactById(contactId) {
    try {
        const recvData = await fs.readFile(contactsPath, "utf-8")
        const parsedData = JSON.parse(recvData)
        const filteredData = parsedData.filter(elem => elem.id === parseInt(contactId))
        if (filteredData.length) {
            return console.table(filteredData)

        } else {
            return console.log("\nno contacts found...\n")
        }
    } catch (err) {
        console.log(`\n${err.name}!!!\n${err.message}\n`);
    }
}

async function removeContact(contactId) {
    try {
        const recvData = await fs.readFile(contactsPath, "utf-8")
        const parsedData = JSON.parse(recvData)
        const filteredData = parsedData.filter(elem => elem.id !== parseInt(contactId))
        if (filteredData.length) {
            const respData = JSON.stringify(filteredData)
            try {
                return await fs.writeFile(contactsPath, respData, "utf8")
            } catch (err) {
                return console.log(`\n${err.name}!!!\n${err.message}\n`);
            }
        } else {
            return console.log("\nno contacts found...\n")
        }
    } catch (err) {
        console.log(`\n${err.name}!!!\n${err.message}\n`);
    }
}

async function addContact(name, email, phone) {
    try {
        const recvData = await fs.readFile(contactsPath, "utf-8")
        const parsedData = JSON.parse(recvData)
        const newContactId = parsedData[parsedData.length - 1].id + 1
        const newContact = {
            "id": newContactId,
            "name": name,
            "email": email,
            "phone": phone
        }
        const newContactsData = [...parsedData, newContact]
        const respData = JSON.stringify(newContactsData)
        try {
            return await fs.writeFile(contactsPath, respData, "utf8")
        } catch (err) {
            return console.log(`\n${err.name}!!!\n${err.message}\n`);
        }
    } catch (err) {
        console.log(`\n${err.name}!!!\n${err.message}\n`);
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact }