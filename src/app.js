//Import Class
import {DataCovid} from "./dataCovid.js"

function sortData(data, bagian) {
  data.sort(function(a, b) {
    if (a[bagian] < b[bagian]) return -1;
    if (a[bagian] > b[bagian]) return 1;
    return 0
  })
  if (bagian === "kasusPositif") {
    data.reverse()
  }
}

$(document).ready(() => {
  //Deklarasi Variable yang akan digunakan
  let positifIndo = $(".positif")
  let sembuhIndo = $(".sembuh")
  let meninggalIndo = $(".meninggal")
  var dataCovid = []
  var jenisChart = ""
    
  $.ajax({
    
    type: "GET",
    url: "https://covid19.mathdro.id/api/countries/indonesia",
    header: {
      "Access-Control-Allow-Origin": "*"
    },
    success: function(data) {
    
      positifIndo.text(`${data.confirmed.value} orang`)
      sembuhIndo.text(`${data.recovered.value} orang`)
      meninggalIndo.text(`${data.deaths.value} orang`)
    },
    error: function(){
      positifIndo.text("Load Failed")
      sembuhIndo.text(`Load Failed`)
      meninggalIndo.text(`Load Failed`)
    }
    
  })

  $.getJSON("https://indonesia-covid-19.mathdro.id/api/provinsi", function(data){
    $.each(data.data, function(id, obj){
      dataCovid.push(new DataCovid(obj.kodeProvi, obj.provinsi, obj.kasusPosi, obj.kasusSemb, obj.kasusMeni))
    })
    dataCovid.pop()
    //Radio Button untuk Sorting
    $('input[name="checkBoxSort"]').each(function(){
      if (this.checked.value === "byProvince"){
        sortData(dataCovid, "id")
      } else{
        sortData(dataCovid, "kasusPositif")
        
      }
    });
    //
    
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart
    $('input[name="checkBoxChart"]').each(function(){
      if (this.checked)
      {
        jenisChart = this.value
        displayChart(this.value, dataCovid)
      }
    });
    
    //Radio Event for checkBoxChart
    $("#line").click(function() {
      jenisChart = "line"
      displayChart(jenisChart, dataCovid);
    });
    $("#bar").click(function() {
      jenisChart = "bar"
      displayChart(jenisChart, dataCovid);
    });

    //Radio Event for checkBoxSort
    $("#byCase").click(function() {
      sortData(dataCovid, "kasusPositif");
      displayChart(jenisChart, dataCovid)
    });
    $("#byProvince").click(function() {
      sortData(dataCovid, "id");
      displayChart(jenisChart, dataCovid)
    });
    

    function displayChart(newType, data) {
      if (myChart) {
        myChart.destroy();
      }

      var configChart = {
        type: newType,
        data: {
          labels: data.map(element => element.namaTempat),
          datasets: [{
            label: 'Positif',
            borderColor: 'red',
            data: data.map(element => element.kasusPositif)
          },
          {
            label: 'Sembuh',
            borderColor: 'green',
            data: data.map(element => element.kasusSembuh)
          },
          {
            label: 'Meninggal',
            borderColor: 'black',
            data: data.map(element => element.kasusMeninggal)
          }]
        },
  
          // Configuration options go here
        options: {}
      }
      // Remove the old chart and all its event handles
      
    
      // Chart.js modifies the object you pass in. Pass a copy of the object so we can use the original object later
      var temp = jQuery.extend(true, {}, configChart);
      temp.type = newType;
      if(newType === "bar"){
        temp.data.datasets[0].backgroundColor = "red"
        temp.data.datasets[1].backgroundColor = "green"
        temp.data.datasets[2].backgroundColor = "black"
      }
      myChart = new Chart(ctx, temp);
    };
  })  
    
  
  
  
})

$(".kasus").mouseover(function(e){
  $(".kasus").children().css({
    "width":"200px", 
    "border-radius": "8%", 
    "padding-left":"10px", 
    "color":"black"})
})

$(".kasus").mouseout(function(e){
  $(".kasus").children().css({
    "width":"50px", 
    "border-radius": "10%", 
    "padding-left":"0px", 
    "color":"transparent"
  })
})