const cors = require('cors');
const express = require('express');
const request = require('request');
const app = express();
app.use(cors());

const port = Number(process.env.PORT || 8080);
const apiServerHost = (process.env.ELASTIC_URL || 'http://127.0.0.1:9200')

const pipeRequest = (req, res) => {
	req.pipe(request({
		uri  : apiServerHost + req.url,
		headers: {
			'accept-encoding': 'none'
		},
		rejectUnauthorized: false,
	}, function(err, res, body) {
	})).pipe(res);
}

app.get('/ping', (req, res) => {
	res.status(200).send({
		body: {
			status: 'success',
			result: 'Proxy alive'
		}
	})
});

app.post('/:index/_search', (req, res, body) => {
	pipeRequest(req, res);
});

app.post('/:index/_msearch', (req, res, body) => {
	pipeRequest(req, res);
});

// Server Listen
app.listen(port, function () {
	console.log(`Elastic proxy running in port ${port}`);
});
