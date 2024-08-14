/* global SwaggerUIBundle, SwaggerUIStandalonePreset */

(function() {
    'use strict';
  
    const presets = [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ];
    const ui = SwaggerUIBundle({
      url: "/swagger/swagger.yaml", // URL para o swagger.yaml
      dom_id: '#swagger-ui',
      presets: presets,
      layout: "StandaloneLayout"
    });
  
    window.ui = ui;
  })();
  