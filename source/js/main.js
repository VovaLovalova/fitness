import { iosVhFix } from './utils/ios-vh-fix';
import { initModals } from './modules/modals/init-modals';
import { Form } from './modules/form-validate/form';

import Swiper, { Navigation } from 'swiper';

Swiper.use([Navigation]);



// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // СЛАЙДЕР ТРЕНЕРЫ
  let swiperCoaches = new Swiper('.coaches__swiper', {
    // Optional parameters
    slidesPerView: 4,
    spaceBetween: 40,
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.coaches__swiper-button-next',
      prevEl: '.coaches__swiper-button-prev',
    },
  });

  const coachesPrev = document.querySelector('.coaches__swiper-button-prev');
  const coachesNext = document.querySelector('.coaches__swiper-button-next');

  coachesPrev.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      swiperCoaches.slidePrev();
    }
  });
  coachesNext.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      swiperCoaches.slideNext();
    }
  });

  // СЛАЙДЕР ОТЗЫВЫ
  let swiperFeedback = new Swiper('.feedback__swiper', {
    // Optional parameters
    slidesPerView: 1,
    spaceBetween: 40,
    loop: false,

    // Navigation arrows
    navigation: {
      nextEl: '.feedback__swiper-button-next',
      prevEl: '.feedback__swiper-button-prev',
    },
  });


  const feedbackPrev = document.querySelector('.feedback__swiper-button-prev');
  const feedbackNext = document.querySelector('.feedback__swiper-button-next');

  feedbackPrev.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      swiperFeedback.slidePrev();
    }
  });
  feedbackNext.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      swiperFeedback.slideNext();
    }
  });


  // КАРТОЧКИ АБОНЕМЕНТОВ

  // табы

  let membershipsPeriodList = document.querySelector('.memberships__period-list');
  let membershipsPeriodArray = membershipsPeriodList.querySelectorAll('li');
  let membershipsTypeListArray = document.querySelectorAll('.memberships__type-list');

  membershipsPeriodList.style.display = 'flex';

  let showMembershipsTypeList = function () {
    for (let i = 0; membershipsPeriodArray.length > i; i++) {

      if (membershipsPeriodArray[i].classList.contains('memberships__period-item--active')) {
        membershipsTypeListArray[i].style.display = 'grid';
      } else {
        membershipsTypeListArray[i].style.display = 'none';
      }

    }
  };

  showMembershipsTypeList();

  for (let i = 0; membershipsPeriodArray.length > i; i++) {

    let onPeriodClick = function () {
      for (let j = 0; membershipsPeriodArray.length > j; j++) {
        if (i === j) {
          membershipsPeriodArray[j].classList.add('memberships__period-item--active');
        } else {
          membershipsPeriodArray[j].classList.remove('memberships__period-item--active');
        }
      }
      showMembershipsTypeList();
    };

    membershipsPeriodArray[i].addEventListener('click', onPeriodClick);
  }

  // тени от цены

  for (let j = 0; membershipsTypeListArray.length > j; j++) {
    let membershipsCardsArray = membershipsTypeListArray[j].querySelectorAll('li');

    for (let i = 0; membershipsCardsArray.length > i; i++) {
      let price = membershipsCardsArray[i].querySelector('p');
      let priceValue = price.textContent;
      let priceShadow = document.createElement('span');
      let priceField = membershipsCardsArray[i].querySelector('.memberships-card__price');
      priceShadow.textContent = priceValue;
      priceField.appendChild(priceShadow);
    }
  }

  // ВИДЕО

  let about = document.querySelector('.about__container');
  let playButton = about.querySelector('.about__play-button');
  let video = document.querySelector('#video');

  let insertIframe = function () {
    video.remove();
    let iframe = document.createElement('iframe');
    iframe.classList.add('about__video');
    iframe.setAttribute('width', 364);
    iframe.setAttribute('height', 228);
    iframe.setAttribute('src', 'https://www.youtube-nocookie.com/embed/9TZXsZItgdw?autoplay=1');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('frameborder', 0);
    about.appendChild(iframe);
  };

  let onPlayButtonClick = function () {
    playButton.removeEventListener('click', onPlayButtonClick);
    insertIframe();
  };

  let onPlayButtonKeydown = function (e) {
    if (e.keyCode === 13) {
      playButton.removeEventListener('keydown', onPlayButtonKeydown);
      insertIframe();
    }
  };

  playButton.addEventListener('click', onPlayButtonClick);
  playButton.addEventListener('keydown', onPlayButtonKeydown);

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
