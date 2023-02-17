/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function getLength(jumpings: number[]): number {

  return jumpings.reduce(
    (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
  );
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) { }
}

function getStudentStatus(student: Student): string {
  student.passed = student.name === "Sebastian" && student.handedInOnTime
  return student.passed ? 'VG' : 'IG';
}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

class Temp {
  constructor(public area: string, public date: Date, public averageDailyTemperature: number) { }
}

function averageWeeklyTemperature(dailyTemperatures: Temp[]) {
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

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

class Product {
  constructor(
    public name: string,
    public price: number,
    public amount: number,
    public description: string,
    public image: string,
    public parent: HTMLElement) { }
}

function createElement(value: string, typeOfHtmlElement: string, attributeToSet?: string) {
  const newElement = document.createElement(typeOfHtmlElement);
  attributeToSet ? newElement.setAttribute(attributeToSet, value) : newElement.innerHTML = value;
  return newElement
}


function showProduct(product: Product) {
  const container = document.createElement("div");
  const title = createElement(product.name, 'h4');
  const price = createElement(product.price.toString(), 'strong');
  const image = createElement(product.image, 'img', 'src');
  container.appendChild(title)
  container.appendChild(price)
  container.appendChild(image)
  product.parent.appendChild(container);
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */

function presentStudents(students: Student[]) {
  for (const student of students) {
    const container = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.checked = student.handedInOnTime ? true : false;
    const listOfStudents = document.querySelector(student.handedInOnTime ? "ul#passedstudents" : "ul#failedstudents") as HTMLUListElement;
    
    container.appendChild(checkbox);
    listOfStudents?.appendChild(container);
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */
function concatenateStrings() {
  const words: string[] = ["Lorem", "ipsum", "dolor", "sit", "amet"];
  return words.join('');
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/

class User {
  constructor(public name: string, public birthday: Date, public email: string, public password: string) { }
}

function createUser(user: User) {
  // Validation

  const ageDiff = Date.now() - user.birthday.getTime();
  const ageDate = new Date(ageDiff);
  const userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  if (userAge >= 20) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}
