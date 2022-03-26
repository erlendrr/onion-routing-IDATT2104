import ResolvedValue = jest.ResolvedValue

const client = require('../client')
const axios = require('axios')
jest.mock('axios')

it('sends a get request', async () => {
	const nodes = [
		{ address: { ip: 'http://localhost', port: 8007 } },
		{ address: { ip: 'http://localhost', port: 8001 } },
		{ address: { ip: 'http://localhost', port: 8008 } },
	]

	const keys = [
		'a6a2fa8f553629efce0687bfaaa47d35',
		'1ed08a102e8db3021ef3cf567a68c551',
		'2ca6700a55112dfa162964cef5581090',
	]

	const encrypted = {
		data:
			'ab51e4acf2dd48a6608cc650c15b7055a40386cd976ab40388784385995f5b073044b5bac775b3e7fc0d4da15e13d50d41b97abfe12c0b232b31935e03befa4987c2f2d1ee691db982d27f002e2cdd59ac72fc9f7d69463ff15d9650' +
			'6f5ba46d6cfbe9c7c739c2a176791c9cd62a8c97b5cf659c7b0bf58ada76fa0f8e74e4bbc8c2a3f64a87e994ee622769c09cc375c5c781c2a5966caae61ff461ac7b83e9abef7d4c1d73f3b6f4b0bc16e39766cd88202aea7a207e5f' +
			'46b9e90e953be23f7e2b65e6c2d2142106ff14fae744bfb233dcca06b5fd70aa9fc0370bcc7badd7',
	}
	const result = { data: 'Test' }
	axios.get.mockResolvedValue(encrypted as ResolvedValue<string>)
	const response = await client.get('http://localhost:3333', keys, nodes)
	expect(response).toStrictEqual(result)
})

it('sends a post request', async () => {
	const nodes = [
		{ address: { ip: 'http://localhost', port: 8000 } },
		{ address: { ip: 'http://localhost', port: 8001 } },
		{ address: { ip: 'http://localhost', port: 8008 } },
	]

	const keys = [
		'3a626105470a9f1b1c35a27ee8230ed1',
		'bd701c0e5ff833d12ca4f64b47429553',
		'720bf9811d0b9d5d12ff3b58e9d6cc1e',
	]

	const encrypted = {
		data:
			'e80815d85ece3f7aff6cac049fa569e84bfce464ff573152a8e94418a24973512e55f0b6330de1c30e29bd2c38196cccaf0b4992a37bf4ad9968790968c787f37e8853a8f5bcc9841b2c1373a7500dc17b0a8692c15ea032e859d032' +
			'0aa3fb219000eb6553dd9bc7873b3d7185a7cd93d91f259d342765fc969a2338d1b7fd4cdefaf03dcfad6ba46a02996f1eb95c8123d4467cf452151a176b63280c10939c35cbd698e6ce7dc8d78e9934eda1d1fd23a270f9625dfa16' +
			'5f5e490980e33b34e2e03cf27425ccd45c80616b4876e16487d937aa5954a641b2dbc37786b455ac',
	}
	const result = 'OK'
	axios.post.mockResolvedValue(encrypted as ResolvedValue<string>)
	const response = await client.post(
		'http://localhost:3333',
		'Hello World!',
		keys,
		nodes
	)
	expect(response).toStrictEqual(result)
})

it('Test handshake', async () => {
	const publicKey = { data: { publicKey: 'f2f14d724f9dd4a0bfebbb3b1a8f9bd' } }
	const nodes = [{ address: { ip: 'http://localhost', port: 8006 } }]

	axios.post.mockResolvedValue(publicKey as ResolvedValue<string>)
	const response = await client.handshake(nodes)

	expect(typeof response[0]).toBe('string')
	expect(response[0].length).toBeGreaterThan(1)
})
