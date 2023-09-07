/**
 * Entry point for development and production PWA builds. -- configured in webpack.pwa.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import App from './App';
import { history } from './utils/history';

/**
 * EXTENSIONS AND MODES
 * =================
 * pluginImports.js is dynamically generated from extension and mode
 * configuration at build time.
 *
 * pluginImports.js imports all of the modes and extensions and adds them
 * to the window for processing.
 */
import loadDynamicConfig from './loadDynamicConfig';
import {
  extensions as defaultExtensions,
  modes as defaultModes,
} from './pluginImports';

loadDynamicConfig(window.config).then(config_json => {
  // Reset Dynamic config if defined
  if (config_json !== null) {
    window.config = config_json;//if dangerouslyUseDynamicConfig and get config from server
  }

  /**
   * Combine our appConfiguration with installed extensions and modes.
   * In the future appConfiguration may contain modes added at runtime.
   *  */
  const appProps = {
    config: window ? window.config : {},
    defaultExtensions,
    defaultModes,
  };

  /** Create App */
  const app = React.createElement(App, appProps, null);
  /** Render */
  ReactDOM.render(app, document.getElementById('root'));
});

console.log('🚗 入口 +++', history);

export { history };
