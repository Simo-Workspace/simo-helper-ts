import { Client as DiscordClient, ClientOptions } from 'discord.js';
import { ClientApplicationCommand, ClientCommand, OverrideClient } from '../types/typings';

export class Client<R extends boolean = boolean> extends DiscordClient<R> implements OverrideClient {
    public readonly commands: Map<RegExp, ClientCommand> = new Map<RegExp, ClientCommand>();
    public readonly applicationCommands: Map<string, ClientApplicationCommand> = new Map<string, ClientApplicationCommand>();

    public constructor(options: ClientOptions) {
        super(options);
    }
}