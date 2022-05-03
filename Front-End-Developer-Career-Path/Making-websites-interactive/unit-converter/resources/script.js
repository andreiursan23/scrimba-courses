const inputUnitEl = document.getElementById("unit-to-convert");
const unitForm = document.getElementById("unit-form");

unitForm.addEventListener("submit", (e) => {
  e.preventDefault();
});


inputUnitEl.addEventListener("input", (e) => {
  const feetLength = document.getElementById("feet-length");
  const metersLength = document.getElementById("meters-length");
  const gallonsVolume = document.getElementById("gallons-volume");
  const litersVolume = document.getElementById("liters-volume");
  const poundsMass = document.getElementById("pounds-mass");
  const kilosMass = document.getElementById("kilos-mass");

  const unitToConvert = e.target.value || 0;

  document.querySelectorAll(".input-unit").forEach(el => el.textContent = unitToConvert)

  feetLength.innerText = `${(unitToConvert * 3.28084).toFixed(3)}`
  metersLength.innerText = `${(unitToConvert / 3.28084).toFixed(3)}`
  gallonsVolume.innerText = `${(unitToConvert * 0.264172).toFixed(3)}`
  litersVolume.innerText = `${(unitToConvert / 0.264172).toFixed(3)}`
  poundsMass.innerText = `${(unitToConvert * 2.204623).toFixed(3)}`
  kilosMass.innerText = `${(unitToConvert / 2.204623).toFixed(3)}`
});
