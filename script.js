"use strict";

const FILES = "abcdefgh";
const INITIAL_SECONDS = 20 * 60;
const BONUS_SECONDS = 5 * 60;
const QUIZ_TARGET_MOVES = 3;
const HUMAN = "w";
const COMPUTER = "b";
const TYPES = ["q", "r", "b", "n"];

const PIECE_VIEW = {
  w: {
    k: { glyph: "♔", mark: "lim" },
    q: { glyph: "♕", mark: "∫" },
    r: { glyph: "♖", mark: "f′" },
    b: { glyph: "♗", mark: "tan" },
    n: { glyph: "♘", mark: "t" },
    p: { glyph: "♙", mark: "Δ" },
  },
  b: {
    k: { glyph: "♚", mark: "lim" },
    q: { glyph: "♛", mark: "∫" },
    r: { glyph: "♜", mark: "f′" },
    b: { glyph: "♝", mark: "tan" },
    n: { glyph: "♞", mark: "t" },
    p: { glyph: "♟", mark: "Δ" },
  },
};

const PIECE_NAMES = {
  k: "King",
  q: "Queen",
  r: "Rook",
  b: "Bishop",
  n: "Knight",
  p: "Pawn",
};

const FORMULAS = [
  "lim", "f′", "∫", "dy/dx", "Σ", "FTC", "MVT", "Δx",
  "eˣ", "ln", "tan", "sec²", "u-sub", "A′", "v(t)", "s′",
];

