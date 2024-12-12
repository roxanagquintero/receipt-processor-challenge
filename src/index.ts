import express from 'express';
import exampleRoutes from './routes/exampleRoute';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/example', exampleRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'API Endpoints Overview',
    routes: [
      {
        name: 'Users Endpoint',
        description: 'Fetches all users.',
        route: '/example/users',
        methods: ['GET'],
      },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
