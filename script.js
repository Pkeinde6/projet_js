document.addEventListener("DOMContentLoaded", function() {
    const generateBtn = document.getElementById("generateBtn");
    const container = document.getElementById("container");
    const cvContentContainer = document.getElementById('cvContent');
    const photoContainer = document.getElementById('photoContainer');

    const schools = [];
    const experiences = [];
    const languages = [];
    const interests = [];
    const skills = [];
    let photoURL = '';

    function addField(id, placeholder1, placeholder2) {
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.placeholder = placeholder1;
        inputField.id = `${id}Name`;

        const inputFieldLevel = document.createElement("input");
        inputFieldLevel.type = "text";
        inputFieldLevel.placeholder = placeholder2;
        inputFieldLevel.id = `${id}Year`;

        container.appendChild(inputField);
        container.appendChild(inputFieldLevel);
        container.appendChild(document.createElement("br"));
    }

    document.getElementById("Langue").onclick = function() {
        addField('langue', 'Nom de la langue', 'Niveau de la langue');
    };

    document.getElementById("school").onclick = function() {
        addField('school', 'Nom de l\'école', 'Année passée');
    };

    document.getElementById("exp").onclick = function() {
        addField('experience', 'Nom de l\'expérience', 'Année de l\'expérience');
    };

    document.getElementById("comp").onclick = function() {
        addField('skills', 'Compétence', 'Niveau de compétence');
    };

    document.getElementById("ci").onclick = function() {
        addField('interests', 'Nom du centre d\'intérêt', 'Détails');
    };

    document.getElementById("photo").onclick = function() {
        const photoInput = document.createElement("input");
        photoInput.type = "file";
        photoInput.accept = "image/*";
        photoInput.id = "photoInput";

        photoContainer.appendChild(photoInput);

        photoInput.addEventListener("change", function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    photoURL = e.target.result;
                    const img = document.createElement("img");
                    img.src = photoURL;
                    img.alt = "Photo de profil";
                    img.style.maxWidth = "100px";
                    img.style.maxHeight = "100px";
                    img.style.marginTop = "10px";

                    photoContainer.innerHTML = "";
                    photoContainer.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });
    };

    function generateCVContent() {
        const name = document.getElementById('name').value;
        const prenom = document.getElementById('prenom').value;
        const mail = document.getElementById('mail').value;
        const adresse = document.getElementById('adresse').value;
        const tel = document.getElementById('tel').value;
        const cp = document.getElementById('cp').value;

        let cvContent = `
        <div class="bop" style="display: flex;">
            <h3>${name} ${prenom}</h3>
            <img src="${photoURL}" alt="Photo de profil" style="max-width: 100px; max-height: 100px;border-radius:100%;">
        </div>
        <h4>Numéro de téléphone :</h4>
            <p>${tel}</p>
            <h4>Adresse mail :</h4>
            <p>${mail}</p>        
            <h4>Adresse :</h4>
            <p>${adresse}</p>
            <h4>Code postal :</h4>
            <p>${cp}</p>
        `;

        if (schools.length > 0) {
            cvContent += `<h4>Parcours Scolaire :</h4>`;
            schools.forEach(school => {
                cvContent += `<p>${school.name} (${school.year})</p>`;
            });
        }

        if (experiences.length > 0) {
            cvContent += `<h4>Expérience :</h4>`;
            experiences.forEach(experience => {
                cvContent += `<p>${experience.name} (${experience.year})</p>`;
            });
        }

        if (languages.length > 0) {
            cvContent += `<h4>Langues :</h4>`;
            languages.forEach(language => {
                cvContent += `<p>${language.name} - Niveau: ${language.level}</p>`;
            });
        }

        if (skills.length > 0) {
            cvContent += `<h4>Compétences :</h4>`;
            skills.forEach(skill => {
                cvContent += `<p>${skill.name} - Niveau: ${skill.level}</p>`;
            });
        }

        if (interests.length > 0) {
            cvContent += `<h4>Centres d'Intérêt :</h4>`;
            interests.forEach(interest => {
                cvContent += `<p>${interest.name} - ${interest.details}</p>`;
            });
        }

        cvContentContainer.innerHTML = cvContent;
    }

    function handleFieldClick(type) {
        const nameInput = document.getElementById(`${type}Name`);
        const yearInput = document.getElementById(`${type}Year`);

        if (nameInput && yearInput) {
            const name = nameInput.value;
            const year = yearInput.value;

            if (name && year) {
                if (type === 'school') {
                    schools.push({ name, year });
                } else if (type === 'experience') {
                    experiences.push({ name, year });
                } else if (type === 'langue') {
                    languages.push({ name, level: year });
                } else if (type === 'skills') {
                    skills.push({ name, level: year });
                } else if (type === 'interests') {
                    interests.push({ name, details: year });
                }
            }
        }
    }

    if (generateBtn) {
        generateBtn.onclick = function() {
            handleFieldClick('school');
            handleFieldClick('experience');
            handleFieldClick('langue');
            handleFieldClick('skills');
            handleFieldClick('interests');
            
            generateCVContent();

            const cv = document.getElementById("cv");
            if (cv) {
                cv.classList.remove("container");
                cv.classList.add("cv");
            }
        };
    }

    const generator = document.getElementById("generator");
    if (generator) {
        generator.addEventListener("click", function() {
            const cv = document.getElementById("cv");
            if (cv) {
                cv.classList.remove("container");
                cv.classList.add("cv");
            }
        });
    }
});
