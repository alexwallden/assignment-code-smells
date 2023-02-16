// TODO: Ta bort exportsen

/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

export function getLength(jumpings: number[]): number {
  // let totalNumber = 0;

  return jumpings.reduce(
    (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
  );

  // return totalNumber;
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

export class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) { }
}

export function getStudentStatus(student: Student): string {
  student.passed = student.name === "Sebastian" && student.handedInOnTime
  return student.passed ? 'VG' : 'IG';
}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

export class Temp {
  constructor(public area: string, public date: Date, public averageDailyTemperature: number) { }
}

export function averageWeeklyTemperature(dailyTemperatures: Temp[]) {
  let temperatureSum = 0;
  const ONE_WEEK_IN_MILLISECONDS = 604800000;
  const ONE_WEEK_IN_DAYS = 7;

  for (let i = 0; i < dailyTemperatures.length; i++) {
    if (dailyTemperatures[i].area === "Stockholm" && dailyTemperatures[i].date.getTime() > Date.now() - ONE_WEEK_IN_MILLISECONDS) {
      temperatureSum += dailyTemperatures[i].averageDailyTemperature;
    }
  }

  return temperatureSum / ONE_WEEK_IN_DAYS;
}
// class Temp {
//   constructor(public q: string, public where: Date, public v: number) { }
// }

// function averageWeeklyTemperature(heights: Temp[]) {
//   let r = 0;

//   for (let who = 0; who < heights.length; who++) {
//     if (heights[who].q === "Stockholm") {
//       if (heights[who].where.getTime() > Date.now() - 604800000) {
//         r += heights[who].v;
//       }
//     }
//   }

//   return r / 7;
// }

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

export class Product {
  constructor(
    public name: string,
    public price: number,
    public amount: number,
    public description: string,
    public image: string,
    public parent: HTMLElement) { }
}

function createTitleElement(product: Product, parentElement: HTMLDivElement) {
  const title = document.createElement("h4");
  title.innerHTML = product.name;
  parentElement.appendChild(title);
}

function createPriceElement(product: Product, parentElement: HTMLDivElement) {
  const price = document.createElement("strong");
  price.innerHTML = product.price.toString();
  parentElement.appendChild(price);
}
function createImageElement(product: Product, parentElement: HTMLDivElement) {
  const imageTag = document.createElement("img");
  imageTag.src = product.image;
  parentElement.appendChild(imageTag);
}

function createElement(value: string, typeOfHtmlElement: string, attributeToSet?: string) {
  const newElement = document.createElement(typeOfHtmlElement);
  attributeToSet ? newElement.setAttribute(attributeToSet, value) : newElement.innerHTML = value;
  return newElement
}


export function showProduct(product: Product) {
  const container = document.createElement("div");
  // const title = createElement(product.name, 'h4');
  // const price = createElement(product.price.toString(), 'strong');
  // const image = createElement(product.image, 'img', 'src');
  container.appendChild(createElement(product.name, 'h4'))
  container.appendChild(createElement(product.price.toString(), 'strong'))
  container.appendChild(createElement(product.image, 'img', 'src'))
  // container.appendChild(title)
  // container.appendChild(price)
  // container.appendChild(image)
  product.parent.appendChild(container);
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */
// export function presentStudents(students: Student[]) {
//   for (const student of students) {
//     let container = document.createElement("div");
//     let checkbox = document.createElement("input");
//     if (student.handedInOnTime) {
//       checkbox.type = "checkbox";
//       checkbox.checked = true;

//       container.appendChild(checkbox);
//       let listOfStudents = document.querySelector("ul#passedstudents");
//       listOfStudents?.appendChild(container);
//     } else {
//       // let container = document.createElement("div");
//       // let checkbox = document.createElement("input");
//       checkbox.type = "checkbox";
//       checkbox.checked = false;

//       container.appendChild(checkbox);
//       let listOfStudents = document.querySelector("ul#failedstudents");
//       listOfStudents?.appendChild(container);
//     }
//     document.body.appendChild(container)
//   }
// }

export function presentStudents(students: Student[]) {
  for (const student of students) {
    const container = document.createElement("div");
    const checkbox = document.createElement("input");
    // let listOfStudents: HTMLUListElement;
    checkbox.type = "checkbox";
    checkbox.checked = student.handedInOnTime ? true : false;
    const listOfStudents = document.querySelector(student.handedInOnTime ? "ul#passedstudents" : "ul#failedstudents") as HTMLUListElement;

    // if (student.handedInOnTime) {
    //   checkbox.checked = true;
    //   listOfStudents = document.querySelector("ul#passedstudents") as HTMLUListElement;
    // } else {
    //   listOfStudents = document.querySelector("ul#failedstudents") as HTMLUListElement;
    // }
    container.appendChild(checkbox);
    listOfStudents?.appendChild(container);
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */
export function concatenateStrings() {
  const words: string[] = ["Lorem", "ipsum", "dolor", "sit", "amet"];
  return words.join('');
}
// function concatenateStrings() {
//   let result = "";
//   result += "Lorem";
//   result += "ipsum";
//   result += "dolor";
//   result += "sit";
//   result += "amet";

//   return result;
// }

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/

export class User {
  constructor(public name: string, public birthday: Date, public email: string, public password: string) {

  }
}

export function createUser(user: User) {
  // Validation

  let ageDiff = Date.now() - user.birthday.getTime();
  let ageDate = new Date(ageDiff);
  let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  if (userAge >= 20) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}
