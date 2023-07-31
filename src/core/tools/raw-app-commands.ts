import { ApplicationCommandData, ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';

export const RawAppCommands: ApplicationCommandData[] = [
    {
        name: 'docs',
        description: 'Find for something in docs',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: 'aoiv6',
                description: 'Find for some event/function in v6 docs',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'query',
                        description: 'Query to search for',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                        autocomplete: true
                    }, {
                        name: 'user',
                        description: 'User to mention',
                        type: ApplicationCommandOptionType.User,
                        required: false
                    }, {
                        name: 'ephemeral',
                        description: 'Hide the message',
                        type: ApplicationCommandOptionType.String,
                        choices: [
                            {
                                name: 'True',
                                value: 'true'
                            }, {
                                name: 'False',
                                value: 'false'
                            }
                        ],
                        required: false
                    }
                ]
            }
        ]
    }
];