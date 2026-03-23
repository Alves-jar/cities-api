import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',

        info: {
            title: 'Cities API',
            version: '1.0.0',
            description: 'API para gerenciamento de cidades, pessoas e usuários',
        },

        servers: [
            {
                url: 'https://cities-api-4kol.onrender.com',
            },
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },

            schemas: {
                CidadeInput: {
                    type: 'object',
                    required: ['nome'],
                    properties: {
                        nome: {
                            type: 'string',
                            minLength: 3,
                            maxLength: 150,
                            example: 'São Paulo',
                        },
                    },
                },

                Cidade: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        nome: {
                            type: 'string',
                            example: 'São Paulo',
                        },
                    },
                },

                PessoaInput: {
                    type: 'object',
                    required: ['nomeCompleto', 'email', 'cidadeId'],
                    properties: {
                        nomeCompleto: {
                            type: 'string',
                            example: 'João da Silva',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'joao@email.com',
                        },
                        cidadeId: {
                            type: 'integer',
                            example: 1,
                        },
                    },
                },

                Pessoa: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nomeCompleto: { type: 'string', example: 'João da Silva' },
                        email: { type: 'string', example: 'joao@email.com' },
                        cidadeId: { type: 'integer', example: 1 },
                    },
                },

                UsuarioInput: {
                    type: 'object',
                    required: ['nome', 'email', 'senha'],
                    properties: {
                        nome: {
                            type: 'string',
                            example: 'Igor',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'igor@email.com',
                        },
                        senha: {
                            type: 'string',
                            minLength: 6,
                            example: '123456',
                        },
                    },
                },

                LoginInput: {
                    type: 'object',
                    required: ['email', 'senha'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                        },
                        senha: {
                            type: 'string',
                            minLength: 6,
                        },
                    },
                },

                LoginResponse: {
                    type: 'object',
                    properties: {
                        accessToken: {
                            type: 'string',
                            example: 'jwt.token.aqui',
                        },
                    },
                },

                ErrorResponse: {
                    type: 'object',
                    properties: {
                        errors: {
                            type: 'object',
                            additionalProperties: {
                                type: 'string',
                            },
                            example: {
                                default: 'Erro interno',
                            },
                        },
                    },
                },
            },
        },
    },

    apis: ['./src/server/controllers/**/*.ts'],
});
