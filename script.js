var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '_' + dd + '_' + yyyy;

function openSection(evt, sectionName) {
    var i, tabContent, tablinks;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(sectionName).style.display = "block";
    if (evt.currentTarget != undefined) {
        evt.currentTarget.className += " active";
    }
}

function createTextPDF(resumeType) {
    window.jsPDF = window.jspdf.jsPDF
    var textResume = new jsPDF({
        orientation: 'p',
        unit: 'in',
        format: [8.5, 11],
        putOnlyUsedFonts: true,
    });


    var distance_05 = 0.05;
    var distance_10 = 0.1;
    var distance_15 = 0.15;
    var distance_20 = 0.2;
    var distance_25 = 0.25;
    var distance_30 = 0.3;
    var distance_35 = 0.35;
    var distance_40 = 0.40;
    var distance_45 = 0.45;
    var distance_50 = 0.5;
    var distance_50 = 0.5;
    var distance_35 = 0.325;

    var left_margin = distance_40;
    var indent_dot = 0.8;
    var indent_margin = 0.9
    var right_margin = 8.1;


    var distance_current = distance_40;

    function increaseCurrent(given_distance) {
        distance_current += given_distance;
    }

    textResume.setLineWidth(0.01);

    var section_heading_size = 14;
    var section_subheader_size = 12;
    var section_content_size = 10;

    var name = document.getElementsByClassName("name")[0].innerHTML;
    textResume.setFont("helvetica", "bold");
    textResume.setFontSize(16);
    textResume.text(name, left_margin, distance_current);

    var subtitle = document.getElementsByClassName("subtitle")[0].innerHTML;
    increaseCurrent(distance_25);
    textResume.setFont("helvetica", "normal");
    textResume.setFontSize(section_subheader_size);
    textResume.text(subtitle, left_margin, distance_current);

    var contactInfo = document.getElementsByClassName("contact-row");
    var email = contactInfo[0].innerText.replace("email\n", "");
    var phone = contactInfo[1].innerText.replace("phone_android\n", "");
    var location = contactInfo[2].innerText.replace("location_on\n", "");
    var github = contactInfo[3].innerText;
    textResume.setFontSize(section_content_size);
    increaseCurrent(distance_20);
    textResume.text(`${email} • ${phone} • ${location}  • ${github}`, left_margin, distance_current);

    increaseCurrent(distance_15);
    textResume.line(left_margin, distance_current, right_margin, distance_current);

    var skillsSection = document.getElementsByClassName("skills-content")[0].children;
    var technicalSkills = skillsSection[1].innerText.replace("\n", " ").replaceAll("\n", ", ");
    var durableSkills = skillsSection[2].innerText.replace("\n", " ").replaceAll("\n", ", ");

    increaseCurrent(distance_25);
    textResume.setFont("helvetica", "bold");
    textResume.setFontSize(section_heading_size);
    textResume.text("Skills", left_margin, distance_current);

    increaseCurrent(distance_20);
    textResume.setFont("helvetica", "normal");
    textResume.setFontSize(section_content_size);
    // TODO: technical skills breakout
    textResume.text(technicalSkills, left_margin, distance_current);

    increaseCurrent(distance_20);
    textResume.text(durableSkills, left_margin, distance_current);

    var workHistoryTitle = document.getElementsByClassName("work-history-title");
    var workHistoryCompany = document.getElementsByClassName("work-history-company");
    var workHistorySummary = document.getElementsByClassName("work-history-summary");
    var workHistorySection = document.getElementsByClassName("work-history-section");
    var workHistoryExperience = document.getElementsByClassName("work-history-experience");

    increaseCurrent(distance_15)
    textResume.line(left_margin, distance_current, right_margin, distance_current);

    increaseCurrent(distance_25);
    textResume.setFont("helvetica", "bold");
    textResume.setFontSize(section_heading_size);
    textResume.text("Work Experience", left_margin, distance_current);

    increaseCurrent(distance_25);
    textResume.setFontSize(section_subheader_size);
    if (resumeType == 'External') {
        textResume.text(workHistoryTitle[0].innerText, left_margin, distance_current);
    }
    // if (resumeType == 'Google') {
    //     textResume.text("Software Engineering Apprentice", left_margin, distance_current);
    // }

    increaseCurrent(distance_20);
    textResume.setFont("helvetica", "normal");
    textResume.setFontSize(section_subheader_size);
    textResume.text(workHistoryCompany[0].innerText, left_margin, distance_current);

    increaseCurrent(distance_20);
    textResume.setFont("helvetica", "italic");
    textResume.setFontSize(section_content_size);
    var googleTime = workHistorySummary[0].innerText.split("\n");
    textResume.text(googleTime[0], left_margin, distance_current);
    textResume.text(googleTime[1], right_margin, distance_current, null, null, "right");

    increaseCurrent(distance_25);
    textResume.setFont("helvetica", "bold");
    textResume.text(workHistorySection[0].innerText, left_margin, distance_current);

    increaseCurrent(distance_25);
    textResume.setFont("helvetica", "normal");
    var devlIntexExperience = workHistoryExperience[0].innerText.split("\n");
    textResume.text("•", indent_dot, distance_current);
    textResume.text(devlIntexExperience[0].trim(), indent_margin, distance_current, { maxWidth: 7.2 - (indent_margin - indent_dot) });

    increaseCurrent(distance_40);
    textResume.text("•", indent_dot, distance_current);
    textResume.text(devlIntexExperience[1].trim(), indent_margin, distance_current, { maxWidth: 7.2 - indent_margin });

    increaseCurrent(distance_25);
    textResume.text("•", indent_dot, distance_current);
    textResume.text(devlIntexExperience[2].trim(), indent_margin, distance_current, { maxWidth: 7.2 - (indent_margin - indent_dot) });

    increaseCurrent(distance_40);
    textResume.text("•", indent_dot, distance_current);
    textResume.text(devlIntexExperience[3].trim(), indent_margin, distance_current, { maxWidth: 7.2 - (indent_margin - indent_dot) });

    increaseCurrent(distance_25);
    textResume.text("•", indent_dot, distance_current);
    textResume.text(devlIntexExperience[4].trim(), indent_margin, distance_current, { maxWidth: 7.2 - indent_margin });


    increaseCurrent(distance_35);
    textResume.setFont("helvetica", "bold");
    textResume.text(workHistorySection[1].innerText, left_margin, distance_current);

    increaseCurrent(distance_25);
    textResume.setFont("helvetica", "normal");
    var playPointsExperience = workHistoryExperience[1].innerText.split("\n");
    textResume.text("•", indent_dot, distance_current);
    textResume.text(playPointsExperience[0].trim(), indent_margin, distance_current, { maxWidth: 7.2 - (indent_margin - indent_dot) });

    increaseCurrent(distance_40);
    textResume.text("•", indent_dot, distance_current);
    textResume.text(playPointsExperience[1].trim(), indent_margin, distance_current, { maxWidth: 7.2 - indent_margin });

    increaseCurrent(distance_40);
    textResume.text("•", indent_dot, distance_current);
    textResume.text(playPointsExperience[2].trim(), indent_margin, distance_current, { maxWidth: 7.2 - indent_margin });


    increaseCurrent(distance_50);
    textResume.setFont("helvetica", "bold");
    textResume.setFontSize(section_subheader_size);
    textResume.text(workHistoryTitle[1].innerText, left_margin, distance_current);

    increaseCurrent(distance_20);
    textResume.setFont("helvetica", "normal");
    textResume.text(workHistoryCompany[1].innerText, left_margin, distance_current);

    increaseCurrent(distance_20);
    textResume.setFont("helvetica", "italic");
    textResume.setFontSize(section_content_size);
    var makeMusicTime = workHistorySummary[1].innerText.split("\n");
    textResume.text(makeMusicTime[0], left_margin, distance_current);
    textResume.text(makeMusicTime[1], right_margin, distance_current, null, null, "right");

    increaseCurrent(distance_25);
    textResume.setFont("helvetica", "bold");
    textResume.text("Repertoire Development", left_margin, distance_current);

    increaseCurrent(distance_25);
    textResume.setFont("helvetica", "normal");
    var makeMusicExperience = workHistoryExperience[2].innerText.split("\n");
    textResume.text("•", indent_dot, distance_current);
    textResume.text(makeMusicExperience[0].trim(), indent_margin, distance_current, { maxWidth: 7.2 - (indent_margin - indent_dot) });

    increaseCurrent(distance_40);
    textResume.text("•", indent_dot, distance_current);
    textResume.text(makeMusicExperience[1].trim(), indent_margin, distance_current, { maxWidth: 7.2 - (indent_margin - indent_dot) });

    increaseCurrent(distance_25);
    textResume.text("•", indent_dot, distance_current);
    textResume.text(makeMusicExperience[2].trim(), indent_margin, distance_current, { maxWidth: 7.2 - (indent_margin - indent_dot) });

    increaseCurrent(distance_25);
    textResume.text("•", indent_dot, distance_current);
    textResume.text(makeMusicExperience[3].trim(), indent_margin, distance_current, { maxWidth: 7.2 - (indent_margin - indent_dot) });

    increaseCurrent(distance_15)
    textResume.line(left_margin, distance_current, right_margin, distance_current);


    increaseCurrent(distance_25);
    textResume.setFont("helvetica", "bold");
    textResume.setFontSize(section_heading_size);
    textResume.text("Certifications", left_margin, distance_current);

    var certs = document.getElementsByClassName("reference-link");
    var certs = certs[certs.length - 1].innerText.split("\n");

    increaseCurrent(distance_25);
    textResume.setFont("helvetica", "normal");
    textResume.setFontSize(section_content_size);
    textResume.text("•", indent_dot, distance_current);
    textResume.text(certs[0].trim(), indent_margin, distance_current, { maxWidth: 7.2 - indent_margin });

    increaseCurrent(distance_25);
    textResume.text("•", indent_dot, distance_current);
    textResume.text(certs[1].trim(), indent_margin, distance_current, { maxWidth: 7.2 - indent_margin });

    increaseCurrent(distance_25);
    textResume.text("•", indent_dot, distance_current);
    textResume.text(certs[2].trim(), indent_margin, distance_current, { maxWidth: 7.2 - indent_margin });

    increaseCurrent(distance_25);
    textResume.text("•", indent_dot, distance_current);
    textResume.text(certs[3].trim(), indent_margin, distance_current, { maxWidth: 7.2 - indent_margin });

    increaseCurrent(distance_25);
    textResume.text("•", indent_dot, distance_current);
    textResume.text(certs[4].trim(), indent_margin, distance_current, { maxWidth: 7.2 - indent_margin });

    increaseCurrent(distance_15)
    textResume.line(left_margin, distance_current, right_margin, distance_current);


    increaseCurrent(distance_25);
    textResume.setFont("helvetica", "bold");
    textResume.setFontSize(section_heading_size);
    textResume.text("Education", left_margin, distance_current);

    increaseCurrent(distance_25);
    textResume.setFontSize(section_subheader_size);
    textResume.text(workHistoryTitle[2].innerText, left_margin, distance_current);

    increaseCurrent(distance_20);
    textResume.setFont("helvetica", "normal");
    textResume.setFontSize(section_subheader_size);
    textResume.text(workHistoryCompany[2].innerText, left_margin, distance_current);

    increaseCurrent(distance_20);
    textResume.setFont("helvetica", "italic");
    textResume.setFontSize(section_content_size);
    var educationDetails = workHistorySummary[2].innerText.split("\n");
    textResume.text(educationDetails[0], left_margin, distance_current);
    textResume.text(educationDetails[1], right_margin, distance_current, null, null, "right");

    if (resumeType == "External") {
        textResume.save(`CJ_Garcia_Resume_${today}.pdf`);
    }
    if (resumeType == "Google") {
        textResume.save(`CJ_Garcia_gResume_${today}.pdf`);
    }
}

function createPDFfromHTML() {
    var HTML_Width = $(".resume-content").width();
    var HTML_Height = $(".resume-content").height();
    var top_left_margin = 15;
    var PDF_Width = (HTML_Width + (top_left_margin * 2) / 2);
    var PDF_Height = ((HTML_Height) + (top_left_margin * 2) / 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas($(".resume-content")[0]).then(function (canvas) {
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        window.jsPDF = window.jspdf.jsPDF;
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);

        pdf.save(`CJ_Garcia_Resume_Image_${today}.pdf`);
    });
}

function columnClick(event) {
    var element = event.srcElement;
    element.classList.toggle("collapsible-active");
    var content = element.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

function navTo(evt) {
    var projectTab = document.getElementById("ProjectsTab");
    openSection(projectTab, "Projects");
    projectTab.className += " active";
    var coll = document.getElementsByClassName("collapsible");
    buttonText = evt.srcElement.id;
    for (var i = 0; i < coll.length; i++) {
        coll[i].classList.remove("collapsible-active");
        var content = coll[i].nextElementSibling;
        content.style.maxHeight = null;
    }
    for (var i = 0; i < coll.length; i++) {
        if (coll[i].innerText == buttonText) {
            coll[i].click();
        }
    }
}