const QUESTIONS = [
  {
    topic: "Limits and Continuity",
    question: "If f(x) = (x² - 9)/(x - 3), what is lim x→3 f(x)?",
    choices: ["0", "3", "6", "Does not exist"],
    answer: 2,
  },
  {
    topic: "Limits and Continuity",
    question: "What is lim x→0 sin x / x?",
    choices: ["0", "1", "∞", "Does not exist"],
    answer: 1,
  },
  {
    topic: "Limits and Continuity",
    question: "If lim x→2 f(x) = 5 and f(2) = 8, what must be true?",
    choices: ["f is continuous at 2", "f is not continuous at 2", "f′(2) = 5", "f has no limit at 2"],
    answer: 1,
  },
  {
    topic: "Limits and Continuity",
    question: "The Intermediate Value Theorem requires f to be:",
    choices: ["Differentiable", "Continuous", "Increasing", "Periodic"],
    answer: 1,
  },
  {
    topic: "Limits and Continuity",
    question: "A function is continuous at x = c when f(c) exists, lim x→c f(x) exists, and what else is true?",
    choices: ["f′(c) = 0", "lim x→c f(x) = f(c)", "f is increasing", "f has an inverse"],
    answer: 1,
  },
  {
    topic: "Derivative Rules",
    question: "What is d/dx of x³ sin x?",
    choices: ["3x² cos x", "x³ cos x + 3x² sin x", "3x² sin x - x³ cos x", "x³ sin x"],
    answer: 1,
  },
  {
    topic: "Derivative Rules",
    question: "What is d/dx of e^(2x)?",
    choices: ["e^(2x)", "2e^(2x)", "e^(x²)", "2x e^(2x)"],
    answer: 1,
  },
  {
    topic: "Derivative Rules",
    question: "What is d/dx of (x² + 1)^5?",
    choices: ["5(x² + 1)^4", "10x(x² + 1)^4", "2x(x² + 1)^5", "5x(x² + 1)^4"],
    answer: 1,
  },
  {
    topic: "Derivative Rules",
    question: "What is d/dx of ln(5x)?",
    choices: ["5/x", "1/(5x)", "1/x", "ln 5"],
    answer: 2,
  },
  {
    topic: "Derivative Rules",
    question: "If f(x) = sec x, then f′(x) is:",
    choices: ["sec x tan x", "tan x", "sec² x", "-csc x cot x"],
    answer: 0,
  },
  {
    topic: "Implicit Differentiation",
    question: "For x² + y² = 25, what is dy/dx?",
    choices: ["x/y", "-x/y", "-y/x", "2x + 2y"],
    answer: 1,
  },
  {
    topic: "Implicit Differentiation",
    question: "For xy = 12, what is dy/dx?",
    choices: ["y/x", "-y/x", "-x/y", "12x"],
    answer: 1,
  },
  {
    topic: "Implicit Differentiation",
    question: "For y² = x³ + 1, which equation is correct after differentiating?",
    choices: ["2y dy/dx = 3x²", "2y = 3x² dy/dx", "dy/dx = 3x²", "2 dy/dx = 3x²"],
    answer: 0,
  },
  {
    topic: "Implicit Differentiation",
    question: "For sin y = x, dy/dx equals:",
    choices: ["cos y", "1/cos y", "-sin y", "1/sin y"],
    answer: 1,
  },
  {
    topic: "Implicit Differentiation",
    question: "In implicit differentiation, why do we multiply by dy/dx when differentiating a y-term?",
    choices: ["Because y is treated as a function of x", "Because y is always constant", "Because x is a function of y", "Because derivatives cannot include y"],
    answer: 0,
  },
  {
    topic: "Applications of Derivatives",
    question: "If f′ changes from positive to negative at x = 4, f has what at x = 4?",
    choices: ["Local minimum", "Local maximum", "Point of inflection", "Vertical tangent"],
    answer: 1,
  },
  {
    topic: "Applications of Derivatives",
    question: "If f′(x) > 0 on an interval, f is:",
    choices: ["Increasing", "Decreasing", "Concave up", "Constant"],
    answer: 0,
  },
  {
    topic: "Applications of Derivatives",
    question: "Critical numbers occur where f′(x) = 0 or:",
    choices: ["f(x) = 0", "f′(x) does not exist", "f″(x) = 0 only", "x = 0 only"],
    answer: 1,
  },
  {
    topic: "Applications of Derivatives",
    question: "The Mean Value Theorem guarantees some c with f′(c) equal to:",
    choices: ["f(b) + f(a)", "(f(b)-f(a))/(b-a)", "f(b)f(a)", "(b-a)/(f(b)-f(a))"],
    answer: 1,
  },
  {
    topic: "Applications of Derivatives",
    question: "If position is s(t), velocity is:",
    choices: ["s′(t)", "s″(t)", "∫s(t)dt", "s(t)/t only"],
    answer: 0,
  },
  {
    topic: "Curve Sketching",
    question: "If f″(x) > 0 on an interval, the graph of f is:",
    choices: ["Concave up", "Concave down", "Decreasing", "Constant"],
    answer: 0,
  },
  {
    topic: "Curve Sketching",
    question: "An inflection point can occur where:",
    choices: ["f changes sign", "f′ changes sign", "f″ changes sign", "f is zero"],
    answer: 2,
  },
  {
    topic: "Curve Sketching",
    question: "If f′(x) < 0 and f″(x) > 0, the graph is:",
    choices: ["Increasing and concave down", "Increasing and concave up", "Decreasing and concave up", "Decreasing and concave down"],
    answer: 2,
  },
  {
    topic: "Curve Sketching",
    question: "A horizontal tangent occurs where:",
    choices: ["f(x)=0", "f′(x)=0", "f″(x)=0", "x=0"],
    answer: 1,
  },
  {
    topic: "Curve Sketching",
    question: "If f′ changes from negative to positive at c, f has:",
    choices: ["A local maximum", "A local minimum", "No extremum", "A vertical asymptote"],
    answer: 1,
  },
  {
    topic: "Related Rates",
    question: "If A = πr² and dr/dt = 2, what is dA/dt?",
    choices: ["2πr", "4πr", "πr²", "4π"],
    answer: 1,
  },
  {
    topic: "Related Rates",
    question: "If V = s³ and ds/dt = 4, what is dV/dt?",
    choices: ["3s²", "12s²", "4s³", "s²/12"],
    answer: 1,
  },
  {
    topic: "Related Rates",
    question: "In related rates, which variable usually represents time?",
    choices: ["x", "y", "t", "c"],
    answer: 2,
  },
  {
    topic: "Related Rates",
    question: "If x² + y² = 100, differentiating with respect to t gives:",
    choices: ["2x + 2y = 0", "2x dx/dt + 2y dy/dt = 0", "x dx/dt + y = 100", "2 dx/dt + 2 dy/dt = 0"],
    answer: 1,
  },
  {
    topic: "Related Rates",
    question: "A ladder sliding problem usually relates position variables using:",
    choices: ["The Pythagorean theorem", "The quotient rule", "A geometric series", "L'Hopital's Rule"],
    answer: 0,
  },
  {
    topic: "Optimization",
    question: "For optimization on a closed interval, candidates for absolute extrema include critical points and:",
    choices: ["Only x-intercepts", "Only inflection points", "The endpoints", "Only y-intercepts"],
    answer: 2,
  },
  {
    topic: "Optimization",
    question: "To maximize area with a fixed perimeter, the first major step is usually to:",
    choices: ["Write one variable in terms of another", "Ignore constraints", "Set all variables to 0", "Differentiate time"],
    answer: 0,
  },
  {
    topic: "Optimization",
    question: "At an interior maximum of a differentiable function, f′ is usually:",
    choices: ["Positive", "Negative", "Zero", "Undefined only"],
    answer: 2,
  },
  {
    topic: "Optimization",
    question: "The second derivative test says f has a local minimum at c if f′(c)=0 and:",
    choices: ["f″(c)>0", "f″(c)<0", "f(c)=0", "f″(c)=0 always"],
    answer: 0,
  },
  {
    topic: "Optimization",
    question: "For absolute extrema on [a,b], why must endpoints be checked?",
    choices: ["They can be absolute max/min", "They are always critical points", "They make f′ undefined", "They are never extrema"],
    answer: 0,
  },
  {
    topic: "Definite Integrals and FTC",
    question: "If F(x) = ∫₁ˣ cos(t²) dt, what is F′(x)?",
    choices: ["cos(x²)", "2x cos(x²)", "cos(t²)", "sin(x²)"],
    answer: 0,
  },
  {
    topic: "Definite Integrals and FTC",
    question: "What does ∫ₐᵇ f′(x) dx equal?",
    choices: ["f′(b)-f′(a)", "f(b)-f(a)", "f(a)-f(b)", "f(b)+f(a)"],
    answer: 1,
  },
  {
    topic: "Definite Integrals and FTC",
    question: "If ∫₂⁵ f(x) dx = 7, then ∫₅² f(x) dx =:",
    choices: ["7", "-7", "0", "14"],
    answer: 1,
  },
  {
    topic: "Definite Integrals and FTC",
    question: "If f is positive on [a,b], ∫ₐᵇ f(x) dx represents:",
    choices: ["Slope only", "Area under the curve", "A derivative", "An asymptote"],
    answer: 1,
  },
  {
    topic: "Definite Integrals and FTC",
    question: "Which rule is most useful for ∫ 2x(x²+1)^4 dx?",
    choices: ["Product rule", "Quotient rule", "u-substitution", "Implicit differentiation"],
    answer: 2,
  },
  {
    topic: "Area and Accumulation",
    question: "The average value of f on [a,b] is:",
    choices: ["f(b)-f(a)", "∫ₐᵇ f(x) dx", "(1/(b-a))∫ₐᵇ f(x) dx", "(b-a)∫ₐᵇ f(x) dx"],
    answer: 2,
  },
  {
    topic: "Area and Accumulation",
    question: "If velocity v(t) is positive, ∫ v(t) dt over an interval gives:",
    choices: ["Distance traveled", "Acceleration", "Average acceleration only", "The slope of velocity"],
    answer: 0,
  },
  {
    topic: "Area and Accumulation",
    question: "Area between curves y=f(x) and y=g(x) is usually:",
    choices: ["∫ top - bottom dx", "∫ bottom - top dx always", "f′(x)-g′(x)", "f(x)g(x)"],
    answer: 0,
  },
  {
    topic: "Area and Accumulation",
    question: "If A(x)=∫₀ˣ f(t)dt, then A′(x) equals:",
    choices: ["f(0)", "f(x)", "xf(x)", "∫f(x)dx"],
    answer: 1,
  },
  {
    topic: "Area and Accumulation",
    question: "A Riemann sum approximates:",
    choices: ["A derivative only", "A definite integral", "A tangent line", "A limit that never exists"],
    answer: 1,
  },
  {
    topic: "Differential Equations",
    question: "The solution to dy/dx = ky with y(0)=A has the form:",
    choices: ["A + kx", "Ae^(kx)", "kx² + A", "A ln(kx)"],
    answer: 1,
  },
  {
    topic: "Differential Equations",
    question: "The differential equation dy/dx = 3x² is solved by:",
    choices: ["y = x³ + C", "y = 6x + C", "y = 3x³ + C", "y = ln x + C"],
    answer: 0,
  },
  {
    topic: "Differential Equations",
    question: "A slope field shows:",
    choices: ["Only x-intercepts", "Small tangent slopes at many points", "Only exact solutions", "Areas under curves"],
    answer: 1,
  },
  {
    topic: "Differential Equations",
    question: "For dy/dx = x/y, separating variables gives:",
    choices: ["y dy = x dx", "x dy = y dx", "dy/y = x dx", "y dx = x dy"],
    answer: 0,
  },
  {
    topic: "Differential Equations",
    question: "Exponential decay is commonly modeled by:",
    choices: ["dy/dt = ky with k > 0", "dy/dt = ky with k < 0", "dy/dt = k only", "dy/dt = t²"],
    answer: 1,
  },
];

