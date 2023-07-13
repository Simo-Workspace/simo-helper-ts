import { Snowflake } from 'discord.js';

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