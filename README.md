# Star Wars Character Search

This is a React + TypeScript app for exploring Star Wars characters. It supports search with `localStorage` persistence, URL-synced pagination, a split-view character details panel, an About page, and a custom 404 page.

The current version is implemented with functional components, hooks, and React Router.

## Live Demo

https://sw-maiano.netlify.app/

## Getting Started

Clone the repository and switch to the working branch:

```bash
git clone https://github.com/maiano/rs-react-2026.git
cd rs-react-2026
git checkout hooks-and-routing
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:5173
```

## Features

- Search characters with persisted search term
- URL-based pagination
- Master-detail layout with nested routing
- About page with author and course link
- 404 page for unknown routes

## Checks

Run tests:

```bash
npm run test
```

Run coverage:

```bash
npm run test:coverage
```

Run ESLint:

```bash
npm run lint
```

Build the project:

```bash
npm run build
```