const state = {
  board: [],
  turn: "w",
  selected: null,
  legalTargets: [],
  enPassant: null,
  clocks: { w: INITIAL_SECONDS, b: INITIAL_SECONDS },
  clockInterval: null,
  paused: true,
  gameOver: false,
  mode: "pvp",
  elo: 1200,
  moveCounter: { w: 0, b: 0 },
  quizCursor: 0,
  questionOrder: [],
  seenTopics: new Set(),
  captured: { w: [], b: [] },
  sacrificed: { w: [], b: [] },
  pendingQuizColor: null,
  pendingPromotion: null,
  pendingSacrificeColor: null,
  engine: null,
  engineThinking: false,
  history: [],
  lastBotMove: null,
  gameOverMessage: "",
};

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  bindEvents();
  buildTopics();
  createLocalEngine();
  resetGame();
  showTutorial();
});

function cacheElements() {
  [
    "board", "whiteClock", "blackClock", "turnBadge", "engineBadge", "selectedSquareText", "fenText",
    "whiteQuizProgress", "blackQuizProgress", "whiteCaptured", "blackCaptured", "whiteSacrificed",
    "blackSacrificed", "topicGrid", "gameLog", "pvpMode", "cpuMode", "eloSlider", "eloValue",
    "newGameButton", "recallButton", "tutorialButton", "tutorialModal", "closeTutorialButton", "closeTutorialX",
    "quizModal", "quizTopic", "quizQuestion", "answerChoices", "sacrificeModal", "sacrificeText",
    "sacrificeChoices", "promotionModal", "promotionChoices", "gameOverModal", "gameOverKicker",
    "gameOverTitle", "gameOverMessage", "finalWhiteClock", "finalBlackClock", "reviewBoardButton", "playAgainButton",
  ].forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

function bindEvents() {
  els.newGameButton.addEventListener("click", resetGame);
  els.recallButton.addEventListener("click", recallMove);
  els.tutorialButton.addEventListener("click", showTutorial);
  els.closeTutorialButton.addEventListener("click", closeTutorial);
  els.closeTutorialX.addEventListener("click", closeTutorial);
  els.playAgainButton.addEventListener("click", resetGame);
  els.reviewBoardButton.addEventListener("click", () => hideModal(els.gameOverModal));
  els.pvpMode.addEventListener("click", () => setMode("pvp"));
  els.cpuMode.addEventListener("click", () => setMode("cpu"));
  els.eloSlider.addEventListener("input", () => {
    state.elo = Number(els.eloSlider.value);
    els.eloValue.textContent = state.elo;
    configureEngine();
  });
}

function buildTopics() {
  const topics = [...new Set(QUESTIONS.map((q) => q.topic))];
  els.topicGrid.innerHTML = "";
  topics.forEach((topic) => {
    const pill = document.createElement("div");
    pill.className = "topic-pill";
    pill.dataset.topic = topic;
    pill.innerHTML = `<span>${topic}</span><b>○</b>`;
    els.topicGrid.appendChild(pill);
  });
}

function setMode(mode) {
  state.mode = mode;
  els.pvpMode.classList.toggle("active", mode === "pvp");
  els.cpuMode.classList.toggle("active", mode === "cpu");
  els.engineBadge.textContent = mode === "cpu" ? `Local engine ${state.elo} ELO` : "Local engine ready";
  if (!state.gameOver && state.turn === COMPUTER && state.mode === "cpu") {
    queueComputerMove();
  }
}

function resetGame() {
  clearInterval(state.clockInterval);
  state.board = startingBoard();
  state.turn = "w";
  state.selected = null;
  state.legalTargets = [];
  state.enPassant = null;
  state.clocks = { w: INITIAL_SECONDS, b: INITIAL_SECONDS };
  state.paused = false;
  state.gameOver = false;
  state.moveCounter = { w: 0, b: 0 };
  state.quizCursor = 0;
  state.questionOrder = shuffle([...Array(QUESTIONS.length).keys()]);
  state.seenTopics = new Set();
  state.captured = { w: [], b: [] };
  state.sacrificed = { w: [], b: [] };
  state.pendingQuizColor = null;
  state.pendingPromotion = null;
  state.pendingSacrificeColor = null;
  state.engineThinking = false;
  state.history = [];
  state.lastBotMove = null;
  state.gameOverMessage = "";
  els.gameLog.innerHTML = "";
  hideModal(els.quizModal);
  hideModal(els.sacrificeModal);
  hideModal(els.promotionModal);
  hideModal(els.gameOverModal);
  log("New game started. White to move.");
  startClock();
  render();
}

function startingBoard() {
  const empty = Array.from({ length: 8 }, () => Array(8).fill(null));
  const back = ["r", "n", "b", "q", "k", "b", "n", "r"];
  for (let c = 0; c < 8; c += 1) {
    empty[0][c] = piece("b", back[c]);
    empty[1][c] = piece("b", "p");
    empty[6][c] = piece("w", "p");
    empty[7][c] = piece("w", back[c]);
  }
  return empty;
}

function piece(color, type) {
  return { color, type, moved: false };
}

function startClock() {
  clearInterval(state.clockInterval);
  state.clockInterval = setInterval(() => {
    if (state.paused || state.gameOver) return;
    state.clocks[state.turn] -= 1;
    if (state.clocks[state.turn] <= 0) {
      state.clocks[state.turn] = 0;
      endGame(`${colorName(state.turn)} ran out of time. ${colorName(opponent(state.turn))} wins.`);
    }
    renderClocks();
  }, 1000);
}

function render() {
  renderBoard();
  renderClocks();
  renderPanels();
  renderTopics();
  renderStatus();
}

function renderBoard() {
  els.board.innerHTML = "";
  const kingSquare = isInCheck(state.board, state.turn) ? findKing(state.board, state.turn) : null;
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      const square = document.createElement("button");
      square.type = "button";
      square.className = `square ${(r + c) % 2 === 0 ? "light" : "dark"}`;
      square.dataset.r = r;
      square.dataset.c = c;
      square.dataset.formula = FORMULAS[(r * 8 + c) % FORMULAS.length];
      square.setAttribute("aria-label", `${squareName(r, c)} ${state.board[r][c] ? PIECE_NAMES[state.board[r][c].type] : "empty"}`);
      if (state.selected && state.selected.r === r && state.selected.c === c) square.classList.add("selected");
      if (state.lastBotMove?.from.r === r && state.lastBotMove?.from.c === c) square.classList.add("bot-from");
      if (state.lastBotMove?.to.r === r && state.lastBotMove?.to.c === c) square.classList.add("bot-to");
      const target = state.legalTargets.find((m) => m.to.r === r && m.to.c === c);
      if (target) square.classList.add(target.captured || target.enPassant ? "capture-move" : "legal-move");
      if (kingSquare && kingSquare.r === r && kingSquare.c === c) square.classList.add("check");
      const p = state.board[r][c];
      if (p) {
        const pieceNode = document.createElement("span");
        pieceNode.className = `piece ${p.color === "w" ? "white" : "black"}`;
        pieceNode.dataset.symbol = PIECE_VIEW[p.color][p.type].mark;
        pieceNode.textContent = PIECE_VIEW[p.color][p.type].glyph;
        square.appendChild(pieceNode);
      }
      if (r === 7 || c === 0) {
        const coord = document.createElement("span");
        coord.className = "coord";
        coord.textContent = `${c === 0 ? 8 - r : ""}${r === 7 ? FILES[c] : ""}`;
        square.appendChild(coord);
      }
      square.addEventListener("click", () => handleSquareClick(r, c));
      els.board.appendChild(square);
    }
  }
}

