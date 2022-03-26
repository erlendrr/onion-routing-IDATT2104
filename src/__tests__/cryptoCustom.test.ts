import { createPackets } from '../cryptoCustom'

it('creates packets', () => {
	const nodes = [
		{ address: { ip: 'http://localhost', port: 8007 } },
		{ address: { ip: 'http://localhost', port: 8002 } },
	]
	const keys = [
		'011815a3f5e9825b0394775fa37a8387',
		'5c480c1a4bc4c4398e1280f03787b557',
		'4d6ad1ad07f974de37fa388157abba14',
	]
	const goal = 'http://localhost:3333'
	const packets = createPackets('hey', nodes, keys, nodes.length - 1, goal)
})

it('', () => {
	expect(true).toBe(true)
})
