window.FaaborgTools = (() => {
  const parseNumber = value => {
    const n = Number.parseFloat(String(value ?? '').trim().replace(',', '.'));
    return Number.isFinite(n) ? n : 0;
  };

  const formatNumber = (value, decimals = 1, locale = 'da-DK') =>
    Number(value).toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });

  const storage = {
    get(key, fallback = null){
      try{
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      }catch{
        return fallback;
      }
    },
    set(key, value){
      try{
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      }catch{
        return false;
      }
    }
  };

  const bindPersistence = (key, ids) => {
    const saved = storage.get(key, {});
    ids.forEach(id => {
      const element = document.getElementById(id);
      if(!element) return;
      if(saved[id] !== undefined) element.value = saved[id];
      const save = () => {
        const data = storage.get(key, {});
        data[id] = element.value;
        storage.set(key, data);
      };
      element.addEventListener('input', save);
      element.addEventListener('change', save);
    });
  };

  const bindInfoDialog = (buttonId = 'infoButton', dialogId = 'infoDialog', closeId = 'closeInfo') => {
    const button = document.getElementById(buttonId);
    const dialog = document.getElementById(dialogId);
    const close = document.getElementById(closeId);
    if(!button || !dialog || !close) return;

    button.addEventListener('click', () => {
      if(typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open','');
    });
    close.addEventListener('click', () => {
      if(typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    });
    dialog.addEventListener('click', event => {
      if(event.target !== dialog) return;
      if(typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    });
  };

  const registerServiceWorker = path => {
    if('serviceWorker' in navigator){
      window.addEventListener('load', () => {
        navigator.serviceWorker.register(path).catch(console.warn);
      });
    }
  };

  return {
    parseNumber,
    formatNumber,
    storage,
    bindPersistence,
    bindInfoDialog,
    registerServiceWorker
  };
})();