function renderClocks() {
  els.whiteClock.textContent = formatClock(state.clocks.w);
  els.blackClock.textContent = formatClock(state.clocks.b);
  document.querySelector(".white-panel").classList.toggle("active-clock", !state.paused && state.turn === "w");
  document.querySelector(".black-timer").classList.toggle("active-clock", !state.paused && state.turn === "b");
}

function renderPanels() {
  els.whiteQuizProgress.textContent = `${state.moveCounter.w} / ${QUIZ_TARGET_MOVES}`;
  els.blackQuizProgress.textContent = `${state.moveCounter.b} / ${QUIZ_TARGET_MOVES}`;
  renderPieceStrip(els.blackCaptured, state.captured.b);
  renderPieceStrip(els.whiteCaptured, state.captured.w);
  renderPieceStrip(els.whiteSacrificed, state.sacrificed.w);
  renderPieceStrip(els.blackSacrificed, state.sacrificed.b);
}

function renderPieceStrip(el, pieces) {
  el.innerHTML = pieces.length ? pieces.map((p) => PIECE_VIEW[p.color][p.type].glyph).join(" ") : "—";
}

function renderTopics() {
  document.querySelectorAll(".topic-pill").forEach((pill) => {
    const seen = state.seenTopics.has(pill.dataset.topic);
    pill.classList.toggle("seen", seen);
    pill.querySelector("b").textContent = seen ? "✓" : "○";
  });
}

function renderStatus() {
  const checkText = isInCheck(state.board, state.turn) ? " in check" : "";
  els.turnBadge.textContent = state.gameOver ? "Game over" : `${colorName(state.turn)} to move${checkText}`;
  els.engineBadge.textContent = state.mode === "cpu" ? `${state.engineThinking ? "Engine thinking" : "Local engine"} ${state.elo} ELO` : "Player vs Player";
  els.fenText.textContent = toFen();
}

function handleSquareClick(r, c) {
  if (state.gameOver || state.paused || state.pendingPromotion || state.engineThinking) return;
  if (state.mode === "cpu" && state.turn === COMPUTER) return;

  const clicked = state.board[r][c];
  if (state.selected) {
    const move = state.legalTargets.find((m) => m.to.r === r && m.to.c === c);
    if (move) {
      attemptMove(move);
      return;
    }
  }

  if (clicked && clicked.color === state.turn) {
    state.selected = { r, c };
    state.legalTargets = legalMovesForSquare(state.board, r, c, state);
    els.selectedSquareText.textContent = selectionMessage(r, c, clicked);
  } else {
    state.selected = null;
    state.legalTargets = [];
    els.selectedSquareText.textContent = clicked ? "That piece belongs to the other side." : "Select one of your pieces.";
  }
  render();
}

function selectionMessage(r, c, selectedPiece) {
  const name = `${colorName(selectedPiece.color)} ${PIECE_NAMES[selectedPiece.type]} on ${squareName(r, c)}`;
  if (state.legalTargets.length) return name;
  const pseudo = pseudoMoves(state.board, r, c, state);
  if (!pseudo.length) return `${name} has no legal destination from this square.`;
  const king = findKing(state.board, selectedPiece.color);
  const kingText = king ? ` on ${squareName(king.r, king.c)}` : "";
  return `${name} is pinned: moving it would expose the ${colorName(selectedPiece.color)} king${kingText}.`;
}

