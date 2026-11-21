(() => {
  const article = document.querySelector('article.guide');
  const header = document.querySelector('header.top');
  if (article && header) {
    const home = document.createElement('a');
    home.className = 'guide-home';
    home.href = 'index.html';
    home.textContent = 'Все гайды';
    header.append(home);
    const headings = [...article.querySelectorAll('h2')];
    if (headings.length >= 3) {
      const details = document.createElement('details');
      details.className = 'guide-toc';
      const summary = document.createElement('summary');
      summary.textContent = 'Содержание';
      const list = document.createElement('ol');
      headings.forEach((heading, index) => {
        if (!heading.id) {
          let id = 'guide-section-' + (index + 1);
          while (document.getElementById(id)) id += '-x';
          heading.id = id;
        }
        const item = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = '#' + heading.id;
        anchor.textContent = heading.textContent.trim();
        item.append(anchor);
        list.append(item);
      });
      details.append(summary, list);
      article.before(details);
    }
  }
  const input = document.getElementById('guide-search');
  if (!input) return;
  const cards = [...document.querySelectorAll('.grid .card')];
  const output = document.getElementById('guide-results');
  const normalize = text => text.toLocaleLowerCase('ru').replaceAll('ё', 'е');
  function update() {
    const words = normalize(input.value).trim().split(/\s+/).filter(Boolean);
    let count = 0;
    cards.forEach(card => {
      const text = normalize(card.textContent);
      card.hidden = !words.every(word => text.includes(word));
      if (!card.hidden) count++;
    });
    output.textContent = count ? 'Найдено: ' + count : 'Ничего не найдено. Попробуй другой запрос.';
  }
  input.closest('.library-search').hidden = false;
  input.addEventListener('input', update);
  update();
})();
