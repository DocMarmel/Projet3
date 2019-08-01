
let Canvas = function(){

  checkSignature = false;

  function moveDrawligne(e){
    let canvas = e.currentTarget,
        ctx = null,
        pos = null;

      if(canvas.draw === false){
        return false;
      }

    pos = getPosition(e, canvas);
    ctx = canvas.getContext('2d');

    // Dessiner
    checkSignature = true;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo((canvas.posX), canvas.posY);
    ctx.lineTo(pos.posX, pos.posY);
    ctx.stroke();

    canvas.posX = pos.posX;
    canvas.posY = pos.posY;
  }

  function getPosition(e, canvas){
    let rect = canvas.getBoundingClientRect(),
        eventEle = e.changedTouches? e.changedTouches[0]:e;
    return {
      posX : (eventEle.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      posY : (eventEle.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
  }

  function downDrawligne(e){
    e.preventDefault();
    let canvas = e.currentTarget,
        pos = getPosition(e, canvas);
    canvas.posX = pos.posX;
    canvas.posY = pos.posY;
    canvas.draw = true;
  }

  function upDrawligne(e){
    let canvas = e.currentTarget;
    canvas.draw = false;
  }

  function initCanvas(){
    let canvas = document.getElementById("signature");
    canvas.draw = false;
    canvas.width = 250;
    canvas.height = 150;
    ctx = canvas.getContext('2d');
    canvas.addEventListener("mousedown", downDrawligne);
    canvas.addEventListener("mouseup", upDrawligne);
    canvas.addEventListener("mousemove", moveDrawligne);
    canvas.addEventListener("touchstart", downDrawligne);
    canvas.addEventListener("touchend", upDrawligne);
    canvas.addEventListener("touchmove", moveDrawligne);
  }


    // Vider le dessin du canvas
  function nettoyer(e){
    let canvas = document.getElementById("signature"),
        ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width, canvas.height);
    checkSignature = false;
  }

  document.addEventListener('DOMContentLoaded',function(){
    initCanvas();
    let clear = document.getElementById("clear");
    clear.addEventListener("click", function(){
      nettoyer();
      $("#reservation-success").attr('hidden', 'true');
    });
  });
};

let canvas = new Canvas();