function saveHistory(movingColor) {
  state.history.push({
    movingColor,
    board: cloneBoard(state.board),
    turn: state.turn,
    selected: state.selected ? { ...state.selected } : null,
    legalTargets: [],
    enPassant: state.enPassant ? { ...state.enPassant } : null,
    clocks: { ...state.clocks },
    paused: state.paused,
    gameOver: state.gameOver,
    mode: state.mode,
    elo: state.elo,
    moveCounter: { ...state.moveCounter },
    quizCursor: state.quizCursor,
    questionOrder: [...state.questionOrder],
    seenTopics: [...state.seenTopics],
    captured: clonePieceLists(state.captured),
    sacrificed: clonePieceLists(state.sacrificed),
    lastBotMove: state.lastBotMove ? { from: { ...state.lastBotMove.from }, to: { ...state.lastBotMove.to } } : null,
    gameOverMessage: state.gameOverMessage,
    logs: [...els.gameLog.querySelectorAll("li")].map((li) => li.textContent),
  });
  if (state.history.length > 24) state.history.shift();
}

function recallMove() {
  if (!state.history.length || state.engineThinking) {
    els.selectedSquareText.textContent = state.engineThinking ? "Wait for the engine move to finish before recalling." : "No move to recall yet.";
    return;
  }
  let snapshot = state.history.pop();
  if (state.mode === "cpu" && snapshot.movingColor === COMPUTER && state.history.length) {
    snapshot = state.history.pop();
  }
  restoreSnapshot(snapshot);
  hideModal(els.quizModal);
  hideModal(els.sacrificeModal);
  hideModal(els.promotionModal);
  hideModal(els.gameOverModal);
  log("Recall used. The previous position has been restored.");
  els.selectedSquareText.textContent = "Recall used. The previous position has been restored.";
  state.paused = false;
  state.gameOver = false;
  state.gameOverMessage = "";
  startClock();
  render();
}

function restoreSnapshot(snapshot) {
  state.board = cloneBoard(snapshot.board);
  state.turn = snapshot.turn;
  state.selected = snapshot.selected ? { ...snapshot.selected } : null;
  state.legalTargets = [];
  state.enPassant = snapshot.enPassant ? { ...snapshot.enPassant } : null;
  state.clocks = { ...snapshot.clocks };
  state.paused = snapshot.paused;
  state.gameOver = snapshot.gameOver;
  state.mode = snapshot.mode;
  state.elo = snapshot.elo;
  state.moveCounter = { ...snapshot.moveCounter };
  state.quizCursor = snapshot.quizCursor;
  state.questionOrder = [...snapshot.questionOrder];
  state.seenTopics = new Set(snapshot.seenTopics);
  state.captured = clonePieceLists(snapshot.captured);
  state.sacrificed = clonePieceLists(snapshot.sacrificed);
  state.pendingQuizColor = null;
  state.pendingPromotion = null;
  state.pendingSacrificeColor = null;
  state.engineThinking = false;
  state.lastBotMove = snapshot.lastBotMove ? { from: { ...snapshot.lastBotMove.from }, to: { ...snapshot.lastBotMove.to } } : null;
  state.gameOverMessage = snapshot.gameOverMessage;
  els.eloSlider.value = state.elo;
  els.eloValue.textContent = state.elo;
  els.pvpMode.classList.toggle("active", state.mode === "pvp");
  els.cpuMode.classList.toggle("active", state.mode === "cpu");
  els.gameLog.innerHTML = "";
  snapshot.logs.slice().reverse().forEach((entry) => log(entry));
}

function attemptMove(move) {
  const moving = state.board[move.from.r][move.from.c];
  if (moving.type === "p" && (move.to.r === 0 || move.to.r === 7) && !move.promotion) {
    state.pendingPromotion = move;
    showPromotion(moving.color);
    return;
  }
  completeMove(move);
}

function completeMove(move) {
  const movingColor = state.board[move.from.r][move.from.c].color;
  saveHistory(movingColor);
  const result = applyMove(state.board, move, true);
  if (result.captured) state.captured[result.captured.color].push(result.captured);
  state.enPassant = result.enPassant;
  state.selected = null;
  state.legalTargets = [];
  state.moveCounter[movingColor] += 1;
  state.lastBotMove = state.mode === "cpu" && movingColor === COMPUTER
    ? { from: { ...move.from }, to: { ...move.to } }
    : null;
  log(`${colorName(movingColor)}: ${moveNotation(move, result)}`);
  els.selectedSquareText.textContent = `${colorName(movingColor)} moved to ${squareName(move.to.r, move.to.c)}.`;
  const next = opponent(movingColor);
  state.turn = next;
  const gameResult = getGameResult();
  render();
  if (gameResult) {
    endGame(gameResult);
    return;
  }
  if (state.moveCounter[movingColor] >= QUIZ_TARGET_MOVES) {
    state.moveCounter[movingColor] = 0;
    renderPanels();
    triggerQuiz(movingColor);
    return;
  }
  if (state.mode === "cpu" && state.turn === COMPUTER) queueComputerMove();
}

function applyMove(board, move, mutateMoved) {
  const p = board[move.from.r][move.from.c];
  const captured = move.enPassant
    ? board[move.from.r][move.to.c]
    : board[move.to.r][move.to.c];
  board[move.from.r][move.from.c] = null;
  if (move.enPassant) board[move.from.r][move.to.c] = null;
  const placed = { ...p, moved: mutateMoved ? true : p.moved };
  if (move.promotion) placed.type = move.promotion;
  board[move.to.r][move.to.c] = placed;
  if (move.castle) {
    const rookFromC = move.castle === "king" ? 7 : 0;
    const rookToC = move.castle === "king" ? 5 : 3;
    const rook = board[move.from.r][rookFromC];
    board[move.from.r][rookFromC] = null;
    board[move.from.r][rookToC] = { ...rook, moved: mutateMoved ? true : rook.moved };
  }
  let enPassant = null;
  if (p.type === "p" && Math.abs(move.to.r - move.from.r) === 2) {
    enPassant = { r: (move.to.r + move.from.r) / 2, c: move.from.c };
  }
  return { captured: captured ? { ...captured } : null, enPassant };
}

