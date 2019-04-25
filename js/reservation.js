let Reservation = function(){

  let formReservation = document.getElementById("formReservation");
  formReservation.addEventListener("submit", function(e){

      let firstName = document.getElementById("firstName");
      let lastName = document.getElementById("lastName");
      let station = document.getElementById("stationName");

      if(firstName.value.length === 0 || lastName.value.length === 0 || checkSignature === false){
          $("#form-error").removeAttr('hidden');
      }else{
          $("#form-error").attr('hidden', 'true');
          $('#reservation-success').removeAttr('hidden');
          setReservation(lastName.value, firstName.value, station.textContent);
          showReservation(getCurrentReservation());
      }

      e.preventDefault();

      setTimeout(function(){
        window.scrollTo(0,document.body.scrollHeight);
      }, 10);
  });

  //Annuler la réservation
  let cancel = document.getElementById('cancel');
  cancel.addEventListener("click", function(){
      cancelReservation();
  });

  setInfoCustumer();
  displayIfExistReservation();

//Afficher la réservation
  function showReservation(reservation){
      document.getElementById('reservationFirstName').innerHTML = reservation.firstName;
      document.getElementById('reservationLastName').innerHTML = reservation.lastName;
      document.getElementById('reservationStation').innerHTML = reservation.station;
      $("#noReservation").attr('hidden', 'true');
      $("#reservationInProgress").removeAttr('hidden');
      $("#reserve").attr('hidden', 'true');
      $("#cancel").removeAttr('hidden');

      // Mise en place du timer 20 minutes pour une réservation
      let timer = setInterval(function timerReservation(){

          let endDate = sessionStorage.getItem('endDate');
          let countDownDate = new Date(endDate);
          let dateNow = new Date().getTime();
          let distance = countDownDate - dateNow;
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let secondes = Math.floor((distance % (1000 * 60)) / 1000);

          document.getElementById('reservationTimer').innerHTML = minutes + "m " + secondes + "s ";
          if (distance < 0){
              clearInterval(timer);
              showEmptyReservation();
          }
          1000;
      });

  }

  //Mise en session de la reservation courante
    function setReservation(lastName, firstName, station){
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        sessionStorage.setItem('station', station);
        let dateLimit = new Date();
        dateLimit.setMinutes(dateLimit.getMinutes() + 20);
        sessionStorage.setItem('endDate', dateLimit.toString());
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


  // Vérifie si il y a des données et les affiches si présentes
      function displayIfExistReservation(){
          let currentReservation = getCurrentReservation();
          if (currentReservation.firstName != null) {
              showReservation(currentReservation);

          } else {
              showEmptyReservation();
          }
      }

// Fonction pour annuler la reservation
  function cancelReservation(){
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      sessionStorage.removeItem('station');
      sessionStorage.removeItem('endDate');
      showEmptyReservation();
  }

  function setInfoCustumer () {
    document.getElementById('firstName').value = getCurrentReservation().firstName;
    document.getElementById('lastName').value = getCurrentReservation().lastName;
  }
};

let reservation = new Reservation();
