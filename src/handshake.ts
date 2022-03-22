function power(a: number, b: number, p: number) {
	if (b === 1) {
		return a
	} else return Math.pow(a, b) % p
}

export default power
