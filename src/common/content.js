const patterns = [
  /přehled od ai/i, // cs
  /ai overview/i,  // en
  /AI による概要/i, // ja
  /prezentare generală generată de ai/i, // ro
  /AI-overzicht/i, // nl, ne, be
  /visión general creada por IA/i, // es
  /AI 摘要/i, // zh-TW
  /Обзор от ИИ/i, // ru
  /Übersicht mit KI/i, // au, de, lx
  /AI-alapú áttekintés/i, // hu
  /AI pregled/i, // cr
  /Rezumat generat de AI/i, // mo
  /Огляд від ШІ/i, // ua
  /Przegląd od AI/i, // pl
  /DI apžvalga/i, // li
  /AI-yhteenveto/i, // fi
  /AI-översikt/i, // sw,
  /AI-oversikt/i, // no
  /AI-oversigt/i, // de
  /Επισκόπηση AI/i, // gr
  /Общ преглед, създаден от AI/i, // bl
  /Vista creada con IA/i, // es
  /Visión general creada por IA/i, // co, pe
  /Visão geral criada por IA/i, // br
  /AI 概覽/i, // zh
  /AI 개요/i, // kr
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
