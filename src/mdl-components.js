class mdlCell extends HTMLElement {
  connectedCallback(){
    this.classList.add("mdl-cell")
    if (this.dataset.cols) this.classList.add(`mdl-cell--${this.dataset.cols}-col`)

    if (!this.dataset.title) return

    const el = document.createElement('h5')
    el.textContent = this.dataset.title
    const elTooltip = document.createElement('div')
    elTooltip.id = "tooltip" + this.dataset.title
    elTooltip.className = "icon material-icons"
    elTooltip.innerText="info_outline"
    el.appendChild(elTooltip)

    const elTooltipPopup = document.createElement('div')
    elTooltipPopup.setAttribute("for", "tooltip" + this.dataset.title)
    elTooltipPopup.className = "mdl-tooltip"
    elTooltipPopup.textContent = this.dataset.tooltip
    el.appendChild(elTooltipPopup)

    this.insertBefore(el,this.children[0])
  }
}

class mdlSlider extends HTMLElement {
  connectedCallback(){
    this.val = document.createElement("span")
    this.val.style.float = "right"
    this.val.textContent = this.dataset.default + "%"

    this.appendChild(this.val)

    const input = document.createElement("input")
    input.className = "mdl-slider mdl-js-slider"
    input.id = this.dataset.id
    input.type = "range"
    input.min = this.dataset.min||1
    input.max = this.dataset.max
    input.value = this.dataset.default
    input.addEventListener("change", ({ target }) => this.val.textContent = target.value + "%")

    this.appendChild(input)
  }
}

customElements.define('mdl-cell', mdlCell)
customElements.define('mdl-slider', mdlSlider)
