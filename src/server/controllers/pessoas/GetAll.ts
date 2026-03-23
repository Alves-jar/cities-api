/**
 * @swagger
 * /pessoas:
 *   get:
 *     summary: Lista pessoas com paginação
 *     tags:
 *       - Pessoas
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 7
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           example: "João"
 *     responses:
 *       200:
 *         description: Lista de pessoas
 *         headers:
 *           x-total-count:
 *             description: Total de registros
 *             schema:
 *               type: integer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pessoa'
 *       500:
 *         description: Erro interno do servidor
 */

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { PessoasProvider } from './../../database/providers/pessoas';
import { validation } from '../../shared/middleware';

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}
export const getAllValidation = validation(get => ({
    query: get<IQueryProps>(yup.object().shape({
        filter: yup.string().optional().default(''),
        page: yup.number().integer().optional().moreThan(0).default(1),
        limit: yup.number().integer().optional().moreThan(0).default(7),
    })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    const result = await PessoasProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || '');
    const count = await PessoasProvider.count(req.query.filter);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message },
        });
    } else if (count instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: count.message },
        });
    }

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);

    return res.status(StatusCodes.OK).json(result);
};
