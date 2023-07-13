import { Document } from 'mongoose';
import { Client } from '../models/Client';
import { Snowflake, Client as DiscordClient, ChatInputCommandInteraction, Message, ClientEvents, Awaitable, AutocompleteInteraction, Collection } from 'discord.js';

export interface GuildSchemaStructure {
    _id: Snowflake;
    tags: Map<Snowflake, TagStructure>;
    prefix: string;
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
    commands: Collection<string, ClientCommand>;
    applicationCommands: Collection<string, ClientApplicationCommand>;
}

export interface ClientCommand {
    name: string;
    aliases: (never | string)[];
    run: (payload: CommandPayload<false>) => Promise<unknown>;
}

export interface ClientApplicationCommand {
    name: string;
    autocomplete?: (interaction: AutocompleteInteraction) => Promise<unknown>;
    run: (payload: CommandPayload<true>) => Promise<unknown>;
}

export interface CommandPayload<A extends boolean> {
    client: Client;
    interaction: A extends true ? ChatInputCommandInteraction : null;
    message: A extends true ? null : Message;
    guildSchema: Document<unknown, Record<never, never>, GuildSchemaStructure> & Omit<GuildSchemaStructure & Required<{
        _id: string;
    }>, never>;
    args: (A extends true ? never : string)[];
}

export interface ClientEvent<N extends keyof ClientEvents> {
    name: N;
    run: (...args: ClientEvents[N]) => Awaitable<void>;
}