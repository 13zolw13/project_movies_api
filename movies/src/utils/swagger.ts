import { Express, Request, Response, NextFunction } from "express";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movies API',
      version:'v1'
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: "JWT"
        },
      },
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.ts', './src/schemas/*.ts']
}


const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  //Swagger page

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)
  )

  //docs in json
  app.get('docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(`docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs;