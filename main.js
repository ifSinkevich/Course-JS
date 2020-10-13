'use strict';

let money = +prompt ('Ваш ежемесячный доход?');
let income = 'фриланс';
let addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую. Например, так:', 'коммуналка, маршрутка, интернет');
let deposit = confirm ('Есть ли у Вас депозит в банке?');
let expenses1 = prompt ('Введите обязательную статью расходов №1?');
let amount1 = prompt ('Во сколько это обойдётся?');
let expenses2 = prompt ('Введите обязательную статью расходов №2?');
let amount2 = prompt ('Во сколько это обойдётся?');
let mission = 10000;

let showTypeOf = function(data) {
  console.log(data, typeof (data)); 
}

function getExpensesMonth() {
  return amount1 + amount2;
}

let getAccumulatedMonth = function() {
  return Number(money) - Number(amount1) - Number(amount2);
}

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}

let getStatusIncome = function() {
  if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода!');
  } else if (budgetDay >= 600) {
    return ('У вас средний уровень дохода.');
  } else if (budgetDay > 0) {
    return ('У вас низкий уровень дохода(');
  } else if (+budgetDay === 0) {
    return ('У вас нулевой доход, и больше нечего добавить :-)');
  } else {
    return ('Что-то пошло не так...');
  }
}

let targetMonth = getTargetMonth();
let budgetDay = Math.floor(accumulatedMonth / 30);

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Расходы за месяц: ', accumulatedMonth);
console.log(addExpenses.split(','));
console.log('Cрок достижения цели в месяцах: ', targetMonth);
console.log('Бюджет на день: ', budgetDay);
console.log(getStatusIncome());
