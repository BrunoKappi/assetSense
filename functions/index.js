

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp()

'use strict';

const cors = require('cors')({
    origin: true,
});

exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});


// http request 1
exports.randomNumber = functions.https.onRequest((request, response) => {
    const number = Math.round(Math.random() * 100);
    response.send(number.toString());
});


exports.getDados = functions.https.onRequest((req, res) => {
    const allowedOrigins = ['https://assetsense.web.app', 'https://assetsense.firebaseapp.com', 'https://serranoassetsense.netlify.app']; // lista de domínios permitidos

    const origin = req.headers.origin; // obtém o domínio de origem da requisição

    if (allowedOrigins.includes(origin)) { // verifica se o domínio está na lista de domínios permitidos
        cors(req, res, async () => {
            const collectionName = req.query.collection || 'Setores';
            const collectionRef = admin.firestore().collection(collectionName);
            const snapshot = await collectionRef.get();
            const data = [];

            snapshot.forEach((doc) => {
                data.push(doc.data());
            });

            res.set('Access-Control-Allow-Origin', origin); // define a política de CORS para permitir acesso apenas do domínio de origem
            res.set('Content-Type', 'application/json'); // define o tipo de conteúdo da resposta como JSON
            res.status(200).send(JSON.stringify(data)); // envia a resposta como uma string JSON
        });
    } else {
        res.status(403).send('Forbidden'); // retorna um erro 403 (Forbidden) se o domínio de origem não estiver na lista de domínios permitidos
    }
});


exports.getOrigin = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        res.set('Access-Control-Allow-Origin', '*'); // define a política de CORS para permitir acesso de qualquer origem
        res.set('Content-Type', 'application/json'); // define o tipo de conteúdo da resposta como JSON
        const origin = req.headers.origin; // obtém o domínio de origem da requisição
        res.status(200).send(JSON.stringify(origin)); // envia a resposta como uma string JSON
    });
});



exports.getSetores = functions.https.onRequest(async (req, res) => {
    const setoresRef = admin.firestore().collection('Setores');
    const snapshot = await setoresRef.get();
    const setores = [];

    snapshot.forEach((doc) => {
        setores.push(doc.data());
    });

    res.status(200).send(setores);
});


