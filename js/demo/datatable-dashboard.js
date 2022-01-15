// Call the dataTables jQuery plugin
$(document).ready(function() {

  fetch(`http://localhost:5000/treatments`)
  .then(response => response.json())
  .then(data => {

    data = data.map((el) => {
      el.date = formatDate(new Date(el.date))
      return el
    })

    $('#dataTable').DataTable(
      {
        data: data,
        columns: [
            { data : "number"},
            { data : "information"},
            { data : "date"},
            { data : "workerEmail"},
            { data : "carNumber"},
        ],
      }
    );
  });
});