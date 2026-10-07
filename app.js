let balance = 10000;
let selectedTeam = "";
let selectedOdds = 0;

function showSport(sport) {
    const footballMatches = document.querySelectorAll(".football");
    const cricketMatches = document.querySelectorAll(".cricket");
    const buttons = document.querySelectorAll(".sport-btn");

    buttons.forEach(button => {
        button.classList.remove("active");
    });

    if (sport === "football") {
        footballMatches.forEach(match => {
            match.style.display = "block";
        });

        cricketMatches.forEach(match => {
            match.style.display = "none";
        });

        buttons[0].classList.add("active");
    }

    if (sport === "cricket") {
        footballMatches.forEach(match => {
            match.style.display = "none";
        });

        cricketMatches.forEach(match => {
            match.style.display = "block";
        });

        buttons[1].classList.add("active");
    }
}

function selectBet(team, odds) {
    selectedTeam = team;
    selectedOdds = odds;

    document.getElementById("selectedBet").innerHTML =
        "Selected: <strong>" + team + "</strong> @ " + odds;

    calculateReturn();
}

function calculateReturn() {
    const stake = Number(document.getElementById("stake").value);

    if (stake > 0 && selectedOdds > 0) {
        const potentialReturn = stake * selectedOdds;

        document.getElementById("return").textContent =
            potentialReturn.toFixed(2);
    } else {
        document.getElementById("return").textContent = "0";
    }
}

document.getElementById("stake").addEventListener("input", calculateReturn);

function placeBet() {
    const stake = Number(document.getElementById("stake").value);

    if (!selectedTeam) {
        alert("Please select an odd first.");
        return;
    }

    if (!stake || stake <= 0) {
        alert("Please enter a demo stake.");
        return;
    }

    if (stake > balance) {
        alert("Insufficient demo balance.");
        return;
    }

    balance -= stake;

    const won = Math.random() < 0.5;

    let result;
    let amount = 0;

    if (won) {
        amount = stake * selectedOdds;
        balance += amount;
        result = "WIN";
    } else {
        result = "LOSS";
    }

    document.getElementById("balance").textContent =
        balance.toFixed(2);

    const historyList = document.getElementById("historyList");

    if (historyList.textContent === "No bets yet.") {
        historyList.innerHTML = "";
    }

    const item = document.createElement("div");
    item.className = "history-item";

    item.innerHTML =
        "<strong>" + selectedTeam + "</strong> @ " +
        selectedOdds +
        " | Stake: " +
        stake.toFixed(2) +
        " | <strong>" +
        result +
        "</strong>";

    historyList.prepend(item);

    alert(
        result === "WIN"
            ? "🎉 You won " + amount.toFixed(2) + " demo credits!"
            : "❌ You lost " + stake.toFixed(2) + " demo credits."
    );

    document.getElementById("stake").value = "";
    document.getElementById("return").textContent = "0";

    selectedTeam = "";
    selectedOdds = 0;

    document.getElementById("selectedBet").textContent =
        "Select an odd to add a bet.";
}
