'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
},

start = document.getElementById('start'),
btnPlus = document.getElementsByTagName('button'),
incomePlus = btnPlus[0],
expensesPlus = btnPlus[1],
depositCheck = document.querySelector('#deposit-check'),
additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
targetMonthValue = document.getElementsByClassName('target_month-value')[0],
salaryAmount = document.querySelector('.salary-amount'),
expensesTitle = document.querySelector('.expenses-items > .expenses-title'),
expensesItems = document.querySelectorAll('.expenses-items'),
additionalExpensesItem = document.querySelector('.additional_expenses-item'),
targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select'),
incomeItems = document.querySelectorAll('.income-items'),
periodAmount = document.querySelector('.period-amount');

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expensesMonth: 0,
  expenses: {},
  addExpenses: [],
  deposit: false,
  persentDeposit: 0,
  moneyDeposit: 0,

  start: function() {         
    appData.budget = salaryAmount.value;
    appData.getExpenses();    
    appData.getIncome();    
    appData.getExpensesMonth();    
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();    

    periodSelect.addEventListener('input', function(event) {
      periodAmount.textContent = periodSelect.value;
    });

    appData.showResult();
  },

  showResult: function() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(' ,');
    additionalIncomeValue.value = appData.addIncome.join(' ,');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();
    periodSelect.addEventListener('change', function(event) {
      incomePeriodValue.value = appData.calcPeriod();
    });
  },

  addExpensesBlock: function() {    
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },

  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },

  getExpenses: function() {
    expensesItems.forEach(function(item) {      
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
        console.log('appData.expenses: ', appData.expenses[itemExpenses] = cashExpenses);
        
      }
    });
  },

  getIncome: function() {   
      incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;      
      if (itemIncome !=='' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });    

    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },

  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    })
  },

  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },

  // asking: function() { 
  //   if (confirm('Есть ли у Вас дополнительный источник заработка?')) {
  //     let itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Таксую');
  //     while (isNumber(itemIncome) || itemIncome === null || itemIncome.trim() === "") {
  //       itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Таксую');
  //     }
  //     let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете', '10000');
  //     while (!isNumber(cashIncome)) {
  //       cashIncome = prompt('Сколько в месяц вы на этом зарабатываете', '10000');
  //     }
  //     appData.income[itemIncome] = cashIncome;
  //   }
    
  //   // let addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую:');
  //   // appData.addExpenses = addExpenses.toLowerCase().split(',');
  //   appData.deposit = confirm ('Есть ли у Вас депозит в банке?');        
  // },

  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += +this.expenses[key];           
      console.log('appData.expensesMonth: ', appData.expensesMonth);
    }
  },

  getBudget: function() {
    appData.budgetMonth = +appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  
  getTargetMonth: function() {
    let targetMonth = targetAmount.value / appData.budgetMonth;  
    if (targetMonth < 0) {
      console.log('Цель не будет достигнута(((');
    } else {
      console.log('Цель будет достигнута за: ', targetMonth, ' месяцев');
    }
    return targetMonth;
  },

  getStatusIncome: function() {
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
  },

  getInfoDeposit: function() {
    appData.deposit = confirm ('Есть ли у Вас депозит в банке?'); 
    if (appData.deposit) {
      appData.persentDeposit = prompt('Какой годовой процент депозита?', 10);
      while (!isNumber(appData.persentDeposit)){
        appData.persentDeposit = prompt('Какой годовой процент депозита?', 10);        
      };
      appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      while (!isNumber(appData.moneyDeposit)) {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      };
    };
  },

  calcPeriod: function() {
    return appData.budgetMonth * periodSelect.value;    
  },
};

start.addEventListener('click', function(event) {
  if (salaryAmount.value === '') {
    event.preventDefault();
  } else appData.start();
});

incomePlus.addEventListener('click', appData. addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);

appData.getTargetMonth();
appData.calcPeriod();
appData.getInfoDeposit();



// console.log('Наша программа включает в себя данные:');
// for (let key in appData) {  
//   console.log('Ключ: ' + key + ' Значение: ' + appData[key]);
// };

// let newEddExpenses = appData.addExpenses;
//   for (let i = 0; i < appData.addExpenses.length; i++) {
//     newEddExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1);      
//   }
//   console.log('Возможные расходы: ', newEddExpenses);