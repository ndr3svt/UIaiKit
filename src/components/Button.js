export class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['variant', 'disabled'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get variant() {
    return this.getAttribute('variant') || 'primary';
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  render() {
    const buttonStyles = `
      :host {
        display: inline-block;
      }

      .button {
        font-family: 'DM Sans', sans-serif;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        border: none;
        outline: none;
      }

      .button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .button--primary {
        background-color: var(--color-accent, #90CAF9);
        color: var(--color-text-primary, #333333);
      }

      .button--primary:hover:not(:disabled) {
        background-color: color-mix(in srgb, var(--color-accent, #90CAF9) 80%, black);
      }

      .button--secondary {
        background-color: var(--color-secondary, #F48FB1);
        color: var(--color-text-primary, #333333);
      }

      .button--secondary:hover:not(:disabled) {
        background-color: var(--color-secondary-dark, #EC407A);
      }

      .button--ghost {
        background-color: transparent;
        border: 1px solid var(--color-border, #E0E0E0);
        color: var(--color-text-primary, #333333);
      }

      .button--ghost:hover:not(:disabled) {
        background-color: var(--color-bg-secondary, #FAFAFA);
      }
    `;

    this.shadowRoot.innerHTML = `
      <style>${buttonStyles}</style>
      <button 
        class="button button--${this.variant}"
        ?disabled="${this.disabled}"
      >
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('ui-button', Button); 