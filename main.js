'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let buttonStart = document.getElementById('start');
let buttonPlusItemIncomeAdd = document.getElementsByTagName('button')[0];
let buttonPlusExpensesAdd = document.getElementsByTagName('button')[1];
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let budgetMonthValue = document.getElementsByClassName('budget_month-value');
let budgetDayValue = document.getElementsByClassName('budget_day-value');
let expensesMonthValue = document.getElementsByClassName('expenses_month-value');
let additionalIncomeValue = document.getElementsByClassName('additional_income-value');
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value');
let incomePeriodValue = document.getElementsByClassName('income_period-value');
let targetMonthValue = document.getElementsByClassName('target_month-value');
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-items > .income-title');
let incomeAmount = document.querySelector('.income-items > .income-amount');
let expensesTitle = document.querySelector('.expenses-items > .expenses-title');
let expensesAmount = document.querySelector('.expenses-items > .expenses-amount');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');

let start = function() {
  let money = prompt ('Ваш ежемесячный доход?');
     while (!isNumber(money)) {
      money = prompt ('Ваш ежемесячный доход?');      
    }
    return money;
};

// let money = start();
// let appData = {
//   budget: money,
//   budgetDay: 0,
//   budgetMonth: 0,
//   income: {},
//   addIncome: [],
//   expensesMonth: 0,
//   expenses: {},
//   addExpenses: [],
//   deposit: false,
//   persentDeposit: 0,
//   moneyDeposit: 0,
//   mission: 10000,
//   period: 3,
//   asking: function() { 
//     if (confirm('Есть ли у Вас дополнительный источник заработка?')) {
//       let itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Таксую');
//       while (isNumber(itemIncome) || itemIncome === null || itemIncome.trim() === "") {
//         itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Таксую');
//       }
//       let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете', '10000');
//       while (!isNumber(cashIncome)) {
//         cashIncome = prompt('Сколько в месяц вы на этом зарабатываете', '10000');
//       }
//       appData.income[itemIncome] = cashIncome;
//     }
    
//     let addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую:');
//     appData.addExpenses = addExpenses.toLowerCase().split(',');
//     appData.deposit = confirm ('Есть ли у Вас депозит в банке?');

//     for (let i = 0; i < 2; i++) {      
//       let answerExpens = prompt ('Введите обязательную статью расходов:');
//       while (isNumber(answerExpens) || answerExpens === null || answerExpens.trim() === "") {
//         answerExpens = prompt ('Введите обязательную статью расходов:');        
//       };        
//       let amountExpens = prompt ('Во сколько это обойдётся?');      
//       while (!isNumber(amountExpens)) {
//         amountExpens = prompt ('Во сколько это обойдётся?'); 
//       }
//       appData.expenses[answerExpens] = amountExpens;             
//     }      
//   },
//   getExpensesMonth: function() {
//     for (let key in appData.expenses) {
//       appData.expensesMonth += +this.expenses[key];           
//     }
//   },

//   getBudget: function() {
//     appData.budgetMonth = +appData.budget - appData.expensesMonth;
//     appData.budgetDay = Math.floor(appData.budgetMonth / 30);
//   },
  
//   getTargetMonth: function() {
//     let targetMonth = Math.ceil(appData.mission / appData.budgetMonth);  
//     if (targetMonth < 0) {
//       console.log('Цель не будет достигнута(((');
//     } else {
//       console.log('Цель будет достигнута за: ', targetMonth, ' месяцев');
//     }
//   },

//   getStatusIncome: function() {
//     if (appData.budgetDay >= 1200) {
//       return ('У вас высокий уровень дохода!');
//     } else if (appData.budgetDay >= 600) {
//       return ('У вас средний уровень дохода.');
//     } else if (appData.budgetDay > 0) {
//       return ('У вас низкий уровень дохода(');
//     } else if (+appData.budgetDay === 0) {
//       return ('У вас нулевой доход, и больше нечего добавить :-)');
//     } else {
//       return ('Что-то пошло не так...');
//     }
//   },

//   getInfoDeposit: function() {
//     if (appData.deposit) {
//       appData.persentDeposit = prompt('Какой годовой процент депозита?', 10);
//       while (!isNumber(appData.persentDeposit)){
//         appData.persentDeposit = prompt('Какой годовой процент депозита?', 10);        
//       };
//       appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
//       while (!isNumber(appData.moneyDeposit)) {
//         appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
//       };
//     };
//   },

//   calcsaveMoney: function() {
//     return appData.budgetMonth * appData.period;
//   }

// };

// appData.asking(); 

// appData.getExpensesMonth();

// appData.getBudget();

// appData.getStatusIncome();

// appData.getInfoDeposit();

// console.log('Расходы за месяц: ', appData.expensesMonth);
// appData.getTargetMonth();
// console.log(appData.getStatusIncome());

// console.log('Наша программа включает в себя данные:');
// for (let key in appData) {  
//   console.log('Ключ: ' + key + ' Значение: ' + appData[key]);
// };

// let newEddExpenses = appData.addExpenses;
//   for (let i = 0; i < appData.addExpenses.length; i++) {
//     newEddExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1);      
//   }
//   console.log('Возможные расходы: ', newEddExpenses);