let personal = [];
let experience = [];
let studies = [];
let skills = [];
let isMobile = false;

const pdfButton = document.getElementById("pdfButton");
const aboutContainer = document.getElementById("about");
const sections = [
    { title: "INFORMACIÓN PERSONAL", containerId: "personalInfoContainer" },
    { title: "EXPERIENCIA", containerId: "experienceContainer" },
    { title: "ESTUDIOS", containerId: "studiesContainer" },
    { title: "HABILIDADES", containerId: "skillsContainer" },
];

// Función para cargar los datos desde el servicio o archivo JSON
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

function createSections() {
    sections.forEach((section) => {
        let sectionDiv = document.createElement("div");
        sectionDiv.classList.add("about__info", "reveal-animation");

        let titleDiv = document.createElement("div");
        titleDiv.classList.add("about__info-title");

        let h3 = document.createElement("h3");
        h3.textContent = section.title;

        titleDiv.appendChild(h3);

        let containerDiv = document.createElement("div");
        containerDiv.id = section.containerId;
        containerDiv.classList.add("about__info-container");

        sectionDiv.appendChild(titleDiv);
        sectionDiv.appendChild(containerDiv);

        aboutContainer.appendChild(sectionDiv);
    });

    // Obtener referencias a los elementos del DOM después de crearlos dinámicamente
    personalInfoContainer = document.getElementById("personalInfoContainer");
    experienceContainer = document.getElementById("experienceContainer");
    studiesContainer = document.getElementById("studiesContainer");
    skillsContainer = document.getElementById("skillsContainer");
}

// Función para actualizar la vista con los datos cargados
function updateView() {
    updatePersonalInfo();
    updateExperience();
    updateStudies();
    updateSkills();
}

// Función para actualizar la sección de información personal
function updatePersonalInfo() {
    personalInfoContainer.innerHTML = "";
    personal.forEach((item) => {
        let infoItem = document.createElement("div");
        infoItem.classList.add("about__info-item");

        let strong = document.createElement("strong");
        strong.textContent = item.name;

        let p = document.createElement("p");
        p.textContent = item.value;

        infoItem.appendChild(strong);
        infoItem.appendChild(p);

        personalInfoContainer.appendChild(infoItem);
    });
}

// Función para actualizar la sección de experiencia
function updateExperience() {
    experienceContainer.innerHTML = "";
    experience.forEach((item) => {
        let infoItem = document.createElement("div");
        infoItem.classList.add("about__info-item");

        let strong = document.createElement("strong");
        strong.textContent = item.name;

        let p = document.createElement("p");
        p.textContent = item.value;

        infoItem.appendChild(strong);
        infoItem.appendChild(p);

        experienceContainer.appendChild(infoItem);
    });
}

// Función para actualizar la sección de estudios
function updateStudies() {
    studiesContainer.innerHTML = "";
    studies.forEach((item) => {
        let studiesItem = document.createElement("div");
        studiesItem.classList.add("about__info-item");

        let div = document.createElement("div");

        let strong = document.createElement("strong");
        strong.textContent = item.name;

        let dynamicP = document.createElement("p");
        dynamicP.classList.add("dynamic");
        dynamicP.textContent = item.institute;

        div.appendChild(strong);
        div.appendChild(dynamicP);

        let p = document.createElement("p");
        p.style.whiteSpace = isMobile ? "pre-wrap" : "normal";
        p.textContent = textBalance(item.value);

        studiesItem.appendChild(div);
        studiesItem.appendChild(p);

        studiesContainer.appendChild(studiesItem);
    });
}

// Función para actualizar la sección de habilidades
function updateSkills() {
    skillsContainer.innerHTML = "";
    skills.forEach((item) => {
        let skillsItem = document.createElement("div");
        skillsItem.classList.add("about__info-skill");

        let strong = document.createElement("strong");
        strong.textContent = item.name;

        let skillBar = document.createElement("div");
        skillBar.classList.add("skill__bar");

        let skillBarFill = document.createElement("div");
        skillBarFill.classList.add("skill__bar-fill");
        skillBarFill.style.width = item.percentage + "%";

        skillBar.appendChild(skillBarFill);

        let p = document.createElement("p");
        p.textContent = item.value;

        skillsItem.appendChild(strong);
        skillsItem.appendChild(skillBar);
        skillsItem.appendChild(p);

        skillsContainer.appendChild(skillsItem);
    });
}

