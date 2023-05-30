let indexUsed;
let audioArray;
let nextAudioTimeOut;
const audioRef = [
  [{
      name: "board",
      text: "a board which is usually attached to a wall in order to display notices giving information about something",
      image: "./assets/images/board.png",
      src: "./assets/audio/words/board.mp3",
    },
    {
      name: "clock",
      text: "a mechanical or electrical device for measuring time, indicating hours, minutes, and sometimes seconds by hands on a round dial or by displayed figures.",
      image: "./assets/images/clock.png",
      src: "./assets/audio/words/clock.mp3",
    },
    {
      name: "desk",
      text: "a piece of furniture with a flat or sloping surface and typically with drawers, at which one can read, write, or do other work.",
      image: "./assets/images/desk.png",
      src: "./assets/audio/words/desk.mp3",
    },
    {
      name: "book",
      text: "a written or printed work consisting of pages glued or sewn together along one side and bound in covers.",
      image: "./assets/images/book.png",
      src: "./assets/audio/words/book.mp3",
    },
  ],
  [{
      name: "board",
      text: "a board which is usually attached to a wall in order to display notices giving information about something",
      image: "./assets/images/board.png",
      src: "./assets/audio/words/board.mp3",
    },
    {
      name: "clock",
      text: "a mechanical or electrical device for measuring time, indicating hours, minutes, and sometimes seconds by hands on a round dial or by displayed figures.",
      image: "./assets/images/clock.png",
      src: "./assets/audio/words/clock.mp3",
    },
    {
      name: "desk",
      text: "a piece of furniture with a flat or sloping surface and typically with drawers, at which one can read, write, or do other work.",
      image: "./assets/images/desk.png",
      src: "./assets/audio/words/desk.mp3",
    },
    {
      name: "book",
      text: "a written or printed work consisting of pages glued or sewn together along one side and bound in covers.",
      image: "./assets/images/book.png",
      src: "./assets/audio/words/book.mp3",
    },
  ],
];

const generatPopup = (chosenAns) => {
  const currObject = audioRef[$("div.active").index()].find(
    (obj) => obj.name == chosenAns
  );
  $(`#modal_${$("div.active").index() + 1} .modal-content .modal-title`).html(
    currObject.name.toUpperCase()
  );
  $(`#modal_${$("div.active").index() + 1} .modal-content .modal_text h2`).html(
    currObject.text
  );
  $(`#modal_${$("div.active").index() + 1} .modal_img img`).attr(
    "src",
    currObject.image
  );

  $(".resource_btn").click();
};

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", function () {
  audioArray = JSON.parse(JSON.stringify(audioRef));
  $(".icon").addClass("prevent");
  $(".check_btn").addClass("prevent_click");
  $(".resource_btn").addClass("prevent_click");

  $(".holder").removeClass("invisible");
  //return index
  indexUsed = randomIntFromInterval(
    0,
    audioArray[$("div.active").index()].length - 1
  );

  $(".audio-player audio").attr(
    "src",
    audioArray[$("div.active").index()][indexUsed].src
  );

  $("#myCarousel").on("slid.bs.carousel", function () {
    $(".audio-player audio").attr(
      "src",
      audioArray[$("div.active").index()][
        randomIntFromInterval(0, audioArray.length)
      ].src
    );
  });

  document.querySelector(".play").addEventListener("click", function () {
    clearTimeout(nextAudioTimeOut);
    
    const audio = document.querySelector(".audio-player audio");
    audio.addEventListener("ended", () => {
      $(".icon").removeClass("prevent");
      console.log("ended");
      $(".check_btn").removeClass("prevent_click");
    });

  });
});

const nextQuestion = () => {
  isCorrect = true;
  indexUsed = randomIntFromInterval(
    0,
    audioArray[$("div.active").index()].length - 1
  );
  setTimeout(() => {
    if (audioArray[$("div.active").index()].length > 0) {
      playSound("./assets/audio/correct.mp3");
      $(".audio-player audio").attr(
        "src",
        audioArray[$("div.active").index()][indexUsed].src
      );
    } else {
      $(".audio-player , .check_btn").addClass("prevent_click");
      playSound("./assets/audio/cheer.mp3");
    }
  }, 100);
};

const nextAudio = () => {
  clearTimeout(nextAudioTimeOut);
  nextAudioTimeOut = setTimeout(() => {
    // playSound(audioArray[$("div.active").index()][indexUsed].src);
    $(".toggle-play").click();
    const audio = document.querySelector(".audio-player audio");
    let delay = $(audio)[0].duration;
    setTimeout(() => {
      $(".icon").removeClass("prevent");
    }, delay + 500);
    $(audio).on("ended", function () {});
  }, 1500);
};

