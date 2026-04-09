// Вопросы теста (полные 10 вопросов)
const questions = [
  {
    question: "1. Что такое совесть?",
    answers: [
      "а) Чувство голода",
      "б) Внутренний голос, который помогает отличать хорошее от плохого",
      "в) Умение быстро бегать",
      "г) Название школьного предмета"
    ],
    correct: 1
  },
  {
    question: "2. Что происходит, когда человек поступает против совести?",
    answers: [
      "а) Он сразу забывает об этом",
      "б) Ему становится весело",
      "в) Его может мучить чувство вины",
      "г) Ничего не происходит"
    ],
    correct: 2
  },
  {
    question: "3. Как можно назвать человека, который всегда поступает по совести?",
    answers: [
      "а) Бессовестным",
      "б) Честным и порядочным",
      "в) Лживым",
      "г) Эгоистичным"
    ],
    correct: 1
  },
  {
    question: "4. Что помогает развивать совесть?",
    answers: [
      "а) Только наказания",
      "б) Анализ своих поступков и стремление быть лучше",
      "в) Игнорирование своих ошибок",
      "г) Похвала окружающих без критики"
    ],
    correct: 1
  },
  {
    question: "5. Совесть — это:",
    answers: [
      "а) То, что даётся при рождении и не меняется",
      "б) Качество, которое можно развивать в себе",
      "в) Только религиозное понятие",
      "г) Чувство страха перед наказанием"
    ],
    correct: 1
  },
  {
    question: "6. Если друг поступил нечестно, что подскажет совесть?",
    answers: [
      "а) Промолчать, чтобы не ссориться",
      "б) Поддержать друга в любом случае",
      "в) Деликатно указать на ошибку",
      "г) Тоже поступить нечестно"
    ],
    correct: 2
  },
  {
    question: "7. «Поступать по совести» означает:",
    answers: [
      "а) Делать так, как выгодно",
      "б) Делать так, как хочется",
      "в) Делать так, как подсказывает внутреннее чувство справедливости",
      "г) Делать так, как делают все"
    ],
    correct: 2
  },
  {
    question: "8. Что такое «угрызения совести»?",
    answers: [
      "а) Чувство радости от хорошего поступка",
      "б) Чувство вины и сожаления после плохого поступка",
      "в) Желание сделать ещё что-то плохое",
      "г) Безразличие к своим действиям"
    ],
    correct: 1
  },
  {
    question: "9. Как совесть связана с обществом?",
    answers: [
      "а) Совесть не зависит от общества",
      "б) Совесть формируется под влиянием воспитания и окружения",
      "в) Только общество решает, что такое совесть",
      "г) Совесть есть только у взрослых"
    ],
    correct: 1
  },
  {
    question: "10. Что нужно делать, если ты совершил плохой поступок?",
    answers: [
      "а) Скрыть это и никому не говорить",
      "б) Признать ошибку и постараться её исправить",
      "в) Обвинить в этом кого‑то другого",
      "г) Сделать ещё один плохой поступок"
    ],
    correct: 1
  }
];

// Глобальные переменные
let currentQuestionIndex = 0;
let userAnswers = [];
let isMainTest = false;
let testCompleted = false;
let selectedAnswer = null;

// Элементы DOM
let mainMenu, tutorialTest, mainTest, resultsScreen, certificateScreen;
let currentQuestionEl, answersContainer, nextQuestionBtn, questionCounter;
let scoreDisplay, messageDisplay, certName, certScore, certDate;

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  // Получаем элементы
  mainMenu = document.getElementById('mainMenu');
  tutorialTest = document.getElementById('tutorialTest');
  mainTest = document.getElementById('mainTest');
  resultsScreen = document.getElementById('resultsScreen');
  certificateScreen = document.getElementById('certificateScreen');
  currentQuestionEl = document.getElementById('currentQuestion');
  answersContainer = document.getElementById('answersContainer');
  nextQuestionBtn = document.getElementById('nextQuestionBtn');
  questionCounter = document.getElementById('questionCounter');
  scoreDisplay = document.getElementById('scoreDisplay');
  messageDisplay = document.getElementById('messageDisplay');certName = document.getElementById('certName');
  certScore = document.getElementById('certScore');
  certDate = document.getElementById('certDate');

  // Кнопки навигации
  document.getElementById('startTutorialBtn').addEventListener('click', () => showTutorialMenu());
  document.getElementById('startMainBtn').addEventListener('click', () => startMainTest());
  document.getElementById('startTutorialTestBtn').addEventListener('click', () => startTutorialTest());
  document.getElementById('backToMenuFromTutorial').addEventListener('click', () => showMainMenu());
  nextQuestionBtn.addEventListener('click', () => nextQuestion());
  document.getElementById('backToMenuBtn').addEventListener('click', () => showMainMenu());
  document.getElementById('getCertificateBtn').addEventListener('click', () => showCertificate());
  document.getElementById('backToResultsBtn').addEventListener('click', () => showResultsScreen());
  document.getElementById('downloadCertBtn').addEventListener('click', () => downloadCertificate());
});

function showMainMenu() {
  hideAllScreens();
  mainMenu.classList.add('active');
  resetTestState();
}

