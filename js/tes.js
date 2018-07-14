document.domain = "qq.com";
var Jsonp = {
    loadScript: function(t) {
      var e = document.createElement("script");
      (e.type = "text/javascript"),
        e.readyState
          ? (e.onreadystatechange = function() {
              ("loaded" != this.readyState && "complete" != this.readyState) ||
                ((this.onreadystatechange = null),
                document.body.removeChild(this));
            })
          : (e.onload = function() {
              document.body.removeChild(this);
            }),
        e.setAttribute("src", t),
        document.body.appendChild(e);
    },
    encodeParameters: function(t, e) {
      var o = [];
      for (parameter in e)
        o.push(escape(parameter) + "=" + escape(e[parameter]));
      return o.length > 0 ? (t == -1 ? "?" : "&") + o.join("&") : "";
    },
    request: function(t, e) {
      if ("string" == typeof t) var o = t.indexOf("?");
      this.loadScript(t + this.encodeParameters(o, e));
    }
  },
  cooKie = {
    set: function(t, e, o, n, i) {
      "undefined" == typeof o && (o = new Date(new Date().getTime() + 36e5)),
        (document.cookie =
          t +
          "=" +
          escape(e) +
          (o ? "; expires=" + o.toGMTString() : "") +
          (n ? "; path=" + n : "; path=/") +
          (i ? ";domain=" + i : ""));
    },
    get: function(t) {
      var e = document.cookie.match(new RegExp("(^| )" + t + "=([^;]*)(;|$)"));
      return null != e ? unescape(e[2]) : null;
    },
    clear: function(t, e, o) {
      this.get(t) &&
        (document.cookie =
          t +
          "=" +
          (e ? "; path=" + e : "; path=/") +
          (o ? "; domain=" + o : "") +
          ";expires=Fri, 02-Jan-1970 00:00:00 GMT");
    }
  },
  BossTJ1 = new Image(1, 1),
  BossCode = {
    RndNum: function(t) {
      for (var e = "", o = 0; o < t; o++) e += Math.floor(10 * Math.random());
      return e;
    },
    updata: function(t, e, o, n) {
      BossTJ1.src =
        "//btrace.qq.com/collect?sIp=&iQQ=" +
        cooKie.get("o_cookie") +
        "&sBiz=MobileTencentShuJu&sOp=&iSta=&iTy=1723&iFlow=" +
        BossCode.RndNum(9) +
        "&url=&refer=&topnav=&toplogo=&indextoppl=&share=&yuedu=&applist=&plback=&writepl=" +
        encodeURIComponent(o) +
        "&morepl=" +
        encodeURIComponent(n) +
        "&login=" +
        encodeURIComponent(t) +
        "&fabiaopl=" +
        encodeURIComponent(e) +
        "&indexplnum=&zutu=&zutuclose=&tongji01=&tongji02=xx&tongji03=xx&tongji04=xx&tongji05=xx&tongji06=xx&tongji07=xx&tongji08=xx&tongji09=xx&tongji10=xx&tongji11=xx&tongji12=xx&tongji13=xx&tongji14=xx&tongji15=xx&tongji16=xx";
    }
  },
  Passport = {
    login: function() {
      var t = window.location.href;
      window.location.href =
        "//ui.ptlogin2.qq.com/cgi-bin/login?appid=636026402&hln_css=http://mat1.gtimg.com/www/webapp/images/shipei_logo.png&style=8&s_url=" +
        t +
        "&low_login=0&pt_no_onekey=0";
    },
    logout: function() {
      cooKie.clear("skey", "/", "qq.com"),
        (reloadlogin = { src: "http://joke.qq.com/loginSucReload.htm" });
      var t = template.render("reloadTpl", reloadlogin);
      $("#reload").html(t),
        $(".logoutsubmit").hide(),
        $(".loginsubmit").show(),
        setTimeout(function() {}, 500);
    },
    loginSuccess: function() {
      $(".loginsubmit").hide(),
        $(".logoutsubmit").show(),
        $("#login").html(""),
        $("#login").hide(),
        (reloadlogin = { src: "http://joke.qq.com/loginSucReload.htm" });
      var t = template.render("reloadTpl", reloadlogin);
      $("#reload").html(t), $(".global").show();
    },
    getLogin: function() {
      $(".loginsubmit").click(function() {
        Passport.login();
      }),
        $(".logoutsubmit").click(function() {
          Passport.logout();
        });
    }
  },
  COMM = {
    TYPE: ["hotcomment", "comment"],
    pageID: 0,
    pageNum: 0,
    get: function(t) {
      Jsonp.request(
        "//coral.qq.com/article/" +
          getConfigs.id +
          "/" +
          t +
          "?source=10&commentid=" +
          COMM.pageID +
          "&reqnum=10",
        { callback: "COMM." + t, t: new Date().getTime() }
      );
    },
    hotcomment: function(t) {
      this.format(t, "HOT");
    },
    comment: function(t) {
      this.format(t, "NEW");
    },
    format: function(t, e) {
      $("#getmore").html(
        '<span class="goMore">\u70b9\u51fb\u67e5\u770b\u66f4\u591a</span>'
      );
      var o = t.data,
        n = o.commentid;
      if (0 == t.errCode)
        if (0 == o.total)
          "NEW" == e && ($(".loads").hide(), $(".nothing").show());
        else if (0 != o.retnum && "" != n) {
          $(".nothing").hide(),
            (COMM.total = o.total),
            (COMM.retnum = o.retnum);
          var n = o.commentid;
          COMM.pageID = n[COMM.retnum - 1].id;
          for (var i = [], a = 0; a < n.length; a++) {
            var s = n[a].userinfo.nick;
            if (("" == s && (s = "\u817e\u8baf\u7f51\u53cb"), "NEW" === e)) {
              var m = "";
              (m =
                "" === n[a].content
                  ? "\u6b64\u8d34\u5df2\u88ab\u7528\u6237\u5220\u9664"
                  : n[a].content),
                (jsonp = {
                  id: n[a].id,
                  time: n[a].timeDifference,
                  content: m,
                  nick: s,
                  thumb: n[a].userinfo.head,
                  region: n[a].userinfo.region,
                  upnum: n[a].up
                }),
                "0" === n[a].parent
                  ? i.push(template.render("commTpl", jsonp))
                  : i.push(template.render("replyItemTpl", jsonp));
            } else
              "HOT" === e &&
                ((jsonp = {
                  id: n[a].id,
                  time: n[a].timeDifference,
                  content: n[a].content,
                  nick: s,
                  thumb: n[a].userinfo.head,
                  region: n[a].userinfo.region,
                  upnum: n[a].up
                }),
                i.push(template.render("commTpl", jsonp)));
          }
          (i = i.join("")),
            "HOT" === e && ($("#commHot").append(i), $(".hotComments").show()),
            "NEW" === e && ($("#commNew").append(i), $(".newComments").show()),
            $(".loads").hide(),
            "NEW" == e &&
              (COMM.retnum < 10 ? $("#getmore").hide() : $("#getmore").show());
        }
    },
    up_pull: function(t) {
      Jsonp.request(
        "//w.coral.qq.com/article/comment/up/to/" +
          t +
          "?targetid=" +
          getConfigs.id,
        { callback: "COMM.up_call", t: new Date().getTime() }
      );
    },
    up_call: function(t) {
      0 === t.errCode
        ? ((COMM._num = t.data.up),
          COMM._this.find("i").text(COMM._num),
          COMM._this.toggleClass("upend"),
          COMM._this.find(".jiayi").addClass("fadeOutUp animated"),
          setTimeout(function() {
            COMM._this.find(".jiayi").css("opacity", "0"),
              COMM._this.find(".jiayi").removeClass("fadeOutUp animated");
          }, 800))
        : alert("\u4eb2\uff0c\u4eca\u5929\u9876\u8fc7\u4e86\u54e6!");
    },
    up_num: function() {
      $(".main").on("click", ".up", function() {
        var t = $(this).hasClass("upend"),
          e = $(this).attr("data-up");
        if (!t) {
          var o = $(".up").index(this);
          (COMM._this = $(".up").eq(o)), COMM.up_pull(e);
        }
      });
    },
    submit_comm: function() {
      $("#postsubmit").click(function() {
        cooKie.get("skey")
          ? "" === $("#commenttexts").val()
            ? alert("\u8bf7\u8f93\u5165\u8bc4\u8bba\u5185\u5bb9!")
            : COMM.Post(COMM.cur, 1)
          : Passport.login();
      });
    },
    reply: function() {
      $(".commentlist").on("click", ".repsubmit", function() {
        var t = $(this).attr("data-reply");
        $(".commentlist li .commentform").remove(),
          $(".commentlist li .passsubmit").text("\u56de\u590d"),
          $(".commentlist li .repsubmit")
            .removeClass("repsubmit")
            .addClass("passsubmit"),
          $(".commentlist li .passsubmit")
            .removeClass("passsubmit")
            .addClass("repsubmit"),
          $(this).text("\u53d6\u6d88"),
          $(this)
            .removeClass("repsubmit")
            .addClass("passsubmit"),
          (texts = { id: t.replace(/[^0-9]/gi, "") });
        var e = template.render("replyTpl", texts);
        $("#" + t).append(e), COMM.post_btn(t);
      }),
        $(".commentlist").on("click", ".passsubmit", function() {
          BossCode.updata("", "", "cancel", "");
          var t = $(this).attr("data-reply");
          $("#" + t + " .commentform").remove(),
            $(this).text("\u56de\u590d"),
            $(this)
              .removeClass("passsubmit")
              .addClass("repsubmit");
        });
    },
    post_btn: function(t) {
      $("#" + t + " .postsubmit");
      (COMM.cur = t),
        $(".commentlist").on("click", ".postsubmit", function() {
          cooKie.get("skey")
            ? "" === $("#" + COMM.cur + " textarea").val()
              ? alert("\u8bf7\u8f93\u5165\u8bc4\u8bba\u5185\u5bb9!")
              : COMM.Post(COMM.cur, 0)
            : Passport.login();
        });
    },
    Token: function(t) {
      for (var e = 2013, o = 0, n = t.length; o < n; o++)
        e += (e << 5) + t.charCodeAt(o);
      return 2147483647 & e;
    },
    Post: function(t, e) {
      if (e) {
        if (e) {
          COMM._ab = e;
          var o = $("#commenttexts").val();
          (COMM.skey = cooKie.get("skey")),
            (COMM.uin = Number(cooKie.get("uin").substring(1))),
            (postJsonp = {
              api: "//w.coral.qq.com/article/comment/",
              tid: getConfigs.id,
              content: o,
              skey: COMM.Token(COMM.skey)
            });
          var n = template.render("postTpl", postJsonp);
          $("#post").html(n), $("#postform").submit();
        }
      } else {
        COMM._ab = e;
        var o = $("#" + t + " textarea").val(),
          i = t.replace(/[^0-9]/gi, "");
        (COMM.skey = cooKie.get("skey")),
          (COMM.uin = Number(cooKie.get("uin").substring(1))),
          (postJsonp = {
            api: "//w.coral.qq.com/article/comment/to/" + i,
            tid: getConfigs.id,
            content: o,
            skey: COMM.Token(COMM.skey)
          });
        var n = template.render("postTpl", postJsonp);
        $("#post").html(n), $("#postform").submit();
      }
    },
    Suc: function(t) {
      var e = t.errCode;
      if (0 == e) {
        if (
          ((_data = t.data),
          (myComm = {
            id: _data.commentid,
            time: "\u521a\u521a",
            content: _data.content,
            nick: _data.userinfo.nick,
            upnum: 0
          }),
          COMM._ab)
        ) {
          var o = template.render("commTpl", myComm);
          $(o).insertBefore($("#commNew > li").eq(0)),
            BossCode.updata("", "fabiaopl", "", "");
        } else {
          var o = template.render("replyItemTpl", myComm),
            n = $("#" + COMM.cur + " > ul");
          n.append(o),
            $("#" + COMM.cur + " .commentform textarea").val(""),
            BossCode.updata("", "reply", "", "");
        }
        alert("\u53d1\u8868\u6210\u529f");
      } else
        8 == e || 9 == e || 12 == e || 13 == e || 14 == e
          ? ((consoleErr = {
              8: "\u8fd8\u6ca1\u767b\u9646\uff0c\u8bf7\u5148\u767b\u9646",
              9: "\u5df2\u8fdb\u5165\u9ed1\u540d\u5355",
              12: "\u53d1\u7684\u592a\u5feb\uff0c\u6162\u70b9\u513f\u53d1",
              13: "\u7981\u6b62\u8bc4\u8bba",
              14: "\u53d1\u91cd\u4e86"
            }[t.errCode]),
            alert(consoleErr))
          : alert("\u672a\u77e5\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5");
    },
    getMy: function(t) {
      Jsonp.request(
        "//coral.qq.com/user/0/comment?source=10&lastid=" +
          t +
          "&pageflag=0&reqnum=1",
        { callback: "COMM.myComm", t: new Date().getTime() }
      );
    },
    myComm: function(t) {
      if (
        ((_data = t.data.comments),
        (myComm = {
          id: _data[0].id,
          time: "\u521a\u521a",
          content: _data[0].content,
          nick: _data[0].userinfo.nick,
          upnum: 0
        }),
        COMM._ab)
      ) {
        var e = template.render("commTpl", myComm);
        $(e).insertBefore($("#commNew > li").eq(0));
      } else {
        var e = template.render("replyItemTpl", myComm),
          o = $("#" + COMM.cur + " > ul");
        o.append(e), $("#" + COMM.cur + " .commentform textarea").val("");
      }
    },
    getMore: function() {
      $("#getmore").click(function() {
        $(this).html(
          '<span class="goMore noIcon">\u52a0\u8f7d\u4e2d...</span>'
        ),
          COMM.get(COMM.TYPE[1]);
      });
    },
    init: function(t) {
      cooKie.get("skey") ? $(".logoutsubmit").show() : $(".loginsubmit").show(),
        this.get(this.TYPE[1]),
        this.get(this.TYPE[0]),
        t && t.call(window),
        $(".gochannels").click(function() {
          var t = $(".channels");
          t.toggleClass("channelstoggle");
        }),
        $(".gotop").click(function() {
          window.scroll(0, 0);
        });
    }
  };
(window.onload = function() {
  $(".foot_user") && $(".foot_user").remove(),
    COMM.init(function() {
      COMM.up_num(),
        COMM.submit_comm(),
        COMM.reply(),
        COMM.getMore(),
        Passport.getLogin();
    });
}),
  $("body")
    .on("click", ".logoutsubmit", function() {
      BossCode.updata("logout", "", "", "");
    })
    .on("click", ".loginsubmit", function() {
      BossCode.updata("login", "", "", "");
    })
    .on("click", ".up", function() {
      BossCode.updata("", "like", "", "");
    })
    .on("touchstart", "#getmore", function() {
      BossCode.updata("", "", "", "morepl");
    }),
  $("#commenttexts").on("focus", function() {
    BossCode.updata("", "", "writepl", "");
  }),
  $(".commentlist").on("focus", ".subcommtexts", function() {
    BossCode.updata("", "", "replypl", "");
  }); /*  |xGv00|9935b671251b56d55fae0d531e4b25c4 */
