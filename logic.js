var name;
var wrongGuess;
var guessLeft;
var wins;
var losses;

function nameHider(name) {
  var hidedName = "";
  for (i = 0; i < name.length; i++) {
    hidedName += " _";
  }
  return hidedName;
}
String.prototype.replaceAt = function (index, character) {
  return (
    this.substr(0, index) + character + this.substr(index + character.length)
  );
};

function getName() {
  var names = [
    "Henok",
    "Fitsum",
    "Biniam",
    "Tsi",
    "Wengelawit",
    "Melat",
    "Alexander",
  ];
  var name = names[parseInt(Math.random() * names.length)];
  var hidedName = nameHider(name);
  document.getElementById("word-blanks").innerHTML = hidedName;

  wrongGuess = document.getElementById("wrong-guesses").innerHTML = "";
  guessLeft = document.getElementById("guesses-left").innerHTML = 9;
  wins = document.getElementById("win-counter").textContent;
  losses = document.getElementById("loss-counter").textContent;

  return name.toLowerCase();
}
name = getName();

document.addEventListener("keypress", function (event) {
  var val = String.fromCharCode(
    "charCode" in event ? event.charCode : event.keyCode
  );
  var wordBlank = document.getElementById("word-blanks").textContent;

  var splitedName = name.split("");

  var spaceRemoved = wordBlank.replace(/\s/g, "");

  if (name.includes(val)) {
    for (i = 0; i < splitedName.length; i++) {
      if (val === splitedName[i]) {
        spaceRemoved = spaceRemoved.replaceAt(i, val);
        if (i === 0) {
          spaceRemoved = spaceRemoved.replaceAt(i, val.toUpperCase());
        }
      }
    }
  } else {
    wrongGuess += val + " ";
    guessLeft--;

    document.getElementById("wrong-guesses").innerHTML = wrongGuess;
    document.getElementById("guesses-left").innerHTML = guessLeft;

    if (guessLeft === 0) {
      losses++;
      document.getElementById("loss-counter").innerHTML = losses;
      setTimeout(function () {
        alert("Sorry no guess left, Game over.");
        name = getName();
      }, 10);
    }
  }
  var spaceAded = spaceRemoved.split("").join(" ");
  document.getElementById("word-blanks").innerHTML = spaceAded;
  if (!spaceRemoved.includes("_")) {
    wins++;
    document.getElementById("win-counter").innerHTML = wins;
    setTimeout(function () {
      alert("Great! you win.");
      name = getName();
    }, 10);
  }
});
