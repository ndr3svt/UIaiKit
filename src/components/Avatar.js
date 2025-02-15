export class Avatar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isExpanded = false;
  }

  static get observedAttributes() {
    return ['variant', 'size', 'name', 'image', 'direction'];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.variant === 'pill') {
      const pill = this.shadowRoot.querySelector('.avatar--pill');
      pill.addEventListener('click', () => {
        this.isExpanded = !this.isExpanded;
        pill.classList.toggle('expanded', this.isExpanded);

      });
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.setupEventListeners();
    }
  }

  get variant() {
    return this.getAttribute('variant') || 'square';
  }

  get size() {
    return this.getAttribute('size') || 'desktop';
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  get image() {
    return this.getAttribute('image') || '';
  }

  get direction() {
    return this.getAttribute('direction') || 'horizontal';
  }

  getInitials(name) {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getRandomColor() {
    const colors = [
      'var(--color-primary, #90CAF9)',
      'var(--color-secondary, #F48FB1)',
      'var(--color-primary-dark, #42A5F5)',
      'var(--color-secondary-dark, #EC407A)'
    ];
    const hash = this.name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
  }

  render() {
    const styles = `
      :host {
        display: inline-block;
      }

      .avatar {
        display: flex;
        align-items: center;
        font-family: 'DM Sans', sans-serif;
        transition: all 0.2s ease-in-out;
      }

      .avatar-image {
        background-color: var(--color-accent, #90CAF9);
        color: var(--color-text-primary, #FFFFFF);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        overflow: hidden;
        position: relative;
        z-index: 2;
      }

      .avatar-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* Square variant */
      .avatar--square .avatar-image {
        border-radius: 0.75rem;
      }

      /* Circle variant */
      .avatar--circle .avatar-image {
        border-radius: 50%;
      }

      /* Pill variants */
      .avatar--pill {
        background-color: var(--color-bg-primary, #FFFFFF);
        border: 1px solid var(--color-border, #E0E0E0);
        border-radius: 100px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
      }

      .avatar--pill .avatar-image {
        border-radius: 50%;
        flex-shrink: 0;
      }

      .avatar--pill .avatar-name {
        color: var(--color-text-primary, #333333);
        font-weight: 500;
        transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        white-space: nowrap;
        overflow: hidden;
      }

      /* Horizontal pill */
      .avatar--pill.horizontal {
        width: var(--avatar-size);
        height: var(--avatar-size);
        padding: var(--avatar-padding);
        position: relative;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .avatar--pill.horizontal .avatar-image {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .avatar--pill.horizontal .avatar-name {
        max-width: 0;
        opacity: 0;
        padding: 0;
        margin-left: 0.75rem;
      }

      .avatar--pill.horizontal.expanded {
        width: auto;
        max-width: 200px;
        padding: var(--avatar-padding);
        padding-right: 1.25rem;
        display: flex;
        align-items: center;
      }

      .avatar--pill.horizontal.expanded .avatar-image {
        position: relative;
        left: 0;
        top: 0;
        transform: none;
        margin-left: var(--avatar-padding);
      }

      .avatar--pill.horizontal.expanded .avatar-name {
        max-width: 200px;
        opacity: 1;
        padding: 0 0.25rem;
      }

      /* Vertical pill */
      .avatar--pill.vertical {
        flex-direction: column;
        align-items: center;
        height: var(--avatar-size);
        width: var(--avatar-size);
        padding: var(--avatar-padding);
        position: relative;
      }

      .avatar--pill.vertical .avatar-image {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .avatar--pill.vertical .avatar-name {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        transform: rotate(180deg);
        white-space: nowrap;
        max-height: 0;
        opacity: 0;
        margin: 0.75rem 0;
      }

      .avatar--pill.vertical.expanded {
        height: auto;
        padding: var(--avatar-padding);
        padding-bottom: 1.25rem;
      }

      .avatar--pill.vertical.expanded .avatar-image {
        position: relative;
        left: 0;
        top: 0;
        transform: none;
        margin-top: var(--avatar-padding);
      }
      .avatar--pill.vertical.expanded .avatar-name {
        max-height: 200px;
        opacity: 1;
      }

      /* Mobile sizes */
      .avatar--mobile.avatar--square .avatar-image,
      .avatar--mobile.avatar--circle .avatar-image {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1rem;
      }

      .avatar--mobile.avatar--pill {
        --avatar-size: 3rem;
        --avatar-padding: 0.25rem;
      }

      .avatar--mobile.avatar--pill .avatar-image {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1rem;
      }

      .avatar--mobile.avatar--pill .avatar-name {
        font-size: 0.875rem;
      }

      /* Desktop sizes */
      .avatar--desktop.avatar--square .avatar-image,
      .avatar--desktop.avatar--circle .avatar-image {
        width: 3.5rem;
        height: 3.5rem;
        font-size: 1.25rem;
      }

      .avatar--desktop.avatar--pill {
        --avatar-size: 4rem;
        --avatar-padding: 0.25rem;
      }

      .avatar--desktop.avatar--pill .avatar-image {
        width: 3.5rem;
        height: 3.5rem;
        font-size: 1.25rem;
      }

      .avatar--desktop.avatar--pill .avatar-name {
        font-size: 1rem;
      }

      /* Hover effects */
      .avatar--pill:hover {
        background-color: var(--color-bg-secondary, #FAFAFA);
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .avatar--pill:active {
        transform: translateY(0);
        box-shadow: none;
      }
    `;

    let content;
    const variantClass = this.variant === 'pill' ? 
      `avatar--pill ${this.direction}` : 
      `avatar--${this.variant}`;

    if (this.variant === 'pill') {
      content = `
        <div class="avatar ${variantClass} avatar--${this.size}">
          <div class="avatar-image">
            ${this.image ? 
              `<img src="${this.image}" alt="${this.name}">` : 
              this.getInitials(this.name)}
          </div>
          <span class="avatar-name">${this.name}</span>
        </div>
      `;
    } else {
      content = `
        <div class="avatar ${variantClass} avatar--${this.size}">
          <div class="avatar-image">
            ${this.image ? 
              `<img src="${this.image}" alt="${this.name}">` : 
              this.getInitials(this.name)}
          </div>
        </div>
      `;
    }

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      ${content}
    `;
  }
}

customElements.define('ui-avatar', Avatar); 