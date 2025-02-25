# Modern UI Component Kit

A minimalistic, accessible UI component library built with Web Components and Tailwind CSS. This library provides a set of reusable, customizable components that follow modern design principles and best practices.

## Features

- 🎨 Modern, minimalistic design
- 🎯 Built with Web Components for framework-agnostic usage
- 📱 Fully responsive components
- ♿️ Accessible by default
- 🎭 Customizable through CSS variables and attributes
- 🚀 Zero dependencies (except Tailwind CSS)

## Components

### Button (`<ui-button>`)

A versatile button component with multiple variants and states.

```html
<ui-button>Primary Button</ui-button>
<ui-button variant="secondary">Secondary Button</ui-button>
<ui-button variant="ghost">Ghost Button</ui-button>
<ui-button disabled>Disabled Button</ui-button>
```

**Attributes:**
- `variant`: 'primary' (default) | 'secondary' | 'ghost'
- `disabled`: boolean

### Input (`<ui-input>`)

A form input component with label support and various input types.

```html
<ui-input label="Username" placeholder="Enter username"></ui-input>
<ui-input type="password" label="Password" placeholder="Enter password"></ui-input>
```

**Attributes:**
- `label`: string
- `type`: string (any valid HTML input type)
- `placeholder`: string
- `value`: string
- `disabled`: boolean

### Toggle (`<ui-toggle>`)

A toggle switch component for boolean inputs.

```html
<ui-toggle label="Notifications"></ui-toggle>
<ui-toggle label="Dark Mode" checked></ui-toggle>
<ui-toggle label="Disabled" disabled></ui-toggle>
```

**Attributes:**
- `label`: string
- `checked`: boolean
- `disabled`: boolean

**Events:**
- `change`: Fired when the toggle state changes

### Card (`<ui-card>`)

A container component with various elevation and padding options.

```html
<ui-card elevation="low">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</ui-card>
```

**Attributes:**
- `elevation`: 'low' | 'medium' (default) | 'high'
- `padding`: 'small' | 'medium' (default) | 'large'

### Modal (`<ui-modal>`)

A modal dialog component with backdrop and animations.

```html
<ui-modal id="myModal" title="Modal Title">
  <p>Modal content goes here.</p>
</ui-modal>

<script>
  const modal = document.getElementById('myModal');
  modal.setAttribute('open', ''); // Open modal
  modal.removeAttribute('open'); // Close modal
</script>
```

**Attributes:**
- `title`: string
- `open`: boolean

**Events:**
- `close`: Fired when the modal is closed

### Avatar (`<ui-avatar>`)

A versatile avatar component with multiple variants including square, circle, and expandable pill formats.

```html
<ui-avatar name="John Doe" image="/path/to/image.jpg" variant="circle"></ui-avatar>
<ui-avatar name="Jane Smith" variant="pill" direction="vertical"></ui-avatar>
```

**Attributes:**
- `variant`: 'square' (default) | 'circle' | 'pill'
- `size`: 'mobile' | 'desktop' (default)
- `name`: string
- `image`: string (URL to image)
- `direction`: 'horizontal' (default) | 'vertical' (for pill variant)

### Accent Color Selector (`<ui-accent-selector>`)

A component that allows users to select from predefined accent colors to customize the UI.

```html
<ui-accent-selector></ui-accent-selector>
```

**Events:**
- `accent-color-change`: Fired when a new accent color is selected

### Article Card (`<ui-article-card>`)

A standard article card component with image, title, synopsis, author info, and CTA.

```html
<ui-article-card
  title="Article Title"
  synopsis="A brief description of the article content."
  author-name="Author Name"
  author-image="/path/to/author.jpg"
  date="2023-06-15T10:30:00"
  image="/path/to/article-image.jpg"
  cta-text="Read more"
  url="#article-link">
</ui-article-card>
```

**Attributes:**
- `title`: string
- `synopsis`: string
- `author-name`: string
- `author-image`: string (URL to author image)
- `date`: string (ISO date string)
- `image`: string (URL to article image)
- `cta-text`: string
- `url`: string

### Article Card V2 (`<ui-article-card-v2>`)

An enhanced article card with tag labels and engagement metrics (comments and likes).

```html
<ui-article-card-v2
  title="Article Title"
  tag="Category"
  author-name="Author Name"
  author-image="/path/to/author.jpg"
  date="2023-06-15T10:30:00"
  image="/path/to/article-image.jpg"
  comments="5"
  likes="12"
  url="#article-link">
</ui-article-card-v2>
```

**Attributes:**
- `title`: string
- `tag`: string
- `author-name`: string
- `author-image`: string (URL to author image)
- `date`: string (ISO date string)
- `image`: string (URL to article image)
- `comments`: string (number of comments)
- `likes`: string (number of likes)
- `url`: string

### Article Card V3 (`<ui-article-card-v3>`)

A horizontal layout article card with a vertical avatar pill, featuring a three-column design with author info, content, and image.

```html
<ui-article-card-v3
  title="Article Title"
  synopsis="A brief description of the article content."
  author-name="Author Name"
  author-image="/path/to/author.jpg"
  edited-date="2023-06-15T10:30:00"
  image="/path/to/article-image.jpg"
  cta-text="Read more"
  url="#article-link">
</ui-article-card-v3>
```

**Attributes:**
- `title`: string
- `synopsis`: string
- `author-name`: string
- `author-image`: string (URL to author image)
- `edited-date`: string (ISO date string)
- `image`: string (URL to article image)
- `cta-text`: string
- `url`: string

## Getting Started

1. Install dependencies:
```bash
bun install
```

2. Start the development server:
```bash
bun run dev
```

3. Build for production:
```bash
bun run build
```

## Browser Support

The component library supports all modern browsers that implement the Web Components specifications:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Customization

### Colors

The component library uses a consistent color palette that can be customized through Tailwind CSS configuration or CSS variables:

```css
:root {
  --color-primary: #90CAF9;
  --color-primary-dark: #42A5F5;
  --color-secondary: #F48FB1;
  --color-secondary-dark: #EC407A;
  --color-accent: #A7CBDA; /* Default accent color */
}
```

### Accent Colors

The library includes a built-in accent color system with the following options:
- Blue: #A7CBDA (default)
- Beige: #DCDCC9
- Orange: #FA9133
- Pink: #F9C8C5
- Yellow: #F5C260
- Cyan: #33DBF5

Use the `<ui-accent-selector>` component to allow users to switch between these colors.

### Typography

The library uses DM Sans as its default font family. You can customize this by modifying the Tailwind configuration:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Your Font', 'sans-serif'],
      },
    },
  },
}
```

## Accessibility

All components are built with accessibility in mind:

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Sufficient color contrast

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 