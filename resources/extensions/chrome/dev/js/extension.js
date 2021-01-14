const id = chrome.runtime.id;
//const parent = document.querySelector(".main")

let single = document.querySelector(".watch-main-col");
let playlist = document.querySelector(".ytd-playlist-sidebar-renderer");

if (location.href.includes("watch?v") && location.href.includes("&list=")) {
    console.log("installOnPlaylistWithSinglePlayer");
    installOnPlaylistWithSinglePlayer();
} else if (playlist && location.href.includes("playlist?list")) {
    console.log("installOnPlaylistPage");
    installOnPlaylistPage()
} else if (single && location.href.includes("watch?v")) {
    console.log("installOnSingleVideoPage")
    installOnSingleVideoPage();
}

function getPlaylistUrl() {
    let a = document.querySelector("a.yt-simple-endpoint.yt-formatted-string");
    return a.href;
}

function installOnPlaylistWithSinglePlayer() {
    const parent = document.querySelector(".ytp-chrome-controls");
    parent.classList.add("download_videos_chrome_extension")

    let playListUrl = getPlaylistUrl();

    const playListButton = createButton(null, "Download The Entire Playlist", playListUrl);

    const singleVideoButton = createButton(null,"Download This Video", null);

    parent.insertBefore(playListButton, parent.children[1]);
    parent.insertBefore(singleVideoButton, parent.children[2]);
}

function installOnSingleVideoPage () {
    const parent = document.querySelector(".ytp-chrome-controls");
    parent.classList.add("download_videos_chrome_extension")
    let button = createButton(null, "Download Video");
    parent.insertBefore(button, parent.children[1]);
}

function installOnPlaylistPage() {
    const parent = document.querySelector(".ytd-playlist-sidebar-renderer");
    parent.classList.add("download_videos_chrome_extension");
    let button = createButton("playlist_button", "Download Playlist Videos");
    parent.insertBefore(button, parent.children[2]);
}

function createButton(additional_class, text, url = null) {
    let img = document.createElement("img");
    let button = document.createElement("button");
    button.type = "button";
    button.role = "button";
    button.classList.add("click_to_download");
    button.classList.add(additional_class);
    /**/
    button.innerHTML = `
    <div class="img_container"><img src="chrome-extension://${id}/assets/images/logo.png"/></div>
\t\t<span class="button-text-content">${text}</span>
`;
    img.setAttribute("title", `Click to ${text}`);
    img.src = `chrome-extension://${id}/assets/images/logo.svg`;
    button.addEventListener("click", function () {
        {
            window.open(`https://videodownloads.xyz/#/?url=${url === null ? location.href : url}`)
        }
    });
    return button;
}
