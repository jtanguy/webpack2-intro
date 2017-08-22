'use strict';

let reveal_css = run({
  name: 'reveal.js themes',
  sh: 'grunt css-themes',
  cwd: 'reveal.js',
  watch: 'reveal.js/**/*.scss'
});

let adoc = run({
  name: 'asciidoc',
  sh: 'asciidoctor -T ~/.local/share/asciidoctor/asciidoctor-reveal.js/templates/slim/ index.adoc',
  watch: ['*.adoc', '*.js']
});

let server = runServer({
  httpPort,
  sh: `lserver -p ${httpPort}`,
  watch: ['reveal.js/**/*.scss', '*.adoc', '*.js']
}).dependsOn(reveal_css, adoc);

proxy(server, 8080)
