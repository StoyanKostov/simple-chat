function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __renderer = __helpers.r,
      ___node_modules_marko_node_modules_marko_layout_placeholder_tag_js = __renderer(require("marko\\node_modules\\marko-layout\\placeholder-tag")),
      __tag = __helpers.t;

  return function render(data, out) {
    out.w('<!doctype html> <html><head><title>');
    __tag(out,
      ___node_modules_marko_node_modules_marko_layout_placeholder_tag_js,
      {
        "name": "title",
        "content": data.layoutContent
      });

    out.w('</title><style type="text/css">html, body, nav, ul, li, a, input { margin: 0; padding: 0; } body { margin: 0\nauto; max-width: 960px; } ul { list-style-type: none; } nav ul li{\nmargin-right: 10px; display: inline-block; } #messages { padding: 5px; border:\n1px solid #dcdcdc; } #messages:empty { padding: 0; margin: 0; border: none; }\n#messages li { margin: 5px 0; padding: 5px; } #messages li:nth-child(odd) {\nbackground-color: #eeeeee; } #messages li:nth-child(even) { background-color:\n#ffffff;\n}</style></head><body><header><nav><ul><li><a href="/">/</a></li><li><a href="/home">Home</a></li><li><a href="/chat">Chat</a></li><li><a href="/login">Log in</a></li><li><a href="/register">Register</a></li><li><a href="/logout">Log out</a></li></ul></nav></header><main>');
    __tag(out,
      ___node_modules_marko_node_modules_marko_layout_placeholder_tag_js,
      {
        "name": "body",
        "content": data.layoutContent
      });

    out.w('</main><footer>my awesome footer</footer>');
    __tag(out,
      ___node_modules_marko_node_modules_marko_layout_placeholder_tag_js,
      {
        "name": "scripts",
        "content": data.layoutContent
      });

    out.w('</body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);