let money = 300;
let income = 'фриланс';
let addExpenses = 'коммуналка, маршрутка, интернет, парикмахерская, сладости';
let deposit = true;
let mission = 10000;
let period = 12;
let budgetDay = money / 30;


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ', period, ' месяцев');
console.log('Цель - заработать', mission, '$');
addExpenses.toLowerCase();
console.log(addExpenses.split(','));
console.log('budgetDay: ', budgetDay);