function correct(chosenAns) {
  let isCorrect = false;
  if (chosenAns === audioArray[$("div.active").index()][indexUsed].name) {
    const audio = document.querySelector(".audio-player audio");
    isCorrect = true;
    audioArray[$("div.active").index()].splice(indexUsed, 1);
    indexUsed = randomIntFromInterval(
      0,
      audioArray[$("div.active").index()].length - 1
    );
    $(".icon").addClass("prevent");
    setTimeout(() => {
      nextQuestion();
    }, 100);
    setTimeout(() => {
      // generatPopup(chosenAns)
    }, $(audio)[0].duration + 600);
  }
  return isCorrect;
}

const check_correct = (event) => {
  let currchoice = event.target.getAttribute("data-ans");
  if (event.target.parentElement.classList.contains("correct")) {
    // generatPopup(currchoice)
  } else {
    let isCorrect = correct(currchoice);

    if (isCorrect) {
      event.target.parentElement.classList.add("correct");
      if (audioArray[$("div.active").index()][indexUsed].length == 0) {
        $(".check_btn").addClass("prevent_click");
      }
      // generatPopup(currchoice)
      nextAudio();
    } else {
      event.target.parentElement.classList.add("incorrect");
      playSound("./assets/audio/incorrect.mp3");
      // document.querySelector(".name").innerHTML = nameText;
      setTimeout(() => {
        event.target.parentElement.classList.remove("incorrect");
        // document.querySelector(".name").innerHTML = "choose the Correct Country";
      }, 1000);
    }
  }
};

const reloadAll = () => {

  carouselItems.forEach(function (carouselItem) {
    carouselItem.style.transform = 'scale(' + 1 + ') translate(' + 0 + 'px, ' + 0 + 'px)';

  })
  $(".check_btn").addClass("prevent_click");
  $(".image-hotspot img, .icon , .audio-player").removeClass("prevent_click");
  audioArray = JSON.parse(JSON.stringify(audioRef));

  indexUsed = randomIntFromInterval(
    0,
    audioArray[$("div.active").index()].length - 1
  );
  $(".audio-player audio").attr(
    "src",
    audioArray[$("div.active").index()][indexUsed].src
  );
  $(".icon").parent().removeClass("correct");
  $(".icon").addClass("prevent");
  // setTimeout(() => {
  //     playSound(audioArray[$("div.active").index()][indexUsed].src);

  //     const audio = document.querySelector(".audio-player audio");
  //     let delay = $(audio)[0].duration;
  //     setTimeout(() => {
  //         $(".icon").removeClass("prevent");
  //     }, delay + 500);
  //     $(audio).on("ended", function () {
  //     });
  // }, 1500);
};

$(".reload_btn").on("click", () => {
  reloadAll();
});

const answerQuestion = () => {
  const name = audioArray[$("div.active").index()][indexUsed].name;
  $(".icon[data-ans='" + name + "']")
    .parent()
    .addClass("correct");

  audioArray[$("div.active").index()].splice(indexUsed, 1);
  indexUsed = randomIntFromInterval(
    0,
    audioArray[$("div.active").index()].length - 1
  );
  $(".icon").addClass("prevent");
  setTimeout(() => {
    nextQuestion();
  }, 100);


  $(".check_btn").addClass("prevent_click");
  if(audioArray[$("div.active").index()].length > 0){
    setTimeout(()=>{
  
      $('.toggle-play').click()
      const audio = document.querySelector(".audio-player audio");
        audio.addEventListener("ended", () => {
          console.log("ended2");
          $(".icon").removeClass("prevent");
        $(".check_btn").removeClass("prevent_click");
        });
    },1100)
  }

  
  // setTimeout(() => {

  //   $(".icon").removeClass("prevent");
  //   $(".check_btn").removeClass("prevent_click");
  //   // const audio = document.querySelector(".audio-player audio");
  //   // let delay = $(audio)[0].duration;
  //   // setTimeout(() => {
  //   // }, delay + 500);
  //   // $(audio).on("ended", function () {
  //   //   console.log("heere2");
  //   // });
  // }, 1500);
};

$(".check_btn").on("click", () => {
  answerQuestion();
});

$(".icon").on("click", (event) => {
  check_correct(event);
});

$(".btn-close").on("click", () => {
  nextAudio();
});




