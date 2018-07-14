$(function() {
  $(".footer2").on("click", function() {
    $(".footer_top")
      .show()
      .css({ "margin-left": "19%" });
    var ps = "<p>普通用户</p><p>信息员</p>";
    $(".footer_top").html(ps);
  });
  $(".footer3").on("click", function() {
    $(".footer_top")
      .show()
      .css({ "margin-left": "46%" });
    var ps =
      "<p><a href='../index.html'>微首页</a></p><p>市场价格</p><p>供求市场</p>";
    $(".footer_top").html(ps);
  });
  $(".footer4").on("click", function() {
    $(".footer_top")
      .show()
      .css({ "margin-left": "73%" });
    var ps = "<p>专题服务</p><p>定制天气</p><p>我的中心</p>";
    $(".footer_top").html(ps);
  });
});
