const router = require('express').Router()
const stripe = require('stripe')(process.env.SECRET_KEY)

router.post('/charge', (req, res) => {
  try {
    const token = req.body.stripeToken

    let charge = stripe.charges.create({
      amount: req.body.total,
      description: 'test charge',
      currency: 'usd',
      source: token
    })

    res.json(charge)
  } catch (err) {
    res.status(500).end()
  }
})

module.exports = router
