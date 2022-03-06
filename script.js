/*
This is your site JavaScript code - you can add interactivity and carry out processing
- Initially the JS writes a message to the console, and moves a button you can add from the README
*/

// Print a message in the browser's dev tools console each time the page loads
// Use your menus or right-click / control-click and choose "Inspect" > "Console"
console.log("Hello 🌎");

/* 
Make the "Click me!" button move when the visitor clicks it:
- First add the button to the page by following the "Next steps" in the README


// This is a single line JS comment
/*
This is a comment that can span multiple lines 
- use comments to make your own notes!
*/
var base = window.location.href;
if(base.includes("?")) {
  base = base.split("?")[0];
}
console.log(base);

setInterval(getCounter, 1000);
//getCounter();
var sound=false;
function enableSound(e){
  sound = true;
  console.log("sound enabled")
  e.style.display = "none";
}
// timer zum aktualisieren
// als aller erstes laden
// wenn event dann daten updaten und erzeugen
function getCounter() {
  // use fetch on the /posts route, then pass the response along
  fetch(base + "/json").then((response) => {
    // with the response, convert it to JSON, then pass it along
    response.json().then((json) => {
      // print that JSON
      console.log(json);
      document.querySelector("#data").innerHTML = json.counter;
      let audio = document.querySelector("#audio");
      if(sound) {
        playSound(audio, json["playSound"], json["sound-file"]);
      }
    });
  });
}

function playSound(audio, shouldplaysound, soundfile) {
  if (shouldplaysound) {
    if (!(audio.paused || audio.ended)) {
      console.debug("audio is still playing. Do nothing.");
    } else {
      audio.loop = false;
      audio.muted = false;
      audio.preload = true;
      audio.src = soundfile;
      audio.load();
      audio.play();
      fetch(base + "/played").then((response) => {
        // if change then play sound
        response.json().then((json) => {
          console.log("done");
        });
      });
    }
  }
}

function increment() {
  fetch(base + "/inc").then((response) => {
    // with the response, convert it to JSON, then pass it along
    response.json().then((json) => {
      // print that JSON
      console.log(json);

      // if change then play sound
    });
  });
}
function decrement() {
  fetch(base + "/dec").then((response) => {
    // with the response, convert it to JSON, then pass it along
    response.json().then((json) => {
      // print that JSON
      console.log(json);

      // if change then play sound
    });
  });
}
function reset() {
  fetch(base + "/reset").then((response) => {
    // with the response, convert it to JSON, then pass it along
    response.json().then((json) => {
      // print that JSON
      console.log(json);

      // if change then play sound
    });
  });
}
function set() {
  var url = new URL(base + "/set");
  url.searchParams.append("n", 15);

  fetch(url).then((response) => {
    // with the response, convert it to JSON, then pass it along
    response.json().then((json) => {
      // print that JSON
      console.log(json);

      // if change then play sound
    });
  });
}
