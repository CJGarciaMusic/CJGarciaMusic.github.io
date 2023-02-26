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
        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
        }
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '_' + dd + '_' + yyyy;

        pdf.save(`CJ_Garcia_Resume_${today}.pdf`);
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
    buttonText = evt.path[0].id;
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
