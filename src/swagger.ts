import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsDoc.OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Receipt Processor API',
      version: '1.0.0',
      description: 'API for processing receipts and calculating points.',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export default swaggerOptions;
