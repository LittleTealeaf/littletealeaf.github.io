fetch("./resources/data/stats.json")
    .then((response) => response.json())
    .then((data) => {
        const { waka } = data;
        const { month: waka_month, week: waka_week, all_time: waka_all } = waka;
    });
