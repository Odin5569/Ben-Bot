const { Client, IntentsBitField, EmbedBuilder } = require("discord.js")
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

const client = new Client({ 
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates
    ]
});


// Configs für dich:
const TOKEN = 'MTIzMzQwOTQ2NzUzODg3MDI4NQ.GtWWDf.15Dl390GzB2Ie4wfToDqPRfCG8YHf7BMPBviyM' // Einfach Token ersetzen
const PREFIX = '!' // Änder einfach den Prefix zu irgendwas wie / oder !
const ADMIN = 'Odin' // Dein Discord Anzeigename

// Befehle:
const RANDOMBEN = "ben"
const PURGE = 'purge'
const FORCESTOP = "forcestop"

// Audiofiles
const YES = 'ben-yes'
const NO = 'ben-no'
const HAHA = 'ben-haha'

client.on('ready', async (ready) => {
        client.user.setUsername('Ben System')
    })
client.on('messageCreate', async (message) => {
    if (message.content === PREFIX + RANDOMBEN) {
        if (message.member.displayName === ADMIN) {
            const SOUNDS = [YES, NO, HAHA]
            const RS = SOUNDS[Math.floor(Math.random() * SOUNDS.length)];
            const connection = joinVoiceChannel({
                channelId: message.member.voice.channelId,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });
    
            const player = createAudioPlayer();
            const resource = createAudioResource('./' + `${RS}` + '.mp3');
    
            player.play(resource);
            connection.subscribe(player);

            message.channel.lastMessage.delete()
            
            if (RS === NO) {
                const embed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Ben')
                .setDescription('Ben sagt: **NO**')

                message.channel.send({ embeds: [embed] })

                setTimeout(() => { message.channel.lastMessage.delete(); }, 3000);
            }

            else if (RS === YES) {
                const embed = new EmbedBuilder()
                .setColor('Green')
                .setTitle('Ben')
                .setDescription('Ben sagt: **YES**')

                message.channel.send({ embeds: [embed] })

                setTimeout(() => { message.channel.lastMessage.delete(); }, 3000);
            }

            else if (RS == HAHA) {
                const embed = new EmbedBuilder()
                .setColor('Blue')
                .setTitle('Ben')
                .setDescription('Ben sagt: **HAHA**')

                message.channel.send({ embeds: [embed] })

                setTimeout(() => { message.channel.lastMessage.delete(); }, 3000);
            }

            else {
                const embed = new EmbedBuilder()
                .setColor('DarkRed')
                .setDescription('## Etwas ist fehlgeschlagen!')

                message.channel.send({ embeds: [embed] })

                setTimeout(
                    message.channel.lastMessage.delete()
                ), 1000
            }
        }
    }

    else if (message.content === PREFIX + PURGE) {
        if (message.member.displayName === ADMIN) {
            message.channel.bulkDelete(100)
        }
    }
    else if (message.content === PREFIX + FORCESTOP) {
        if (message.member.displayName === ADMIN) {
            client.user.setStatus("invisible")
            client.destroy()
        }
    }
})
client.login(TOKEN)