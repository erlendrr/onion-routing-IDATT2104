import crypto from 'crypto'

const ALGORITHM = 'aes-256-cbc'
const ENCODING = 'hex'
const IV_LENGTH = 16
const KEY = '34743777217A25432A462D4A614E6452'

export const encrypt = (data: string) => {
	const iv = crypto.randomBytes(IV_LENGTH)
	const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), iv)
	return Buffer.concat([cipher.update(data), cipher.final(), iv]).toString(
		ENCODING
	)
}

export const decrypt = (data: string) => {
	const binaryData = Buffer.from(data, ENCODING)
	const iv = binaryData.slice(-IV_LENGTH)
	const encryptedData = binaryData.slice(0, binaryData.length - IV_LENGTH)
	const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), iv)

	return Buffer.concat([
		decipher.update(encryptedData),
		decipher.final(),
	]).toString()
}
