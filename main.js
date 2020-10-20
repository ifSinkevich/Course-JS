'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = function() {
  let money = prompt ('Ваш ежемесячный доход?');
     while (!isNumber(money)) {
      money = prompt ('Ваш ежемесячный доход?');      
    }
    return money;
};

let money = start();
let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  expenses: {} ,
  asking: function() {   

    for (let i = 0; i < 2; i++) {      
      let answerExpens = prompt ('Введите обязательную статью расходов:');        
      let amountExpens = prompt ('Во сколько это обойдётся?');      
      while (!isNumber(amountExpens)) {
        amountExpens = prompt ('Во сколько это обойдётся?'); 
      }
      appData.expenses[answerExpens] = amountExpens;             
    }      
  },    
};

appData.asking();

appData.getExpensesMonth = function() { 
    for (let answerExpens in appData.expenses) {
      appData.expensesMonth += +this.expenses[answerExpens];           
    }               
};  

appData.getExpensesMonth();

appData.getBudget = function() {
  appData.budgetMonth = +appData.budget - appData.expensesMonth;
  appData.budgetDay = Math.floor(appData.budgetMonth / 30);
}

appData.getBudget();

appData.getTargetMonth = function() {
  let targetMonth = Math.ceil(10000 / appData.budgetMonth);  
  if (targetMonth < 0) {
    console.log('Цель не будет достигнута(((');
  } else {
    console.log('Цель будет достигнута за: ', targetMonth, ' месяцев');
  }
};

appData.getStatusIncome = function() {
  if (appData.budgetDay >= 1200) {
    return ('У вас высокий уровень дохода!');
  } else if (appData.budgetDay >= 600) {
    return ('У вас средний уровень дохода.');
  } else if (appData.budgetDay > 0) {
    return ('У вас низкий уровень дохода(');
  } else if (+appData.budgetDay === 0) {
    return ('У вас нулевой доход, и больше нечего добавить :-)');
  } else {
    return ('Что-то пошло не так...');
  }
};

appData.getStatusIncome();

console.log('Расходы за месяц: ', appData.expensesMonth);
appData.getTargetMonth();
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for (let key in appData) {  
  console.log('Ключ: ' + key + ' Значение: ' + appData[key]);
}