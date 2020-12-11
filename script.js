var ms_options = {
    series: [{
    name: 'ms',
    data: []
    }],
    chart: {
    zoom: {
      enabled: false
    },
    offsetX: 0, 
    offsetY: 15,
    toolbar: {
       show: false
    },
    animations: {
      enabled: true,
      speed: 1000,
      dynamicAnimation: {
        enabled: true
      }
    },
    height: '60%', 
    colors: ['#b35edb'],
    type: 'area'
  },
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0
    }
  },
  markers: {
    colors: ['#b35edb']
  },
  legend: {
    show: false
  },
  fill: {
    colors: ['#b35edb']
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    colors: ['#b35edb']
  },
  yaxis: {
     tooltip: {
      enabled: false
    },
    show: false,
    labels: {
      show: false
    },
   
  },
  
  xaxis: {
    tooltip: {
      enabled: false
    },
    crosshairs: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
    show: false
    },
    labels: {
      show: false
    },
  },
  tooltip: {
    theme: 'dark', 
    enabled: true,
    x: {
      show: false
    }, 
    y: {
      show: false
    },
    z: {
      show: false
    },
    marker: {
      show: false,
    }
    
  }
  };

var hit_options = {
    series: [{
    name: 'hits'
    }],
    chart: {
        data: [],
        noData: {
            text: 'Loading...'
          },
    zoom: {
      enabled: false
    },
    offsetX: 0, 
    offsetY: 15,
    toolbar: {
       show: false
    },
    animations: {
      enabled: true,
      speed: 1000,
      dynamicAnimation: {
        enabled: true
      }
    },
    height: '60%', 
    colors: ['#5ed3db'],
    type: 'area'
  },
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0
    }
  },
  markers: {
    colors: ['#5ed3db']
  },
  legend: {
    show: false
  },
  fill: {
    colors: ['#5ed3db']
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    colors: ['#5ed3db']
  },
  yaxis: {
     tooltip: {
      enabled: false
    },
    show: false,
    labels: {
      show: false
    },
   
  },
  
  xaxis: {
    tooltip: {
      enabled: false
    },
    crosshairs: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
    show: false
    },
    labels: {
      show: false
    },
  },
  tooltip: {
    theme: 'dark', 
    enabled: true,
    x: {
      show: false
    }, 
    y: {
      show: false
    },
    z: {
      show: false
    },
    marker: {
      show: false,
    }
    
  }
  };

  var error_options = {
    series: [{
    name: 'errors'
    }],
    chart: {
        data: [],
        noData: {
            text: 'Loading...'
          },
    zoom: {
      enabled: false
    },
    offsetX: 0, 
    offsetY: 15,
    toolbar: {
       show: false
    },
    animations: {
      enabled: true,
      speed: 1000,
      dynamicAnimation: {
        enabled: true
      }
    },
    height: '60%', 
    colors: ['#db5e5e'],
    type: 'area'
  },
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0
    }
  },
  markers: {
    colors: ['#db5e5e']
  },
  legend: {
    show: false
  },
  fill: {
    colors: ['#db5e5e']
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    colors: ['#db5e5e']
  },
  yaxis: {
     tooltip: {
      enabled: false
    },
    show: false,
    labels: {
      show: false
    },
   
  },
  
  xaxis: {
    tooltip: {
      enabled: false
    },
    crosshairs: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
    show: false
    },
    labels: {
      show: false
    },
  },
  tooltip: {
    theme: 'dark', 
    enabled: true,
    x: {
      show: false
    }, 
    y: {
      show: false
    },
    z: {
      show: false
    },
    marker: {
      show: false,
    }
    
  }
  }; 





var chart = new ApexCharts(document.querySelector("#chart"), hit_options);
var chart2 = new ApexCharts(document.querySelector("#chart2"), ms_options);
var chart3 = new ApexCharts(document.querySelector("#chart3"), error_options);



chart.render();
chart2.render(); 
chart3.render(); 

let count = 1; 


function startShowingMessage(elem, url){
    setInterval(async function(){  

    const response = await fetch('http://localhost:5000/monitoring/count/hlsb/error/7');
    const text = await response.json();

    chart3.updateSeries([{
        name: 'error',
        data: text.count.reverse(),
    }])

    const response1 = await fetch('http://localhost:5000/monitoring/count/hlsb/hit/7');
    const text1 = await response1.json();

    chart.updateSeries([{
        name: 'hits',
        data: text1.count.reverse(),
    }])

    const response2 = await fetch('http://localhost:5000/monitoring/count/hlsb/latency/7');
    const text2 = await response2.json();

    chart2.updateSeries([{
        name: 'ms',
        data: text2.count.reverse(),
    }])

    const itext = document.querySelectorAll('.info-text'); 
    itext[0].innerHTML = text1.count.reverse()[0]+"<span>Requests</span>";
    itext[1].innerHTML = text2.count.reverse()[0]+"ms<span>Latency</span>";
    itext[2].innerHTML = text.count.reverse()[0]+"<span>Errors</span>"; 
  }, 4000)
}

startShowingMessage(); 