import { load } from 'env-smart';
import { Client } from './core/models/Client';
import { loadEvents } from './core/tools/load-events';
import { loadCommands } from './core/tools/load-commands';

export const client: Client<boolean> = new Client<boolean>({
    intents: 0
});

loadEvents();
loadCommands();
load({ directory: 'src/config/.env' });

client.login(process.env.CLIENT_TOKEN);