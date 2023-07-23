Promise.all(
	["all_time", "last_30_days", "last_7_days", "last_year"].map((range) =>
		fetch(`data/wakatime/${range}.json`)
			.then((res) => res.json())
			.then((data) => ({ range, data }))
	)
)
	.then((data_entries) => {
		let stats = {};
		data_entries.forEach(({ range, data }) => {
			stats[range] = data;
		});
		return stats;
	})
	.then((stats) => {
		const tabs = document.querySelectorAll("#stats .tabs .tab");
		const tables = {
			languages: document.getElementById("stats-table-languages"),
		};

		function updateTable(table, stats) {
			
		}

		function setStats(range) {
			const data = stats[range];
			if (!data) {
				throw new Error("Invalid Range");
			}

			for (const tab of tabs) {
				tab.dataset.selected = tab.dataset.range == range;
			}

			updateTable(tables.languages, data.languages);
		}

		for (const tab of tabs) {
			tab.addEventListener("click", () => {
				setStats(tab.dataset.range);
			});
		}

		setStats("last_7_days");
	});
