var Reservation = function(){

  var formReservation = document.getElementById("formReservation");
  formReservation.addEventListener("submit", function(){

      var firstName = document.getElementById("firstName");
      var lastName = document.getElementById("lastName");
      var station = document.getElementById("stationName");

      if(firstName.value.length === 0 || lastName.value.length === 0 || checkSignature === false){
          $("#form-error").removeAttr('hidden');
      }else{
          $("#form-error").attr('hidden', 'true');
          $('#reservation-success').removeAttr('hidden');
          setReservation(lastName.value, firstName.value, station.textContent);
      }
      setTimeout(function(){
        window.scrollTo(0,document.body.scrollHeight);
      }, 10);
  });

  //Annuler la réservation
  var cancel = document.getElementById('cancel');
  cancel.addEventListener("click", function(){
      cancelReservation();
  });


//Afficher la réservation courante
  function showReservation(reservation){
      document.getElementById('reservationFirstName').innerHTML = reservation.firstName;
      document.getElementById('reservationLastName').innerHTML = reservation.lastName;
      document.getElementById('reservationStation').innerHTML = reservation.station;
      $("#noReservation").attr('hidden', 'true');
      $("#reservationInProgress").removeAttr('hidden');
      $("#reserve").attr('hidden', 'true');
      $("#cancel").removeAttr('hidden');

      // Mise en place du timer 20 minutes pour une réservation
      var timer = setInterval(function timerReservation() {

          var endDate = sessionStorage.getItem('endDate');
          var countDownDate = new Date(endDate);
          var dateNow = new Date().getTime();
          var distance = countDownDate - dateNow;
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var secondes = Math.floor((distance % (1000 * 60)) / 1000);

          document.getElementById('reservationTimer').innerHTML = minutes + "m " + secondes + "s ";
          if (distance < 0) {
              clearInterval(timer);
              showEmptyReservation();
          }
          1000;
      });

  }

  //Mise en session de la reservation courante
    function setReservation(lastName, firstName, station) {
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        sessionStorage.setItem('station', station);
        var dateLimit = new Date();
        dateLimit.setMinutes(dateLimit.getMinutes() + 20);
        sessionStorage.setItem('endDate', dateLimit.toString());

        showReservation(getCurrentReservation());
    }

      // Si il n'y a pas de reservation
    function showEmptyReservation(){
      $("#noReservation").removeAttr('hidden');
      $("#reservationInProgress").attr('hidden', 'true');
      $("#reserve").removeAttr('hidden');
      $("#cancel").attr('hidden', 'true');
      $("#reservation-success").attr('hidden', 'true');
    }


      // Vérifie si il y a une réservation et affiche le message correspondant
          function getCurrentReservation() {
              return {
                  'firstName': localStorage.getItem('firstName'),
                  'lastName': localStorage.getItem('lastName'),
                  'station': sessionStorage.getItem('station'),
                  'endDate': sessionStorage.getItem('endDate'),
              }
          }


  // Vérifie si il y a des données en session et les affiches si présentes
      // function displayIfExistReservation(){
      //     var currentReservation = getCurrentReservation();
      //     if (currentReservation.firstName != null) {
      //         showReservation(currentReservation);
      //
      //     } else {
      //         showEmptyReservation();
      //     }
      // }

// Fonction pour annuler la reservation
  function cancelReservation() {
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      sessionStorage.removeItem('station');
      sessionStorage.removeItem('endDate');
      showEmptyReservation();
  }
}

var reservation = new Reservation();
