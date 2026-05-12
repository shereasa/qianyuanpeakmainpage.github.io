// 乾元峰景区官网 — 交互脚本
 
document.addEventListener('DOMContentLoaded', function () {
 
  /* ========== 快捷入口跳转 ========== */
  var shortcutMap = {
    '游客守则': 'rules_1.html',
    '景区地图': 'map.html',
    '在线购票': 'ticket.html',
    '服务中心': 'service.html',
  };
 
  document.querySelectorAll('.shortcut').forEach(function (sc) {
    sc.addEventListener('click', function (e) {
      e.preventDefault();
      var label = sc.querySelector('.shortcut__label').textContent.trim();
      if (shortcutMap[label]) {
        window.location.href = shortcutMap[label];
      }
    });
  });
 
  /* ========== 公告条目跳转 ========== */
  document.querySelectorAll('.notice__item').forEach(function (item) {
    item.addEventListener('click', function () {
      var link = item.querySelector('.notice__link');
      if (link && link.getAttribute('href') && link.getAttribute('href') !== '#') {
        window.location.href = link.getAttribute('href');
      }
    });
  });
 
  /* ========== 查看更多公告 ========== */
  var moreBtn = document.querySelector('.notice__more');
  if (moreBtn) {
    moreBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = 'notice.html';
    });
  }
 
});