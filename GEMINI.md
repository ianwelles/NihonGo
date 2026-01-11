
# Project Gemini: Tech Stack, Directory Structure, and Coding Rules

This document outlines the technical details and coding conventions for the NihonGo Beto Birthday Experience project.

## 1. Tech Stack

The project is built with a modern, lightweight tech stack:

*   **Frontend Framework:** [React 19](https://react.dev/)
*   **Build Tool & Dev Server:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript 5.8](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **AI Integration:** [Google AI for JavaScript/TypeScript](https://github.com/google/generative-ai-js) (using the 'gemini-3-flash-preview' model)
*   **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## 2. Directory Structure

The project follows a component-based architecture:

```
/
├── dist/               # Production build output
├── components/         # Reusable React components
│   ├── ...
├── services/           # API communication and external services
│   └── geminiService.ts
├── utils/              # Helper functions and utilities
│   └── csvHelper.ts
├── .env.local          # Local environment variables (e.g., API keys)
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript compiler configuration
```

## 3. Local Development

**Prerequisites:** [Node.js](https://nodejs.org/)

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Create a `.env.local` file and set the `GEMINI_API_KEY` to your Gemini API key.
    ```
    GEMINI_API_KEY=your_api_key_here
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```

## 4. Coding Rules

To maintain code quality and consistency, please adhere to the following rules:

*   **File Naming:**
    *   React components: **PascalCase** (e.g., `MyComponent.tsx`)
    *   All other files: **camelCase** (e.g., `myHelper.ts`)
*   **Component Structure:**
    *   Use **functional components** with hooks.
    *   Define prop types using TypeScript interfaces.
*   **Styling:**
    *   This project uses **Tailwind CSS**. Prefer utility classes directly in the JSX.
    *   For complex or reusable styles, use `@apply` within the global `index.css` file.
*   **State Management:**
    *   Use `useState` for simple, local component state.
    *   For complex global state, use `useContext` and `useReducer`.
*   **API Interaction:**
    *   All Gemini API calls are centralized in `services/geminiService.ts`.
    *   Implement robust error handling for all API calls.
*   **Type Safety:**
    *   Leverage TypeScript to its full potential. Avoid `any`.

## 5. Testing

*   **Framework:** [Vitest](https://vitest.dev/) is recommended for its speed and integration with Vite.
*   **Library:** Use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for component testing.
*   **Guideline:** Write unit tests for critical utility functions and integration tests for major components.

## 6. Linting and Formatting

*   **Linter & Formatter:** It is recommended to set up [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to enforce code style and catch errors early.
*   **Automation:** Use pre-commit hooks (with a tool like [Husky](https://typicode.github.io/husky/)) to automatically lint and format code before committing.

## 7. Deployment

1.  **Build:** Run `npm run build` to generate the production assets in the `dist/` directory.
2.  **Deploy:** Deploy the `dist/` directory to any static hosting service. [Firebase Hosting](https://firebase.google.com/docs/hosting) is recommended for its seamless integration with other Google services.