function showPromotion(color) {
  state.paused = true;
  els.promotionChoices.innerHTML = "";
  TYPES.forEach((type) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "promotion-button";
    button.innerHTML = `${PIECE_VIEW[color][type].glyph}<br><small>${PIECE_NAMES[type]}</small>`;
    button.addEventListener("click", () => {
      const move = { ...state.pendingPromotion, promotion: type };
      state.pendingPromotion = null;
      state.paused = false;
      hideModal(els.promotionModal);
      completeMove(move);
    });
    els.promotionChoices.appendChild(button);
  });
  showModal(els.promotionModal);
}

function triggerQuiz(color) {
  state.paused = true;
  state.pendingQuizColor = color;
  if (state.mode === "cpu" && color === COMPUTER) {
    resolveComputerQuiz(color);
    return;
  }
  const q = nextQuestion();
  state.currentQuestion = q;
  els.quizTopic.textContent = q.topic;
  els.quizQuestion.textContent = q.question;
  els.answerChoices.innerHTML = "";
  q.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = `${String.fromCharCode(65 + index)}. ${choice}`;
    button.addEventListener("click", () => handleAnswer(index, button));
    els.answerChoices.appendChild(button);
  });
  showModal(els.quizModal);
}

function nextQuestion() {
  if (!state.questionOrder.length || state.quizCursor >= state.questionOrder.length) {
    state.questionOrder = shuffle([...Array(QUESTIONS.length).keys()]);
    state.quizCursor = 0;
  }
  const question = QUESTIONS[state.questionOrder[state.quizCursor]];
  state.quizCursor += 1;
  state.seenTopics.add(question.topic);
  renderTopics();
  return question;
}

function handleAnswer(index, button) {
  const q = state.currentQuestion;
  const color = state.pendingQuizColor;
  document.querySelectorAll(".answer-button").forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add("correct");
  });
  if (index === q.answer) {
    state.clocks[color] += BONUS_SECONDS;
    log(`${colorName(color)} solved ${q.topic} and gained 5:00.`);
    setTimeout(() => {
      finishQuiz();
    }, 650);
  } else {
    button.classList.add("wrong");
    log(`${colorName(color)} missed ${q.topic} and must sacrifice a piece.`);
    setTimeout(() => {
      hideModal(els.quizModal);
      startSacrifice(color);
    }, 750);
  }
  renderClocks();
}

function finishQuiz() {
  hideModal(els.quizModal);
  state.pendingQuizColor = null;
  state.paused = false;
  render();
  if (state.mode === "cpu" && state.turn === COMPUTER) queueComputerMove();
}

function startSacrifice(color) {
  const pieces = sacrificeOptions(color);
  state.pendingSacrificeColor = color;
  state.paused = true;
  els.sacrificeChoices.innerHTML = "";
  if (!pieces.length) {
    log(`${colorName(color)} has no non-king piece to sacrifice.`);
    state.pendingSacrificeColor = null;
    state.pendingQuizColor = null;
    state.paused = false;
    render();
    if (state.mode === "cpu" && state.turn === COMPUTER) queueComputerMove();
    return;
  }
  els.sacrificeText.textContent = `${colorName(color)} must choose any own non-king piece to remove.`;
  pieces.forEach(({ r, c, piece: p }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "sacrifice-button";
    button.innerHTML = `${PIECE_VIEW[p.color][p.type].glyph}<br><small>${PIECE_NAMES[p.type]} ${squareName(r, c)}</small>`;
    button.addEventListener("click", () => sacrificePiece(r, c));
    els.sacrificeChoices.appendChild(button);
  });
  showModal(els.sacrificeModal);
}

function sacrificePiece(r, c) {
  const p = state.board[r][c];
  if (!p || p.color !== state.pendingSacrificeColor || p.type === "k") return;
  state.board[r][c] = null;
  state.sacrificed[p.color].push(p);
  log(`${colorName(p.color)} sacrificed ${PIECE_NAMES[p.type]} on ${squareName(r, c)}.`);
  hideModal(els.sacrificeModal);
  state.pendingSacrificeColor = null;
  state.pendingQuizColor = null;
  state.paused = false;
  const result = getGameResult();
  if (result) endGame(result);
  render();
  if (state.mode === "cpu" && state.turn === COMPUTER) queueComputerMove();
}

function resolveComputerQuiz(color) {
  const q = nextQuestion();
  const chance = Math.min(0.94, Math.max(0.42, (state.elo - 250) / 2300));
  if (Math.random() < chance) {
    state.clocks[color] += BONUS_SECONDS;
    log(`Computer solved ${q.topic} and gained 5:00.`);
    finishQuiz();
  } else {
    log(`Computer missed ${q.topic} and sacrificed a piece.`);
    const options = sacrificeOptions(color).sort((a, b) => pieceValue(a.piece.type) - pieceValue(b.piece.type));
    if (options.length) {
      const pick = options[0];
      state.board[pick.r][pick.c] = null;
      state.sacrificed[color].push(pick.piece);
    }
    finishQuiz();
  }
}

function sacrificeOptions(color) {
  const pieces = [];
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      const p = state.board[r][c];
      if (p && p.color === color && p.type !== "k") pieces.push({ r, c, piece: p });
    }
  }
  return pieces;
}

function legalMovesForSquare(board, r, c, gameState) {
  const p = board[r][c];
  if (!p) return [];
  return pseudoMoves(board, r, c, gameState).filter((move) => {
    const copy = cloneBoard(board);
    applyMove(copy, move, true);
    return !isInCheck(copy, p.color);
  });
}

function allLegalMoves(board, color, gameState) {
  const moves = [];
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      const p = board[r][c];
      if (p && p.color === color) moves.push(...legalMovesForSquare(board, r, c, gameState));
    }
  }
  return moves;
}

