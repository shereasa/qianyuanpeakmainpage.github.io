/* ============================================================
   乾元峰 — 员工论坛公共脚本 (forum.js)
   ============================================================ */

var FORUM_ACCOUNTS = {
  'CL-001':   { pwd: '19980307', name: '小竹', role: 'full', profile: '' },
  'xiaowang': { pwd: 'SG-004',   name: '小王', role: 'chat_only', profile: 'wangprofile_41.html' },
  'Shaw':     { pwd: 'ADMIN-001', name: 'Shaw', role: 'full', profile: 'Shawprofile_43.html' }
};

function forumCheckTrap() {
  if (sessionStorage.getItem('forumTrapped') === '1') {
    var p = window.location.pathname.split('/').pop();
    if (p !== 'badend_40.html') {
      window.location.replace('badend_40.html');
      return true;
    }
  }
  return false;
}

function forumRequireAuth() {
  if (forumCheckTrap()) return false;
  if (sessionStorage.getItem('forumAuth') !== '1') {
    window.location.href = 'forumlogin_29.html';
    return false;
  }
  return true;
}

function forumRequireFullAccess() {
  if (!forumRequireAuth()) return false;
  if (sessionStorage.getItem('forumRole') === 'chat_only') {
    window.location.href = 'chat_33.html';
    return false;
  }
  return true;
}

function forumInitUserBar(containerId) {
  var el = document.getElementById(containerId || 'forumUserBar');
  if (!el) return;
  var name = sessionStorage.getItem('forumUserName') || '未知';
  var profile = sessionStorage.getItem('forumProfile') || '';
  var nameEl = el.querySelector('.forum-user-bar__name');
  if (nameEl) {
    nameEl.textContent = name;
    if (profile) {
      nameEl.href = profile;
    } else {
      nameEl.removeAttribute('href');
      nameEl.classList.add('forum-user-bar__name--plain');
    }
  }
}

function forumInitSidebar(activePage) {
  var workItem = document.getElementById('sidebarWorkrecord');
  if (workItem && sessionStorage.getItem('forumRole') === 'chat_only') {
    workItem.style.display = 'none';
  }
  if (activePage) {
    var items = document.querySelectorAll('.forum-sidebar .sidebar__item');
    items.forEach(function(item) {
      item.classList.remove('sidebar__item--active');
      var link = item.querySelector('a');
      if (link && link.getAttribute('href') === activePage) {
        item.classList.add('sidebar__item--active');
      }
    });
  }
}

function forumLogout() {
  if (sessionStorage.getItem('forumTrapped') === '1') {
    window.location.href = 'badend_40.html';
    return;
  }
  sessionStorage.removeItem('forumAuth');
  sessionStorage.removeItem('forumUserId');
  sessionStorage.removeItem('forumUserName');
  sessionStorage.removeItem('forumRole');
  sessionStorage.removeItem('forumProfile');
  window.location.href = 'forumlogin_29.html';
}

function forumGoWarning() {
  window.location.href = 'warning_38.html';
}

function forumIsLoggedIn() {
  return sessionStorage.getItem('forumAuth') === '1';
}

function forumIsShaw() {
  return forumIsLoggedIn() && sessionStorage.getItem('forumUserId') === 'Shaw';
}

function forumRequireShaw() {
  if (forumCheckTrap()) return false;
  if (!forumIsShaw()) {
    window.location.href = 'Shawprofile_43.html';
    return false;
  }
  return true;
}

function forumInitShawProfilePage() {
  if (forumCheckTrap()) return;

  var privateEl = document.getElementById('shawPrivatePosts');
  if (privateEl) {
    privateEl.style.display = forumIsShaw() ? 'block' : 'none';
  }

  var hintEl = document.getElementById('shawGuestHint');
  if (hintEl) {
    if (forumIsShaw()) {
      hintEl.style.display = 'none';
    } else {
      hintEl.style.display = 'block';
      if (forumIsLoggedIn()) {
        hintEl.textContent = '该用户的私密帖子仅 Shaw 本人可见。';
      } else {
        hintEl.innerHTML = '该用户的私密帖子仅 Shaw 本人可见。请使用 Shaw 账号<a href="forumlogin_29.html">登录论坛</a>后查看。';
      }
    }
  }

  var guestNav = document.getElementById('shawSidebarGuest');
  var memberNav = document.getElementById('shawSidebarMember');
  if (forumIsLoggedIn()) {
    if (guestNav) guestNav.style.display = 'none';
    if (memberNav) memberNav.style.display = '';
    forumInitSidebar('chat_33.html');
  } else {
    if (guestNav) guestNav.style.display = '';
    if (memberNav) memberNav.style.display = 'none';
  }

  var backForum = document.getElementById('shawBackForum');
  var backContact = document.getElementById('shawBackContact');
  if (forumIsLoggedIn()) {
    if (backForum) backForum.style.display = 'inline';
    if (backContact) backContact.style.display = 'none';
  } else {
    if (backForum) backForum.style.display = 'none';
    if (backContact) backContact.style.display = 'inline';
  }
}

function forumSetTrapped() {
  sessionStorage.setItem('forumTrapped', '1');
}

function forumFillWelcomeBg(elId, count) {
  var bg = document.getElementById(elId);
  if (!bg) return;
  var n = count || 160;
  var frag = document.createDocumentFragment();
  for (var i = 0; i < n; i++) {
    var s = document.createElement('span');
    s.textContent = '欢迎';
    frag.appendChild(s);
  }
  bg.appendChild(frag);
}
