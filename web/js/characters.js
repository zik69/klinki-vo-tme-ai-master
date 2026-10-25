// Данные для создания персонажей по правилам «Клинки во тьме»

const ORIGINS = [
  "Аристократ", "Академик", "Рабочий", "Уличный", "Торговец", "Военный"
];

const PASTS = [
  "Военный", "Шпион", "Уличный", "Академик", "Ремесленник", "Артист"
];

const SKILLS = [
  "Артист", "Головорез", "Ищейка", "Кукловод", "Мистик", "Проныра", "Умелец"
];

const TALENTS = [
  "Быстрый", "Крепкий", "Хитрый", "Сильный", "Удачливый"
];

const PASSIONS = [
  "Азарт", "Роскошь", "Мистика", "Слава", "Знания"
];

// Прегенерированные персонажи (шаблоны)
const PREGENS = [
  {
    name: "Тень",
    origin: "Уличный",
    past: "Уличный",
    skills: ["Проныра", "Головорез", "Ищейка"],
    talent: "Хитрый",
    passion: "Слава"
  },
  {
    name: "Механик",
    origin: "Рабочий",
    past: "Ремесленник",
    skills: ["Умелец", "Ищейка", "Артист"],
    talent: "Быстрый",
    passion: "Знания"
  },
  {
    name: "Мистик",
    origin: "Академик",
    past: "Академик",
    skills: ["Мистик", "Кукловод", "Артист"],
    talent: "Удачливый",
    passion: "Мистика"
  },
  {
    name: "Боец",
    origin: "Военный",
    past: "Военный",
    skills: ["Головорез", "Проныра", "Ищейка"],
    talent: "Крепкий",
    passion: "Азарт"
  }
];

// Банда (максимум 4)
let gang = [];

function addCharacter(char) {
  if (gang.length >= 4) return false;
  gang.push(char);
  return true;
}

function removeCharacter(index) {
  gang.splice(index, 1);
}

function getGang() {
  return gang;
}
