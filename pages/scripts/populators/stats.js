fetch("./resources/data/stats.json")
    .then((response) => response.json())
    .then((data) => {
        const { waka } = data;
        const { month: waka_month, week: waka_week, all_time: waka_all } = waka;

        const data_spans = [
            {
                name: "Past 7 Days",
                data: waka_week,
            },
            {
                name: "Past 30 Days",
                data: waka_month,
            },
            {
                name: "All Time",
                data: waka_all,
            },
        ];

        const element = document.getElementById("stats");

        const e_content = createElement({
            classNames: ["content"],
        });

        const selectors = data_spans.map((timeframe) =>
            createElement({
                onclick: () => renderData(timeframe),
                content: timeframe.name,
            })
        );

        function renderData(option) {
            selectors.forEach((selector) => {
                selector.dataset.selected = selector.innerText == option.name;
            });
            e_content.innerHTML = "";

            const { projects, operating_systems, languages, editors, daily_average, total_time } = option.data;

            e_content.append(
                createElement({
                    content: [
                        createElement({
                            node: "table",
                            content: [
                                createElement({
                                    node: "tr",
                                    content: [
                                        createElement({
                                            node: "td",
                                            content: "Total Time",
                                        }),
                                        createElement({
                                            node: "td",
                                            content: total_time,
                                        }),
                                    ],
                                }),
                                createElement({
                                    node: "tr",
                                    content: [
                                        createElement({
                                            node: "td",
                                            content: "Daily Average",
                                        }),
                                        createElement({
                                            node: "td",
                                            content: daily_average,
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                ...[
                    {
                        name: "Editors",
                        data: editors,
                    },
                    {
                        name: "Projects",
                        data: projects,
                    },
                    {
                        name: "Operating Systems",
                        data: operating_systems,
                    },
                    {
                        name: "Languages",
                        data: languages,
                    },
                ].map(({ name, data }) => {
                    var max_percent = 0;

                    data.forEach((entry) => {
                        if (max_percent < entry.percent) {
                            max_percent = entry.percent;
                        }
                    });

                    data.forEach((entry) => {
                        entry.percent_scaled = (entry.percent / max_percent) * 100;
                    });

                    return createElement({
                        content: [
                            createElement({
                                node: "table",
                                content: [
                                    createElement({
                                        node: "tr",
                                        classNames: ["table_header"],
                                        content: [
                                            createElement({
                                                node: "td",
                                                content: name,
                                            }),
                                            createElement({
                                                node: "td",
                                                content: "Time",
                                            }),
                                            createElement({
                                                node: "td",
                                                content: "Percent",
                                            }),
                                        ],
                                    }),
                                    ...data.map((entry) =>
                                        createElement({
                                            node: "tr",
                                            content: [
                                                createElement({
                                                    node: "td",
                                                    content: entry.name,
                                                }),
                                                createElement({
                                                    node: "td",
                                                    content: String(entry.digital),
                                                }),
                                                createElement({
                                                    node: "td",
                                                    content: String(entry.percent).concat("%"),
                                                }),
                                                createElement({
                                                    node: "td",
                                                    content: "#".repeat(Math.ceil(entry.percent_scaled / 10)),
                                                }),
                                            ],
                                        })
                                    ),
                                ],
                            }),
                        ],
                    });
                })
            );
        }

        element.append(
            createElement({
                classNames: ["header"],
                content: selectors,
            })
        );

        element.append(e_content);

        renderData(data_spans[0]);
    });
