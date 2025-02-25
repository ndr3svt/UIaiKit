export class ArticleCardV2 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [
      'title',
      'tag',
      'author-name',
      'author-image',
      'date',
      'image',
      'url',
      'comments',
      'likes'
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
    const card = this.shadowRoot.querySelector('.article-card');
    if (card) {
      card.addEventListener('click', (e) => {
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
  }

  // Getters for attributes
  get title() {
    return this.getAttribute('title') || '';
  }

  get tag() {
    return this.getAttribute('tag') || '';
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

  get url() {
    return this.getAttribute('url') || '';
  }

  get comments() {
    return this.getAttribute('comments') || '0';
  }

  get likes() {
    return this.getAttribute('likes') || '0';
  }

  // Format date to "time ago" format
  formatTimeAgo(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (isNaN(diffInSeconds)) return dateString;
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months}mo ago`;
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `${years}y ago`;
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
        cursor: pointer;
      }

      .article-card:hover {
        box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
        transform: translateY(-2px);
      }

      .article-image {
        width: 100%;
        height: 240px;
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
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }

      .article-tag {
        display: inline-block;
        background-color: var(--color-bg-secondary, #F5F5F5);
        color: var(--color-accent, #FF6B6B);
        font-family: 'DM Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        padding: 0.25rem 1rem;
        border-radius: 100px;
        margin-bottom: 1rem;
        align-self: flex-start;
      }

      .article-title {
        font-family: 'DM Sans', sans-serif;
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--color-text-primary, #333333);
        margin: 0 0 1.5rem 0;
        line-height: 1.3;
      }

      .article-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: auto;
      }

      .article-author {
        display: flex;
        align-items: center;
      }

      .author-avatar {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 0.75rem;
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
        font-size: 1.125rem;
        font-weight: 500;
        color: var(--color-text-primary, #333333);
        margin: 0;
      }

      .article-date {
        font-family: 'DM Sans', sans-serif;
        font-size: 1rem;
        color: var(--color-text-secondary, #666666);
        margin: 0;
      }

      .article-stats {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .stat-item {
        display: flex;
        align-items: center;
        color: var(--color-text-secondary, #666666);
        font-family: 'DM Sans', sans-serif;
        font-size: 1.125rem;
      }

      .stat-icon {
        margin-right: 0.5rem;
        opacity: 0.7;
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
          ${this.tag ? `<span class="article-tag">${this.tag}</span>` : ''}
          <h2 class="article-title">${this.title}</h2>
          <div class="article-meta">
            <div class="article-author">
              <div class="author-avatar">
                ${this.authorImage ? 
                  `<img src="${this.authorImage}" alt="${this.authorName}">` : 
                  `<div style="width: 100%; height: 100%; background-color: var(--color-accent, #A7CBDA); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">${this.getInitials(this.authorName)}</div>`}
              </div>
              <div class="author-info">
                <p class="author-name">${this.authorName}</p>
                <p class="article-date">${formattedDate}</p>
              </div>
            </div>
            <div class="article-stats">
              <div class="stat-item">
                <span class="stat-icon">💬</span>
                <span>${this.comments}</span>
              </div>
              <div class="stat-item">
                <span class="stat-icon">⭐</span>
                <span>${this.likes}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }
}

customElements.define('ui-article-card-v2', ArticleCardV2); 