import { ClientApplicationCommand } from '../../core/types/typings';

export default {
    name: 'fuck',
    async run({ interaction }): Promise<void> {
        await interaction.reply({ content: 'Fuck done', ephemeral: true });
    }
} as ClientApplicationCommand;