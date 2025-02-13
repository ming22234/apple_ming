const API_URL = "https://script.google.com/macros/s/AKfycbwH5AVROp0VJL0voxdV0xQ2A0ZWIQU_8Yu0wO8mZMOVs1kXz0sDe1jeFYO7S7Yo8FuOVQ/exec"; // Google Apps Script 웹 앱 URL

// 점수 제출 함수
async function submitScore() {
    let username = prompt("사용자 이름을 입력하세요:");
    if (!username) return alert("이름을 입력해야 합니다.");

    let score = parseInt(document.getElementById("final-score").textContent.replace(/\D/g, ""), 10);

    let response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ username, score }),
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        alert("점수가 저장되었습니다!");
    } else {
        alert("점수 저장에 실패했습니다.");
    }
}

// 랭킹 조회 함수
async function fetchLeaderboard() {
    let response = await fetch(API_URL);
    let leaderboard = await response.json();
    let list = document.getElementById("leaderboard");

    list.innerHTML = "";
    leaderboard.forEach((entry, index) => {
        let li = document.createElement("li");
        li.innerText = `${index + 1}. ${entry[0]} - ${entry[1]}점`;
        list.appendChild(li);
    });
}

// 버튼 이벤트 리스너 추가
document.getElementById("submit-score-button").addEventListener("click", submitScore);
document.getElementById("leaderboard-button").addEventListener("click", fetchLeaderboard);
