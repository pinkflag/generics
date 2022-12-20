if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

// console.log(stripeSecretKey, stripePublicKey)

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const fs = require("fs")
const stripe = require('stripe')(stripeSecretKey)

pp.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))

app.get('/', function (req, res) {
    fs.readFile('items.json', function (error, data) {
        // console.log(JSON.parse(data)
        if (error) {
            res.status(500).end()
        }
        else {
            res.render('index.ejs', {
                stripePublicKey: stripePublicKey,
                items: JSON.parse(data)
            })
        }
    })
})

app.post('/purchase', function (req, res) {
    fs.readFile('items.json', function (error, data) {
        if (error) {
            res.status(500).end()
        }
        else {
            const itemsJson = JSON.parse(data)
            const itemsArray = itemsJson.music.concat(itemsJson.merch)
            var total = 0
            req.body.items.forEach(function (item) {
                const itemJson = itemsArray.find(function (i) {
                    return i.id == item.id
                })
                total = total + itemJson.price * item.quantity
            })

            // Create the Stripe charge and send back the amount & Id to user
            stripe.charges.create(
                {
                    amount: total,
                    source: req.body.stripeTokenId,
                    currency: 'usd'
                },
                function (err, charge) {
                    // asynchronously called
                    const totalCharges = (charge.amount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                    res.json({ message: `Total charges: ${totalCharges}, ID: ${charge.id}` })
                }
            );
        }
    })
})

app.get('/about', function (req, res) {
    res.render('about.ejs')
})

app.listen(port, function () {
    console.log(`Server running at port ${port}`)
})