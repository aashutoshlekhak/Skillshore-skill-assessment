## Installation

To get started with the SkillShore Web App, follow these steps:

# Clone the repository

git clone https://github.com/aashutoshlekhak/Skillshore-skill-assessment

# Navigate to the project folder

cd skillshore-frontend

# Install dependencies

npm install

# Start the development server

npm run dev

## Folder Structure

The project follows the following folder structure:

- **/src:** Contains the source code for the React app.
  - **/assets:** Static assets used in the project, such as images.
  - **/components:** Reusable React components.
  - **/Configs:** Base url file.
  - **/layouts:** Contains layouts components.
  - **/pages:** React components representing individual pages of the application.
    - **/admin:** React components representing admin pages.
      - **/types:** Contains the types used.
    - **/auth:** React components representing auth pages.
      - **/types:** Contains the types used.
    - **/student:** React components representing student pages.
      - **/types:** Contains the types used.
  - **/redux:** Folder contains redux components like store and api.
    - **/services:** Contains api and endpoint.
    - **/slice:** Contains slices.
    - **/store:** Contains redux store.
  - **/validation:** Contains form validation schemas implemented using Yup.
  - **App.tsx:** Main component serving as the entry point for the React application.
  - **index.css:** Styles specific to the main application component.
  - **main.tsx:** Entry point for the React application where the `ReactDOM.render` function is used.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list# Skillshore-skill-assessment
