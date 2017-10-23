
  var navMain = document.querySelector('.navigation');
  var navToggle = document.querySelector('.header__button-toggle');

  navMain.classList.remove('navigation--nojs');

  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('navigation--closed')) {
      navMain.classList.remove('navigation--closed');
    } else {
      navMain.classList.add('navigation--closed');
    }

    if (navToggle.classList.contains('header__button-toggle--closed')) {
        navToggle.classList.remove('header__button-toggle--closed');
    } else {
        navToggle.classList.add('header__button-toggle--closed');
    }
  });
