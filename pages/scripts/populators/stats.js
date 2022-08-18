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

            const { projects, operating_systems, languages, editors } = option.data;

            e_content.append(...[
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
            ].map(({name, data}) => {


                return createElement({
                    content: [
                        name,
                        "#######"
                    ]
                })
            }))
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
