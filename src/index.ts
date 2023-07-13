import { load } from 'env-smart';
import { Client } from './core/models/Client';
import { GatewayIntentBits } from 'discord.js';
import { loadEvents } from './core/tools/load-events';
import { loadCommands } from './core/tools/load-commands';

export const client: Client<boolean> = new Client<boolean>({
    intents: [
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ]
});

loadEvents();
loadCommands();
load({ directory: 'src/config' });

client.login(process.env.CLIENT_TOKEN);