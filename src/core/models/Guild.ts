import { Snowflake } from 'discord.js';
import { Schema, model } from 'mongoose';
import { GuildSchemaStructure, TagStructure } from '../types/typings';

const guildSchema = new Schema<GuildSchemaStructure>({
    _id: {
        type: String, required: true, minlength: 16, maxlength: 21
    },
    tags: {
        type: Map, of: Object, default: new Map<Snowflake, TagStructure>()
    }
});

export const Guild = model('GuildSchema', guildSchema);