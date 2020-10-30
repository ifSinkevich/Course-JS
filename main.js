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
periodAmount = document.querySelector('.period-amount'),
btnCancel = document.getElementById('cancel'),
allDataItems = document.getElementsByClassName('data');
// allDataInputs = document.querySelectorAll('.data input[type=text]');


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
    this.budget = salaryAmount.value;
    this.getExpenses();    
    this.getIncome();    
    this.getExpensesMonth();    
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget(); 

    this.showResult();
  },

  showResult: function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(' ,');
    additionalIncomeValue.value = this.addIncome.join(' ,');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', function(event) {
      incomePeriodValue.value = this.calcPeriod();
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
      // console.log('this: getExpenses:', this);     
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
        console.log('this: getIncome:', this); 
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;      
      if (itemIncome !=='' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });    

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },

  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      console.log('this: getAddExpenses: ', this); 
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    })
  },

  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item){
      console.log('this: getAddIncome', this); 
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth: function() { 
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];           
      console.log('appData.expensesMonth: ', this.expensesMonth);
    }
  },

  getBudget: function() {
    this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  
  getTargetMonth: function() {
    let targetMonth = targetAmount.value / this.budgetMonth;  
    if (targetMonth < 0) {
      console.log('Цель не будет достигнута(((');
    } else {
      console.log('Цель будет достигнута за: ', targetMonth, ' месяцев');
    }
    return targetMonth;
  },

  getStatusIncome: function() {
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода!');
    } else if (this.budgetDay >= 600) {
      return ('У вас средний уровень дохода.');
    } else if (this.budgetDay > 0) {
      return ('У вас низкий уровень дохода(');
    } else if (+this.budgetDay === 0) {
      return ('У вас нулевой доход, и больше нечего добавить :-)');
    } else {
      return ('Что-то пошло не так...');
    }
  },

  getInfoDeposit: function() { 
    this.deposit = confirm ('Есть ли у Вас депозит в банке?'); 
    if (this.deposit) {
      this.persentDeposit = prompt('Какой годовой процент депозита?', 10);
      while (!isNumber(this.persentDeposit)){
        this.persentDeposit = prompt('Какой годовой процент депозита?', 10);        
      };
      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      while (!isNumber(this.moneyDeposit)) {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      };
    };
  },

  calcPeriod: function() {
    return this.budgetMonth * periodSelect.value;    
  },
  
  reset: function() {
    let inputTextData = document.querySelectorAll('.data input[type=text');
    let resultInputAll = document.querySelectorAll('.result  input[type=text');
    
    inputTextData.forEach(function (item) {
      item.value = '';
      item.removeAttribute('disabled');
      periodSelect.value = 0;
      periodAmount.innerHTML = periodSelect.value;
     });

    resultInputAll.forEach(function (item) {
      item.value = '';  
    });

    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      incomePlus.style.display = 'block';
    };

    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      expensesPlus.style.display = 'block';
    };

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expensesMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.persentDeposit = 0;
    this.moneyDeposit = 0;
    

    start.style.display ='block';
    btnCancel.style.display = 'none';
    incomePlus.removeAttribute('disabled');
    expensesPlus.removeAttribute('disabled');
    periodSelect.removeAttribute('disabled');    
  },
};

start.addEventListener('click', function(event) { 
  if (salaryAmount.value === '') {
    event.preventDefault();
  } else {
    appData.start();
    start.style.display ='none';
    btnCancel.style.display = 'block';

    let blockAllDataInputs = function() {
      salaryAmount.setAttribute('disabled', '');
      let allDataInputs = document.querySelectorAll('.data input[type=text]');
      allDataInputs.forEach(function(item) {
        item.setAttribute('disabled', '');
      }); 
      periodSelect.setAttribute('disabled', ''); 
    }; 
    blockAllDataInputs();
  };
});

periodSelect.addEventListener('input', function(event) {
  periodAmount.textContent = periodSelect.value;
});

incomePlus.addEventListener('click', appData. addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);

btnCancel.addEventListener('click', appData.reset.bind(appData));

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