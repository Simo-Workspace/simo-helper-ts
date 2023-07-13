import { ClientCommand, CommandPayload } from '../../core/types/typings';

export default {
    name: 'ola',
    aliases: ['oi'],
    async run({ message }: CommandPayload<false>) {
        return message.channel.send('tchau');
    }
} as ClientCommand;