import { ETableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { ICidade } from '../../models';

export const getById = async (id: number): Promise<ICidade | Error> => {
    try {
        const result = await Knex(ETableNames.cidade)
            .select('*')
            .where('id', id)
            .first();

        if (result) {
            return result;
        }

        return new Error('City not found.');
    } catch (error) {
        console.log(error);
        return new Error('Error to get the city.');
    }
};
