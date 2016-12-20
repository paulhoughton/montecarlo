class MonteCarlo {

	constructor(targetTable, workerFunction) {
		this.targetTable = targetTable
		this.workerFunction = workerFunction

		btnRun.onclick = () => this.run()
		progress.addEventListener('mdl-componentupgraded', () => 
			this.setProgressBar = progress.MaterialProgress.setProgress.bind(progress.MaterialProgress)
		)
	}

	run() {
		const repeated = +inputRepeated.value
		const years = +inputYears.value
		const volatility = +inputVolatility.value
		const investment = +inputInvestment.value
		const avgReturn = +inputAvgReturn.value

		if (this.running) this.worker.terminate()
		this.setProgressBar(0)

		this.running = true
		this.worker = new Worker(this.workerFunction)
		this.worker.onmessage = (e) => {
			if (e.data.hasOwnProperty('position')) {
				this.setProgressBar(e.data.position)
				return
			}
			result.textContent = e.data.avg
			this.addRow(this.targetTable, repeated, investment, years, volatility, avgReturn, e.data.avg, e.data.min + " - " + e.data.max)
			this.running = false
		}

		this.worker.postMessage({ investment, avgReturn, volatility, years, repeated })
	}

	addRow(target, ...args) {
		const row = document.createElement('tr')
		args.forEach((arg) => {
			const cell=document.createElement('td')
			cell.textContent=arg
			row.appendChild(cell)
		})
		document.querySelector(target).appendChild(row)
	}

}

new MonteCarlo('tbody', 'worker.js')