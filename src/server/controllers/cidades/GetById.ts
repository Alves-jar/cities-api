import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { CidadesProvider } from '../../database/providers/cidades';


interface IParamProps {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {

    const id = Number(req.params.id);
    if (!id || !(typeof id === 'number')) return res.status(StatusCodes.NOT_FOUND).json({
        errors: {
            default: 'O Id deve ser um número',
        },
    });

    const result = await CidadesProvider.getById(id);

    return res.status(StatusCodes.OK).json(result);
};
