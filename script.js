$(document).ready(function () {

let tasks = loadTasks();
render();
renderDate();

function renderDate() {
    const days = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];
    const months = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
    const d = new Date();
    $("#header-day").text(`${days[d.getDay()]}`);
    $("#header-date").text(`${d.getDate()} ${months[d.getMonth()]}`);
}

function saveTasks() { localStorage.setItem("tasks", JSON.stringify(tasks)); 
}

function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function render() {
    const filter = $(".filter.active").data("type");
    const search = $("#search").val().toLowerCase();

    $("#todo-list").empty();

    tasks
        .filter(t => search.length < 3 || t.title.toLowerCase().includes(search))
        .filter(t =>
            filter === "all" ||
            (filter === "active" && !t.completed) ||
            (filter === "completed" && t.completed)
        )
        .forEach(t => {
            $("#todo-list").append(`
                <div class="todo-item ${t.completed ? "completed" : ""}">
                    <input type="checkbox" class="check" data-id="${t.id}" ${t.completed?"checked":""}>
                    <span>${t.date || "Без даты"} — ${t.title}</span>
                </div>
            `);
        });
}

$(".filter").click(function(){
    $(".filter").removeClass("active"); 
    $(this).addClass("active");
    render();
});

$("#search").on("input", render);

$(document).on("change", ".check", function () {
    const t = tasks.find(x => x.id == $(this).data("id"));
    t.completed = this.checked;
    saveTasks();
    render();
});

$(".search").click(()=> $("#search").focus());

$(".add-btn").click(()=> $(".modal-bg").show());
$("#close-modal").click(()=> $(".modal-bg").hide());

$("#add-task").click(function () {
    const title = $("#task-text").val().trim();
    const date = $("#task-date").val();

    if (!title) return alert("Введите описание задачи!");

    tasks.push({
        id: Date.now(),
        title,
        date,
        completed: false,
    });

    saveTasks();
    render();

    $("#task-text").val("");
    $("#task-date").val("");
    $(".modal-bg").hide();
    });
});