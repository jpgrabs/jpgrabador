// Example Projects Data
const projects = [
    {
        id: 1,
        title: "Project 1 Title",
        image: "images/proj-logo/ic_kapartner.png",
        description: "This is the detailed description of Project 1. You can explain the features, technologies used, challenges faced, and the results.",
        link:"kapartner-app-smart.html"
    },
    {
        id: 2,
        title: "Project 2 Title",
        image: "images/proj-logo/ic_kapartner.png",
        description: "Detailed description of Project 2. Explain what it does, why you built it, and how it works.",
        link:"#"
    },
    {
        id: 3,
        title: "Project 3 Title",
        image: "images/proj-logo/ic_kapartner.png",
        description: "Detailed description of Project 3. Include challenges and how you overcame them.",
        link:"#"
    },
    {
        id: 1,
        title: "Project 1 Title",
        image: "images/proj-logo/ic_kapartner.png",
        description: "This is the detailed description of Project 1. You can explain the features, technologies used, challenges faced, and the results.",
        link:"#"
    },
    {
        id: 2,
        title: "Project 2 Title",
        image: "images/proj-logo/ic_kapartner.png",
        description: "Detailed description of Project 2. Explain what it does, why you built it, and how it works.",
        link:"#"
    },
    {
        id: 1,
        title: "Project 1 Title",
        image: "images/proj-logo/ic_kapartner.png",
        description: "This is the detailed description of Project 1. You can explain the features, technologies used, challenges faced, and the results.",
        link:"#"
    },
    {
        id: 2,
        title: "Project 2 Title",
        image: "images/proj-logo/ic_kapartner.png",
        description: "Detailed description of Project 2. Explain what it does, why you built it, and how it works.",
        link:"#"
    }
];

// Load projects into tech-projects.html
if (document.getElementById("projects-gallery")) {
    const gallery = document.getElementById("projects-gallery");
    projects.forEach(project => {
        const item = document.createElement("div");
        item.classList.add("project-item");
        item.innerHTML = `
            <a href="${project.link}?id=${project.id}">
                <img src="${project.image}" alt="${project.title}">
               
            </a>
             <p>${project.title}</p>
        `;
        gallery.appendChild(item);
    });
}

// Load single project into project.html
if (document.getElementById("project-details")) {
    const params = new URLSearchParams(window.location.search);
    const projectId = parseInt(params.get("id"));
    const project = projects.find(p => p.id === projectId);

    if (project) {
        document.getElementById("project-details").innerHTML = `
            <h2>${project.title}</h2>
            <img src="${project.image}" alt="${project.title}" style="max-width:600px;display:block;margin:auto;">
            <p>${project.description}</p>
        `;
        document.title = project.title + " - Project Details";
    } else {
        document.getElementById("project-details").innerHTML = `<p>Project not found.</p>`;
    }
}
