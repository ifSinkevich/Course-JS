'use strict';

let money = prompt ('Ваш ежемесячный доход?');
let income = 'фриланс';
let addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую. Например, так:', 'коммуналка, маршрутка, интернет');
let deposit = confirm ('Есть ли у Вас депозит в банке?');
let expenses1 = prompt ('Введите обязательную статью расходов №1?');
let amount1 = prompt ('Во сколько это обойдётся?');
let expenses2 = prompt ('Введите обязательную статью расходов №2?');
let amount2 = prompt ('Во сколько это обойдётся?');
let mission = 10000;

let budgetMonth = Number(money) - Number(amount1) - Number(amount2);
let period = Math.ceil(mission / budgetMonth);
let budgetDay = Math.floor(budgetMonth / 30);
addExpenses.toLowerCase();

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
addExpenses.toLowerCase();
console.log('Цель - заработать', mission, '$');
console.log(addExpenses.split(','));
console.log('Бюджет на месяц: ', budgetMonth);
console.log('Цель будет достигнута за ', period, ' месяцев');
console.log('Бюджет на день: ', budgetDay);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода!');
} else if (budgetDay >= 600) {
  console.log('У вас средний уровень дохода.');
} else if (budgetDay >= 0) {
  console.log('У вас низкий уровень дохода(');
} else {
  console.log('Что-то пошло не так...');
}


