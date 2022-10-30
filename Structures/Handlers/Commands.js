const { Perms } = require("../Validation/Permissions")
const { Client } = require("discord.js")
const ms = require("ms")

/**
 * @param { Client } client
 */
module.exports = async (client, PG, Ascii) => {

    const Table = new Ascii("Commands Loaded")
    CommandsArray = []
    const CommandFiles = await PG(`${process.cwd()}/Commands/*/*.js`)

    CommandFiles.map(async (file) => {
        const command = require(file)

        if (!command.name) return Table.addRow(file.split("/")[7], "🔸 FAILED", "Missing A Name")
        if (!command.context && !command.description) return Table.addRow(command.name, "🔸 FAILED", "Missing A Description")
        if (command.UserPerms)
        if (command.UserPerms.every(perms => Perms.includes(perms))) command.default_member_permissions = false //ture = see commands every member
        else return Table.addRow(command.name, "🔸 FAILED", "User Permission Is Invalid")

        client.commands.set(command.name, command)
        CommandsArray.push(command)

        await Table.addRow(command.name, "🔹 SUCCESSFUL")

    })

    console.log(Table.toString())
    client.on("ready", () => {
        setInterval(() => { client.guilds.cache.forEach(guild => { guild.commands.set(CommandsArray) }) }, ms("5s")) //All guilds but not global commands
    })
}

