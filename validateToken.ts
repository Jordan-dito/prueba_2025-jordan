import jwt from 'jsonwebtoken';

// Asegúrate de tener la clave secreta en tu archivo .env
const secretKey = 'mysecretkey';

if (!secretKey) {
  console.error('Por favor, define JWT_SECRET en tu archivo .env');
  process.exit(1);
}

// El token que deseas validar
const token = process.argv[2];

if (!token) {
  console.log('Por favor, proporciona un token para validar.');
  process.exit(1);
}

try {
  const decoded = jwt.verify(token, secretKey);
  console.log('Token válido:', decoded);
} catch (error) {
  if (error instanceof Error) {
    console.log('Token inválido:', error.message);
  } else {
    console.log('Token inválido:', error);
  }
}
