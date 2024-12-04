// Toggling side bar menu, handling overlay behavior
// First of all getting sidebar element, checking if it exists then adding or removing styles
function toggleMenu() {
    const aside = document.querySelector("aside");
    const overlay = document.querySelector(".sidebar-overlay");
    const body = document.body;

    aside.classList.toggle("active");
    body.classList.toggle("sidebar-active");

    if (!overlay) {
        const newOverlay = document.createElement("div");
        newOverlay.classList.add("sidebar-overlay");
        document.body.appendChild(newOverlay);

        // Closing the sidebar after clicking
        newOverlay.addEventListener("click", () => {
            aside.classList.remove("active");
            body.classList.remove("sidebar-active");
            newOverlay.remove();
        });
    }
}

// Checking all fields (email, empty fields) first, error handling is added also
function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    return true;
}

// Everything that is need for FAQ Page
function toggleAnswer(id) {
    const answer = document.getElementById(`answer-${id}`); 
    answer.style.display = answer.style.display === "block" ? "none" : "block";
}

// Adding of new things to FAQ, error handling is here also
function addNewFAQ(question, answer) {
    console.log("ANSWER: ", answer); 

    const faqContainer = document.getElementById("faq-container"); 

    const faqItem = document.createElement("div");
    faqItem.classList.add("faq-item");
    faqItem.id = `${faqContainer.children.length + 1}`;

    const questionElement = document.createElement("h2");
    questionElement.textContent = question;
    questionElement.onclick = function () {
        console.log(faqItem.id);
        toggleAnswer(faqItem.id);
    };

    const answerElement = document.createElement("p");
    answerElement.classList.add("answer"); 
    answerElement.textContent = answer; 
    answerElement.id = `answer-${faqContainer.children.length + 1}`;

    faqItem.appendChild(questionElement);
    faqItem.appendChild(answerElement);

    faqContainer.appendChild(faqItem);
}

// Searching for services' list
function searchService() {
    const searchInput = document.getElementById("service-search");
    const tbody = document.querySelector(".services tbody");

    // Handling case when there is no result while searching
    const noResultsMessage = document.createElement("tr");
    noResultsMessage.innerHTML =
        '<td colspan="3" style="text-align: center; padding: 20px;">No services found</td>';
    noResultsMessage.style.display = "none";
    tbody.appendChild(noResultsMessage);

    // Filtering according to our input in the field
    function filterServices() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const rows = document.querySelectorAll(
            ".services tbody tr:not(:last-child)"
        );
        let matchFound = false; 

        rows.forEach((row) => {
            const text = row.textContent.toLowerCase(); 
            if (text.includes(searchTerm)) {
                row.style.display = "";
                matchFound = true;
            } else {
                row.style.display = "none";
            }
        });

        noResultsMessage.style.display = matchFound ? "none" : "";
    }

    searchInput.addEventListener("input", filterServices);
}

//Auto detecting and highlighting item in navigation links
function autoDetectActiveNavLink() {
    const navLinks = document.getElementById("nav-links");

    for (let i = 0; i < navLinks.children.length; i++) {
        const link = navLinks.children[i];
        console.log(window.location.href.includes(link.children[0].href));

        if (window.location.href.includes(link.children[0].href)) {
            link.classList.add("active");
        }
    }
}

// DOM for finding and initializing of features based on parameters
document.addEventListener("DOMContentLoaded", function () {
    autoDetectActiveNavLink();

    if (window.location.href.includes("services")) {
        searchService();
    } else if (window.location.href.includes("faq")) {
        addNewFAQ(
            "How do I create an account?",
            "To create an account, simply click on the 'Sign Up' button on the homepage and fill out the form."
        );

        addNewFAQ(
            "How do I become a better student?",
            "By studying hard and practicing regularly, you can become a better student."
        );
    }
});