// Función para manejar el texto en dispositivos móviles
function textBalance(text) {
    if (isMobile && text.includes("(")) {
        const textSplit = text.split("(");
        return textSplit[0].trim() + "\n(" + textSplit[1];
    } else {
        return text;
    }
}

// Función para verificar el tamaño de la ventana y actualizar la variable isMobile
function checkWindowSize() {
    isMobile = window.innerWidth < 768;
}

// Event listener para el evento resize
window.addEventListener("resize", () => {
    checkWindowSize();
    updateView();
});

// Event listener para el botón del PDF
pdfButton.addEventListener("click", () => {
    window.open("/assets/pdf/CV_Joaquin-Albanesi.pdf", "_blank");
});

// Font weight animation
document.addEventListener("mousemove", (event) => {
    const headers = document.querySelectorAll("[appFontWeight]");

    headers.forEach((header) => {
        const rect = header.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const weight = calculateWeight(x, 200, 600, window.innerWidth);
        header.style.fontWeight = weight;
    });
});
function calculateWeight(x, min, max, windowWidth) {
    const slope = (max - min) / windowWidth;
    const calculatedWeight = min + slope * x;
    return Math.min(max, Math.max(min, calculatedWeight));
}

// Projects
document.addEventListener(
    "DOMContentLoaded",
    () => {
        const projectsTitle = document.getElementById("projectsTitle");
        const projectsWrapper = document.getElementById("projectsWrapper");

        let projects = [];
        let isHovered = [];

        function playVideo(video, index) {
            video.play();
            isHovered[index] = true;
        }

        function pauseVideo(video, index) {
            video.pause();
            isHovered[index] = false;
        }

        function renderProjects() {
            projectsWrapper.innerHTML = "";
            projects.forEach((item, index) => {
                const projectRow = document.createElement("div");
                projectRow.classList.add("projects__row");
                projectRow.classList.add(
                    index % 2 === 0 ? "reveal-left" : "reveal-right"
                );

                const projectDescription = document.createElement("div");
                projectDescription.classList.add("projects__description");

                const h3 = document.createElement("h3");
                h3.textContent = `${item.type} | ${item.date}`;

                const h2 = document.createElement("h2");
                h2.textContent = item.title;

                const descriptionText = document.createElement("div");
                descriptionText.classList.add("projects__description-text");
                descriptionText.innerHTML = item.description;

                const p = document.createElement("p");
                p.textContent = item.stack;

                const descriptionLinks = document.createElement("div");
                descriptionLinks.classList.add("projects__description-links");

                const linkWeb = createLink(item.url_web, "Ver web", faGlobe);
                const linkGithub = createLink(item.url_github, "Ver código", faGithub);

                descriptionLinks.appendChild(linkWeb);
                descriptionLinks.appendChild(linkGithub);

                projectDescription.appendChild(h3);
                projectDescription.appendChild(h2);
                projectDescription.appendChild(descriptionText);
                projectDescription.appendChild(p);
                projectDescription.appendChild(descriptionLinks);

                const projectVisual = document.createElement("div");
                projectVisual.classList.add("projects__visual");

                const img = document.createElement("img");
                img.src = item.image;
                img.alt = item.title;
                img.classList.add("hovered");
                img.addEventListener("mouseenter", () => playVideo(videoPlayer, index));
                img.addEventListener("mouseleave", () =>
                    pauseVideo(videoPlayer, index)
                );

                const videoPlayer = document.createElement("video");
                videoPlayer.src = item.video;
                videoPlayer.classList.add("video", "hovered");
                videoPlayer.preload = "none";
                videoPlayer.muted = true;
                videoPlayer.loop = true;

                projectVisual.appendChild(img);
                projectVisual.appendChild(videoPlayer);

                projectRow.appendChild(projectDescription);
                projectRow.appendChild(projectVisual);

                projectsWrapper.appendChild(projectRow);
            });
        }

        function createLink(url, text, icon) {
            const link = document.createElement("a");
            link.href = url;
            link.classList.add("btn-link");
            link.classList.add(url === "" ? "disabled" : "");

            const div = document.createElement("div");
            const iconElement = document.createElement("fa-icon");
            iconElement.icon = icon;

            div.appendChild(iconElement);
            div.appendChild(document.createTextNode(text));

            link.appendChild(div);

            return link;
        }
    },
    false
);

// Inicializar la carga de datos al cargar la página
loadData();
