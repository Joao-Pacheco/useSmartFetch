# **useSmartFetch**

**useSmartFetch** is a custom React hook that simplifies making HTTP requests using the native `fetch` API while automatically managing **loading states, errors, caching, and expiration**.

---

## 📖 **Table of Contents**

- [✨ Features](#-features)
- [📥 Installation](#-installation)
- [🚀 Usage](#-usage)
- [🛠 Caching Mechanism](#-caching-mechanism)
- [📌 API](#-api)
- [⚙️ Customization](#-customization)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [👨‍💻 Author](#-author)

---

## ✨ **Features**

✅ **Simplified HTTP requests** – Easily fetch data from any API using native `fetch`.  
✅ **State management** – Automatically handles `loading`, `error`, and `data` states.  
✅ **Cache support** – Stores responses to avoid redundant API requests.  
✅ **Cache expiration** – Automatically invalidates old data after a set duration.  
✅ **Refetch functionality** – Allows manual re-fetching of data when needed.

---

## 📥 **Installation**

You can install this library via **npm** or **yarn**:

```bash
npm install use-smart-fetch
```

or

```bash
yarn add use-smart-fetch
```

Alternatively, if you prefer **manual installation**, simply copy the `useSmartFetch.tsx` file into your project.

---

## 🚀 **Usage**

Import the hook into your React component and provide the API URL along with any options.

```tsx
"use client";
import React from "react";
import { useSmartFetch } from "use-smart-fetch"; // Import the hook

export default function App() {
  const { data, loading, error, refetch } = useSmartFetch<Array<any>>({
    url: "https://jsonplaceholder.typicode.com/posts",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Posts List</h1>
      <button onClick={refetch}>Refetch Data</button>
      <ul>
        {data?.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🛠 **Caching Mechanism**

The hook uses a `Map` to store fetched data along with an **expiration timestamp**.

### **How it works:**

1. A unique **cache key** is generated based on the URL and request options.
2. The hook checks if a valid cache entry exists:
   - ✅ **If valid**, it returns the cached data immediately.
   - ❌ **If expired or not found**, a new API request is made.
3. The **cache expiration time** is customizable via the `cacheDuration` parameter (default: **300,000ms** or **5 minutes**).

---

## 📌 **API**

### `useSmartFetch<T>(url: string, options?: RequestInit, cacheDuration?: number)`

#### **Parameters:**

- `url` (**string**) → The API URL to fetch data from.
- `options` (**RequestInit**, optional) → Additional fetch options (headers, method, body, etc.).
- `cacheDuration` (**number**, optional) → Time in milliseconds before cache expires (**default = 300,000 ms = 5 minutes**).

#### **Returns:**

An object containing:

- `data`: The fetched data (`null` if not available).
- `loading`: A `boolean` indicating if the request is in progress.
- `error`: A `string` describing any error encountered.
- `refetch`: A function to manually re-trigger the fetch request.

---

## ⚙️ **Customization**

You can modify the hook to fit your needs:

- **Adjust `cacheDuration`** to store data for a longer or shorter period.
- **Extend cache invalidation logic** (e.g., implement LRU cache strategies).
- **Modify request handling** to work with different response types or APIs.

---

## 🤝 **Contributing**

You feel free to open **issues** or submit **pull requests** if you have suggestions, improvements, or feature requests!

---

## 📜 **License**

This project is licensed under the **MIT License**.

---

## 👨‍💻 **Author**

Developed by **[@João Pacheco](https://github.com/Joao-Pacheco)**.

---

### 🚀 **Now you're ready to optimize API requests in your React app with `useSmartFetch`!** 🚀

---
