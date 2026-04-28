(function(){function srtTimeToSeconds(time) {
  var match = time.match(/(\d\d):(\d\d):(\d\d),(\d\d\d)/);
  var hours        = +match[1],
      minutes      = +match[2],
      seconds      = +match[3],
      milliseconds = +match[4];
  
  return (hours * 60 * 60) + (minutes * 60) + (seconds) + (milliseconds / 1000);
}
//
function parseSrtLine(line) {
  var match = line.match(/(\d\d:\d\d:\d\d,\d\d\d) --> (\d\d:\d\d:\d\d,\d\d\d)\n([\S\s]*)/m);
  
  return {
    start: srtTimeToSeconds(match[1]),
    end:   srtTimeToSeconds(match[2]),
    text:  match[3].trim()
  };
}

function parseSrt(srt) {
  var lines = srt.replaceAll('\r', '').split(/(?:^|\n\n)\d+\n|\n+$/g).slice(1);
  return lines.map(parseSrtLine);
}
const controls = document.getElementsByTagName('play-av')[0].shadowRoot.querySelectorAll(".jw-controls")[0];
const subtitleDiv = document.createElement("div");
subtitleDiv.id = "subtitleDiv"
subtitleDiv.style.marginTop = "-0em";
controls.appendChild(subtitleDiv);

window.subtitleElements = [];

window.subtitleList = [];

function askSubtitles() {
	window.subtitleElements = [];
	let subs = prompt("Paste SRT here:");
	
	let parsedSubs = parseSrt(subs);
	window.subtitleList = parsedSubs;
	parsedSubs.forEach((item)=> {
		let itemText = ("<p>" + item.text + "</p><p>&nbsp;</p>").replaceAll('\n','</p><p>');
		
		let el = document.createElement("div");
		el.className = "subContainer";
		el.style.display = "none";
		el.innerHTML = itemText;
		subtitleDiv.appendChild(el);
		window.subtitleElements.push(el);
	});
}

window.askSubtitles = askSubtitles;})();
