const patterns = [
  /přehled od ai/i, // cs
  /ai overview/i,  // en
  /AI による概要/i, // ja
  /prezentare generală generată de ai/i, // ro
  /AI-overzicht/i, // nl
  /visión general creada por IA/i, // es
  /AI 摘要/i, // zh-TW
  /Обзор от ИИ/i // ru
]

const observer = new MutationObserver(() => {
  // each time there's a mutation in the document see if there's an ai overview to hide
  const aiOverviewH = [
    ...document.querySelectorAll('h1, h2'),
  ].find(x => patterns.some(pattern => pattern.test(x.innerText)));

  if (aiOverviewH?.parentElement) {
    aiOverviewH.parentElement.style.display = "none";
  }

  const mainElement = document.querySelector('[role="main"]');
  if (mainElement) {
    mainElement.style.marginTop = "24px";
  }

   // Remove entries in "People also ask" section if it contains "AI overview"
  const peopleAlsoAskAiOverviews = [
    ...document.querySelectorAll("div.related-question-pair"),
  ].filter((el) => patterns.some((pattern) => pattern.test(el.innerHTML)));

  peopleAlsoAskAiOverviews.forEach((el) => {
    el.parentElement.parentElement.style.display = "none";
  });
});

observer.observe(document, {
  childList: true,
  subtree: true,
});
