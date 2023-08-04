// Stat Tables
(() => {
  const fetch_promise = Promise.all(
    ["all_time", "last_30_days", "last_7_days", "last_year"].map((range) =>
      fetch(`data/wakatime/${range}.json`)
        .then((res) => res.json())
        .then((data) => ({ range, data }))
    )
  );
  const tables = {};

  document.querySelectorAll("#stats .stats table").forEach((table) => {
    const type = table.dataset.content;
    tables[type] = table;

    // Build up the table contents
    {
      const th = document.createElement("th");
      th.colSpan = 2;
      const th_tr = document.createElement("tr");
      const th_td = document.createElement("td");
      th_td.textContent = table.dataset.name;
      th_td.colSpan = 2;
      th_tr.append(th_td);
      th.append(th_tr);
      table.append(th);
    }
    {
      const body = document.createElement("tbody");
      table.append(body);

      const row_count = Number(table.dataset.rows);

      for (let i = 0; i < row_count; i++) {
        const row = document.createElement("tr");
        row.dataset.rank = i;
        body.append(row);

        const label = document.createElement("td");
        label.classList.add("label");
        row.append(label);

        const data = document.createElement("td");
        data.classList.add("data");
        row.append(data);
      }
    }
  });

  fetch_promise
    .then((data_entries) => {
      let stats = {};
      data_entries.forEach(({ range, data }) => {
        stats[range] = data;
      });
      return stats;
    })
    .then((stats) => {
      const tabs = document.querySelectorAll("#stats .tabs .tab");

      function updateTable(table, stats) {
        const rows = table.querySelectorAll("tbody tr");
        for (const row of rows) {
          const value = row.dataset.rank < stats.length ? stats[row.dataset.rank] : null;
          row.querySelector(".label").textContent = value?.name || "";
          row.querySelector(".data").textContent = value?.text || "";
        }
      }

      function setStats(range) {
        const data = stats[range];
        if (!data) {
          throw new Error("Invalid Range");
        }

        for (const tab of tabs) {
          tab.dataset.selected = tab.dataset.range == range;
        }

        Object.entries(tables).forEach(([label, table]) => updateTable(table, data[label]));
      }

      for (const tab of tabs) {
        tab.addEventListener("click", () => {
          setStats(tab.dataset.range);
        });
      }

      setStats("last_7_days");
    });
})();
