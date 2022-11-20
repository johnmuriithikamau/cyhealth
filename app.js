const app = vue.createApp({
  template:`<h1>Hello</h1>`,

})
app.mount('#app')


 const  countrysSelectElement = document.querySelector("#country")
 const chartDiv = document.querySelector("#chart")


function displayChart(data) {
 const canvas = document.createElement('canvas');
 canvas.setAttribute("id", "myChart")
 chartDiv.appendChild(canvas)
  console.log(data)

  const dailyCases = data.map(day => {
    return day.Confirmed
  })

  const ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "line ",
    data: {
      labels: data.map(day => day.Date),
      datasets: [
        {
          label: "Daily Cases",
          backgroundColor: 'blue',
          borderColor: 'red',
          data: dailyCases,
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}


 function getCovidData (country) {
  const endpoint = ` https://covid-193.p.rapidapi.com/countries/${country}`;
  fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    chartDiv.innerHTML = ""
    displayGraph(data)
  }).catch(err => console.error(err))
  console.log( displayChart());
}

function getCountries() {
const endpoint = " https://covid-193.p.rapidapi.com/countries"
  fetch(endpoint)
  .then(response => response.json())
  .then(countries => {
        countries.forEach(country => {
              const countryName = country.Country
              const option = document.createElement("option")
              option.setAttribute("value", countryName)
              option.innerHTML = countryName
              countrysSelectElement.appendChild(option)

        })
        currentCountry = countrysSelectElement.children(0).value
        getCovidData(currentCountry);
  }).catch(err => console.error(err));
}
getCountries()

countrysSelectElement.addEventListener("click", () => {
  const currentIndex = countrysSelectElement.selectIndex;
  const countries = countrysSelectElement.children[currentIndex].value;
  currentCountry = countrySelected;
  getCovidData(countrySelected);

})
