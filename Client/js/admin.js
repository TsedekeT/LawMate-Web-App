// Mock data from backend
let requests = [];

// JavaScript - Fetch Data from Backend
fetch("http://localhost:4000/lawyer/fetch")
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
    requests = data;
    lawyerTable(); // Populate table after data is fetched
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Populate table
let tableBody;
document.addEventListener("DOMContentLoaded", function () {
  tableBody = document.getElementById("requestTable");
  // Do not call lawyerTable() here, it's called after fetching the data
});

// Function to populate table with data
function lawyerTable() {
  tableBody.innerHTML = ""; // Clear existing rows
  requests.forEach((request) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${request.lawyer_id}</td> <!-- Assuming lawyer_id exists in the data -->
      <td>${request.full_name}</td>
      <td>${request.email}</td>
      <td>${request.specialization}</td>
      <td>${request.lawyer_credentials}</td>
      <td>${request.is_accepted == 0 ? "Pending" : "Approved"}</td>
      <td><button class="approve-btn" onclick="approveRequest(${request.lawyer_id})">✅ Approve</button></td>
      <td><button class="delete-btn" onclick="deleteRequest(${request.lawyer_id})">🚫 Reject</button></td>
    `;
    tableBody.appendChild(row);
  });
}

// Approve request
async function approveRequest(lawyer_id) {
  const response = await fetch(`http://localhost:4000/lawyer/approve/${lawyer_id}`, {
    method: "PUT", // Assuming you update the status with a PUT request
  });

  if (response.ok) {
    const updatedLawyer = await response.json();
    console.log('Approved:', updatedLawyer);
    requests = requests.map(request =>
      request.lawyer_id === lawyer_id ? { ...request, is_accepted: 1 } : request
    );
    lawyerTable(); // Refresh table
  } else {
    const error = await response.json();
    console.error("Approval failed:", error);
    alert("Failed to approve lawyer.");
  }
}

// Delete request (Reject)
async function deleteRequest(lawyer_id) {
  if (confirm("Are you sure you want to reject this request?")) {
    const response = await fetch(`http://localhost:4000/lawyer/delete/${lawyer_id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      requests = requests.filter(request => request.lawyer_id !== lawyer_id); // Remove from array
      lawyerTable(); // Refresh table
    } else {
      const error = await response.json();
      console.error("Rejection failed:", error);
      alert("Failed to reject lawyer.");
    }
  }
}

