export class AccentColorSelector extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.colors = {
      blue: '#A7CBDA',
      beige: '#DCDCC9',
      orange: '#FA9133',
      pink: '#F9C8C5',
      yellow: '#F5C260',
      cyan: '#33DBF5'
    };
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const buttons = this.shadowRoot.querySelectorAll('.color-button');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const color = button.getAttribute('data-color');
        const colorValue = this.colors[color];
        this.setAccentColor(color, colorValue);
        
        // Update selected state
        buttons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
      });
    });
  }

  setAccentColor(colorName, colorValue) {
    document.documentElement.style.setProperty('--color-accent', colorValue);
    document.documentElement.style.setProperty('--color-accent-name', colorName);
    
    // Create and dispatch a custom event
    const event = new CustomEvent('accent-color-change', {
      detail: { name: colorName, value: colorValue },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  render() {
    const styles = `
      :host {
        display: block;
      }

      .color-selector {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
      }

      .color-button {
        width: 3rem;
        height: 3rem;
        border-radius: 0.75rem;
        border: 2px solid transparent;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        position: relative;
      }

      .color-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .color-button.selected {
        border-color: var(--color-text-primary, #333333);
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .color-button.selected::after {
        content: "✓";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--color-text-primary, #333333);
        font-size: 1.25rem;
        font-weight: bold;
      }
    `;

    const colorButtons = Object.entries(this.colors)
      .map(([name, value]) => `
        <button 
          class="color-button" 
          data-color="${name}"
          style="background-color: ${value};"
          aria-label="Select ${name} accent color"
        ></button>
      `)
      .join('');

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="color-selector">
        ${colorButtons}
      </div>
    `;
  }
}

customElements.define('ui-accent-selector', AccentColorSelector); 