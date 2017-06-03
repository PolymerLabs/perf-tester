// x-browser compat.
(function() {
  let wcr = false;

  addEventListener('WebComponentsReady', function() {
    wcr = true;
  });

  console.perf = function() {
    if (window.HTMLImports && !HTMLImports.useNative && !wcr) {
      let fn = console._perf.bind(console);
      HTMLImports.whenReady(fn);
    } else {
      console._perf();
    }
  };

  console._perf = function() {
    if (window.gc) {
      for (let i=0; i<20; i++) {
        gc();
      }
    }
    if (console.time) {
      console.time('perf');
    }
    console.perf.time = performance.now();
  };

  console.perfEnd = function(info) {
    if (window.WebComponents) {
      if (!wcr) {
        addEventListener('WebComponentsReady', function() {
          console._perfEnd(info);
        });
      } else {
        console._perfEnd(info);
      }
    } else {
      console._perfEnd(info);
    }
  };

  console._perfEnd = function(info) {
    // force layout
    document.body.offsetWidth;
    let time = performance.now() - console.perf.time;
    if (console.time) {
      console.timeEnd('perf');
    }
    document.title = time.toFixed(1) + 'ms: ' + document.title;
    if (window.top !== window) {
      window.top.postMessage({time: time + 'ms', info: info}, '*');
    }
  };

})();