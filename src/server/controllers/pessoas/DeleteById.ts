/**
 * @swagger
 * /pessoas/{id}:
 *   delete:
 *     summary: Deleta uma pessoa pelo ID
 *     tags:
 *       - Pessoas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da pessoa
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *     responses:
 *       204:
 *         description: Pessoa deletada com sucesso
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Pessoa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { PessoasProvider } from './../../database/providers/pessoas';
import { validation } from '../../shared/middleware';

interface IParamProps {
  id?: number;
}
export const deleteByIdValidation = validation(get => ({
    params: get<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.',
            },
        });
    }

    const result = await PessoasProvider.deleteById(req.params.id);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};
