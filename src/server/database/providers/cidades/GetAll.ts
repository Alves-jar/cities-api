import { ETableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { ICidade } from '../../models';

export const getAll = async (): Promise<ICidade[] | Error> => {
    try {
        const result = await Knex(ETableNames.cidade)
            .select('*');

        if (result.length > 0) {
            return result;
        }

        return [];

    } catch (error) {
        console.log(error);
        return new Error('Error to get cities.');
    }
};
