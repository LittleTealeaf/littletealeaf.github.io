/// ABOUT ME

/// Stats
fetch("./resources/data/stats.json")
  .then((response) => response.json())
  .then((stats) => {
    const element = document.getElementById("stats");

    const TIMEFRAMES = [
      {
        name: "Past 7 Days",
        data: stats.waka.week,
      },
      {
        name: "Past 30 Days",
        data: stats.waka.month,
      },
      {
        name: "All Time",
        data: stats.waka.all,
      },
    ];

    
  });
