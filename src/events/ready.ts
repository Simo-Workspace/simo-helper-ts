import { connect } from 'mongoose';
import { ClientEvent } from '../core/types/typings';
import { RawAppCommands } from '../core/tools/raw-app-commands';

export default {
    name: 'ready',
    async run(client): Promise<void> {
        await client.application.commands.set(RawAppCommands);
        await connect(process.env.MONGOOSE_STRING_URI as string);

        console.log('ligado');
    }
} as ClientEvent<'ready'>;