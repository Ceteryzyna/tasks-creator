{
    const tasks = [
        {
            content: "podlać kwiaty",
            done: false,
        },
        {
            content: "umyć włosy",
            done: true,
        },
    ];

    const redner = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
               <li>
               ${task.content}
               </li>
        `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

    };

const init = () => {
    redner();

};

init();
}