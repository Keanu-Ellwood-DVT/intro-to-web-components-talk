window.customElements.define('dvt-progress-bar', class extends HTMLElement {

  get progress() {
    return this._progress;
  }

  set progress(val) {
    this.setAttribute('progress', val);
  }

  static get observedAttributes() {
    return [ 'progress' ];
  }

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this._progress = 0;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    var innerBar = this.shadow.querySelector('.progress-bar-inner');

    switch(name) {
      case 'progress':
        this._progress = parseInt(newVal, 10) || 0;

        innerBar.style.width = `${this.progress}%`;
        innerBar.innerHTML = `${this.progress}%`;
    }
  }

  connectedCallback() {
    this.shadow.innerHTML = `
      <style>
        .progress-bar-container {
          width: 50%;
          height: 30px;
          background-color: #aaa9ea;
          border-radius: 5px;
          color: #fff;
        }

        .progress-bar-inner {
          height: 100%;
          line-height: 30px;
          background: #5856d6;
          text-align: center;
          border-radius: 5px;
          transition: width 0.25s;
        }
      </style>
      <div class="progress-bar-container">
        <div class="progress-bar-inner">${this.progress}%</div>
      </div>
    `;
  }

});
