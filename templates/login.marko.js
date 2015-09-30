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
              out.w(escapeXml(data.title));
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
                '</h3><h5 class="notify">' +
                escapeXml(data.notification) +
                '</h5><form method="POST" action="login-user"><label>User <input name="username" type="text"></label><label>Password <input name="password" type="text"></label><input type="submit"></form>');
            });
        }
      });
  };
}
(module.exports = require("marko").c(__filename)).c(create);