const tailwindcss = require("tailwindcss");
module.exports = {
  plugins: [
    tailwindcss("./tailwind.js"),
    require("autoprefixer"),
    // require("@fullhuman/postcss-purgecss")({
    //   content: ["./src/**/*.js", "./public/index.html"],
    //   defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g)|| [],
    // }),
  ],
};


// Modify package.json while using React 
// "scripts": {
//   "start": "npm run watch:css && react-scripts start",
//   "build": "npm run watch:css && react-scripts build",
//   "test": "react-scripts test",
//   "eject": "react-scripts eject",
//   "watch:css": "postcss src/styles/temp.css -o src/assets/main.css"
// }