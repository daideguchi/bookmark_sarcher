window.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const results = document.getElementById("results");

  function showMessage(message) {
    results.innerHTML = "";
    const listItem = document.createElement("li");
    listItem.className = "empty";
    listItem.textContent = message;
    results.appendChild(listItem);
  }

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim();

    if (!query) {
      showMessage("検索語を入力すると、保存済みブックマークだけを端末内で検索します。");
      return;
    }

    chrome.bookmarks.search({ query }, function (bookmarks) {
      results.innerHTML = "";

      const matches = bookmarks.filter((bookmark) => bookmark.url);

      if (matches.length === 0) {
        showMessage("一致するブックマークはありません。");
        return;
      }

      for (const bookmark of matches) {
        if (!bookmark.url) {
          continue;
        }

        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = bookmark.url;
        link.target = "_blank";
        link.rel = "noreferrer";

        const title = document.createTextNode(bookmark.title || bookmark.url);
        link.appendChild(title);

        const url = document.createElement("span");
        url.className = "url";
        url.textContent = bookmark.url;

        listItem.appendChild(link);
        listItem.appendChild(url);
        results.appendChild(listItem);
      }
    });
  });
});
