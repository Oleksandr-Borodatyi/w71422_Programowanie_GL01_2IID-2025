const form = document.getElementById("catchForm");
const catchList = document.getElementById("catchList");
const totalWeightEl = document.getElementById("totalWeight");
const avgWeightEl = document.getElementById("avgWeight");
const mostCommonEl = document.getElementById("mostCommon");

let catches = [];

function validateForm(data) {
  const speciesValid = /^[A-ZŁŚŻŹĆŃ][a-ząćęłńóśźż]{2,}$/.test(data.species);
  const dateValid = new Date(data.date) <= new Date();
  const weightValid = data.weight >= 0.1 && data.weight <= 200;
  const lengthValid = data.length >= 5 && data.length <= 200;
  const locationValid = /^[A-Z][a-zA-Z ]{2,}$/.test(data.location);
  return speciesValid && dateValid && weightValid && lengthValid && locationValid;
}

function updateStats() {
  const total = catches.reduce((sum, c) => sum + c.weight, 0);
  const avg = catches.length ? (total / catches.length).toFixed(2) : 0;
  const speciesCount = {};
  catches.forEach(c => speciesCount[c.species] = (speciesCount[c.species] || 0) + 1);
  const mostCommon = Object.entries(speciesCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

  totalWeightEl.textContent = total.toFixed(1);
  avgWeightEl.textContent = avg;
  mostCommonEl.textContent = mostCommon;
}

function renderList() {
  catchList.innerHTML = "";
  catches.forEach((entry, index) => {
    const li = document.createElement("li");
    li.className = entry.weight > 5 ? "heavy" : "";
    li.innerHTML = `
      <strong>${entry.species}</strong> (${entry.date}) - 
      ${entry.weight}kg, ${entry.length}cm<br />
      <em>${entry.location}</em> - ${entry.method}<br />
      <small>${entry.note}</small>
      <button class="edit-btn" onclick="editEntry(${index})">✏️</button>
      <button class="delete-btn" onclick="deleteEntry(${index})">🗑️</button>
    `;
    catchList.appendChild(li);
  });
}

function editEntry(index) {
  const entry = catches[index];
  for (let key in entry) {
    if (form.elements[key]) {
      form.elements[key].value = entry[key];
    }
  }
  form.dataset.editing = index;
}

function deleteEntry(index) {
  catches.splice(index, 1);
  renderList();
  updateStats();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    species: form.species.value.trim(),
    date: form.date.value,
    weight: parseFloat(form.weight.value),
    length: parseInt(form.length.value),
    location: form.location.value.trim(),
    method: form.method.value,
    note: form.note.value.trim()
  };

  if (!validateForm(data)) {
    alert("Błędne dane w formularzu!");
    return;
  }

  const editIndex = form.dataset.editing;
  if (editIndex !== undefined) {
    catches[editIndex] = data;
    delete form.dataset.editing;
  } else {
    catches.push(data);
  }

  renderList();
  updateStats();
  form.reset();
});
