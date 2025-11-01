# React Freshdesk Widget

A React component library for integrating Freshdesk widgets into your applications with full TypeScript support.

## Features

- 🚀 **Easy Integration** - Drop-in React component for Freshdesk widgets
- 📝 **TypeScript Support** - Fully typed with comprehensive interfaces
- 🎣 **React Hook** - Custom hook for programmatic widget control
- 🌍 **Internationalization** - Support for multiple locales and custom labels
- 🎨 **Customizable** - Style and configure the widget to match your app
- 📦 **Tree Shakeable** - Optimized bundle size with ES modules

## Installation

```bash
npm install react-freshdesk-widget
```

## Quick Start

```tsx
import React from 'react';
import { FreshdeskWidget } from 'react-freshdesk-widget';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <FreshdeskWidget 
        widgetId={12345} 
        locale="en"
        autoLoad={true}
      />
    </div>
  );
}

export default App;
```

## Component API

### FreshdeskWidget Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `widgetId` | `number` | ✅ | Your Freshdesk widget ID |
| `locale` | `string` | ❌ | Language locale (default: "en") |
| `customerInfo` | `CustomerInfo` | ❌ | Pre-fill customer information |
| `prefillData` | `PrefillData` | ❌ | Pre-fill ticket form data |
| `formOptions` | `FormOptions` | ❌ | Form configuration options |
| `labels` | `Labels` | ❌ | Custom labels for internationalization |
| `autoLoad` | `boolean` | ❌ | Auto-load widget on mount (default: true) |
| `className` | `string` | ❌ | CSS class name |
| `style` | `React.CSSProperties` | ❌ | Inline styles |

### Example with Customer Info

```tsx
import { FreshdeskWidget } from 'react-freshdesk-widget';

function SupportPage() {
  return (
    <FreshdeskWidget
      widgetId={12345}
      locale="en"
      customerInfo={{
        name: "John Doe",
        email: "john@example.com"
      }}
      prefillData={{
        subject: "Need help with my account",
        description: "I'm having trouble accessing my dashboard",
        priority: 2
      }}
    />
  );
}
```

## Hook API

Use the `useFreshdeskWidget` hook for programmatic control:

```tsx
import React from 'react';
import { useFreshdeskWidget } from 'react-freshdesk-widget';

function CustomSupportButton() {
  const {
    isLoaded,
    error,
    openWidget,
    closeWidget,
    showLauncher,
    hideLauncher,
    setCustomerInfo,
    prefillForm,
    authenticate
  } = useFreshdeskWidget(12345, {
    locale: 'en',
    customerInfo: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  });

  if (error) {
    return <div>Error loading widget: {error}</div>;
  }

  return (
    <div>
      <button onClick={openWidget} disabled={!isLoaded}>
        Open Support Widget
      </button>
      <button onClick={hideLauncher}>
        Hide Launcher
      </button>
    </div>
  );
}
```

## TypeScript Interfaces

The library exports comprehensive TypeScript interfaces:

```tsx
import type {
  FreshdeskWidgetProps,
  CustomerInfo,
  PrefillData,
  FormOptions,
  Labels
} from 'react-freshdesk-widget';
```

## Advanced Usage

### Custom Labels and Internationalization

```tsx
const customLabels = {
  en: {
    banner: "Need help?",
    launcher: "Support",
    contact_form: {
      title: "Contact Support",
      submit: "Send Message",
      confirmation: "Thank you for contacting us!"
    }
  },
  es: {
    banner: "¿Necesitas ayuda?",
    launcher: "Soporte",
    contact_form: {
      title: "Contactar Soporte",
      submit: "Enviar Mensaje",
      confirmation: "¡Gracias por contactarnos!"
    }
  }
};

<FreshdeskWidget
  widgetId={12345}
  locale="es"
  labels={customLabels}
/>
```

### Authentication

```tsx
const { authenticate } = useFreshdeskWidget(12345);

// Authenticate user with JWT token
authenticate({
  token: "your-jwt-token",
  callback: () => {
    console.log("User authenticated successfully");
  }
});
```

## Development

To run the demo locally:

```bash
npm install
npm run dev
```

To build the library:

```bash
npm run build
```

## License

MIT
