document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const results = document.getElementById("results");

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim();

    if (!query) {
      results.innerHTML = "";
      return;
    }

    chrome.bookmarks.search(query, function (bookmarks) {
      results.innerHTML = "";

      for (const bookmark of bookmarks) {
        if (!bookmark.url) {
          continue;
        }

        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = bookmark.url;
        link.target = "_blank";

        // アイコンを追加
        const favicon = document.createElement("img");
        favicon.src = `https://www.google.com/s2/favicons?domain=${bookmark.url}`;
        link.appendChild(favicon);

        const title = document.createTextNode(bookmark.title);
        link.appendChild(title);

        listItem.appendChild(link);
        results.appendChild(listItem);
      }
    });
  });
});
