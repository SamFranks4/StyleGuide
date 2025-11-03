// Highlight the active sidebar link based on current page
const sidebarLinks = document.querySelectorAll('.sidebar-links a');

// Get the current page filename (e.g., "index.html" or "researchpage.html")
const currentPage = window.location.pathname.split("/").pop();

sidebarLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});
