const TESTS = {

    light: [

        {
            id: 1,
            question: "Приклад питання Light",
            image: "",
            multiple: false,
            answers: [
                "Відповідь 1",
                "Відповідь 2",
                "Відповідь 3",
                "Відповідь 4"
            ],
            correct: [1]
        },

        {
            id: 2,
            question: "Приклад питання з кількома правильними відповідями",
            image: "",
            multiple: true,
            answers: [
                "Варіант 1",
                "Варіант 2",
                "Варіант 3",
                "Варіант 4"
            ],
            correct: [0,2]
        }

    ],

    high: [

        {
            id: 1,
            question: "Приклад питання High",
            image: "",
            multiple: false,
            answers: [
                "Відповідь 1",
                "Відповідь 2",
                "Відповідь 3",
                "Відповідь 4"
            ],
            correct: [2]
        }

    ]

};
