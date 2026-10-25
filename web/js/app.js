document.addEventListener('DOMContentLoaded', () => {
  const btnStart = document.getElementById('btn-start');
  const startScreen = document.getElementById('start-screen');
  const gangScreen = document.getElementById('gang-screen');
  const gameScreen = document.getElementById('game-screen');

  const gangCount = document.getElementById('gang-count');
  const gangList = document.getElementById('gang-list');
  const gameGang = document.getElementById('game-gang');

  // Элементы формы
  const nameInput = document.getElementById('char-name');
  const originSelect = document.getElementById('char-origin');
  const pastSelect = document.getElementById('char-past');
  const skillsContainer = document.getElementById('skills-container');
  const talentSelect = document.getElementById('char-talent');
  const passionSelect = document.getElementById('char-passion');
  const btnAdd = document.getElementById('btn-add-char');
  const btnPregen = document.getElementById('btn-pregen-all');
  const btnToGame = document.getElementById('btn-to-game');

  // Заполняем селекты
  function fillSelect(select, items) {
    select.innerHTML = '';
    items.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item;
      opt.textContent = item;
      select.appendChild(opt);
    });
  }

  fillSelect(originSelect, ORIGINS);
  fillSelect(pastSelect, PASTS);
  fillSelect(talentSelect, TALENTS);
  fillSelect(passionSelect, PASSIONS);

  // Навыки: чекбоксы (выбрать 3)
  SKILLS.forEach(skill => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" value="${skill}" class="skill-cb" /> ${skill}`;
    skillsContainer.appendChild(label);
  });

  function updateGangUI() {
    gangCount.textContent = gang.length;
    gangList.innerHTML = '';
    gang.forEach((c, i) => {
      const div = document.createElement('div');
      div.className = 'gang-member';
      div.innerHTML = `<strong>${c.name}</strong> — ${c.skills.join(', ')} <button data-index="${i}" class="btn-remove">✕</button>`;
      gangList.appendChild(div);
    });
    // remove handlers
    document.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.index);
        removeCharacter(idx);
        updateGangUI();
        updateToGameBtn();
      });
    });
    updateToGameBtn();
  }

  function updateToGameBtn() {
    btnToGame.disabled = gang.length !== 4;
  }

  btnStart.addEventListener('click', () => {
    startScreen.classList.remove('active');
    gangScreen.classList.add('active');
    updateGangUI();
  });

  btnAdd.addEventListener('click', () => {
    const name = nameInput.value.trim() || 'Безымянный';
    const origin = originSelect.value;
    const past = pastSelect.value;
    const skills = Array.from(document.querySelectorAll('.skill-cb:checked')).map(cb => cb.value);
    if (skills.length !== 3) {
      alert('Выберите ровно 3 навыка');
      return;
    }
    const talent = talentSelect.value;
    const passion = passionSelect.value;
    const char = { name, origin, past, skills, talent, passion };
    if (addCharacter(char)) {
      updateGangUI();
      // сброс формы
      nameInput.value = '';
      document.querySelectorAll('.skill-cb').forEach(cb => cb.checked = false);
    } else {
      alert('Банда уже полна (4 персонажа)');
    }
  });

  btnPregen.addEventListener('click', () => {
    // очистить и загрузить шаблонную банду
    gang = [];
    PREGENS.forEach(p => addCharacter({ ...p }));
    updateGangUI();
  });

  btnToGame.addEventListener('click', () => {
    gangScreen.classList.remove('active');
    gameScreen.classList.add('active');
    gameGang.innerHTML = '';
    gang.forEach(c => {
      const div = document.createElement('div');
      div.className = 'gang-member';
      div.innerHTML = `<strong>${c.name}</strong> — ${c.skills.join(', ')}`;
      gameGang.appendChild(div);
    });
  });
});
