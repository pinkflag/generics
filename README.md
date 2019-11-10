# The Generics (Stripe)

Store front for the band ***Generics*** that makes bank through the super-cool **Stripe API**!

Hosted at: https://generics.herokuapp.com

Stripe test card numbers: https://stripe.com/docs/testing#cards

## Running the app locally

1. Install Node Package Manager (NPM) by installing Node.js

2. From the terminal go to the project folder and run

```
npm install
```

3. Ensure you have the following settings in an .env file in the project folder (or in .bashrc)

```
STRIPE_SECRET_KEY=<Stripe secret key>
STRIPE_PUBLIC_KEY=<Stripe Public key>
```

4. Run the following command to start the app

```
npm start
```

5. in the browser type localhost:3000

# Synopsis

## Stripe APIs used
1. [Checkout](https://stripe.com/docs/payments/checkout)
2. [Charges](https://stripe.com/docs/charges)

## Approaching the problem
I focused mainly on demonstrating how Stripe enables a technical win for the business use case of E-commerce payments.
To that end,

 1. I looked at relevant Stripe docs.
* [Create a charge](https://stripe.com/docs/api/charges/create)
* [Checkout overview](https://stripe.com/docs/payments/checkout)

2. Found a basic template for a store front online.

3. Integrated required Stripe APIs in the right places to enable an end-to-end payments workflow:
* index.js: [49](https://github.com/pinkflag/generics/blob/b2c254950159b6483a67293ec4f96711556c2e3b/public/index.js#L49), [83](https://github.com/pinkflag/generics/blob/b2c254950159b6483a67293ec4f96711556c2e3b/public/index.js#L83)
* index.ejs: [8](https://github.com/pinkflag/generics/blob/b2c254950159b6483a67293ec4f96711556c2e3b/views/index.ejs#L8)
* server.js: [50](https://github.com/pinkflag/generics/blob/b2c254950159b6483a67293ec4f96711556c2e3b/server.js#L50)

4. Hosted the demo on [Heroku](https://generics.herokuapp.com)

## Technology stack
* [Express](https://expressjs.com) for the server
* [EJS](https://ejs.co) for client-side views
* [Github](https://www.github.com) for source control
* [Heroku](https://www.heroku.com) for hosting

While I'm quite comfortable with these technologies, the reason I picked them is they work well together as part of an ecosystem to deliver value. [Agile Manifesto #10](https://agilemanifesto.org/principles.html) comes to mind:
```
Simplicity - the art of maximizing the amount of work not done - is essential
```
## Building Robustness
While the app demonstrates the value proposition, if I had to broaden the immediate scope:
1. I'd rewrite the HTML/JQuery front-end template in a component based technology like [React](https://reactjs.org) or [Angular](https://angular.io) to enhance responsiveness and maintainability.
2. Separate the Stripe code into modules and add unit tests (in [Jest](https://jestjs.io/) or [Mocha](https://github.com/mochajs/mocha), maybe use [Sinon.JS](https://sinonjs.org) for fakes). This could also have value as documentation for unit testing with Node.js + Stripe API integration.
3. Move the data to a DB, as opposed to having it come from [items.json](https://github.com/pinkflag/generics/blob/master/items.json). The DB could be built out to serve as a central store for other apps demoing E-commerce use cases.
