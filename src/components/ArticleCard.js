export class ArticleCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [
      'title',
      'synopsis',
      'author-name',
      'author-image',
      'date',
      'image',
      'cta-text',
      'url'
    ];
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
    const ctaButton = this.shadowRoot.querySelector('.article-cta');
    if (ctaButton) {
      ctaButton.addEventListener('click', (e) => {
        if (this.url) {
          // If URL is provided, navigate to it
          window.location.href = this.url;
        }
        
        // Dispatch custom event
        this.dispatchEvent(new CustomEvent('article-click', {
          detail: {
            title: this.title,
            url: this.url
          },
          bubbles: true,
          composed: true
        }));
      });
    }
  }

  // Getters for attributes
  get title() {
    return this.getAttribute('title') || '';
  }

  get synopsis() {
    return this.getAttribute('synopsis') || '';
  }

  get authorName() {
    return this.getAttribute('author-name') || '';
  }

  get authorImage() {
    return this.getAttribute('author-image') || '';
  }

  get date() {
    return this.getAttribute('date') || '';
  }

  get image() {
    return this.getAttribute('image') || '';
  }

  get ctaText() {
    return this.getAttribute('cta-text') || 'Read more';
  }

  get url() {
    return this.getAttribute('url') || '';
  }

  // Format date to "time ago" format
  formatTimeAgo(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (isNaN(diffInSeconds)) return dateString;
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  }

  getInitials(name) {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  render() {
    const styles = `
      :host {
        display: block;
        --card-radius: 1rem;
      }

      .article-card {
        display: flex;
        flex-direction: column;
        background-color: var(--color-bg-primary, #FFFFFF);
        border-radius: var(--card-radius);
        overflow: hidden;
        box-shadow: var(--shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.05));
        transition: all 0.2s ease-in-out;
        height: 100%;
      }

      .article-card:hover {
        box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
        transform: translateY(-2px);
      }

      .article-image {
        width: 100%;
        height: 160px;
        background-color: var(--color-bg-secondary, #FAFAFA);
        overflow: hidden;
        position: relative;
      }

      .article-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .article-card:hover .article-image img {
        transform: scale(1.05);
      }

      .article-content {
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }

      .article-title {
        font-family: 'DM Sans', sans-serif;
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--color-text-primary, #333333);
        margin: 0 0 0.5rem 0;
        line-height: 1.4;
      }

      .article-synopsis {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.875rem;
        color: var(--color-text-secondary, #666666);
        margin: 0 0 1rem 0;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        flex-grow: 1;
      }

      .article-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: auto;
        padding-top: 1rem;
        border-top: 1px solid var(--color-border, #E0E0E0);
      }

      .article-author {
        display: flex;
        align-items: center;
      }

      .author-avatar {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: var(--color-accent, #A7CBDA);
        color: var(--color-text-primary, #FFFFFF);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        font-size: 0.75rem;
        margin-right: 0.5rem;
        overflow: hidden;
      }

      .author-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .author-info {
        display: flex;
        flex-direction: column;
      }

      .author-name {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--color-text-primary, #333333);
        margin: 0;
      }

      .article-date {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.75rem;
        color: var(--color-text-secondary, #666666);
        margin: 0;
      }

      .article-cta {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--color-accent, #A7CBDA);
        background: none;
        border: none;
        padding: 0.5rem;
        cursor: pointer;
        transition: color 0.2s ease;
        display: flex;
        align-items: center;
      }

      .article-cta:hover {
        color: color-mix(in srgb, var(--color-accent, #A7CBDA) 80%, black);
      }

      .article-cta::after {
        content: "→";
        margin-left: 0.25rem;
        transition: transform 0.2s ease;
      }

      .article-cta:hover::after {
        transform: translateX(2px);
      }
    `;

    const formattedDate = this.formatTimeAgo(this.date);

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <article class="article-card">
        ${this.image ? `
          <div class="article-image">
            <img src="${this.image}" alt="${this.title}">
          </div>
        ` : ''}
        <div class="article-content">
          <h3 class="article-title">${this.title}</h3>
          <p class="article-synopsis">${this.synopsis}</p>
          <div class="article-meta">
            <div class="article-author">
              <div class="author-avatar">
                ${this.authorImage ? 
                  `<img src="${this.authorImage}" alt="${this.authorName}">` : 
                  this.getInitials(this.authorName)}
              </div>
              <div class="author-info">
                <p class="author-name">${this.authorName}</p>
                <p class="article-date">${formattedDate}</p>
              </div>
            </div>
            <button class="article-cta">${this.ctaText}</button>
          </div>
        </div>
      </article>
    `;
  }
}

customElements.define('ui-article-card', ArticleCard); 