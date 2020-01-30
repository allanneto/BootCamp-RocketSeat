import jwt from 'jsonwebtoken';
import promisify from 'util';

import authConfig from '../../config/auth';

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    response.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    console.log(decoded);

    return next();
  } catch (error) {
    return response.status(401).json({ error: 'Token invalid' });
  }
};