function showTutorialMenu() {
  hideAllScreens();
  tutorialTest.classList.add('active');
  resetTestState();
}

function startTutorialTest() {
  isMainTest = false;
  startTest();
}

function startMainTest() {
  isMainTest = true;
  startTest();
}

function startTest() {
  hideAllScreens();
  mainTest.classList.add('active');
  currentQuestionIndex = 0;
  userAnswers = [];
  selectedAnswer = null;
  testCompleted = false;
  loadQuestion();
}

function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    finishTest();
    return;
  }
  
  const question = questions[currentQuestionIndex];
  currentQuestionEl.textContent = question.question;
  questionCounter.textContent = `Вопрос ${currentQuestionIndex + 1} из ${questions.length}`;
  
  // Создаем варианты ответов
  answersContainer.innerHTML = '';
  question.answers.forEach((answer, idx) => {
    const label = document.createElement('label');
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'answer';
    radio.value = idx;
    radio.addEventListener('change', () => {
      selectedAnswer = idx;
    });
    
    // Если уже есть сохраненный ответ, восстанавливаем его
    if (userAnswers[currentQuestionIndex] !== undefined && userAnswers[currentQuestionIndex] === idx) {
      radio.checked = true;
      selectedAnswer = idx;
    }
    
    label.appendChild(radio);
    label.appendChild(document.createTextNode(answer));
    answersContainer.appendChild(label);
  });
  
  // Обновляем текст кнопки
  if (currentQuestionIndex === questions.length - 1) {
    nextQuestionBtn.textContent = 'Завершить тест';
  } else {
    nextQuestionBtn.textContent = 'Следующий вопрос';
  }
}

function nextQuestion() {
  if (selectedAnswer === null) {
    alert('Пожалуйста, выберите ответ!');
    return;
  }
  
  // Сохраняем ответ
  userAnswers[currentQuestionIndex] = selectedAnswer;
  selectedAnswer = null;
  currentQuestionIndex++;
  loadQuestion();
}

function finishTest() {
  testCompleted = true;
  showResults();
}

function calculateScore() {
  let correct = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].correct) {
      correct++;
    }
  }
  return correct;
}

function showResults() {
  const correctCount = calculateScore();
  const totalQuestions = questions.length;
  const percentage = (correctCount / totalQuestions) * 100;
  
  scoreDisplay.textContent = `Вы ответили правильно на ${correctCount} из ${totalQuestions} вопросов (${percentage}%)`;
  
  let message = '';
  let showCert = false;
  
  if (percentage >= 80) {
    message = 'Отлично! Вы прекрасно понимаете, что такое совесть! 🌟';
    showCert = true;
  } else if (percentage >= 60) {
    message = 'Хороший результат! Вы на правильном пути к пониманию совести. 👍';
    showCert = false;} else if (percentage >= 40) {
    message = 'Неплохо, но стоит ещё задуматься о том, что такое совесть. 📚';
    showCert = false;
  } else {
    message = 'Стоит пересмотреть свои взгляды и узнать больше о совести. Попробуйте пройти тест ещё раз! 💭';
    showCert = false;
  }
  
  messageDisplay.textContent = message;
  
  // Показываем кнопку получения сертификата только для основного теста и при хорошем результате
  const getCertBtn = document.getElementById('getCertificateBtn');
  if (isMainTest && showCert && testCompleted) {
    getCertBtn.style.display = 'block';
  } else {
    getCertBtn.style.display = 'none';
  }
  
  hideAllScreens();
  resultsScreen.classList.add('active');
}

function showResultsScreen() {
  hideAllScreens();
  resultsScreen.classList.add('active');
}

function showCertificate() {
  const correctCount = calculateScore();
  const totalQuestions = questions.length;
  const percentage = (correctCount / totalQuestions) * 100;
  
  // Запрашиваем имя
  let userName = prompt('Введите ваше имя для сертификата:', 'Участник');
  if (!userName || userName.trim() === '') {
    userName = 'Участник';
  }
  
  certName.textContent = userName;
  certScore.textContent = `${correctCount} из ${totalQuestions} (${percentage}%)`;
  
  const now = new Date();
  const dateStr = now.toLocaleDateString('ru-RU');
  certDate.textContent = dateStr;
  
  hideAllScreens();
  certificateScreen.classList.add('active');
}

function downloadCertificate() {
  const certificate = document.querySelector('.certificate');
  const originalDisplay = certificate.style.display;
  
  // Создаем временный элемент для печати
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Сертификат - Что такое совесть?</title>
        <link rel="stylesheet" href="style.css">
        <style>
          body {
            margin: 0;
            padding: 40px;
            background: white;
          }
          .certificate {
            margin: 0 auto;
            page-break-inside: avoid;
          }
          button {
            display: none;
          }
        </style>
      </head>
      <body>
        ${certificate.outerHTML}
      </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.print();
  printWindow.close();
}

function hideAllScreens() {
  const screens = [mainMenu, tutorialTest, mainTest, resultsScreen, certificateScreen];
  screens.forEach(screen => {
    if (screen) screen.classList.remove('active');
  });
}

function resetTestState() {
  currentQuestionIndex = 0;
  userAnswers = [];
  isMainTest = false;
  testCompleted = false;
  selectedAnswer = null;
}