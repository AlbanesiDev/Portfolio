let skills = [];
let projects = [];
let studies = [];
let isHovered = [];
let isMobile = false;

const studiesContainer = document.getElementById("studiesContainer");
const skillsContainer = document.getElementById("skillsContainer");
const pdfButton = document.getElementById("pdfButton");

async function loadData() {
    try {
        const response = await fetch("public/assets/json/info.json");
        const data = await response.json();
        studies = data[0].studies;
        projects = data[0].projects;
        console.log(projects);
        updateView();
    } catch (err) {
        console.error(err);
    }
}

function updateView() {
    updateStudies();
    updateProjects();
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

// Función para manejar el texto en dispositivos móviles
function textBalance(text) {
    if (isMobile && text.includes("(")) {
        const textSplit = text.split("(");
        return textSplit[0].trim() + "\n(" + textSplit[1];
    } else {
        return text;
    }
}

// Event listener para el evento resize
window.addEventListener("resize", () => {
    checkWindowSize();
    updateView();
});
// Función para verificar el tamaño de la ventana y actualizar la variable isMobile
function checkWindowSize() {
    isMobile = window.innerWidth < 768;
}
// Event listener para el botón del PDF
pdfButton.addEventListener("click", () => {
    window.open("/assets/pdf/CV_Joaquin-Albanesi.pdf", "_blank");
});


function updateProjects() {
    const projectsWrapper = document.getElementById("projectsWrapper");
    projectsWrapper.innerHTML = projects.map((item, i) => `
    <div class="projects__row ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'}">
        <div class="projects__description">
            <h3>${item.type} | ${item.date}</h3>
            <h2>${item.title}</h2>
            <div class="projects__description-text">${item.description}</div>
            <p>${item.stack}</p>
            <div class="projects__description-links">
                <a class="btn-link ${item.url_web === '' ? 'disabled' : ''}" href="${item.url_web}" target="_blank">
                    <div>
                        <i class="fa fa-globe"></i>
                        Ver web
                    </div>
                </a>
                <a class="btn-link ${item.url_github === '' ? 'disabled' : ''}" href="${item.url_github}" target="_blank">
                <div>
                        <i class="fa fa-github"></i>
                        Ver código
                    </div>
                </a>
            </div>
        </div>
        <div class="projects__visual" onmouseenter="playVideo(${i})" onmouseleave="pauseVideo(${i})">
            <img src="${item.image}" alt="${item.title}" class="">
            <video class="video" preload="none" muted loop>
                <source src="${item.video}" type="video/mp4" />
            </video>
        </div>
    </div>
    `).join('');
}


function playVideo(index) {

}

function pauseVideo(index) {

}

// Inicializar la carga de datos al cargar la página
loadData();
checkWindowSize();
