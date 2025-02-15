export class Toggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.initialRender();
  }

  static get observedAttributes() {
    return ['checked', 'disabled', 'label'];
  }

  connectedCallback() {
    this.setupEventListeners();
    this.updateCheckedState();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'checked') {
        this.updateCheckedState();
      } else if (name === 'disabled') {
        this.updateDisabledState();
      } else if (name === 'label') {
        this.updateLabel();
      }
    }
  }

  setupEventListeners() {
    const toggleWrapper = this.shadowRoot.querySelector('.toggle-wrapper');
    const label = this.shadowRoot.querySelector('label');

    const handleToggle = (e) => {
      if (!this.disabled) {
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent('change', {
          detail: { checked: this.checked },
          bubbles: true,
          composed: true
        }));
      }
    };

    toggleWrapper.addEventListener('click', handleToggle);
    if (label) {
      label.addEventListener('click', handleToggle);
    }

    // Handle keyboard interaction
    toggleWrapper.addEventListener('keydown', (e) => {
      if (!this.disabled && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        handleToggle();
      }
    });
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(value) {
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  get label() {
    return this.getAttribute('label') || '';
  }

  updateCheckedState() {
    const input = this.shadowRoot.querySelector('.toggle-input');
    const slider = this.shadowRoot.querySelector('.toggle-slider');
    if (this.checked) {
      input.checked = true;
      slider.classList.add('checked');
    } else {
      input.checked = false;
      slider.classList.remove('checked');
    }
  }

  updateDisabledState() {
    const wrapper = this.shadowRoot.querySelector('.toggle-wrapper');
    if (this.disabled) {
      wrapper.classList.add('disabled');
      wrapper.setAttribute('tabindex', '-1');
    } else {
      wrapper.classList.remove('disabled');
      wrapper.setAttribute('tabindex', '0');
    }
  }

  updateLabel() {
    const labelElement = this.shadowRoot.querySelector('label');
    if (labelElement) {
      labelElement.textContent = this.label;
    }
  }

  initialRender() {
    const styles = `
      :host {
        display: inline-block;
      }

      .toggle-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .toggle-wrapper {
        position: relative;
        width: 3rem;
        height: 1.5rem;
        cursor: pointer;
        outline: none;
      }

      .toggle-wrapper:focus-visible {
        outline: 2px solid #90CAF9;
        outline-offset: 2px;
        border-radius: 1.5rem;
      }

      .toggle-input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }

      .toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #E0E0E0;
        transition: .15s;
        border-radius: 1.5rem;
      }

      .toggle-slider:before {
        position: absolute;
        content: "";
        height: 1.25rem;
        width: 1.25rem;
        left: 0.125rem;
        bottom: 0.125rem;
        background-color: white;
        transition: .15s;
        border-radius: 50%;
      }

      .toggle-slider.checked {
        background-color: var(--color-accent, #90CAF9);
      }

      .toggle-slider.checked:before {
        transform: translateX(1.5rem);
      }

      .toggle-wrapper.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .toggle-wrapper.disabled .toggle-slider {
        cursor: not-allowed;
      }

      label {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.875rem;
        color: #333;
        cursor: pointer;
        user-select: none;
      }

      label.disabled {
        cursor: not-allowed;
      }
    `;

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="toggle-container">
        ${this.label ? `<label>${this.label}</label>` : ''}
        <div class="toggle-wrapper" tabindex="0">
          <input
            type="checkbox"
            class="toggle-input"
            aria-label="${this.label}"
          />
          <span class="toggle-slider ${this.checked ? 'checked' : ''}"></span>
        </div>
      </div>
    `;
  }
}

customElements.define('ui-toggle', Toggle); 