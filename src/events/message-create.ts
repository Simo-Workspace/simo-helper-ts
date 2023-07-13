import { client } from '..';
import { Guild } from '../core/models/Guild';
import { Message, PermissionFlagsBits } from 'discord.js';
import { ClientCommand, ClientEvent } from '../core/types/typings';

export default {
    name: 'messageCreate',
    async run(message: Message<boolean>): Promise<void> {
        if (message.author.bot) return;
        if (!message.guild?.members.me?.permissions.has(PermissionFlagsBits.SendMessages)) return;

        const targetGuild = await Guild.findById({ _id: message.guildId });
        const guild = targetGuild ? targetGuild : await Guild.create({ _id: message.guildId });

        if (!message.content.startsWith(guild.prefix)) return;

        const args: string[] = message.content.slice(guild.prefix.length).trim().split(' ');
        const commandName: string | undefined = args.shift()?.toLowerCase();
        const command: ClientCommand | undefined = client.commands.find((command: ClientCommand): boolean | undefined => command.name === commandName as string || (command.aliases && command.aliases.includes(commandName as string)));

        if (command) {
            await command.run({ args, client, message, interaction: null, guildSchema: guild }).catch(console.error);
        }
    }
} as ClientEvent<'messageCreate'>;