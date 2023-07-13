import { ClientCommand, CommandPayload } from '../../core/types/typings';

export default {
    name: /oi|ola/i,
    async run({ message }: CommandPayload<false>) {
        return message.channel.send('tchau');
    }
} as ClientCommand;