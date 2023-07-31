import * as functions from '../../../functions.json';
import {
    ClientApplicationCommand,
    CommandPayload,
} from '../../core/types/typings';

export default {
    name: 'docs',
    async autocomplete(interaction) {
        const value = interaction.options.getFocused();

        if (!value)
            return interaction.respond([
                { name: 'Nenhuma função/evento encontrado', value: 'none' },
            ]);

        const parsedValue = (value.startsWith('$') ? value : '$' + value).replace(
            /[^0-9a-z$]/i,
            ''
        );

        const filtered = Object.keys(functions).filter((key) =>
            key in functions
                ? functions[key].filter((fn) => fn.function.startsWith(parsedValue))
                : void 0
        );

        await interaction.respond(
            filtered
                .map((key) => {
                    const fn = filtered[key];

                    return {
                        name: fn.function,
                        value: `${fn.function}<>${fn.description}`,
                    };
                })
                .slice(0, 25)
        );
    },
    async run({ interaction }: CommandPayload<true>) {
        const option = interaction.options.getString('query', true).split('<>');

        if (option[0] === 'none')
            return interaction.reply({
                content: 'Nenhuma função/evento encontrado',
                ephemeral: true,
            });

        interaction.reply({
            content: `<:method:1131583418329743460> | **${option[0]}**\n\n${option[1]}`,
        });
    },
} as ClientApplicationCommand;
