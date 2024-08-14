const ui = SwaggerUIBundle({
  url: "http://localhost:3000/swagger/swagger.yaml",  // URL para o arquivo YAML ou JSON da definição da API
  dom_id: '#swagger-ui',
  deepLinking: true,
  presets: [
    SwaggerUIBundle.presets.apis,
    SwaggerUIBundle.SwaggerUIStandalonePreset
  ],
  layout: "StandaloneLayout"
});
