export class ArticleCardV3 extends HTMLElement {
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
      'url',
      'edited-date'
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
        e.stopPropagation(); // Prevent card click event
        if (this.url) {
          window.location.href = this.url;
        }
        
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

    const card = this.shadowRoot.querySelector('.article-card');
    if (card) {
      card.addEventListener('click', (e) => {
        if (this.url) {
          window.location.href = this.url;
        }
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

  get editedDate() {
    return this.getAttribute('edited-date') || '';
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
        /* Make the card take double width of standard cards */
        width: 100%;
        max-width: 100%;
      }

      @media (max-width: 1200px) {
        :host {
          width: 100%;
        }
      }

      .article-card {
        display: flex;
        background-color: var(--color-bg-primary, #FFFFFF);
        border-radius: var(--card-radius);
        overflow: hidden;
        box-shadow: var(--shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.05));
        transition: all 0.2s ease-in-out;
        height: 100%;
        min-height: 400px;
        cursor: pointer;
      }

      .article-card:hover {
        box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
        transform: translateY(-2px);
      }

      .author-column {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem 0;
        width: 5rem;
        border-right: 1px solid var(--color-border, #EEEEEE);
        position: relative;
      }

      .content-column {
        flex: 1;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
      }

      .article-title {
        font-family: 'DM Sans', sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--color-text-primary, #333333);
        margin: 0 0 1rem 0;
        line-height: 1.3;
      }

      .article-synopsis {
        font-family: 'DM Sans', sans-serif;
        font-size: 1rem;
        color: var(--color-text-secondary, #666666);
        margin: 0 0 1.5rem 0;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        flex-grow: 1;
      }

      .article-cta {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--color-accent, #A7CBDA);
        background: none;
        border: 1px solid var(--color-accent, #A7CBDA);
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        align-self: flex-start;
        margin-top: auto;
      }

      .article-cta:hover {
        background-color: var(--color-accent, #A7CBDA);
        color: white;
      }

      .image-column {
        width: 35%;
        max-width: 400px;
        padding: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .image-wrapper {
        width: 100%;
        height: 100%;
        border-radius: var(--card-radius);
        overflow: hidden;
        box-shadow: var(--shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.05));
      }

      .article-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .article-card:hover .article-image {
        transform: scale(1.05);
      }

      .edited-date {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.75rem;
        color: var(--color-text-secondary, #666666);
        margin-top: 1.5rem;
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        position: absolute;
        bottom: 1rem;
      }

      @media (max-width: 768px) {
        .article-card {
          flex-direction: column;
        }

        .author-column {
          width: 100%;
          flex-direction: row;
          padding: 1rem;
          border-right: none;
          border-bottom: 1px solid var(--color-border, #EEEEEE);
        }

        .edited-date {
          writing-mode: horizontal-tb;
          transform: none;
          position: static;
          margin-top: 0;
          margin-left: auto;
        }

        .image-column {
          width: 100%;
          max-width: none;
          height: 250px;
          order: -1;
        }
      }
    `;

    const formattedEditedDate = this.editedDate ? `edited ${this.formatTimeAgo(this.editedDate)}` : '';

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <article class="article-card">
        <div class="author-column">
          <ui-avatar 
            name="${this.authorName}"
            ${this.authorImage ? `image="${this.authorImage}"` : ''}
            variant="pill"
            direction="vertical"
            size="desktop">
          </ui-avatar>
          ${formattedEditedDate ? `<span class="edited-date">${formattedEditedDate}</span>` : ''}
        </div>
        <div class="content-column">
          <h2 class="article-title">${this.title}</h2>
          <p class="article-synopsis">${this.synopsis}</p>
          <button class="article-cta">${this.ctaText}</button>
        </div>
        ${this.image ? `
          <div class="image-column">
            <div class="image-wrapper">
              <img class="article-image" src="${this.image}" alt="${this.title}">
            </div>
          </div>
        ` : ''}
      </article>
    `;
  }
}

customElements.define('ui-article-card-v3', ArticleCardV3); 