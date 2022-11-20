
  document.read(function(){
    init(  )


    function init() {
      var  url ='https://covid-193.p.rapidapi.com/statistics/'
      var data = ''

      $.get(url, function(data){
       
        data = `
        <td>${data.countries.response.totalCases}</td>
        <td>${data.countries.response.totalDeaths}</td>

        `
        $("data").html(data)
      })

    }
  })
