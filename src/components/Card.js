export class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['elevation', 'padding'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get elevation() {
    return this.getAttribute('elevation') || 'medium';
  }

  get padding() {
    return this.getAttribute('padding') || 'medium';
  }

  render() {
    const styles = `
      :host {
        display: block;
      }

      .card {
        background-color: var(--color-bg-primary, #FFFFFF);
        border-radius: 1rem;
        overflow: hidden;
        transition: all 0.2s ease-in-out;
      }

      /* Elevation variants */
      .card--low {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }

      .card--medium {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .card--high {
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
      }

      /* Dark mode shadows */
      :host-context([data-theme="dark"]) .card--low {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      :host-context([data-theme="dark"]) .card--medium {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      }

      :host-context([data-theme="dark"]) .card--high {
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.4);
      }

      /* Padding variants */
      .card--padding-small {
        padding: 0.75rem;
      }

      .card--padding-medium {
        padding: 1.5rem;
      }

      .card--padding-large {
        padding: 2rem;
      }

      ::slotted(*) {
        margin: 0;
      }

      ::slotted(h1), ::slotted(h2), ::slotted(h3), ::slotted(h4), ::slotted(h5), ::slotted(h6) {
        font-family: 'DM Sans', sans-serif;
        color: var(--color-text-primary, #333333);
        margin-bottom: 1rem;
        transition: color 0.3s ease;
      }

      ::slotted(p) {
        font-family: 'DM Sans', sans-serif;
        color: var(--color-text-secondary, #666666);
        line-height: 1.5;
        margin-bottom: 1rem;
        transition: color 0.3s ease;
      }
    `;

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="card card--${this.elevation} card--padding-${this.padding}">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('ui-card', Card); 