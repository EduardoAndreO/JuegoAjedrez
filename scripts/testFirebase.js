import fs from 'fs';
import path from 'path';

const configPath = path.resolve('src', 'config', 'firebase.js');
if (!fs.existsSync(configPath)) {
  console.error('No se encontró src/config/firebase.js');
  process.exit(1);
}

const fileContent = fs.readFileSync(configPath, 'utf8');
// Extract projectId via simple regex
const m = fileContent.match(/projectId:\s*['"]([^'\"]+)['"]/);
if (!m) {
  console.error('No se pudo extraer projectId de firebase.js');
  process.exit(1);
}
const projectId = m[1];

const endpoints = [
  `https://${projectId}.firebaseio.com`,
  `https://${projectId}-default-rtdb.firebaseio.com`,
];

const testGameId = `test_${Date.now()}`;
const testData = { test: true, timestamp: new Date().toISOString() };

async function tryEndpoint(baseUrl) {
  const putUrl = `${baseUrl}/test_games/${testGameId}.json`;
  const getUrl = `${baseUrl}/test_games/${testGameId}.json`;
  console.log('Probando endpoint:', baseUrl);
  try {
    const putRes = await fetch(putUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData),
    });
    console.log('PUT status:', putRes.status);
    const putBody = await putRes.text();
    console.log('PUT body:', putBody.slice(0, 200));

    const getRes = await fetch(getUrl);
    console.log('GET status:', getRes.status);
    const getBody = await getRes.text();
    console.log('GET body:', getBody.slice(0, 200));

    if (putRes.ok && getRes.ok) {
      console.log('✅ Endpoint funciona:', baseUrl);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Error probando endpoint', baseUrl, err.message);
    return false;
  }
}

(async () => {
  for (const e of endpoints) {
    const ok = await tryEndpoint(e);
    if (ok) process.exit(0);
  }
  console.error('Ningún endpoint respondió correctamente. Verifica la URL de Realtime Database en la consola Firebase.');
  process.exit(2);
})();
