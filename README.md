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
}
```

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