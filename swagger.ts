/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const staticFolder = './public';
if (!fs.existsSync(staticFolder)) fs.mkdirSync(staticFolder);

const outputFile = './public/swagger.json';
const endpointsFiles = ['./src/index.ts'];

const doc = {
  info: {
    version: '3.0.0',
    title: 'Gastrics IOT',
    description:
      'API para gerenciar consumo de gás de estabelecimentos comerciais.',
  },
  basePath: '/gastrics_iot',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Company',
      description: '',
    },
  ],
  definitions: {
    Company: {
      $name: 'Company Name',
      $cnpj: '11.111.111/0001-11',
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
