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

class AppData {
  constructor() {
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

  }
  check() {
    if (salaryAmount.value !== '') {
      start.removeAttribute('disabled');
    }
  }
  start() {

    if (salaryAmount.value === '') {
      start.setAttribute('disabled', 'true');
      return;
    };

    const allDataInputs = document.querySelectorAll('.data input[type=text]');
    allDataInputs.forEach((item) => {
      item.setAttribute('disabled', 'true');
    });

    btnPlus[0].setAttribute('disabled', 'true');
    btnPlus[1].setAttribute('disabled', 'true');
    start.style.display = 'none';
    btnCancel.style.display = 'block';

    this.budget = salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
  }
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(' ,');
    additionalIncomeValue.value = this.addIncome.join(' ,');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    const _this = this;
    periodSelect.addEventListener('change', function (event) {
      incomePeriodValue.value = this.calcPeriod();
    });
  }
  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  }
  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  }
  getExpenses() {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }
  getIncome() {
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }
  getBudget() {
    this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  getTargetMonth() {
    const targetMonth = targetAmount.value / this.budgetMonth;
    if (targetMonth < 0) {
      console.log('Цель не будет достигнута(((');
    } else {
      console.log('Цель будет достигнута за: ', targetMonth, ' месяцев');
    }
    return targetMonth;
  }
  getStatusIncome() {
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
  }
  getInfoDeposit() {
    this.deposit = confirm('Есть ли у Вас депозит в банке?');
    if (this.deposit) {
      this.persentDeposit = prompt('Какой годовой процент депозита?', 10);
      while (!isNumber(this.persentDeposit)) {
        this.persentDeposit = prompt('Какой годовой процент депозита?', 10);
      };
      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      while (!isNumber(this.moneyDeposit)) {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      };
    };
  }
  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }
  reset() {
    const inputTextData = document.querySelectorAll('.data input[type=text');
    const resultInputAll = document.querySelectorAll('.result  input[type=text');

    inputTextData.forEach((item) => {
      item.value = '';
      item.removeAttribute('disabled');
      periodSelect.value = 0;
      periodAmount.innerHTML = periodSelect.value;
    });

    resultInputAll.forEach((item) => {
      item.value = '';
    });


    for (let i = expensesItems.length - 1; i > 0; i--) {
      expensesItems[i].remove();
      expensesPlus.style.display = 'block';
    }

    for (let i = incomeItems.length - 1; i > 0; i--) {
      incomeItems[i].remove();
      incomePlus.style.display = 'block';
    }

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

    start.style.display = 'block';
    btnCancel.style.display = 'none';
    incomePlus.removeAttribute('disabled', 'true');
    expensesPlus.removeAttribute('disabled', 'true');
  }
  eventListeners() {
    periodSelect.addEventListener('change', (event) => {
      periodAmount.textContent = periodSelect.value;
    });

    btnCancel.addEventListener('click', this.reset.bind(this));
    start.addEventListener('click', this.start.bind(this));
    incomePlus.addEventListener('click', this.addIncomeBlock);
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    salaryAmount.addEventListener('keyup', this.check);
  }
}

const appData = new AppData();

appData.eventListeners();
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
