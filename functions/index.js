const functions = require('firebase-functions');
const stripe = require('stripe')(
  'sk_test_51HJAVwAR6Zl0WfNDSoWGXMU14oLfItr9ZOEjWDvnDc9CyeRT9QuUwS7Wz4nwPjswlHkbj1dGvPSvIxmgWu5grtar00upfKvtZJ',
);
const corsModule = require('cors');
const cors = corsModule({ origin: 'http://localhost:3000/payment' });

exports.paymentProcessing = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method === 'POST') {
      try {
        const GABABronze = 9 * 12 * 100;
        const GABASilver = 20 * 12 * 100;
        const PreMed = 30 * 12 * 100;
        req.body.amount === 'GABABronze'
          ? (membership = GABABronze)
          : req.body.amount === 'GABASilver'
          ? (membership = GABASilver)
          : req.body.amount === 'PreMed'
          ? (membership = PreMed)
          : err;

        const paymentIntent = await stripe.paymentIntents.create({
          amount: membership,
          currency: 'usd',
          metadata: { integration_check: 'accept_a_payment' },
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
});
