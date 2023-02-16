import { Product, Student, Temp, User, averageWeeklyTemperature, concatenateStrings, createUser, getLength, getStudentStatus, presentStudents, showProduct } from "./g";
import getfromstorage, { CartProduct, Sort, cartList, createProductHtml, productList, sortProductsBy, Product as VgProduct } from "./vg";

console.log(getLength([1, 1, 1, 1]))

console.log(getStudentStatus({ name: 'Sebastian', handedInOnTime: true, passed: false }));

console.log(concatenateStrings());

const dailyTemperatures: Temp[] = [];

for (let i = 0; i < 7; i++) {
  dailyTemperatures.push(new Temp(`Stockholm`, new Date(), i * 2))
};

console.log(averageWeeklyTemperature(dailyTemperatures));
console.log(new Date(167646575118))
console.log(Date.now())

showProduct(new Product('Bil', 100_000, 4, 'Röd och fin', 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', document.body))

const product = new CartProduct('test',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Frau_mit_Einkaufswagen_%2837939692236%29.jpg/440px-Frau_mit_Einkaufswagen_%2837939692236%29.jpg',
  10,
  10)

localStorage.setItem('cartArray', JSON.stringify([product]))

console.log(localStorage.getItem('cartArray'))

cartList
productList

getfromstorage()

presentStudents([new Student('Alexander', true, true), new Student('Alexander', false, false), new Student('Alexander', true, true), new Student('Alexander', false, false)]);

console.log(createUser(new User('Alexander', new Date('10 May 1987 00:00:00 GMT'), 'alexander@alexander.com', '1234')))

const arrayToSort = [new VgProduct(3, 'Banan', [''], 23, 'Gul typ'),
new VgProduct(2, 'apa', [''], 143, 'Brun'),
new VgProduct(1, 'Citron', [''], 8, 'Gul'),
new VgProduct(4, 'Citroen', [''], 12003, 'Vit')
]


console.log(sortProductsBy(Sort.NAME_ALPHABETIC_REVERSE, arrayToSort))

const savedCartList = [{quantity: 3}, {quantity: 2}, {quantity: 6}];
localStorage.setItem('savedCartList', JSON.stringify(savedCartList));

const savedList = [{ picture: 'img', pictureAlt: 'picAlt', name: 'name', price: 10, info: '', productSpec: true, category: 'sassy' }];

localStorage.setItem('savedList', JSON.stringify(savedList))

createProductHtml();
