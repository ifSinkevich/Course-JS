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
allDataItems = document.getElementsByClassName('data'),
depositBank = document.querySelector('.deposit-bank'),
depositAmount = document.querySelector('.deposit-amount'),
depositPercent = document.querySelector('.deposit-percent');

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
    this.getInfoDeposit();
    this.getBudget();
    this.getTargetMonth();

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
    const monthDeposit = this.moneyDeposit * (this.persentDeposit / 100);
    this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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

    if(this.deposit) {
      this.persentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
       
  }
  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  reset() {
    const resetAppData = new AppData();
    Object.assign(appData, resetAppData);

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
    };

    start.style.display = 'block';    
    btnCancel.style.display = 'none';
    depositBank.value = '';
    depositAmount.value = '';
    depositPercent.value = '';
    depositPercent.style.display = 'none';
    incomePlus.removeAttribute('disabled', 'true');
    expensesPlus.removeAttribute('disabled', 'true');    
    resetAppData.removeEventListeners();
  }

  changePersent() {
    let valueSelect = this.value;
    if(valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';     
      depositPercent.addEventListener('change', (event) => {        
        console.log('change: '); 
        valueSelect = depositPercent.value;        
        console.log('valueSelect: ', valueSelect);
               
        if (!isNumber(depositPercent.value) || depositPercent.value <= 0 || depositPercent.value > 100) {
          depositPercent.style.backgroundColor = 'red';
          depositPercent.value  = 0;          
          alert('Введите корректное значение в поле проценты');         
          start.setAttribute('disabled', 'true'); 
                        
        } else {
          depositPercent.style.backgroundColor = 'white';
          valueSelect = depositPercent.value;
        }
        
      });
     
    } else {
      depositPercent.value = valueSelect;
    }
    console.log('valueSelect: ', valueSelect);
    
  }

  depositHandler() {
    if(depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePersent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      depositPercent.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePersent);
    }
  }

  eventListeners() {
    periodSelect.addEventListener('change', (event) => {
      periodAmount.textContent = periodSelect.value;
    });

    let countIncomBtnPlus = 0;
    let countExpensesBtnPlus = 0;

    btnCancel.addEventListener('click', this.reset.bind(this));
    start.addEventListener('click', this.start.bind(this));
    incomePlus.addEventListener('click', this.addIncomeBlock);
    if(incomePlus) {countIncomBtnPlus++};
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    if(expensesPlus) {countExpensesBtnPlus++};
    salaryAmount.addEventListener('keyup', this.check);

    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }

  removeEventListeners() {
    periodSelect.removeEventListener('change', (event) => {
      periodAmount.textContent = periodSelect.value;
    });

    btnCancel.removeEventListener('click', this.reset.bind(this));
    start.removeEventListener('click', this.start.bind(this));
    if(this.countIncomBtnPlus > 1) {
      incomePlus.removeEventListener('click', this.addIncomeBlock);
    }
    if(this.countExpensesBtnPlus > 1) {
      expensesPlus.removeEventListener('click', this.addExpensesBlock);
    }    
    salaryAmount.removeEventListener('keyup', this.check);
    depositCheck.removeEventListener('change', this.depositHandler.bind(this));
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
