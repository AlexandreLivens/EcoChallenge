const quizzes = {
    formFacile: {
        resultId: "resultContainerFacile",
        title: "🌍 Résultat - Niveau Facile",
        answers: {
            q1: ["b", "Le CO₂ retient la chaleur dans l’atmosphère."],
            q2: ["c", "Fermer l’eau évite le gaspillage inutile."],
            q3: ["c", "Le plastique met très longtemps à disparaître."],
            q4: ["a", "Le soleil est une énergie naturelle renouvelable."],
            q5: ["b", "Le plastique pollue énormément les océans."],
            q6: ["b", "Le recyclage est représenté par trois flèches."],
            q7: ["b", "Les ampoules basse consommation utilisent moins d’énergie."],
            q8: ["c", "Un sac réutilisable remplace plusieurs sacs plastiques."],
            q9: ["a", "Le dauphin peut être touché par les déchets marins."],
            q10: ["b", "Le bleu est souvent utilisé pour le papier."]
        }
    },
    formMoyen: {
        resultId: "resultContainerMoyen",
        title: "🌱 Résultat - Niveau Moyen",
        answers: {
            q1: ["c", "Les voitures rejettent beaucoup de gaz polluants."],
            q2: ["b", "Trop de CO₂ augmente la température de la planète."],
            q3: ["c", "Le nucléaire produit très peu de CO₂ en fonctionnement."],
            q4: ["b", "Le textile utilise et pollue beaucoup d’eau."],
            q5: ["a", "Les arbres absorbent le CO₂ grâce à la photosynthèse."],
            q6: ["a", "Une énergie propre limite la pollution."],
            q7: ["b", "Les déchets alimentaires peuvent devenir du compost."],
            q8: ["a", "Le verre se réutilise et se recycle bien."],
            q9: ["b", "La Chine est le plus gros émetteur de CO₂."],
            q10: ["d", "Un sac plastique peut rester très longtemps en mer."]
        }
    },
    formDifficile: {
        resultId: "resultContainerDifficile",
        title: "🍀 Résultat - Niveau Difficile",
        answers: {
            q1: ["c", "L’acidité fragilise les coraux et les coquillages."],
            q2: ["c", "Les CFC détruisent la couche d’ozone."],
            q3: ["b", "Le Brésil a déjà réduit la déforestation en Amazonie."],
            q4: ["a", "Moins d’arbres signifie moins de CO₂ absorbé."],
            q5: ["c", "Une grande partie des terres est dégradée par l’agriculture intensive."],
            q6: ["a", "Les bioplastiques peuvent se dégrader plus facilement."],
            q7: ["b", "La Chine est très avancée dans le solaire."],
            q8: ["b", "L’agriculture consomme énormément d’eau."],
            q9: ["b", "Elle compense ses émissions pour atteindre la neutralité climatique."],
            q10: ["d", "Tous les plastiques ne peuvent pas être recyclés."]
        }
    }
};

function setupQuiz(formId) {
    const quiz = quizzes[formId];
    const form = document.getElementById(formId);

    if (!quiz || !form) return;

    let resultContainer = document.getElementById(quiz.resultId);

    if (!resultContainer) {
        resultContainer = document.createElement("div");
        resultContainer.id = quiz.resultId;
        form.after(resultContainer);
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let score = 0;
        let corrections = "";
        let missing = false;
        const total = Object.keys(quiz.answers).length;

        Object.keys(quiz.answers).forEach(function (question, index) {
            const selected = form.querySelector(`input[name="${question}"]:checked`);
            const correctAnswer = quiz.answers[question][0];
            const explanation = quiz.answers[question][1];

            if (!selected) {
                missing = true;
                return;
            }

            if (selected.value === correctAnswer) {
                score++;
            } else {
                corrections += `
                    <li class="correction-item">
                        <span class="correction-question">Question ${index + 1}</span>
                        <span class="correction-answer">Bonne réponse : ${correctAnswer.toUpperCase()}</span>
                        <span class="correction-explanation">${explanation}</span>
                    </li>
                `;
            }
        });

        if (missing) {
            resultContainer.className = "result-container show score-red";
            resultContainer.innerHTML = `
                <h2>⚠️ Réponses incomplètes</h2>
                <ul>
                    <li class="correction-item">
                        <span class="correction-explanation">Réponds à toutes les questions avant de valider.</span>
                    </li>
                </ul>
            `;
            resultContainer.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        let scoreClass = "score-green";

        if (score <= 4) {
            scoreClass = "score-red";
        } else if (score <= 7) {
            scoreClass = "score-orange";
        }

        resultContainer.className = `result-container show ${scoreClass}`;

        resultContainer.innerHTML = `
            <h2>${quiz.title}</h2>
            <p class="score-text">Score : ${score} / ${total}</p>
            <ul class="correction-list">
                ${
            corrections ||
            `
                    <li class="correction-item">
                        <span class="correction-question">✅ Excellent !</span>
                        <span class="correction-explanation">Toutes tes réponses sont correctes.</span>
                    </li>
                    `
        }
            </ul>
        `;

        resultContainer.scrollIntoView({ behavior: "smooth", block: "center" });
    });
}

setupQuiz("formFacile");
setupQuiz("formMoyen");
setupQuiz("formDifficile");