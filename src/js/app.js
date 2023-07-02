import { Fancybox } from "@fancyapps/ui";

Fancybox.bind();

document.querySelectorAll('.form__input').forEach(input => {
  const label = input.nextElementSibling;
  if (!label) {
    return;
  }
  input.addEventListener('focus', event => {
    label.classList.add('form__label--shifted');
  });
  input.addEventListener('blur', event => {
    if (!input.value.length) {
      label.classList.remove('form__label--shifted');
    }
  });
});