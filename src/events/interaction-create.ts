import { client } from '..';
import { Guild } from '../core/models/Guild';
import { ClientApplicationCommand, ClientEvent } from '../core/types/typings';
import { CacheType, ChatInputCommandInteraction, Interaction } from 'discord.js';

export default {
    name: 'interactionCreate',
    async run(interaction: Interaction<CacheType>): Promise<void> {
        if (!interaction.isAutocomplete() && !interaction.isCommand()) return;

        const guild = await Guild.findById({ _id: interaction.guildId });
        const guildSchema = guild ? guild : await Guild.create({ _id: interaction.guildId });

        const commandName: string = interaction.command?.name as string;
        const command: ClientApplicationCommand | undefined = client.applicationCommands.get(commandName);

        if (command) {
            if (interaction.isAutocomplete() && command.autocomplete) return void command.autocomplete(interaction);

            await command.run({ args: [], message: null, client, interaction: interaction as ChatInputCommandInteraction, guildSchema }).catch(console.error);
        }
    }
} as ClientEvent<'interactionCreate'>;