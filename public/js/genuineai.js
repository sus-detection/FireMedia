async function runGenuineAI() {
	let GENUINEAI_API_URL = "https://genuine-ai-api.adaptable.app"

	let url = `${GENUINEAI_API_URL}/genuineai`
	let options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ postId }),
	}

	try {
		let request = await fetch(url, options)
		let response = await request.json()
		renderGenuineAIComponent(response)
	} catch (error) {
		console.log(error)
		renderGenuineAIComponent({
			errorMessage: "Something went wrong, please try again later.",
		})
	}
}

function renderGenuineAIComponent(response) {

	let existingHTML = document.querySelector(".mainSectionContainer").innerHTML

	let html = ""

	if(response.errorMessage) {
		html = `
			<div class="genuineai__container">
				<div class="genuineai__container__header">
					<h1>${response.errorMessage}</h1>
				</div>
			</div>
		`
		document.querySelector(".mainSectionContainer").innerHTML = existingHTML + html
		return
	}

	if(response.status == "pending") {
		html = `
			<div class="genuineai__container">
				<div class="genuineai__container__header">
					<h1>Request Sent to GenuineAI. Please wait upto 30 seconds.</h1>
				</div>
			</div>
		`
		document.querySelector(".mainSectionContainer").innerHTML = existingHTML + html
		return
	}
	

	html =  `
	
		<div class="genuineai__container">
			<h1>Geniune AI Analysis:</h1>
			<div class="genuineai__container__header">
				<h1>Fakeness of Post: ${response.fakeness}</h1>
				<h1>Confidence in Analysis: ${response.confidence}</h1>
			</div>
			<div class="genuineai__container__body">
				<div class="genuineai__container__body__content">
					<h1> Reasoning </h1>
					<div class="genuineai__container__body__content__text">
						<p>Why: ${response.explanation.reason}</p>
					</div>
					<div class="genuineai__container__body__content__text">
						<p>How do we know: ${response.explanation.evidence}</p>
					</div>
				</div>
				<div class="genuineai__container__body__sentiment__analysis">
					<p>Sentiment Analysis: ${response.sentimentAnalysis.length > 0 
						? response.sentimentAnalysis.map(sentiment => " " + sentiment) 
						: "Not available"}
					</p>
				</div>
				<div class="genuineai__container__body__bias">
					<p>Bias: ${response.bias.label ?? "Not available"}</p>
					<p>Bias Value: ${response.bias.value ?? "Not available"}</p>
				</div>
			</div>
			<div class="genuineai__container__relatedImages">
			${renderImages(response.imageLists)}
			</div>
		</div>
	`

	document.querySelector(".mainSectionContainer").innerHTML = existingHTML + html

}

function renderImages(imageLists) {
	let html = "<h1>Related Images</h1><div class='genuineai__container__relatedImages__content'>"
	
	html += imageLists.map(image => {
		return `
			<div class="genuineai__container__relatedImages__image">
				<img width="100" src="${image}" alt="Related Image">
			</div>
		`
	})

	html += "</div>"

	return html
}


runGenuineAI()