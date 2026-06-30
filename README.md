# @prodsaas/toast

A lightweight toast notification package.

## Usage

### 1. HTML
```html
<head>
    <script type="module" src="https://unpkg.com/@prodsaas/toast"></script>
</head>

<body>
    <button onclick="toast.success('This is a success message.')">
        Success Button
    </button>
</body>
```

### 2. HTML + JavaScript (ES Modules)

#### index.html
```html
<body>
    <button id="successBtn">
        Success Button
    </button>

    <script type="module" src="./script.js"></script>
</body>
```

#### script.js
```javascript
import toast from 'https://unpkg.com/@prodsaas/toast';

document.getElementById('successBtn').onclick = () => {
    toast.success('This is a success message.');
};
```

### 3. React
```bash
npm install @prodsaas/toast
```

```jsx
import toast from "@prodsaas/toast";

function App() {
  return (
    <button onClick={() => toast.success("This is a success message.")}>
      Success Button
    </button>
  );
}

export default App;
```

## API Reference

| Method | Usage Syntax |
| :--- | :--- |
| **Success** | `toast.success("Success message")` |
| **Error** | `toast.error("Error message")` |
| **Warning** | `toast.warn("Warning message")` |
| **Info** | `toast.info("Informative message")` |
| **Loading** | `toast.load("Loading message")` |
| **Hide All** | `toast.hide()` |