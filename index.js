(async () => {
	const response = await fetch(
		'https://api.coinbase.com/v2/prices/ETH-USD/spot'
	)
	const data = await response.json()
	const eth = parseInt(data.data.amount)

	const content = document.querySelectorAll(
		'h1, h2, h3, h4, h5, p, li, td, caption, div, span, a'
	)

	content.forEach((text) => {
		// Skip if text doesn't contain a dollar sign
		if (!text.innerText.includes('$')) return

		// Regex to read number with or without commas
		const regex = /\$([0-9,]*\.?[0-9]*)/g

		// Skip element if it doesn't match the regex
		if (!regex.test(text.innerText)) return

		const usdText = text.innerText.match(regex)

		usdText.forEach((usd) => {
			// Remove commas from usd
			const usdNoCommas = usd.replace(/,/g, '')
			const usdNumber = parseInt(usdNoCommas.substring(1))
			const ethAmount = usdNumber / eth

			const output = `${ethAmount.toFixed(4)} ETH`
			text.innerHTML = text.innerHTML.replace(usd, output)
		})
	})
})()