function pseudoMoves(board, r, c, gameState) {
  const p = board[r][c];
  const moves = [];
  const push = (toR, toC, extra = {}) => {
    if (!inside(toR, toC)) return;
    const target = board[toR][toC];
    if (!target || target.color !== p.color) {
      moves.push({
        from: { r, c },
        to: { r: toR, c: toC },
        captured: target ? { ...target } : null,
        ...extra,
      });
    }
  };
  if (p.type === "p") {
    const dir = p.color === "w" ? -1 : 1;
    const startRow = p.color === "w" ? 6 : 1;
    if (inside(r + dir, c) && !board[r + dir][c]) {
      push(r + dir, c);
      if (r === startRow && !board[r + 2 * dir][c]) push(r + 2 * dir, c);
    }
    [-1, 1].forEach((dc) => {
      const tr = r + dir;
      const tc = c + dc;
      if (!inside(tr, tc)) return;
      const target = board[tr][tc];
      if (target && target.color !== p.color) push(tr, tc);
      if (gameState.enPassant && gameState.enPassant.r === tr && gameState.enPassant.c === tc) {
        push(tr, tc, { enPassant: true, captured: board[r][tc] ? { ...board[r][tc] } : null });
      }
    });
  }
  if (p.type === "n") {
    [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]].forEach(([dr, dc]) => push(r + dr, c + dc));
  }
  if (p.type === "b" || p.type === "q") slide(board, r, c, p, moves, [[-1, -1], [-1, 1], [1, -1], [1, 1]]);
  if (p.type === "r" || p.type === "q") slide(board, r, c, p, moves, [[-1, 0], [1, 0], [0, -1], [0, 1]]);
  if (p.type === "k") {
    for (let dr = -1; dr <= 1; dr += 1) {
      for (let dc = -1; dc <= 1; dc += 1) {
        if (dr || dc) push(r + dr, c + dc);
      }
    }
    if (!p.moved && !isInCheck(board, p.color)) {
      addCastleMove(board, r, c, p, moves, "king");
      addCastleMove(board, r, c, p, moves, "queen");
    }
  }
  return moves;
}

function slide(board, r, c, p, moves, dirs) {
  dirs.forEach(([dr, dc]) => {
    let tr = r + dr;
    let tc = c + dc;
    while (inside(tr, tc)) {
      const target = board[tr][tc];
      if (!target) {
        moves.push({ from: { r, c }, to: { r: tr, c: tc }, captured: null });
      } else {
        if (target.color !== p.color) moves.push({ from: { r, c }, to: { r: tr, c: tc }, captured: { ...target } });
        break;
      }
      tr += dr;
      tc += dc;
    }
  });
}

function addCastleMove(board, r, c, p, moves, side) {
  const rookC = side === "king" ? 7 : 0;
  const through = side === "king" ? [5, 6] : [3, 2];
  const empty = side === "king" ? [5, 6] : [1, 2, 3];
  const rook = board[r][rookC];
  if (!rook || rook.type !== "r" || rook.color !== p.color || rook.moved) return;
  if (empty.some((col) => board[r][col])) return;
  if (through.some((col) => squareAttacked(board, r, col, opponent(p.color)))) return;
  moves.push({ from: { r, c }, to: { r, c: through[1] }, castle: side, captured: null });
}

function isInCheck(board, color) {
  const king = findKing(board, color);
  if (!king) return true;
  return squareAttacked(board, king.r, king.c, opponent(color));
}

function findKing(board, color) {
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      const p = board[r][c];
      if (p && p.color === color && p.type === "k") return { r, c };
    }
  }
  return null;
}

function squareAttacked(board, r, c, byColor) {
  const pawnDir = byColor === "w" ? -1 : 1;
  for (const dc of [-1, 1]) {
    const pr = r - pawnDir;
    const pc = c - dc;
    if (inside(pr, pc) && board[pr][pc]?.color === byColor && board[pr][pc]?.type === "p") return true;
  }
  for (const [dr, dc] of [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]) {
    const nr = r + dr;
    const nc = c + dc;
    if (inside(nr, nc) && board[nr][nc]?.color === byColor && board[nr][nc]?.type === "n") return true;
  }
  if (rayAttacked(board, r, c, byColor, [["b", "q"], [-1, -1], [-1, 1], [1, -1], [1, 1]])) return true;
  if (rayAttacked(board, r, c, byColor, [["r", "q"], [-1, 0], [1, 0], [0, -1], [0, 1]])) return true;
  for (let dr = -1; dr <= 1; dr += 1) {
    for (let dc = -1; dc <= 1; dc += 1) {
      if (!dr && !dc) continue;
      const kr = r + dr;
      const kc = c + dc;
      if (inside(kr, kc) && board[kr][kc]?.color === byColor && board[kr][kc]?.type === "k") return true;
    }
  }
  return false;
}

function rayAttacked(board, r, c, byColor, config) {
  const [attackers, ...dirs] = config;
  for (const [dr, dc] of dirs) {
    let tr = r + dr;
    let tc = c + dc;
    while (inside(tr, tc)) {
      const p = board[tr][tc];
      if (p) {
        if (p.color === byColor && attackers.includes(p.type)) return true;
        break;
      }
      tr += dr;
      tc += dc;
    }
  }
  return false;
}

function getGameResult() {
  const moves = allLegalMoves(state.board, state.turn, state);
  if (moves.length) return null;
  if (isInCheck(state.board, state.turn)) return `Checkmate. ${colorName(opponent(state.turn))} wins.`;
  return "Stalemate. The game is a draw.";
}

function queueComputerMove() {
  if (state.gameOver || state.paused || state.engineThinking || state.mode !== "cpu" || state.turn !== COMPUTER) return;
  state.engineThinking = true;
  renderStatus();
  setTimeout(() => {
    const move = pickEngineMove();
    state.engineThinking = false;
    if (!move) {
      const result = getGameResult();
      if (result) endGame(result);
      render();
      return;
    }
    completeMove(move);
  }, Math.max(300, 900 - Math.floor(state.elo / 5)));
}

function createLocalEngine() {
  const workerCode = `
    let elo = 1200;
    self.onmessage = (event) => {
      const text = String(event.data || "");
      if (text.startsWith("setoption") && text.includes("UCI_Elo")) {
        const match = text.match(/value\\s+(\\d+)/);
        if (match) elo = Number(match[1]);
      }
      if (text === "uci") self.postMessage("uciok");
      if (text === "isready") self.postMessage("readyok");
      if (text.startsWith("go")) self.postMessage("info string local UCI-style engine elo " + elo);
    };
  `;
  state.engine = new Worker(URL.createObjectURL(new Blob([workerCode], { type: "text/javascript" })));
  configureEngine();
}

