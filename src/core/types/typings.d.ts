import { Client } from '../models/Client';
import { Snowflake, Client as DiscordClient, ChatInputCommandInteraction, Message, ClientEvents, Awaitable } from 'discord.js';

export interface GuildSchemaStructure {
    _id: Snowflake;
    tags: Map<Snowflake, TagStructure>;
}

export interface TagStructure {
    name: string;
    content: string;
    type: TagType;
}

export enum TagType {
    Event,
    Function
}

export interface OverrideClient extends DiscordClient {
    commands: Map<RegExp, ClientCommand>;
    applicationCommands: Map<string, ClientApplicationCommand>;
}

export interface ClientCommand {
    name: RegExp;
    run: (payload: CommandPayload<false>) => Promise<unknown>;
}

export interface ClientApplicationCommand {
    name: string;
    run: (payload: CommandPayload<true>) => Promise<unknown>;
}

export interface CommandPayload<A extends boolean> {
    client: Client;
    interaction: A extends true ? ChatInputCommandInteraction : null;
    message: A extends true ? null : Message;
}

export interface ClientEvent<N extends keyof ClientEvents> {
    name: N;
    run: (...args: ClientEvents[N]) => Awaitable<void>;
}