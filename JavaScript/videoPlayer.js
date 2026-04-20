/* You are making a function for a video player, for every loop a second will be incremented, when the duration has reached video’s end duration your function will show a text “Video ended, thank you for watching!”, use for loop.
 */

function videoPlayer(videoDuration) {
    for (let second = 0; second<=videoDuration; second++) {
        console.log(`Playing video... ${second} seconds`);
    }
    console.log("Video ended, thank you for watching!");
}

videoPlayer(5);