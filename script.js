$(document).ready(function () {

    let tasks = loadTasks();
    render();
    renderDate();

    function renderDate() {
        const days = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];
        const months = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
        const d = new Date();
        $("#day").text(`${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`);
    }

    git