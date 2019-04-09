import challengeRoutes from './routes/challengeRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import { Router } from 'express';

const apiRoutes = [
  {path: '/api/v1/auth', endpoints: authRoutes},
  {path: '/api/v1/users', endpoints: userRoutes},
  {path: '/api/v1/challenges', endpoints: challengeRoutes}
];

const router = Router();

// Add all apiRoutes to router
apiRoutes.forEach(route => {
  route.endpoints.forEach(endpoint => {
    (router as any)[endpoint.method](route.path+endpoint.path, endpoint.middlewares, endpoint.action);
  });
});

// Provide all apiRoutes in route /api/v1
router.get('/api/v1', (req, res, next) => res.status(200).json({apiRoutes: apiRoutes.map(routes => {
  return {path: routes.path, routes: routes.endpoints.map(r => {
    return {method: r.method, path: r.path, description: r.description, body: r.body};
  })};
})}));

// Render react app to index page
router.get('/', (req, res) => {
  res.sendFile('/src/client/build/index.html');
});

router.get('*', (req, res) => {
  console.log(req.url);
  //res.redirect(`/?q=${req.url}`);
});

export default router;

