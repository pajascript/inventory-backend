const router = require('express').Router();
const Stripe = require('stripe');
const stripe = Stripe("sk_test_51KsO5fAnCla13EzJUUmviS62PB8Ip1GiDMFNyuPeWu0TCdRT2JDKETyct4MapU1g3YV8frxYHA10QRYiOvfC7J6A00lRTSikye")

router.post('/payment', (req, res) => {

    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).json(stripeErr)
        } else {
            res.status(200).json(stripeRes);
        }
    });
    
});



module.exports = router;