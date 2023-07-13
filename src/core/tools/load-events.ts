import { client } from '../..';
import tinyGlob from 'tiny-glob';
import { ClientEvents } from 'discord.js';
import { ClientEvent } from '../types/typings';

export const loadEvents: () => Promise<void> = async (): Promise<void> => {
    const paths: string[] = await tinyGlob('./src/events/*.ts');

    for (const path of paths) {
        const { default: { name, run } }: { default: ClientEvent<keyof ClientEvents> } = await import(`../../../${path}`);

        client.on(name, run);
    }
};