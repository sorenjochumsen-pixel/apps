'use strict';

window.FaaborgUI = (() => {
  function parseNumber(value) {
    const normalized = String(value ?? '')
      .trim()
      .replace(/\s/g, '')
      .replace(',', '.');

    const parsed = Number.parseFloat(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function formatNumber(value, decimals = 0, locale = 'en-GB') {
    return Number(value).toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function selectAll(input) {
    requestAnimationFrame(() => {
      try {
        input.setSelectionRange(0, input.value.length);
      } catch {
        input.select();
      }
    });
  }

  function bindNumberInputs(options = {}) {
    const selector = options.selector || '.ft-input';
    const storageKey = options.storageKey || null;
    const onChange = typeof options.onChange === 'function'
      ? options.onChange
      : () => {};

    const inputs = [...document.querySelectorAll(selector)];

    if (storageKey) {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
        inputs.forEach(input => {
          if (saved[input.id] !== undefined) {
            input.value = saved[input.id];
          }
        });
      } catch (error) {
        console.warn('Saved values could not be loaded.', error);
      }
    }

    function save() {
      if (!storageKey) return;

      const data = {};
      inputs.forEach(input => {
        data[input.id] = input.value;
      });

      localStorage.setItem(storageKey, JSON.stringify(data));
    }

    inputs.forEach(input => {
      input.addEventListener('focus', () => selectAll(input));
      input.addEventListener('pointerup', event => {
        event.preventDefault();
        selectAll(input);
      });

      input.addEventListener('input', () => {
        save();
        onChange();
      });

      input.addEventListener('change', () => {
        save();
        onChange();
      });

      const card = input.closest('.ft-card');
      if (card) {
        card.addEventListener('click', event => {
          if (event.target !== input) {
            input.focus();
            selectAll(input);
          }
        });
      }
    });

    onChange();

    return {
      inputs,
      save,
      parseNumber,
      formatNumber
    };
  }

  function bindDialog({ openButton, dialog, closeButton }) {
    const open = document.querySelector(openButton);
    const modal = document.querySelector(dialog);
    const close = document.querySelector(closeButton);

    if (!open || !modal || !close) return;

    open.addEventListener('click', () => modal.showModal());
    close.addEventListener('click', () => modal.close());

    modal.addEventListener('click', event => {
      if (event.target === modal) {
        modal.close();
      }
    });
  }

  return {
    parseNumber,
    formatNumber,
    bindNumberInputs,
    bindDialog
  };
})();