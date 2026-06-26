import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Products API",
      version: "1.0.0",
      description: "Express beginner loyihasining product API hujjatlari",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./docs/swagger.yaml"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
