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
    const id = this.dataset.id
    this.innerHTML = `<span id="${id}Val" style="float:right">${this.dataset.default}%</span>
      <input class="mdl-slider mdl-js-slider" id="${id}" type="range" min="${this.dataset.min||1}" max="${this.dataset.max}" value="${this.dataset.default}">` 
    document.getElementById(id).addEventListener("change", ({ target }) => document.getElementById(id + "Val").textContent = target.value+"%")
  }
}

customElements.define('mdl-cell', mdlCell)
customElements.define('mdl-slider', mdlSlider)
