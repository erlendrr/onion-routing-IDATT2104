import express from 'express'

const app = express()
app.use(express.json())

app.post('/', (req, res) => {
	if (!req.body?.data) {
		res.send('No data')
		return
	}
	res.send({
		data: req.body.data + ' potata',
	})
})

const port = 3333

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
