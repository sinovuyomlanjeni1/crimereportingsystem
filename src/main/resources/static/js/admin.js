// admin.js – Crime Reporting System (Admin Panel)

document.addEventListener("DOMContentLoaded", () => {

    const adminLoginForm = document.getElementById("adminLoginForm");
    const adminDashboard = document.getElementById("adminDashboard");
    const reportsContainer = document.getElementById("adminReportsContainer");
    const statusUpdateFormWrapper = document.getElementById("statusUpdateForm");
    const statusUpdateForm = document.getElementById("updateStatusForm");

    // -----------------------------
    // ADMIN LOGIN (Demo Only)
    // -----------------------------
    if (adminLoginForm) {
        adminLoginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("adminEmail").value;
            const password = document.getElementById("adminPassword").value;

            // Demo credentials (acceptable for junior project)
            if (email === "admin@crimereport.co.za" && password === "(admin123)") {

                // Hide login, show dashboard
                document.querySelector(".admin-login").classList.add("hidden");
                adminDashboard.classList.remove("hidden");

                loadAdminReports();

            } else {
                alert("Invalid admin credentials");
            }
        });
    }

    // -----------------------------
    // LOAD ALL REPORTS (ADMIN)
    // -----------------------------
    function loadAdminReports() {
        const reportsContainer = document.getElementById("adminReportsContainer");

        reportsContainer.innerHTML = "<h2 style='color:green'>ADMIN REPORTS LOADED</h2>";

        fetch("http://localhost:8080/api/admin/reports")
            .then(res => res.json())
            .then(data => {
                console.log("REPORTS FROM API:", data);
                renderReports(data);
            })
            .catch(err => console.error(err));
    }


    // -----------------------------
    // RENDER REPORTS
    // -----------------------------
    function renderReports(reports) {
        reportsContainer.innerHTML = "";

        reports.forEach(report => {
            const card = document.createElement("div");
            card.className = "report-card";

            card.innerHTML = `
                <h3>${report.title} <small>#${report.id}</small></h3>

                <p><strong>Area:</strong> ${report.area}</p>
                <p><strong>Location:</strong> ${report.location}</p>
                <p><strong>Incident Date:</strong> ${formatDate(report.incidentDate)}</p>
                <p><strong>Description:</strong> ${report.description}</p>

                <p>
                    <strong>Status:</strong>
                    <span class="status ${getStatusClass(report.status)}">
                        ${report.status}
                    </span>
                </p>

                <button class="btn update-btn" data-id="${report.id}">
                    Update Status
                </button>
            `;

            reportsContainer.appendChild(card);
        });

        document.querySelectorAll(".update-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                showStatusForm(btn.dataset.id);
            });
        });
    }

    // -----------------------------
    // SHOW STATUS UPDATE FORM
    // -----------------------------
    function showStatusForm(reportId) {
        document.getElementById("reportId").value = reportId;
        document.getElementById("adminId").value = 1; // demo admin ID

        statusUpdateFormWrapper.classList.remove("hidden");
        statusUpdateFormWrapper.scrollIntoView({ behavior: "smooth" });
    }

    // -----------------------------
    // UPDATE STATUS (ADMIN)
    // -----------------------------
    if (statusUpdateForm) {
        statusUpdateForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const payload = {
                reportId: document.getElementById("reportId").value,
                adminId: document.getElementById("adminId").value,
                status: document.getElementById("status").value,
                comments: document.getElementById("comments").value
            };

            fetch("http://localhost:8080/api/admin/status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
                .then(res => {
                    if (!res.ok) throw new Error("Failed to update status");
                    return res.json();
                })
                .then(() => {
                    alert("Status updated successfully");
                    statusUpdateForm.reset();
                    statusUpdateFormWrapper.classList.add("hidden");
                    loadAdminReports();
                })
                .catch(err => {
                    console.error(err);
                    alert("Error updating status");
                });
        });
    }

    // -----------------------------
    // HELPERS
    // -----------------------------
    function formatDate(dateString) {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleString("en-ZA");
    }

    function getStatusClass(status) {
        switch (status.toLowerCase()) {
            case "pending": return "status-pending";
            case "under investigation": return "status-investigation";
            case "resolved": return "status-resolved";
            case "rejected": return "status-rejected";
            default: return "";
        }
    }
});

