(function() {
  var navMain = document.querySelector('.navigation');
  var navToggle = document.querySelector('.header__button-toggle');

  navMain.classList.remove('navigation--nojs');

  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('navigation--closed')) {
      navMain.classList.remove('navigation--closed');
    } else {
      navMain.classList.add('navigation--closed');
    }
  });
  })();
