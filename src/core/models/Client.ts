import { Client as DiscordClient, ClientOptions, Collection } from 'discord.js';
import { ClientApplicationCommand, ClientCommand, OverrideClient } from '../types/typings';

export class Client<R extends boolean = boolean> extends DiscordClient<R> implements OverrideClient {
    public readonly commands: Collection<string, ClientCommand> = new Collection<string, ClientCommand>();
    public readonly applicationCommands: Collection<string, ClientApplicationCommand> = new Collection<string, ClientApplicationCommand>();

    public constructor(options: ClientOptions) {
        super(options);
    }
}