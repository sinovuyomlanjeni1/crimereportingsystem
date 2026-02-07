// Main JavaScript for the homepage
document.addEventListener('DOMContentLoaded', function() {
    console.log('Crime Reporting System - Homepage loaded');

    // Example: Display a welcome message
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.innerHTML = `
        <h2>Welcome to the Crime Reporting System</h2>
        <p>Report crimes anonymously or with your details to help make your community safer.</p>
    `;
    document.querySelector('main').prepend(welcomeMessage);

    // Example: Add a click event listener to the "Report Now" button
    const reportNowButton = document.querySelector('.hero .btn');
    if (reportNowButton) {
        reportNowButton.addEventListener('click', function() {
            alert('Redirecting to the report submission page...');
            window.location.href = 'report.html';
        });
    }

    // Example: Add a click event listener to the "View Reports" button
    const viewReportsButton = document.querySelector('.features .btn');
    if (viewReportsButton) {
        viewReportsButton.addEventListener('click', function() {
            alert('Redirecting to the reports page...');
            window.location.href = 'view-reports.html';
        });
    }
});