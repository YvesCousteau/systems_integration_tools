//import logo from './logo.svg';
import './App.css';
//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";

import {
  defaultTheme,
  ThemeProvider,
  Preflight,
} from '@xstyled/styled-components'

const theme = {
  ...defaultTheme,
  // Customize your theme here
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Preflight />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

/*
<ThemeProvider theme={theme}>
      <Preflight />
<div>
      
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <x.div display="grid" gap={4} gridTemplateColumns={2} pt={8}>
          <div>1</div>
          <div>4</div>
          <div>4</div>
        </x.div>
      
    </div>

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/