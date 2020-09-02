const functions = require('firebase-functions');
const stripe = require('stripe')(
  'sk_test_51HJAVwAR6Zl0WfNDSoWGXMU14oLfItr9ZOEjWDvnDc9CyeRT9QuUwS7Wz4nwPjswlHkbj1dGvPSvIxmgWu5grtar00upfKvtZJ',
);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

exports.paymentProcessing = functions.https.onRequest(async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });
      res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
});
