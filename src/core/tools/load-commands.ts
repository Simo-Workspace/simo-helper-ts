import { client } from '../..';
import tinyGlob from 'tiny-glob';
import { ClientApplicationCommand, ClientCommand } from '../types/typings';

export const loadCommands: () => Promise<void> = async (): Promise<void> => {
    const paths = await tinyGlob('./src/commands/**/*.ts');

    for (const path of paths) {
        const { default: command }: { default: ClientCommand | ClientApplicationCommand } = await import(`../../../${path}`);

        if ('aliases' in command) return void client.commands.set(command.name, command as ClientCommand);

        client.applicationCommands.set(command.name, command as ClientApplicationCommand);
    }
};