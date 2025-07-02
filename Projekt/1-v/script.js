// ========== Zadanie 1: Walidacja formularza ==========
const form = document.getElementById('registerForm');
const password = document.getElementById('password');
const repeatPassword = document.getElementById('repeatPassword');

repeatPassword.addEventListener('input', () => {
  if (repeatPassword.value !== password.value) {
    repeatPassword.setCustomValidity("Hasła się różnią");
  } else {
    repeatPassword.setCustomValidity("");
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    alert('Formularz poprawny!');
  } else {
    alert('Popraw błędy!');
  }
});

// ========== Zadanie 2: Obiekt samochodu ==========
function testSamochod() {
  const samochod = {
    marka: "Toyota",
    model: "Corolla",
    rok: 2015,
    kolor: "srebrny",
    predkosc: 0,

    przyspiesz(wartosc) {
      this.predkosc += wartosc;
    },

    zwolnij(wartosc) {
      this.predkosc -= wartosc;
      if (this.predkosc < 0) this.predkosc = 0;
    },

    info() {
      return `${this.marka} ${this.model} (${this.rok}), Kolor: ${this.kolor}, Prędkość: ${this.predkosc}`;
    }
  };

  samochod.przyspiesz(50);
  samochod.zwolnij(20);

  document.getElementById('outputSamochody').textContent = samochod.info();
}

// ========== Zadanie 3: Lista samochodów ==========
function analizaSamochodow() {
  const auta = [
    { marka: "Toyota", model: "Yaris", rok: 2020, kolor: "biały", predkosc: 100 },
    { marka: "Ford", model: "Focus", rok: 2018, kolor: "niebieski", predkosc: 90 },
    { marka: "BMW", model: "X3", rok: 2020, kolor: "czarny", predkosc: 150 },
    { marka: "Opel", model: "Astra", rok: 2015, kolor: "czerwony", predkosc: 80 }
  ];

  const suma = auta.reduce((acc, auto) => acc + auto.predkosc, 0);
  const srednia = suma / auta.length;

  const wybranyRok = 2020;
  const autaZRoku = auta.filter(auto => auto.rok === wybranyRok)
                        .map(auto => `${auto.marka} ${auto.model}`)
                        .join('\n');

  document.getElementById('outputSamochody').textContent =
    `Średnia prędkość: ${srednia}\nSamochody z ${wybranyRok} roku:\n${autaZRoku}`;
}

// ========== Zadanie 4: Dodawanie do tabeli ==========
document.getElementById('dodaj').addEventListener('click', () => {
  const imie = document.getElementById('imie').value;
  const nazwisko = document.getElementById('nazwisko').value;

  if (imie && nazwisko) {
    const row = document.getElementById('tabelaBody').insertRow();
    row.insertCell(0).textContent = imie;
    row.insertCell(1).textContent = nazwisko;

    document.getElementById('imie').value = '';
    document.getElementById('nazwisko').value = '';
  } else {
    alert("Uzupełnij oba pola!");
  }
});
