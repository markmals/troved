import { defineSpec } from 'openapi-backend-ext';

export default defineSpec({
    openapi: '3.1.0',
    info: { title: 'Trove', version: '1' },
    servers: [],
    paths: {
        '/search': {
            get: {
                operationId: 'search',
                parameters: [
                    {
                        name: 'q',
                        in: 'query',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    '200': {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            overview: {
                                                type: 'string',
                                                required: false,
                                            },
                                            name: {
                                                type: 'string',
                                                required: false,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/air-dates': {
            get: {
                operationId: 'airDates',
                parameters: [
                    {
                        name: 'id',
                        in: 'query',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    '200': {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        day: { type: 'string' },
                                        time: { type: 'string' },
                                        timezone: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/subscribe': {
            post: {
                operationId: 'subscribe',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    id: { type: 'integer' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'integer' },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
});