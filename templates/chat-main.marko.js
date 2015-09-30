function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __loadTemplate = __helpers.l,
      __base_marko = __loadTemplate(require.resolve("./base.marko"), require),
      __renderer = __helpers.r,
      ___node_modules_marko_node_modules_marko_layout_use_tag_js = __renderer(require("marko\\node_modules\\marko-layout\\use-tag")),
      __tag = __helpers.t,
      ___node_modules_marko_node_modules_marko_layout_put_tag_js = __renderer(require("marko\\node_modules\\marko-layout\\put-tag")),
      escapeXml = __helpers.x;

  return function render(data, out) {
    __tag(out,
      ___node_modules_marko_node_modules_marko_layout_use_tag_js,
      {
        "template": __base_marko,
        "getContent": function(__layoutHelper) {
          __tag(out,
            ___node_modules_marko_node_modules_marko_layout_put_tag_js,
            {
              "into": "title",
              "layout": __layoutHelper
            },
            function(out) {
              out.w('Chat - ' +
                escapeXml(data.title));
            });
          __tag(out,
            ___node_modules_marko_node_modules_marko_layout_put_tag_js,
            {
              "into": "body",
              "layout": __layoutHelper
            },
            function(out) {
              out.w('<h3>' +
                escapeXml(data.title) +
                '</h3><h5>Hello, ' +
                escapeXml(data.username) +
                '</h5><ul id="messages"></ul><input id="chat-message" autocomplete="off"><button id="chat-message-send">Send</button>');
            });
          __tag(out,
            ___node_modules_marko_node_modules_marko_layout_put_tag_js,
            {
              "into": "scripts",
              "layout": __layoutHelper
            },
            function(out) {
              out.w('<script src="/node_modules/socket.io/node_modules/socket.io-client/socket.io.js"></script><script src="public/app.js"></script>');
            });
        }
      });
  };
}
(module.exports = require("marko").c(__filename)).c(create);