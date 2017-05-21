class mdlCell extends HTMLElement {
  connectedCallback() {

    const { title, tooltip, cols } = this.dataset

    this.classList.add('mdl-cell')
    if (cols) this.classList.add(`mdl-cell--${cols}-col`)

    if (!title) return

    const el = Object.assign(document.createElement('h5'), { textContent: title })
    const elTooltip = Object.assign(document.createElement('div'), {
      id: 'tooltip' + title,
      className: 'icon material-icons',
      innerText: 'info_outline'
    })
    el.appendChild(elTooltip)

    const elTooltipPopup = Object.assign(document.createElement('div'),
      {
        className: 'mdl-tooltip',
        textContent: tooltip
      })
    elTooltipPopup.setAttribute('for', 'tooltip' + title)

    el.appendChild(elTooltipPopup)

    this.insertBefore(el, this.children[0])
  }
}

class mdlSlider extends HTMLElement {
  connectedCallback() {

    const { id, min = '1', max, default: value } = this.dataset

    const valueSpan = Object.assign(document.createElement('span'),
      {
        style: { cssFloat: 'right' },
        textContent: value + '%'
      })

    this.appendChild(valueSpan)

    const inputSlider = Object.assign(document.createElement('input'),
      {
        classList: 'mdl-slider mdl-js-slider',
        type: 'range',
        id,
        min,
        max,
        value
      })
    inputSlider.addEventListener('mouseup', ({ target }) => valueSpan.textContent = target.value + '%')

    this.appendChild(inputSlider)
  }
}

customElements.define('mdl-cell', mdlCell)
customElements.define('mdl-slider', mdlSlider)
