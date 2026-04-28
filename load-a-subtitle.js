let videoTag = document.getElementsByTagName('play-av')[0].shadowRoot.querySelector("video");

document.getElementsByTagName('play-av')[0].shadowRoot.querySelector("#subtitleDiv").innerHTML = `<style>
.subContainer {
	font-family: Arial, Helvetica, sans-serif;
}
.subContainer {
	line-height: 1em;
	font-weight: bold;
	font-size: 3em;
	text-align: center;
	vertical-align: text-bottom;
	text-shadow: #000 0px 0px 1px;
	-webkit-text-stroke: 2px black;
	color: white;
	margin-top: 15em;
}
</style>
`;

window.askSubtitles();

videoTag.addEventListener("timeupdate", (event) => {
	let timePosition = videoTag.currentTime;
	window.subtitleElements.forEach((item, index) => {
		if (window.subtitleList[index].start < timePosition && window.subtitleList[index].end >= timePosition) {
			item.style.display = "";
		} else {
			item.style.display = "none";
		}
	});
});
