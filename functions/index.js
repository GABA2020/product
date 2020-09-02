const functions = require('firebase-functions');
const stripe = require('stripe')(
  'sk_test_51HJAVwAR6Zl0WfNDSoWGXMU14oLfItr9ZOEjWDvnDc9CyeRT9QuUwS7Wz4nwPjswlHkbj1dGvPSvIxmgWu5grtar00upfKvtZJ',
);

exports.paymentProcessing = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  }
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
