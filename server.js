if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const fs = require("fs")
const stripe = require('stripe')(stripeSecretKey)

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))

app.get('/', function (req, res) {
    // List Stripe SKUs maintained on site
    stripe.skus.list(
        function (err, skus) {
            if (err) {
                res.status(500).end()
            }
            else {
                // console.log(skus.data)
                res.render('index.ejs', {
                    stripePublicKey: stripePublicKey,
                    items: skus.data.map(s => (
                        {
                            id: s.id,
                            name: s.attributes.name,
                            price: s.price,
                            type: s.attributes.type,
                            imgName: s.image
                        }
                    ))
                })
            }
        }
    );
})

app.get('/about', function (req, res) {
    res.render('about.ejs')
})

app.listen(port, function () {
    console.log(`Server running at port ${port}`)
})