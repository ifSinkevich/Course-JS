'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let start = function() {
  money = prompt ('Ваш ежемесячный доход?');
     while (!isNumber(money)) {
      money = prompt ('Ваш ежемесячный доход?');      
    }
};

start();

let income = 'фриланс';
let addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую. Например, так:', 'коммуналка, маршрутка, интернет');
let deposit = confirm ('Есть ли у Вас депозит в банке?');
let mission = 10000;


let showTypeOf = function(data) {
  console.log(data, typeof (data)); 
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];

let getExpensesMonth = function() {
  let sum = 0;

  for (let i = 0; i < 2; i++) {

    expenses[i] = prompt ('Введите обязательную статью расходов:');
    let amountExpens = prompt ('Во сколько это обойдётся?'); 

    while (!isNumber(amountExpens)) {
      amountExpens = prompt ('Во сколько это обойдётся?'); 
    }

    sum += Number(amountExpens);
  }   
  console.log(expenses);
  return sum;
};

let expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function() {
  return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
};

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
};

let targetMonth = getTargetMonth();
if (targetMonth < 0) {
  console.log('Цель не будет достигнута(((');
} else {
  console.log('Цель будет достигнута за: ', targetMonth, ' месяцев');
};

let budgetDay = Math.floor(accumulatedMonth / 30);

console.log('Расходы за месяц: ', expensesAmount);
console.log(addExpenses.split(','));
console.log('Бюджет на день: ', budgetDay);
console.log(getStatusIncome());
