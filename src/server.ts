import express from 'express'
import { Block } from './cryptoCustom'

const app = express()
app.use(express.json())

app.post('/', (req, res) => {
	if (!req.body?.data) {
		res.send('No data')
		return
	}
	const data = req.body.data as Block
	console.log(data)
	res.sendStatus(200)
})
const htmlPage = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Onion Page</title>
	</head>
	<body>
		<h1>Welcome to the onion page!</h1>
	</body>
</html>
`
app.get('/', (req, res) => {
	res.send({
		data: htmlPage,
	})
})

const port = 3333

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
