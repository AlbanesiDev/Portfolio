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
                <a class="btn-link" href="${item.url_web}" ${item.url_web === '' ? 'class="disabled"' : ''} target="_blank">
                    <div>
                        <i class="fa fa-globe"></i>
                        Ver web
                    </div>
                </a>
                <a class="btn-link" href="${item.url_github}" ${item.url_github === '' ? 'class="disabled"' : ''} target="_blank">
                    <div>
                        <i class="fa fa-github"></i>
                        Ver código
                    </div>
                </a>
            </div>
        </div>
        <div class="projects__visual" onmouseenter="playVideo(${i})" onmouseleave="pauseVideo(${i})">
            <img src="${item.image}" alt="${item.title}" class="${isHovered[i] ? 'hovered' : ''}">
            <video class="video ${isHovered[i] ? 'hovered' : ''}" preload="none" muted loop>
                <source src="${item.video}" type="video/mp4" />
            </video>
        </div>
    </div>
    `).join('');
}


function playVideo(index) {
    const videoPlayer = document.querySelectorAll('.video')[index];
    videoPlayer.play();
    isHovered[index] = true;
    updateView();
}

function pauseVideo(index) {
    const videoPlayer = document.querySelectorAll('.video')[index];
    videoPlayer.pause();
    isHovered[index] = false;
    updateView();
}