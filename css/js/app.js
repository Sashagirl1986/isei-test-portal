let selectedTest = "light";

const cards = document.querySelectorAll(".test-card");

cards.forEach(card => {

    card.addEventListener("click", () => {

        cards.forEach(c => c.classList.remove("selected"));

        card.classList.add("selected");

        selectedTest = card.id;

    });

});

document.getElementById("startBtn").addEventListener("click", () => {

    const fullname = document.getElementById("fullname").value.trim();

    if(fullname === ""){

        alert("Введіть своє ПІБ");

        return;

    }

    alert(
`Вітаємо!

ПІБ: ${fullname}

Обраний тест:
${selectedTest.toUpperCase()}

У наступній версії тут відкриється тест.`
    );

});
