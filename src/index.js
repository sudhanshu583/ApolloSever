import pkg from 'merge-graphql-schemas';
const {fileLoader, mergeTypes} = pkg;

import path from 'path';
const __dirname = path.resolve();
import resolvers from './modules/index.js';

const typesArray = fileLoader(path.join(__dirname, './**/*.graphql'));

const typeDefs = mergeTypes(typesArray, { all: true });

export {
  resolvers,
  typeDefs,
};