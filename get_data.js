const link_dades = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeAif6pgFuLUAXHif4IsrSXzG8itYhirTHGdmNzA5RmrEPcJe7lcfwfNVLBEcgnn3mZbThqaZdouiP/pub?gid=0&single=true&output=csv";

function init() {
  Papa.parse(link_dades, {
    download: true,
    header: true,
    complete: function(results) {
      var data = results.data
      console.log(aggregate(data))
    }
  });
}

window.addEventListener('DOMContentLoaded', init)