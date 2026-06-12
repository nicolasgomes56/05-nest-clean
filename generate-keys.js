const crypto = require('node:crypto');
const fs = require('node:fs');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

// Salva os arquivos .pem no projeto
fs.writeFileSync('private_key.pem', privateKey);
fs.writeFileSync('public_key.pem', publicKey);

console.log('✅ Arquivos private_key.pem e public_key.pem gerados com sucesso!');

// Converte para Base64
const privateKeyBase64 = Buffer.from(privateKey).toString('base64');
const publicKeyBase64 = Buffer.from(publicKey).toString('base64');

// Salva as chaves em Base64 em arquivos .txt para facilitar
fs.writeFileSync('private_key-base64.txt', privateKeyBase64);
fs.writeFileSync('public_key-base64.txt', publicKeyBase64);

console.log('✅ Arquivos private_key-base64.txt e public_key-base64.txt gerados com sucesso!\n');

console.log('=== COPIE A CHAVE ABAIXO PARA O JWT_PRIVATE_KEY ===\n');
console.log(privateKeyBase64);

console.log('\n=== COPIE A CHAVE ABAIXO PARA O JWT_PUBLIC_KEY ===\n');
console.log(publicKeyBase64);