function configureEngine() {
  if (!state.engine) return;
  state.engine.postMessage("uci");
  state.engine.postMessage("setoption name UCI_LimitStrength value true");
  state.engine.postMessage(`setoption name UCI_Elo value ${state.elo}`);
  state.engine.postMessage(`setoption name Skill Level value ${Math.round((state.elo - 400) / 100)}`);
  state.engine.postMessage("isready");
}

function pickEngineMove() {
  const moves = allLegalMoves(state.board, COMPUTER, state);
  if (!moves.length) return null;
  const depth = state.elo < 800 ? 1 : state.elo < 1500 ? 2 : 3;
  const noise = Math.max(0, 2400 - state.elo) / 180;
  let best = null;
  let bestScore = -Infinity;
  for (const move of moves) {
    const copy = cloneBoard(state.board);
    const info = applyMove(copy, withDefaultPromotion(move), true);
    const nextState = { ...state, enPassant: info.enPassant };
    const score = -negamax(copy, HUMAN, depth - 1, -Infinity, Infinity, nextState) + (Math.random() - 0.5) * noise;
    if (score > bestScore) {
      bestScore = score;
      best = move;
    }
  }
  return withDefaultPromotion(best);
}

function negamax(board, color, depth, alpha, beta, gameState) {
  const moves = allLegalMoves(board, color, gameState);
  if (depth === 0 || !moves.length) {
    if (!moves.length && isInCheck(board, color)) return -100000;
    return evaluate(board, color);
  }
  let best = -Infinity;
  for (const move of moves) {
    const copy = cloneBoard(board);
    const info = applyMove(copy, withDefaultPromotion(move), true);
    const childState = { ...gameState, enPassant: info.enPassant };
    const score = -negamax(copy, opponent(color), depth - 1, -beta, -alpha, childState);
    best = Math.max(best, score);
    alpha = Math.max(alpha, score);
    if (alpha >= beta) break;
  }
  return best;
}

function evaluate(board, perspective) {
  let score = 0;
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      const p = board[r][c];
      if (!p) continue;
      const center = 3.5 - Math.abs(3.5 - r) + 3.5 - Math.abs(3.5 - c);
      const value = pieceValue(p.type) + center * (p.type === "p" || p.type === "n" ? 3 : 1);
      score += p.color === perspective ? value : -value;
    }
  }
  return score;
}

function pieceValue(type) {
  return { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 }[type];
}

function withDefaultPromotion(move) {
  if (!move) return move;
  const p = state.board[move.from.r]?.[move.from.c];
  if (p?.type === "p" && (move.to.r === 0 || move.to.r === 7) && !move.promotion) {
    return { ...move, promotion: "q" };
  }
  return move;
}

function endGame(message) {
  state.gameOver = true;
  state.paused = true;
  state.gameOverMessage = message;
  clearInterval(state.clockInterval);
  log(message);
  els.selectedSquareText.textContent = message;
  render();
  showGameOver(message);
}

function showGameOver(message) {
  const isDraw = /draw|stalemate/i.test(message);
  const whiteWin = /White wins/i.test(message);
  const blackWin = /Black wins/i.test(message);
  els.gameOverKicker.textContent = isDraw ? "Draw" : "Game Over";
  els.gameOverTitle.textContent = isDraw ? "The game is a draw" : `${whiteWin ? "White" : blackWin ? "Black" : "Winner"} wins`;
  els.gameOverMessage.textContent = message;
  els.finalWhiteClock.textContent = formatClock(state.clocks.w);
  els.finalBlackClock.textContent = formatClock(state.clocks.b);
  showModal(els.gameOverModal);
}

function showTutorial() {
  state.paused = true;
  showModal(els.tutorialModal);
}

function closeTutorial() {
  hideModal(els.tutorialModal);
  if (!state.gameOver && !state.pendingQuizColor && !state.pendingSacrificeColor && !state.pendingPromotion) {
    state.paused = false;
    render();
    if (state.mode === "cpu" && state.turn === COMPUTER) queueComputerMove();
  }
}

function showModal(el) {
  el.classList.add("visible");
}

function hideModal(el) {
  el.classList.remove("visible");
}

function log(text) {
  const li = document.createElement("li");
  li.textContent = text;
  els.gameLog.prepend(li);
}

function moveNotation(move, result) {
  const p = state.board[move.to.r][move.to.c];
  const capture = result.captured ? "x" : "-";
  const promo = move.promotion ? `=${PIECE_NAMES[move.promotion]}` : "";
  if (move.castle) return move.castle === "king" ? "O-O" : "O-O-O";
  return `${PIECE_NAMES[p.type]} ${squareName(move.from.r, move.from.c)}${capture}${squareName(move.to.r, move.to.c)}${promo}`;
}

function toFen() {
  const rows = state.board.map((row) => {
    let out = "";
    let empty = 0;
    row.forEach((p) => {
      if (!p) {
        empty += 1;
      } else {
        if (empty) out += empty;
        empty = 0;
        const letter = p.type === "p" ? "p" : p.type.toUpperCase();
        out += p.color === "w" ? letter.toUpperCase() : letter.toLowerCase();
      }
    });
    if (empty) out += empty;
    return out;
  });
  return `${rows.join("/")} ${state.turn}`;
}

function formatClock(seconds) {
  const safe = Math.max(0, seconds);
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function squareName(r, c) {
  return `${FILES[c]}${8 - r}`;
}

function colorName(color) {
  return color === "w" ? "White" : "Black";
}

function opponent(color) {
  return color === "w" ? "b" : "w";
}

function inside(r, c) {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

function cloneBoard(board) {
  return board.map((row) => row.map((p) => (p ? { ...p } : null)));
}

function clonePieceLists(lists) {
  return {
    w: lists.w.map((p) => ({ ...p })),
    b: lists.b.map((p) => ({ ...p })),
  };
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
