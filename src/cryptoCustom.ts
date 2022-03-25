import crypto from 'crypto'
import { Address, OnionNode } from './onionNodes'

const ALGORITHM = 'aes-256-cbc'
const ENCODING = 'hex'
const IV_LENGTH = 16

export const encrypt = (data: string, key: string) => {
	const iv = crypto.randomBytes(IV_LENGTH)
	const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key), iv)
	return Buffer.concat([cipher.update(data), cipher.final(), iv]).toString(
		ENCODING
	)
}

export const decrypt = (data: string, key: string) => {
	const binaryData = Buffer.from(data, ENCODING)
	const iv = binaryData.slice(-IV_LENGTH)
	const encryptedData = binaryData.slice(0, binaryData.length - IV_LENGTH)
	const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key), iv)

	return Buffer.concat([
		decipher.update(encryptedData),
		decipher.final(),
	]).toString()
}

export interface Block {
	nextNodeAddress: string
	data: string
}

export function createBlock(data: string, nextAddress: string): Block {
	return {
		nextNodeAddress: nextAddress,
		data: data,
	}
}

export function createPackets(
	data: string,
	nodes: OnionNode[],
	keys: string[],
	i: number,
	goal: string
): string {
	if (i < 0) {
		return data
	}
	if (i == nodes.length - 1) {
		return createPackets(
			encrypt(JSON.stringify(createBlock(data, goal)), keys[i]),
			nodes,
			keys,
			i - 1,
			goal
		)
	}
	return createPackets(
		encrypt(
			JSON.stringify(
				createBlock(
					data,
					`${nodes[i + 1].address.ip}:${nodes[i + 1].address.port}`
				)
			),
			keys[i]
		),
		nodes,
		keys,
		i - 1,
		goal
	)
}

export function decryptPackets(
	data: string,
	nodes: OnionNode[],
	keys: string[],
	i: number
): string {
	if (i > nodes.length - 1) {
		return data
	}
	return decryptPackets(JSON.parse(decrypt(data, keys[i])), nodes, keys, i + 1)
}
