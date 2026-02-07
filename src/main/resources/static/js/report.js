// JavaScript for report submission and viewing
document.addEventListener('DOMContentLoaded', function() {
    // Form submission for reporting a crime
    const reportForm = document.getElementById('crimeReportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', handleReportSubmit);
    }

    // Filtering functionality for viewing reports
    const areaFilter = document.getElementById('areaFilter');
    const filterBtn = document.getElementById('filterBtn');
    const reportsContainer = document.getElementById('reportsContainer');

    if (areaFilter && filterBtn && reportsContainer) {
        // Load all reports initially
        loadReports();

        // Filter reports by area
        filterBtn.addEventListener('click', function() {
            const area = areaFilter.value;
            loadReports(area === 'all' ? null : area);
        });
    }

    // Handle report form submission
    function handleReportSubmit(e) {
        e.preventDefault();

        if (validateReportForm()) {
            const reportData = {
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                location: document.getElementById('location').value,
                area: document.getElementById('area').value,
                incidentDate: document.getElementById('incidentDate').value,
                reporterName: document.getElementById('reporterName').value || 'Anonymous',
                reporterEmail: document.getElementById('reporterEmail').value || null,
                reporterPhone: document.getElementById('reporterPhone').value || null
            };

            submitReport(reportData);
        }
    }

    // Validate report form
    function validateReportForm() {
        let isValid = true;

        // Validate required fields
        const requiredFields = ['title', 'description', 'location', 'area', 'incidentDate'];
        requiredFields.forEach(field => {
            const element = document.getElementById(field);
            const errorElement = document.getElementById(`${field}-error`);

            if (!element.value.trim()) {
                errorElement.textContent = 'This field is required';
                isValid = false;
            } else {
                errorElement.textContent = '';
            }
        });

        // Validate email if provided
        const email = document.getElementById('reporterEmail').value;
        const emailError = document.getElementById('reporterEmail-error');

        if (email && !validateEmail(email)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        return isValid;
    }

    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Submit report to backend
 function submitReport(reportData) {
     // Convert the incidentDate to ISO string format
     const formattedData = {
         ...reportData,
         incidentDate: reportData.incidentDate

     };

     fetch('http://localhost:8080/api/reports', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             'Accept': 'application/json'
         },
         body: JSON.stringify(formattedData)
     })
     .then(response => {
         if (!response.ok) {
             return response.text().then(text => { throw new Error(text) });
         }
         return response.json();
     })
     .then(data => {
         console.log('Report submitted successfully:', data);
         document.getElementById('crimeReportForm').classList.add('hidden');
         document.getElementById('successMessage').classList.remove('hidden');
     })
     .catch(error => {
         console.error('Error submitting report:', error);
         alert(`Error submitting report: ${error.message}`);
     });
 }

    // Load reports from backend
 function loadReports(area = null) {
     reportsContainer.innerHTML = '<div class="loading">Loading reports...</div>';

     let url = 'http://localhost:8080/api/reports';
     if (area) {
         url += `/area/${encodeURIComponent(area)}`;
     }

     fetch(url, {
         headers: {
             'Accept': 'application/json'
         }
     })
     .then(response => {
         if (!response.ok) {
             return response.text().then(text => { throw new Error(text) });
         }
         return response.json();
     })
     .then(reports => {
         if (reports.length === 0) {
             reportsContainer.innerHTML = '<div class="no-reports">No reports found for this area.</div>';
         } else {
             renderReports(reports);
         }
     })
     .catch(error => {
         console.error('Error loading reports:', error);
         reportsContainer.innerHTML = `
             <div class="error">
                 Error loading reports: ${error.message}
                 <button onclick="loadReports()" class="btn">Retry</button>
             </div>
         `;
     });
 }


    // Render reports to the page
    function renderReports(reports) {
        reportsContainer.innerHTML = '';

        reports.forEach(report => {
            const reportCard = document.createElement('div');
            reportCard.className = 'report-card';

            const statusClass = getStatusClass(report.status);

            reportCard.innerHTML = `
                <h3>${report.title}</h3>
                <div class="report-meta">
                    <span>${report.area}</span>
                    <span>${formatDate(report.incidentDate)}</span>
                </div>
                <p>${report.description}</p>
                <div class="report-footer">
                    <span class="report-status ${statusClass}">${report.status}</span>
                    <span>Reported on: ${formatDate(report.reportedAt)}</span>
                </div>
            `;

            reportsContainer.appendChild(reportCard);
        });
    }

    // Helper function to format dates
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-ZA', options);
    }

    // Helper function to get CSS class for status
    function getStatusClass(status) {
        switch(status.toLowerCase()) {
            case 'pending': return 'status-pending';
            case 'under investigation': return 'status-investigation';
            case 'resolved': return 'status-resolved';
            case 'rejected': return 'status-rejected';
            default: return '';
        }
    }
});