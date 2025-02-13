export class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['open', 'title'];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      if (name === 'open') {
        this.handleOpenChange();
      }
    }
  }

  setupEventListeners() {
    const closeButton = this.shadowRoot.querySelector('.modal-close');
    const backdrop = this.shadowRoot.querySelector('.modal-backdrop');

    closeButton.addEventListener('click', () => this.close());
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        this.close();
      }
    });
  }

  handleOpenChange() {
    if (this.open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(value) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  get title() {
    return this.getAttribute('title') || '';
  }

  close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close'));
  }

  render() {
    const styles = `
      :host {
        display: none;
      }

      :host([open]) {
        display: block;
      }

      .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.2s ease-out;
      }

      .modal {
        background-color: var(--color-bg-primary, #FFFFFF);
        border-radius: 1rem;
        width: 90%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease;
      }

      :host-context([data-theme="dark"]) .modal {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      }

      .modal-header {
        padding: 1.5rem;
        border-bottom: 1px solid var(--color-border, #E0E0E0);
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: border-color 0.3s ease;
      }

      .modal-title {
        font-family: 'DM Sans', sans-serif;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--color-text-primary, #333333);
        margin: 0;
        transition: color 0.3s ease;
      }

      .modal-close {
        background: none;
        border: none;
        padding: 0.5rem;
        cursor: pointer;
        color: var(--color-text-secondary, #666666);
        transition: color 0.2s;
      }

      .modal-close:hover {
        color: var(--color-text-primary, #333333);
      }

      .modal-content {
        padding: 1.5rem;
        color: var(--color-text-primary, #333333);
        transition: color 0.3s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideIn {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      ::slotted(*) {
        margin: 0;
        color: var(--color-text-primary, #333333);
        transition: color 0.3s ease;
      }
    `;

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="modal-backdrop">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">${this.title}</h2>
            <button class="modal-close" aria-label="Close modal">✕</button>
          </div>
          <div class="modal-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('ui-modal', Modal); 