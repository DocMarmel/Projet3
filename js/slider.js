let Slider = function(){

  /* Variable pour le slide (auto) */

  let slides = document.querySelectorAll('#slides .slide');
  let currentSlide = 0;
  let slideInterval = setInterval(nextSlide, 5000);


  /* Variable pour le slide (manuel) */

  let next = document.getElementById('next');
  let previous = document.getElementById('previous');


  /* Variable pour le play/pause */

  let playing = true;
  let pauseButton = document.getElementById('pause');


  /* Fontion slide suivant (auto) */

  function goToSlide(n){
    slides[currentSlide].className = 'slide';
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].className = 'slide showing';
  }


  /* Fonction slide suivant/précedent (manuel) */

  function nextSlide(){
    goToSlide(currentSlide+1);
  }

  function previousSlide(){
    goToSlide(currentSlide-1);
  }

  next.onclick = function(){
    pauseSlideshow();
    nextSlide();
    playSlideshow();
  }

  previous.onclick = function(){
    pauseSlideshow();
    previousSlide();
    playSlideshow();
  }


  /* Gérer le slider avec le clavier */

  document.addEventListener('keydown', function (e){
    if(e.key === 'ArrowRight'){
      pauseSlideshow();
      nextSlide();
      playSlideshow();
    }else if(e.key === 'ArrowLeft'){
      pauseSlideshow();
      previousSlide();
      playSlideshow();
    }
  })


  /* Fonction play/pause */

  function pauseSlideshow(){
    pauseButton.innerHTML = '<i class="fas fa-play"></i>';
    playing = false;
    clearInterval(slideInterval);
  }

  function playSlideshow(){
    pauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    playing = true;
    slideInterval = setInterval(nextSlide, 5000);
  }

  pauseButton.onclick = function(){
    if(playing){
      pauseSlideshow();
    }else{
      playSlideshow();
    }
  };
}
let slider = new Slider();
