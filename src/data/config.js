const config = {
  "name": "intro",
  "version": "0.1.0",
  "private": true,
  "homepage": ".",
  "dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "classnames": "^2.3.1",
    "file-saver": "^2.0.5",
    "jspdf": "^2.3.1",
    "jspdf-autotable": "^3.5.14",
    "nanoid": "^3.1.20",
    "primeicons": "^4.1.0",
    "primereact": "^6.2.1",
    "prop-types": "^15.7.2",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.0",
    "react-transition-group": "^4.4.1",
    "web-vitals": "^0.2.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

module.exports = { config };