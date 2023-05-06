

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp()

'use strict';

const cors = require('cors')({
    origin: true,
});

exports.GetData = functions.https.onRequest((req, res) => {
    const allowedOrigins = ['https://assetsense.web.app', 'https://assetsense.firebaseapp.com', 'https://serranoassetsense.netlify.app']; // lista de domínios permitidos

    const origin = req.headers.origin; // obtém o domínio de origem da requisição

    if (allowedOrigins.includes(origin)) { // verifica se o domínio está na lista de domínios permitidos
        cors(req, res, async () => {
            const collectionName = req.query.collection;
            const collectionRef = admin.firestore().collection(collectionName);
            const snapshot = await collectionRef.get();
            const data = [];

            snapshot.forEach((doc) => {
                data.push({ ...doc.data(), docID: doc.id });
            });

            console.log('A função GetData foi chamada!');
            res.set('Access-Control-Allow-Origin', origin); // define a política de CORS para permitir acesso apenas do domínio de origem
            res.set('Content-Type', 'application/json'); // define o tipo de conteúdo da resposta como JSON
            res.status(200).send(JSON.stringify(data)); // envia a resposta como uma string JSON
        });
    } else {
        res.status(403).send('Forbidden'); // retorna um erro 403 (Forbidden) se o domínio de origem não estiver na lista de domínios permitidos
    }
});




