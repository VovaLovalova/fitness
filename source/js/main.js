import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

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
