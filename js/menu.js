
  var navMain = document.querySelector('.navigation');
  var navToggle = document.querySelector('.header__button-toggle');
  var header = document.querySelector('.header__wrapper--nojs');
  var pagetitle = document.querySelector('.page-title__block--nojs');
  var pagephoto = document.querySelector('.page-photo__intro--nojs');
  var pageform = document.querySelector('.form-page__intro--nojs');


  navMain.classList.remove('navigation--nojs');
  header.classList.remove('header__wrapper--nojs');
  pagetitle.classList.remove('page-title__block--nojs');
  pagephoto.classList.remove('page-photo__intro--nojs');
  pageform.classList.remove('form-page__intro--nojs');

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
