/* 结局页 — 逐行显示文字 */
function playEndingLines(lines, options) {
  options = options || {};
  var container = document.getElementById('endLines');
  if (!container) return;
  var lineDelay = options.lineDelay !== undefined ? options.lineDelay : 2200;
  var i = 0;

  function showNext() {
    if (i >= lines.length) {
      if (options.onComplete) options.onComplete();
      return;
    }
    var p = document.createElement('p');
    var isTitle = i === lines.length - 1 && options.lastIsTitle;
    p.className = 'end-line' + (isTitle ? ' end-line--title' : '');
    p.textContent = lines[i];
    container.appendChild(p);
    requestAnimationFrame(function() {
      p.classList.add('end-line--visible');
    });
    i++;
    setTimeout(showNext, lineDelay);
  }

  showNext();
}

function showEndHomeLink(href) {
  var el = document.getElementById('endHome');
  if (!el) return;
  var a = el.querySelector('a');
  if (a && href) a.href = href;
  el.classList.add('end-home-link--visible');
}
