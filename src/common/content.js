class AhoCorasick {
  constructor(keywords) {
    this.root = { children: {}, output: [], failure: null };
    this._buildTrie(keywords);
    this._buildFailureLinks();
  }

  _buildTrie(keywords) {
    for (const keyword of keywords) {
      const lowerKeyword = keyword.toLowerCase();
      let node = this.root;
      for (const char of lowerKeyword) {
        if (!node.children[char]) {
          node.children[char] = { children: {}, output: [], failure: null };
        }
        node = node.children[char];
      }

      node.output.push(keyword);
    }
  }

  _buildFailureLinks() {
    const queue = [];
    this.root.failure = this.root;

    for (const char in this.root.children) {
      const node = this.root.children[char];
      node.failure = this.root;
      queue.push(node);
    }

    while (queue.length > 0) {
      const currentNode = queue.shift();

      for (const char in currentNode.children) {
        const nextNode = currentNode.children[char];
        let failureNode = currentNode.failure;

        while (failureNode.children[char] === undefined && failureNode !== this.root) {
          failureNode = failureNode.failure;
        }

        if (failureNode.children[char]) {
          nextNode.failure = failureNode.children[char];
        } else {
          nextNode.failure = this.root;
        }

        nextNode.output.push(...nextNode.failure.output);
        queue.push(nextNode);
      }
    }
  }

  containsMatch(text) {
    const lowerText = text.toLowerCase();
    let currentNode = this.root;

    for (let i = 0; i < lowerText.length; i++) {
      const char = lowerText[i];
      
      while (currentNode.children[char] === undefined && currentNode !== this.root) {
        currentNode = currentNode.failure;
      }

      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      }

      if (currentNode.output.length > 0) {
        return true;
      }
    }
    
    return false;
  }
}

const searcher = new AhoCorasick(stringPatterns);
const observer = new MutationObserver(() => {
  const aiOverviewH = [
    ...document.querySelectorAll('h1, h2'),
  ].find(x => searcher.containsMatch(x.innerText));

  if (aiOverviewH?.parentElement) {
    aiOverviewH.parentElement.style.display = "none";
  }

  const mainElement = document.querySelector('[role="main"]');
  if (mainElement) {
    mainElement.style.marginTop = "24px";
  }

  const peopleAlsoAskAiOverviews = [
    ...document.querySelectorAll("div.related-question-pair"),
  ].filter((el) => searcher.containsMatch(el.innerHTML));

  peopleAlsoAskAiOverviews.forEach((el) => {
    if (el.parentElement?.parentElement) {
        el.parentElement.parentElement.style.display = "none";
    }
  });
});

observer.observe(document, {
  childList: true,
  subtree: true,
});