var carouselItems = document.querySelectorAll('.image-hotspot');

carouselItems.forEach(function (carouselItem) {
  carouselItem.addEventListener('wheel', function (event) {
    event.preventDefault();
    var scaleDelta = event.deltaY > 0 ? 0.9 : 1.1; // increase or decrease scale based on scroll direction
    var currentScale = parseFloat(this.style.transform.replace('scale(', '').replace(')', '')) || 1; // get current scale or use 1 if not set
    var newScale = currentScale * scaleDelta; // calculate new scale
    // console.log(newScale);
    if (newScale > 1.8 || newScale < 1) {
      return
    }
    // this.style.transform = 'scale(' + newScale + ')'; // set new scale
    // last edit start

    var x = (parseFloat(this.getAttribute('data-x')) || 0)
    var y = (parseFloat(this.getAttribute('data-y')) || 0)

    this.style.transform = 'scale(' + newScale + ') translate(' + x + 'px, ' + y + 'px)'

    // last edit end
  });
});


// let finger1;
// let lastTap = 0;
// let zoomLevel = 0; // 0 for default, 1 for 50% zoom, 2 for 75% zoom
// const zoomScales = [1.1, 1.4, 1.79]; // zoom scales for each level

// carouselItems.forEach(function (carouselItem) {
//   carouselItem.addEventListener('touchstart', handleTouchStart, false);
//   carouselItem.addEventListener('touchend', handleTouchEnd, false);

//   function handleTouchStart(event) {
//     const currentTime = new Date().getTime();
//     const tapLength = currentTime - lastTap;
//     if (tapLength < 500 && tapLength > 0) {
//       event.preventDefault();
//       finger1 = event.touches[0];
//       handleDoubleTap(event);
//     }
//     lastTap = currentTime;
//   }

//   function handleTouchEnd(event) {
//     // Handle touch end event
//   }

//   function handleDoubleTap(event) {
//     if (finger1) {
//       const finger2 = event.changedTouches[0];

//       zoomLevel = (zoomLevel + 1) % 3; // cycle through 0, 1, 2
//       const scale = zoomScales[zoomLevel];

//       // carouselItem.style.transform = `scale(${scale})`;
//       var x = (parseFloat(carouselItem.getAttribute('data-x')) || 0)
//       var y = (parseFloat(carouselItem.getAttribute('data-y')) || 0)
//       carouselItem.style.transform = 'scale(' + scale + ') translate(' + x + 'px, ' + y + 'px)'
//       if (zoomLevel === 0) {
//         // Zoomed out completely, reset finger1
//         finger1 = null;
//       }
//     }
//   }
// })


carouselItems.forEach(function (carouselItem) {
  
  // Detect pinch/zoom gesture
  carouselItem.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' && event.pointers.length === 2) {
      const distance = Math.hypot(
        event.pointers[0].clientX - event.pointers[1].clientX,
        event.pointers[0].clientY - event.pointers[1].clientY
      );
      let newContainer = document.querySelector("div.active .image-hotspot")
      let scale = getScale(newContainer);
      carouselItem.addEventListener('pointermove', event => {
        if (event.pointerType === 'touch' && event.pointers.length === 2) {
          const newDistance = Math.hypot(
            event.pointers[0].clientX - event.pointers[1].clientX,
            event.pointers[0].clientY - event.pointers[1].clientY
          );
          scale *= newDistance / distance;
          distance = newDistance;
          // Apply scale to element
          carouselItem.style.transform = `scale(${scale})`;
        }
      });
    }
  });
})



// /////////////////////////////////////////////////////////////////////
function getScale(element) {
  // console.log("scale", parseFloat(element.style.transform.replace('scale(', '').replace(')', '')));
  return parseFloat(element.style.transform.replace('scale(', '').replace(')', '')) || 1;
}
// /////////////////////////////////////////////////////////////////////

// Dragging
// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end(event) {
        var textEl = event.target.querySelector('p')

        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
            Math.pow(event.pageY - event.y0, 2) | 0))
          .toFixed(2) + 'px')
      }
    }
  })

function dragMoveListener(event) {
  var target = event.target
  let newContainer = document.querySelector("div.active .image-hotspot")
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx / getScale(newContainer)
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy / getScale(newContainer)
  console.log(event.dx);

  // translate the element
  // target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
  target.style.transform = 'scale(' + getScale(newContainer) + ') translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener





// 'scale(' + getScale(this) + ') translate(' + currentX + 'px, ' + currentY + 'px)'