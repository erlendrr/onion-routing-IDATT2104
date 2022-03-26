import {
	createPackets,
	decryptPackets,
	decrypt,
	encrypt,
	createBlock,
} from '../cryptoCustom'
const nodes = [
	{ address: { ip: 'http://localhost', port: 8003 } },
	{ address: { ip: 'http://localhost', port: 8002 } },
	{ address: { ip: 'http://localhost', port: 8007 } },
]
const keys = [
	'4d2b3c227d3c5af7eb3daa0f88368d81',
	'04d07a9dd2b0724d1bd4f221d700b92f',
	'511036b58efa447a3925ad971e13bdd5',
]
const goal = 'http://localhost:3333'

it('Test encrypt', () => {
	const data = 'Test'
	const key = '916ee07cd9274ee1c9966def25c223d5'

	const encrypted = encrypt(data, key)
	expect(typeof encrypted).toBe('string')
})

it('Test decrypt', () => {
	const expected = 'Test'
	const key = '916ee07cd9274ee1c9966def25c223d5'
	const data =
		'806c1f55fcb2a6d7ffcf6b5a2d87a4d2ef369f056a47871f1d2515e5835253ff'

	const encrypted = decrypt(data, key)
	expect(encrypted).toBe(expected)
})

it('Test createBlock', () => {
	const address = 'testAddress'
	const data = 'testData'
	const expected = {
		nextNodeAddress: address,
		data: data,
	}
	const block = createBlock(data, address)
	expect(block).toStrictEqual(expected)
})

it('creates packets', () => {
	const packets = createPackets('hey', nodes, keys, nodes.length - 1, goal)
	expect(typeof packets).toBe('string')
	expect(packets.length).toBeGreaterThan(1)
})

it('decrypts packets', () => {
	const encryptedData =
		'3cdb19a30a0d9fa21b6eac36c694df6efdbc64d60a64df4a615257fdea657e3a3a1562182b5f8e9a38362e4422be74543eb77110a45d39f9526d2dd22f7b3f48c3c840882c1e3930b924d34b5db6d26e6236e5ec158291d40978d45e69f004b89169579f05d2daf91854de3fadab0b1413093ccc8dda31356327b3c40e10c1e341e36559acf322b9413d435e1522b68f3022eb5882f25ab63a22bd8b8b5d2579ab49dfc3b1c5775ac1908386a28df7fc2b104bd75fbdbec73dbfc8f7fa602b22c0d4222ec915c08d32dd431407db02e3cb2769f02547e7a0ed24666eb5981cc49aac1cced74104cda142e27a00d305b26f12a74249b675af65cbb3213b2d75f0ddf11238df6bb7d455fe6b45f66af24f2db94b110f098f34eaaac5eb5094e1a48b109bfc6ca1ac367c3692e3c35d76e020dda48bb2d1799d2546a0b979db06395c6cb6798ee520d51cbeadb41cb2907b9f4ae61da70c4d2eb0d0e3e3c2cebd423bd846796ebd93e1bef24ff248b09933b896812e34dcc9598aa0e0f8727f174b427fadeb52bb558aefe23ad1c5edced26282924f58f4d2c1058b44140c3867ce297d48f3693622bd78eacb8881a6cd3b3bb7aadf94896416c64c39899b8131959018544272ac287ba6a4023df5706d7a799509325d8c2d1a6205a99d7a3e17208f59d79bd6512746dba23749a02c074d21cca913b611186cb2ec2524c8d155fd5c41b664139f0ccf41e0a18282e836511662f6e55cfa95ed26c7a51c8783269b05a7a98cb018602654bd8ba84d0c16589b7f40ee6b642dc7661812d8c3f3c9fc9b6d0a68ba58d95a002722d9fabacb997326b409f62507c7a8e341f0c292ce8320594520f0b1c6b3f828edc02da079ce7b2cdde8204ed0d75df3004c3545ceb6848e003347d97ac3130740a0624b07c1fb4e05892929b12d8a177cf0b8b4bf49a09f4d9697e54c815ef2fedbcde66e0609682bdd6ef0fa235354bf91642d4063d2982eb7d3966915777e075afb1db720edfcc6deffcae61d711f8a7d4a0d3916cee439f385643aa08ebdae3ed65959afd2d8f48b80968ddd794ca4194832077477a3362557c1c6d7a3c58b02569dd06d903ce3a43970d78b7d0b1ef05835eec1d1b5a511252a980b9872c063c2724b5e733086229248238e7c1a4a952f8027439ed61cb78c1a5c5ad6209062d8ac0a2bd969c7bd65cfc082e1b154b4b33ed2aec0055544b18ccf009d7116bd7dfe201acfdc6d2e743f6f30e5ee8a37a77547976547217192b940f36c1a9f3837fc8a3501fd0ad66a229f3ab4523dc71ca3188823e642e75bf387223741214946d5c4a7790122a637bed81e5eb509572e35fe350221d81c90176dd0b0d10972127f56211d03137c2e90801afb54fc2f5be7b2c4'
	const response =
		'{"data":"\\n<!DOCTYPE html>\\n<html lang=\\"en\\">\\n\\t<head>\\n\\t\\t<meta charset=\\"UTF-8\\" />\\n\\t\\t<title>Onion Page</title>\\n\\t</head>\\n\\t<body>\\n\\t\\t<h1>Welcome to the onion page!</h1>\\n\\t</body>\\n</html>\\n"}'
	const decryptedPackets = JSON.stringify(
		decryptPackets(encryptedData, nodes, keys, 0)
	)
	expect(decryptedPackets).toBe(response)
})
