import './style.css'


  const root = document.querySelector('#app');
  const cityInput = document.querySelector('#city');
  const submit = document.querySelector('#submit');
  const reset = document.querySelector('#reset');
  const ville = document.createElement('h1');
  ville.classList = ('text-4xl font-bold');
  const temperature = document.createElement('h2');
  temperature.classList = ('font-bold');
  const description = document.createElement('h2');
  description.classList = ('text-xl font-bold');
  const windSpeed = document.createElement('h2');
  windSpeed.classList = ('font-bold');
  const humidity = document.createElement('h2');
  humidity.classList = ('font-bold');
  const icon = document.createElement('img');

const card = document.createElement('div');  
card.classList = ('card w-full bg-base-100 card-md shadow-xl card-border hidden');
const cardBody = document.createElement('div');
card.appendChild(cardBody);
cardBody.classList = ('card-body');
cardBody.appendChild(ville);
cardBody.appendChild(description);
cardBody.appendChild(temperature);
cardBody.appendChild(windSpeed);
cardBody.appendChild(humidity);
icon.classList = ('absolute top-0 right-0 w-1/2 h-1/2');

  // main card
  const apiKey = '2435573f3d8bd369357abd0e9fb3ec6f'
  const my_modal = document.querySelector('#my_modal_5');

  submit.addEventListener('click', () => {
    card.classList.add('hidden');
   const city = cityInput.value;

   if (city === '') {
    my_modal.showModal();
    return;
   }else {
    root.appendChild(card);
    card.classList.remove('hidden');
    cityInput.value = '';
    cardBody.appendChild(icon);
  
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`)
      .then(Response => Response.json())
      .then( data => {
        ville.textContent = data.name;
        temperature.textContent ='Temperature :' + ' ' + data.main.temp + '°C';
        windSpeed.textContent ='Vitesse du vent :' + ' ' + data.wind.speed + 'km/h';
        humidity.textContent = 'Humidité :' + ' ' + data.main.humidity + '%';
        description.textContent = data.weather[0].description;
        icon.src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
        icon.style.width = '100px';
        icon.style.height = '100px';
        icon.style.borderRadius = '50%';
      })
      .catch(error => {
        console.log('erreur :', error)
      });}
  })

  reset.addEventListener('click', () => {
    card.classList.add('hidden')
  })

  // modal part

const themeToggleButton = document.getElementById('theme-toggle');

// Définir les deux thèmes
const themes = ['garden', 'sunset'];
let currentThemeIndex = 0;

// Charger le thème depuis localStorage (si disponible)
const savedTheme = localStorage.getItem('selectedTheme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  currentThemeIndex = themes.indexOf(savedTheme); // Met à jour l'index du thème actuel
}

// Fonction pour basculer le thème
themeToggleButton.addEventListener('click', () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  const selectedTheme = themes[currentThemeIndex];
  document.documentElement.setAttribute('data-theme', selectedTheme);

  // Sauvegarder le thème dans localStorage
  localStorage.setItem('selectedTheme', selectedTheme);
});
