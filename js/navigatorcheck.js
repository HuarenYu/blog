(function() {
  "use strict";
  var ua = navigator.userAgent;

  if (/MSIE ([^;]+)/.test(ua)) {
    var versionDetail = RegExp['$1'];
    var v = parseInt(versionDetail);
    if (v < 9) {
      alert('browser version is too old.');
    }
  }
}());
