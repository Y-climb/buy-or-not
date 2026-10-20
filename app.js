(() => {
  "use strict";

  const QUESTIONS = [
    {
      id: "need",
      category: "rational",
      short: "真实需要",
      english: "RATIONALE",
      weight: 14,
      title: "如果现在不买，你的生活或工作会明显受影响吗？",
      description: "先排除“想要”，看看它是否承担了一个真实的需求。",
      hint: "想象一下：没有它，今天的生活会有什么具体的不同？",
      yesLabel: "需求真实存在",
      noLabel: "需要还不够明确",
    },
    {
      id: "joy",
      category: "emotional",
      short: "真实喜欢",
      english: "FEELING",
      weight: 10,
      title: "想到真正使用它时的样子，你会发自内心地开心吗？",
      description: "不是拆快递的兴奋，而是它在生活里真正发生时的快乐。",
      hint: "试着想象一个最普通的使用场景，而不是第一次拥有它的瞬间。",
      yesLabel: "心动真实具体",
      noLabel: "更像想象中的快乐",
    },
    {
      id: "frequency",
      category: "rational",
      short: "使用频率",
      english: "RATIONALE",
      weight: 10,
      title: "你预计每周至少会用上它两三次吗？",
      description: "使用次数越多，单次成本越低，闲置的概率也越小。",
      hint: "按一个普通月份估计，不按“以后可能会用”估计。",
      yesLabel: "使用场景稳定",
      noLabel: "闲置风险偏高",
    },
    {
      id: "budget",
      category: "rational",
      short: "预算边界",
      english: "RATIONALE",
      weight: 14,
      title: "这次付款不会动用应急金，也不需要借钱或分期吗？",
      description: "在不影响安全感的前提下花钱，是理性判断的底线。",
      hint: "应急金、固定账单和借款，都算在预算边界里。",
      yesLabel: "预算留有余地",
      noLabel: "安全感可能被挤压",
    },
    {
      id: "identity",
      category: "emotional",
      short: "为自己而买",
      english: "FEELING",
      weight: 9,
      title: "你想买它，主要是因为自己喜欢，而不是想让别人看见？",
      description: "辨认购买背后的目光，能帮你分清“喜欢”和“人设”。",
      hint: "如果没有人会知道这件东西的价格，你还会想买吗？",
      yesLabel: "为自己的感受买单",
      noLabel: "混入了外部目光",
    },
    {
      id: "substitute",
      category: "rational",
      short: "替代方案",
      english: "RATIONALE",
      weight: 9,
      title: "现有物品里，没有一件能完成同样的任务吗？",
      description: "替代品不必完美，只要能解决大部分需求，就值得先比较。",
      hint: "与其看功能列表，不如想想现有物品能不能完成最常用的那一件事。",
      yesLabel: "没有有效替代",
      noLabel: "已有替代方案",
    },
    {
      id: "desire",
      category: "emotional",
      short: "冲动热度",
      english: "FEELING",
      weight: 8,
      title: "如果放进购物车等 24 小时，你大概率还是想买吗？",
      description: "短暂的热度会过去，留下来的愿望通常更值得认真对待。",
      hint: "想象购物车已经关闭，明天再打开时，你还有多少购买欲？",
      yesLabel: "热度经得起等待",
      noLabel: "更像瞬时冲动",
    },
    {
      id: "quality",
      category: "rational",
      short: "长期价值",
      english: "RATIONALE",
      weight: 9,
      title: "你了解它的质量、耐用度和售后，并愿意为这些负责吗？",
      description: "便宜不是唯一价值。长期可靠，才是真正的省。",
      hint: "质保、退换和真实评价，比详情页上的形容词更可信。",
      yesLabel: "长期价值清楚",
      noLabel: "信息仍不充分",
    },
    {
      id: "opportunity",
      category: "rational",
      short: "机会成本",
      english: "RATIONALE",
      weight: 9,
      title: "买下它，不会挤压你近期更重要的计划吗？",
      description: "每一笔消费，都在和别的生活目标竞争。",
      hint: "想想接下来 30 天有没有更重要的花钱计划。",
      yesLabel: "不影响优先目标",
      noLabel: "会挤压其他计划",
    },
    {
      id: "regret",
      category: "emotional",
      short: "后悔预警",
      english: "FEELING",
      weight: 8,
      title: "想象一个月后用它时，你更可能觉得庆幸，而不是后悔吗？",
      description: "提前站到未来回看，会帮你发现此刻没看到的盲区。",
      hint: "不是预测会不会坏，而是你使用它时的真实感受。",
      yesLabel: "未来预期正向",
      noLabel: "后悔信号较强",
    },
  ];

  const ACTIONS = {
    need: "先借用、租赁或去线下体验一次，把“需要”真正放进生活里再决定。",
    joy: "别只想拥有它，写下你会使用它的三个具体时刻；写不出来就先放一放。",
    frequency: "按预计使用次数算出单次成本；如果三个月用不到 5 次，先别下单。",
    budget: "先设一个不影响应急金的上限。超过这条线，就暂时不买。",
    identity: "把它放进一个没人认识你的购物清单里，再问自己还会不会想买。",
    substitute: "把现有物品拿出来用一周，确认它真的无法替代，再回来。",
    desire: "加入购物车，设一个 24 小时后的提醒。明天的答案更接近真实。",
    quality: "查清质保和退换规则，重点看使用一个月后的真实评价。",
    opportunity: "写下令你犹豫的更重要目标，把两笔支出放进同一张表里比较。",
    regret: "想象转卖时的价格和理由；如果理由只是“用不上”，先别买。",
  };

  const state = {
    view: "intro",
    current: 0,
    answers: Array(QUESTIONS.length).fill(null),
    item: "这件东西",
    locked: false,
  };

  const $ = (id) => document.getElementById(id);

  const body = document.body;
  const screens = {
    intro: $("intro-screen"),
    quiz: $("quiz-screen"),
    result: $("result-screen"),
  };

  const itemInput = $("item-input");
  const startButton = $("start-button");
  const brandButton = $("brand-button");
  const headerRestart = $("header-restart");
  const restartButton = $("restart-button");
  const reviewAnswers = $("review-answers");
  const editAnswers = $("edit-answers");
  const quizResultShortcut = $("quiz-result-shortcut");
  const liveRegion = $("live-region");

  const dimensionList = $("dimension-list");
  const answeredCount = $("answered-count");
  const quizItemName = $("quiz-item-name");
  const progressLabel = $("progress-label");
  const progressCategory = $("progress-category");
  const progressFill = $("progress-fill");
  const progressBar = document.querySelector(".quiz-progress-track");
  const questionCard = $("question-card");
  const categoryChip = $("category-chip");
  const questionIndex = $("question-index");
  const questionKicker = $("question-kicker");
  const questionTitle = $("question-title");
  const questionDescription = $("question-description");
  const questionHint = $("question-hint");
  const questionBack = $("question-back");
  const answerButtons = Array.from(document.querySelectorAll(".answer-option"));

  const verdictCard = $("verdict-card");
  const verdictCode = $("verdict-code");
  const scoreValue = $("score-value");
  const scoreRingValue = $("score-ring-value");
  const verdictTitle = $("verdict-title");
  const verdictDescription = $("verdict-description");
  const resultItemName = $("result-item-name");
  const resultAnswerCount = $("result-answer-count");
  const stampMain = $("stamp-main");
  const stampSub = $("stamp-sub");
  const rationalScore = $("rational-score");
  const emotionalScore = $("emotional-score");
  const rationalBar = $("rational-bar");
  const emotionalBar = $("emotional-bar");
  const signalSummary = $("signal-summary");
  const strengthTags = $("strength-tags");
  const cautionTags = $("caution-tags");
  const actionList = $("action-list");
  const answerGrid = $("answer-grid");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ringCircumference = 2 * Math.PI * 84;
  let transitionTimer = null;
  let numberFrame = null;

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function allAnswered() {
    return state.answers.every((answer) => typeof answer === "boolean");
  }

  function answerNumber() {
    return state.answers.filter((answer) => answer === true).length;
  }

  function showScreen(name) {
    window.clearTimeout(transitionTimer);
    state.locked = false;
    state.view = name;
    body.dataset.view = name;

    Object.entries(screens).forEach(([key, screen]) => {
      screen.hidden = key !== name;
      screen.classList.toggle("is-active", key === name);
    });

    const activeScreen = screens[name];
    activeScreen.hidden = false;
    void activeScreen.offsetWidth;
    activeScreen.classList.add("is-active");

    window.scrollTo(0, 0);

    if (name === "intro") {
      document.title = "买吗｜购买清醒度自测";
    } else if (name === "quiz") {
      document.title = "正在判断｜买吗";
    } else {
      document.title = "购买体检单｜买吗";
    }
  }

  function startTest() {
    state.item = itemInput.value.trim().slice(0, 24) || "这件东西";
    quizItemName.textContent = state.item;
    resultItemName.textContent = state.item;
    state.answers = Array(QUESTIONS.length).fill(null);
    state.current = 0;
    state.locked = false;
    showScreen("quiz");
    renderQuestion();
    liveRegion.textContent = `开始购买清醒度自测，共 ${QUESTIONS.length} 个问题。`;
  }

  function resetToIntro() {
    window.clearTimeout(transitionTimer);
    state.answers = Array(QUESTIONS.length).fill(null);
    state.current = 0;
    state.locked = false;
    state.item = "这件东西";
    itemInput.value = "";
    quizItemName.textContent = state.item;
    resultItemName.textContent = state.item;
    showScreen("intro");
    liveRegion.textContent = "已返回首页。";
  }

  function renderDimensionList() {
    const fragment = document.createDocumentFragment();
    const completed = state.answers.filter((answer) => typeof answer === "boolean").length;

    answeredCount.textContent = `${completed} / ${QUESTIONS.length}`;
    quizResultShortcut.hidden = !allAnswered();

    QUESTIONS.forEach((question, index) => {
      const answer = state.answers[index];
      const hasAnswer = typeof answer === "boolean";
      const item = document.createElement("li");
      const button = document.createElement("button");
      const number = document.createElement("span");
      const name = document.createElement("span");
      const dot = document.createElement("i");
      const label = document.createElement("span");
      const answerState = document.createElement("span");

      button.type = "button";
      button.className = "dimension-row";
      button.dataset.index = String(index);
      button.dataset.clickable = String(hasAnswer);
      button.disabled = !hasAnswer;
      button.classList.toggle("is-active", index === state.current);
      button.classList.toggle("is-answered", hasAnswer);
      button.setAttribute(
        "aria-label",
        `${question.short}，${hasAnswer ? (answer ? "回答是" : "回答否") : "尚未回答"}`,
      );

      number.className = "dimension-num";
      number.textContent = pad(index + 1);

      name.className = "dimension-name";
      dot.className = question.category === "rational" ? "rational" : "emotional";
      label.textContent = question.short;
      name.append(dot, label);

      answerState.className = "dimension-state";
      answerState.textContent = hasAnswer ? (answer ? "✓" : "×") : "";

      button.append(number, name, answerState);
      item.append(button);
      fragment.append(item);
    });

    dimensionList.replaceChildren(fragment);
  }

  function renderQuestion() {
    const question = QUESTIONS[state.current];
    const answer = state.answers[state.current];
    const isRational = question.category === "rational";
    const categoryText = isRational ? "理性维度" : "感性维度";

    renderDimensionList();

    quizItemName.textContent = state.item;
    progressLabel.textContent = `问题 ${pad(state.current + 1)} / ${QUESTIONS.length}`;
    progressCategory.textContent = categoryText;
    progressFill.style.width = `${((state.current + 1) / QUESTIONS.length) * 100}%`;
    progressBar.setAttribute("aria-valuenow", String(state.current + 1));
    progressBar.setAttribute(
      "aria-valuetext",
      `第 ${state.current + 1} 题，共 ${QUESTIONS.length} 题`,
    );

    questionCard.dataset.category = question.category;
    categoryChip.textContent = categoryText;
    questionIndex.textContent = pad(state.current + 1);
    questionKicker.textContent = `${question.english} · ${question.short}`;
    questionTitle.textContent = question.title;
    questionDescription.textContent = question.description;
    questionHint.textContent = question.hint;

    answerButtons.forEach((button) => {
      const isYes = button.dataset.answer === "yes";
      const selected = answer === isYes;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    updateQuestionBack();

    questionCard.classList.remove("card-in", "card-out");
    void questionCard.offsetWidth;
    questionCard.classList.add("card-in");

    liveRegion.textContent = `第 ${state.current + 1} 题，${question.title}`;
  }

  function updateQuestionBack() {
    const canReturnToResult = state.current === 0 && allAnswered();
    questionBack.disabled = state.current === 0 && !canReturnToResult;

    if (canReturnToResult) {
      questionBack.innerHTML = '<span aria-hidden="true">←</span> 返回结果';
      questionBack.setAttribute("aria-label", "返回结果");
    } else {
      questionBack.innerHTML = '<span aria-hidden="true">←</span> 上一题';
      questionBack.setAttribute("aria-label", "返回上一题");
    }
  }

  function chooseAnswer(value) {
    if (state.locked || state.view !== "quiz") {
      return;
    }

    state.locked = true;
    state.answers[state.current] = value;

    answerButtons.forEach((button) => {
      const isYes = button.dataset.answer === "yes";
      button.classList.toggle("is-selected", isYes === value);
      button.setAttribute("aria-pressed", String(isYes === value));
    });

    renderDimensionList();

    if (reduceMotion) {
      advanceQuestion();
      return;
    }

    questionCard.classList.remove("card-in");
    questionCard.classList.add("card-out");
    transitionTimer = window.setTimeout(advanceQuestion, 230);
  }

  function advanceQuestion() {
    window.clearTimeout(transitionTimer);
    state.locked = false;

    if (state.current < QUESTIONS.length - 1) {
      state.current += 1;
      renderQuestion();
    } else {
      renderResults();
    }
  }

  function goBack() {
    if (state.locked) {
      return;
    }

    if (state.current === 0 && allAnswered()) {
      renderResults();
      return;
    }

    if (state.current > 0) {
      state.current -= 1;
      renderQuestion();
    }
  }

  function calculateResult() {
    const reasoned = QUESTIONS.filter((question) => question.category === "rational");
    const emotional = QUESTIONS.filter((question) => question.category === "emotional");
    const rationalTotal = reasoned.reduce((sum, question) => sum + question.weight, 0);
    const emotionalTotal = emotional.reduce((sum, question) => sum + question.weight, 0);

    const score = QUESTIONS.reduce(
      (sum, question, index) => sum + (state.answers[index] ? question.weight : 0),
      0,
    );
    const rationalRaw = reasoned.reduce((sum, question) => {
      const index = QUESTIONS.findIndex((entry) => entry.id === question.id);
      return sum + (state.answers[index] ? question.weight : 0);
    }, 0);
    const emotionalRaw = emotional.reduce((sum, question) => {
      const index = QUESTIONS.findIndex((entry) => entry.id === question.id);
      return sum + (state.answers[index] ? question.weight : 0);
    }, 0);

    return {
      score,
      rational: Math.round((rationalRaw / rationalTotal) * 100),
      emotional: Math.round((emotionalRaw / emotionalTotal) * 100),
    };
  }

  function gradeForScore(score) {
    if (score >= 90) {
      return {
        title: "可以放心买",
        description:
          "需求和预算彼此成立，内心也为它投了赞成票。这不是冲动，是一次准备充分的购买。",
        tone: "buy",
        code: "R-01",
        stamp: "BUY",
        stampSub: "放心下单",
      };
    }

    if (score >= 66) {
      return {
        title: "可以买",
        description:
          "整体信号偏正向，但还有一两个地方值得确认。把提醒做完再下单，会更踏实。",
        tone: "buy",
        code: "R-02",
        stamp: "BUY",
        stampSub: "确认后买",
      };
    }

    if (score >= 44) {
      return {
        title: "再考虑考虑",
        description:
          "它有让你心动的地方，但现实条件还没完全对齐。别让此刻的情绪替你按下付款键。",
        tone: "hold",
        code: "R-03",
        stamp: "HOLD",
        stampSub: "给冲动过夜",
      };
    }

    return {
      title: "暂时不需要买",
      description:
        "这笔钱也许有更重要的去处。先把它放下，真正的需要经得起时间。",
      tone: "skip",
      code: "R-04",
      stamp: "SKIP",
      stampSub: "这次先不买",
    };
  }

  function buildSignalSummary(rational, emotional) {
    if (rational >= 75 && emotional >= 65) {
      return "现实条件和内心愿望基本同向。你既有清晰的使用理由，也有真实的期待。";
    }

    if (rational >= 75 && emotional < 50) {
      return "理性上基本说得通，但感性信号偏弱。你想要的也许只是“应该拥有”，而不是“真的想要”。";
    }

    if (rational < 50 && emotional >= 75) {
      return "心动很强，但现实支撑偏弱。先让情绪过夜，再检查预算与使用场景。";
    }

    if (rational < 50 && emotional < 50) {
      return "理性与感性都没有给出强烈支持。此刻更像是“看到就想买”，而不是一个成熟的购买决定。";
    }

    return "一部分条件已经成立，另一部分仍在拉扯。答案之间的分歧，本身就是再想一想的理由。";
  }

  function createSignalTag(label, caution = false, empty = false) {
    const tag = document.createElement("span");
    tag.className = "signal-tag";
    if (caution) {
      tag.classList.add("is-caution");
    }
    if (empty) {
      tag.classList.add("is-empty");
    }
    tag.textContent = label;
    return tag;
  }

  function renderSignalTags() {
    const strengths = QUESTIONS.map((question, index) => ({
      question,
      index,
      answer: state.answers[index],
    }))
      .filter((entry) => entry.answer === true)
      .sort((a, b) => b.question.weight - a.question.weight)
      .slice(0, 3);

    const cautions = QUESTIONS.map((question, index) => ({
      question,
      index,
      answer: state.answers[index],
    }))
      .filter((entry) => entry.answer === false)
      .sort((a, b) => b.question.weight - a.question.weight)
      .slice(0, 3);

    strengthTags.replaceChildren(
      ...(strengths.length
        ? strengths.map((entry) => createSignalTag(entry.question.yesLabel))
        : [createSignalTag("暂无明显支持项", false, true)]),
    );

    cautionTags.replaceChildren(
      ...(cautions.length
        ? cautions.map((entry) => createSignalTag(entry.question.noLabel, true))
        : [createSignalTag("暂无明显风险", false, true)]),
    );

    return cautions;
  }

  function renderActions(topCautions, grade) {
    const actions = [];

    if (topCautions.length) {
      actions.push(ACTIONS[topCautions[0].question.id]);

      if (grade.tone === "hold" || grade.tone === "skip") {
        if (topCautions[1]) {
          actions.push(ACTIONS[topCautions[1].question.id]);
        } else {
          actions.push(
            "把它加入购物车或愿望清单，设一个 24 小时后的提醒；明天仍需要，再回来确认。",
          );
        }
      } else {
        actions.push("最后核对尺寸、颜色和退换规则，给自己留一条安心的反悔通道。");
      }
    } else if (grade.tone === "buy") {
      actions.push("最后核对尺寸、颜色和退换规则，没问题就安心下单。");
      actions.push("把这次购买记进预算，别让计划外配件悄悄增加总价。");
    } else {
      actions.push(
        "把它加入购物车或愿望清单，设一个 24 小时后的提醒；明天仍需要，再回来确认。",
      );
      actions.push("确认到货后的退换窗口，别让“已经买了”替你做决定。");
    }

    actionList.replaceChildren(
      ...actions.map((action, index) => {
        const item = document.createElement("li");
        const number = document.createElement("span");
        const copy = document.createElement("p");

        number.textContent = pad(index + 1);
        copy.textContent = action;
        item.append(number, copy);
        return item;
      }),
    );
  }

  function renderAnswerGrid() {
    const fragment = document.createDocumentFragment();

    QUESTIONS.forEach((question, index) => {
      const answer = state.answers[index];
      const button = document.createElement("button");
      const copy = document.createElement("span");
      const number = document.createElement("small");
      const name = document.createElement("strong");
      const mark = document.createElement("span");

      button.type = "button";
      button.className = "recap-item";
      button.dataset.index = String(index);
      button.setAttribute("aria-label", `修改第 ${index + 1} 题：${question.short}`);

      copy.className = "recap-copy";
      number.textContent = `${pad(index + 1)} · ${
        question.category === "rational" ? "理性" : "感性"
      }`;
      name.textContent = question.short;
      copy.append(number, name);

      mark.className = `recap-answer ${answer ? "is-yes" : "is-no"}`;
      mark.textContent = answer ? "是" : "否";

      button.append(copy, mark);
      fragment.append(button);
    });

    answerGrid.replaceChildren(fragment);
  }

  function animateScore(target) {
    window.cancelAnimationFrame(numberFrame);

    if (reduceMotion) {
      scoreValue.textContent = String(target);
      return;
    }

    const start = performance.now();
    const duration = 850;
    scoreValue.textContent = "0";

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      scoreValue.textContent = String(Math.round(target * eased));

      if (progress < 1) {
        numberFrame = window.requestAnimationFrame(tick);
      }
    }

    numberFrame = window.requestAnimationFrame(tick);
  }

  function renderResults() {
    const result = calculateResult();
    const grade = gradeForScore(result.score);
    const positives = answerNumber();

    verdictCard.dataset.tone = grade.tone;
    verdictCode.textContent = grade.code;
    verdictTitle.textContent = grade.title;
    verdictDescription.textContent = grade.description;
    resultItemName.textContent = state.item;
    resultAnswerCount.textContent = `${positives} / ${QUESTIONS.length} 个肯定`;
    stampMain.textContent = grade.stamp;
    stampSub.textContent = grade.stampSub;
    rationalScore.textContent = String(result.rational);
    emotionalScore.textContent = String(result.emotional);
    signalSummary.textContent = buildSignalSummary(result.rational, result.emotional);

    const topCautions = renderSignalTags();
    renderActions(topCautions, grade);
    renderAnswerGrid();

    scoreRingValue.style.transition = "none";
    scoreRingValue.style.strokeDashoffset = String(ringCircumference);
    rationalBar.style.width = "0%";
    emotionalBar.style.width = "0%";
    scoreValue.textContent = "0";

    showScreen("result");
    liveRegion.textContent = `测试完成。综合分数 ${result.score} 分，判断结果：${grade.title}。`;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        scoreRingValue.style.transition = "";
        scoreRingValue.style.strokeDashoffset = String(
          ringCircumference * (1 - result.score / 100),
        );
        rationalBar.style.width = `${result.rational}%`;
        emotionalBar.style.width = `${result.emotional}%`;
        animateScore(result.score);
      });
    });
  }

  function reviewAllAnswers() {
    state.current = 0;
    showScreen("quiz");
    renderQuestion();
  }

  startButton.addEventListener("click", startTest);
  brandButton.addEventListener("click", resetToIntro);
  headerRestart.addEventListener("click", resetToIntro);
  restartButton.addEventListener("click", resetToIntro);
  reviewAnswers.addEventListener("click", reviewAllAnswers);
  editAnswers.addEventListener("click", reviewAllAnswers);
  quizResultShortcut.addEventListener("click", renderResults);
  questionBack.addEventListener("click", goBack);

  itemInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      startTest();
    }
  });

  answerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      chooseAnswer(button.dataset.answer === "yes");
    });
  });

  dimensionList.addEventListener("click", (event) => {
    const button = event.target.closest(".dimension-row");
    if (!button || button.dataset.clickable !== "true") {
      return;
    }

    const index = Number(button.dataset.index);
    if (Number.isInteger(index) && typeof state.answers[index] === "boolean") {
      state.current = index;
      renderQuestion();
    }
  });

  answerGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".recap-item");
    if (!button) {
      return;
    }

    const index = Number(button.dataset.index);
    if (Number.isInteger(index) && QUESTIONS[index]) {
      state.current = index;
      showScreen("quiz");
      renderQuestion();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (state.view !== "quiz") {
      return;
    }

    if (event.metaKey || event.ctrlKey || event.altKey) {
      return;
    }

    if (event.key === "1" || event.key === "2") {
      event.preventDefault();
      chooseAnswer(event.key === "1");
    } else if (event.key === "ArrowLeft" && state.current > 0) {
      event.preventDefault();
      goBack();
    }
  });
})();
