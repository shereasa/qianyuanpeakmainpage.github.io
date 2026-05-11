// 乾元峰景区官网 — 交互脚本

document.addEventListener('DOMContentLoaded', function () {

  /* ========== 公告列表点击 ========== */
  const noticeItems = document.querySelectorAll('.notice__item');
  noticeItems.forEach(function (item) {
    // 点击高亮效果（模拟跳转前的选中反馈）
    item.addEventListener('click', function () {
      noticeItems.forEach(function (i) { i.classList.remove('notice__item--active'); });
      item.classList.add('notice__item--active');
    });
    // 键盘可访问：Enter / Space 触发点击
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  /* ========== 查看更多公告 ========== */
  const moreBtn = document.querySelector('.notice__more');
  if (moreBtn) {
    moreBtn.addEventListener('click', function (e) {
      e.preventDefault();
      alert('更多公告功能开发中，敬请期待！');
    });
  }

  /* ========== 快捷入口点击 ========== */
  const shortcuts = document.querySelectorAll('.shortcut');
  const shortcutActions = {
    '游客守则': '游客守则页面开发中，敬请期待！',
    '景区地图': '景区地图页面开发中，敬请期待！',
    '在线购票': '在线购票功能开发中，敬请期待！',
    '服务中心': '服务中心页面开发中，敬请期待！',
  };
  shortcuts.forEach(function (sc) {
    sc.addEventListener('click', function (e) {
      e.preventDefault();
      const label = sc.querySelector('.shortcut__label').textContent.trim();
      alert(shortcutActions[label] || '该功能开发中，敬请期待！');
    });
    // 键盘可访问
    sc.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        sc.click();
      }
    });
  });

});
