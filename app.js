const express = require(`express`)
const app = express()
const router = require(`./router/index`)
const session = require('express-session')

const port = process.env.PORT || 3000

app.set('view engine', `ejs`)

app.use(express.urlencoded({ extended: true }))
app.use(session({
	secret: 'menuju ri1',
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false,
		sameSite: true
	}
}))

app.use('/', router)

app.listen(port, () => {
	console.log(`app is listening to port: http://localhost:${port}`);
})
