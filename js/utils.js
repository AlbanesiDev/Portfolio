let personal = [];
let experience = [];
let studies = [];
let skills = [];

function loadData() {
    fetch("/assets/json/info.json")
        .then((res) => res.json())
        .then((data) => {
            personal = data[0].personal;
            experience = data[0].experience;
            studies = data[0].studies;
            skills = data[0].skills;
            createSections();
            updateView();
        })
        .catch((err) => {
            console.error(err);
        });
}