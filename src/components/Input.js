export class Input extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['type', 'placeholder', 'value', 'disabled', 'label'];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  setupEventListeners() {
    const input = this.shadowRoot.querySelector('input');
    input.addEventListener('input', (e) => {
      this.value = e.target.value;
      this.dispatchEvent(new CustomEvent('input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      }));
    });
  }

  get type() {
    return this.getAttribute('type') || 'text';
  }

  get placeholder() {
    return this.getAttribute('placeholder') || '';
  }

  get value() {
    return this.getAttribute('value') || '';
  }

  set value(val) {
    this.setAttribute('value', val);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  get label() {
    return this.getAttribute('label') || '';
  }

  render() {
    const styles = `
      :host {
        display: block;
      }

      .input-container {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      label {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.875rem;
        color: var(--color-text-primary, #333333);
        font-weight: 500;
        transition: color 0.3s ease;
      }

      input {
        font-family: 'DM Sans', sans-serif;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--color-border, #E0E0E0);
        background-color: var(--color-bg-primary, #FFFFFF);
        color: var(--color-text-primary, #333333);
        outline: none;
        transition: all 0.2s ease-in-out;
        font-size: 1rem;
      }

      input:focus {
        border-color: var(--color-primary, #90CAF9);
        box-shadow: 0 0 0 2px var(--color-primary-light, #E3F2FD);
      }

      input:disabled {
        background-color: var(--color-bg-secondary, #FAFAFA);
        cursor: not-allowed;
        opacity: 0.7;
      }

      input::placeholder {
        color: var(--color-text-secondary, #666666);
      }
    `;

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="input-container">
        ${this.label ? `<label>${this.label}</label>` : ''}
        <input
          type="${this.type}"
          placeholder="${this.placeholder}"
          value="${this.value}"
          ?disabled="${this.disabled}"
        />
      </div>
    `;
  }
}

customElements.define('ui-input', Input); 