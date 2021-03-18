import {  userQuery } from './user/index.js';
import {  traineeQuery ,traineeMutation} from './trainee/index.js';

export default {
  Query: {
    ...userQuery,
    ...traineeQuery
  },
  Mutation: {
    ...traineeMutation,
  }
};
