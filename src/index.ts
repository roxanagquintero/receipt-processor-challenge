import express from 'express';
import { receiptsRouter } from './routes/receiptsRouter';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 4000;
dotenv.config();
app.use(express.json());
//mongoDB
const mongoURI = process.env.MONGO_URI || '';
mongoose.connect(mongoURI);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection successful');
});
connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Receipt Processor API',
      description: 'API for processing receipts and calculating points.',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Local server',
      },
    ],
    components: {
      schemas: {
        Receipt: {
          type: 'object',
          required: [
            'retailer',
            'purchaseDate',
            'purchaseTime',
            'items',
            'total',
          ],
          properties: {
            retailer: { type: 'string', example: 'M&M Corner Market' },
            purchaseDate: {
              type: 'string',
              format: 'date',
              example: '2022-01-01',
            },
            purchaseTime: { type: 'string', format: 'time', example: '13:01' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                required: ['shortDescription', 'price'],
                properties: {
                  shortDescription: {
                    type: 'string',
                    example: 'Mountain Dew 12PK',
                  },
                  price: { type: 'string', example: '6.49' },
                },
              },
            },
            total: { type: 'string', example: '35.35' },
          },
        },
        PointsResponse: {
          type: 'object',
          properties: {
            points: { type: 'integer', example: 101 },
          },
        },
      },
      responses: {
        BadRequest: {
          description: 'The receipt is invalid. Please verify input.',
        },
        NotFound: {
          description: 'No receipt found for that ID.',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Adjust path as needed
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routers
app.use('/receipts', receiptsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
