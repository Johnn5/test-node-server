
var express = require('express')
var hbs = require('hbs')
var app = express()
const fs = require('fs')
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

app.use((req, res, next) => {
  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.url}`
  console.log()
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  next()
})

// app.use((req, res, next) => {
//   res.render('maintainance.hbs')
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  // res.send('<h1>Hello Express</h1>')
  res.send({
    name: 'John Cahill',
    like: [
      'mma',
      'soccer'
    ]
  })
})
app.get('/home', (req, res) => {
  res.render('home.hbs', {
    pageName: 'Home Page',
    welcomeMessage: 'hello you are welcome to my website',
    author: 'John Cahill'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageName: 'About Page',
    author: 'John Cahill'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
