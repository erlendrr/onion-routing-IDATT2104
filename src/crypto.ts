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

interface Block {
	nextNodeAddress: Address
	data: string
}

export function createEncryptedBlock(data: string, nextNode: OnionNode) {
	const block: Block = {
		nextNodeAddress: nextNode.address,
		data: data,
	}
	return encrypt(JSON.stringify(block), nextNode.key)
}
