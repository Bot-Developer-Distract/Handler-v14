const { EmbedBuilder, ChatInputCommandInteraction } = require("discord.js")

/**
 * @param {*} interaction - client interaction from Command Interaction
 * @param {*} emoji - emoji for the reply
 * @param {String} description - description for the reply
 * @param {Boolean} type - type of reply, ephemeral true or false
 */
function Reply(interaction, emoji, description, type) {

    interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setColor("#38b6ff")
                .setDescription(`${emoji} | ${description}`)
        ],
        ephemeral: type
    })

}



/**
 * @param {ChatInputCommandInteraction} interaction - client interaction from Command Interaction
 * @param {*} emoji - emoji for the reply
 * @param {String} description - description for the reply
 */
function EditReply(interaction, emoji, description) {

    interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setColor("#38b6ff")
                .setDescription(`${emoji} | ${description}`)
        ]
    })

}


module.exports = {   Reply, EditReply  }