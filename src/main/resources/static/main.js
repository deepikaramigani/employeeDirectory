// main.js

const employees = [{
        id: 1,
        firstName: "Alice",
        lastName: "Smith",
        email: "alice@example.com",
        department: "HR",
        role: "Manager"
    },
    {
        id: 2,
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob@example.com",
        department: "IT",
        role: "Developer"
    },
    {
        id: 3,
        firstName: "Charlie",
        lastName: "Lee",
        email: "charlie@example.com",
        department: "Finance",
        role: "Analyst"
    }
];

let filteredEmployees = [...employees];
let editMode = false;
let editId = null;

function renderEmployees(list) {
    const container = document.getElementById("employee-list");
    container.innerHTML = "";
    list.forEach(emp => {
        const card = document.createElement("div");
        card.className = "employee-card";
        card.innerHTML = `
      <p><strong>${emp.firstName} ${emp.lastName}</strong></p>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
        container.appendChild(card);
    });
}

function searchEmployees(term) {
    term = term.toLowerCase();
    filteredEmployees = employees.filter(emp =>
        emp.firstName.toLowerCase().includes(term) ||
        emp.lastName.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term)
    );
    renderEmployees(filteredEmployees);
}

function sortEmployees(by) {
    filteredEmployees.sort((a, b) => a[by].localeCompare(b[by]));
    renderEmployees(filteredEmployees);
}

function applyFilters() {
    const first = document.getElementById("filter-first").value.toLowerCase();
    const last = document.getElementById("filter-last").value.toLowerCase();
    const email = document.getElementById("filter-email").value.toLowerCase();
    const dept = document.getElementById("filter-dept").value.toLowerCase();
    const role = document.getElementById("filter-role").value.toLowerCase();

    filteredEmployees = employees.filter(emp =>
        (!first || emp.firstName.toLowerCase().includes(first)) &&
        (!last || emp.lastName.toLowerCase().includes(last)) &&
        (!email || emp.email.toLowerCase().includes(email)) &&
        (!dept || emp.department.toLowerCase().includes(dept)) &&
        (!role || emp.role.toLowerCase().includes(role))
    );

    renderEmployees(filteredEmployees);
}

function resetFilters() {
    document.getElementById("filter-first").value = "";
    document.getElementById("filter-last").value = "";
    document.getElementById("filter-email").value = "";
    document.getElementById("filter-dept").value = "";
    document.getElementById("filter-role").value = "";
    filteredEmployees = [...employees];
    renderEmployees(filteredEmployees);
}

function deleteEmployee(id) {
    const index = employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
        employees.splice(index, 1);
        filteredEmployees = [...employees];
        renderEmployees(filteredEmployees);
    }
}

function editEmployee(id) {
    const emp = employees.find(emp => emp.id === id);
    if (emp) {
        document.getElementById("filter-first").value = emp.firstName;
        document.getElementById("filter-last").value = emp.lastName;
        document.getElementById("filter-email").value = emp.email;
        document.getElementById("filter-dept").value = emp.department;
        document.getElementById("filter-role").value = emp.role;
        editMode = true;
        editId = id;
        document.getElementById("apply-filters").textContent = "Update";
    }
}

function applyOrUpdateEmployee() {
    const first = document.getElementById("filter-first").value.trim();
    const last = document.getElementById("filter-last").value.trim();
    const email = document.getElementById("filter-email").value.trim();
    const dept = document.getElementById("filter-dept").value.trim();
    const role = document.getElementById("filter-role").value.trim();

    if (!first || !last || !email || !dept || !role) {
        alert("All fields are required.");
        return;
    }

    if (editMode) {
        const emp = employees.find(e => e.id === editId);
        if (emp) {
            emp.firstName = first;
            emp.lastName = last;
            emp.email = email;
            emp.department = dept;
            emp.role = role;
        }
        editMode = false;
        editId = null;
        document.getElementById("apply-filters").textContent = "Apply";
    } else {
        const newId = Math.max(...employees.map(e => e.id)) + 1;
        employees.push({
            id: newId,
            firstName: first,
            lastName: last,
            email: email,
            department: dept,
            role: role
        });
    }

    resetFilters();
    renderEmployees(filteredEmployees);
}

// Event Listeners
window.onload = () => {
    renderEmployees(employees);

    document.getElementById("search").addEventListener("input", (e) => {
        searchEmployees(e.target.value);
    });

    document.getElementById("sort").addEventListener("change", (e) => {
        if (e.target.value) sortEmployees(e.target.value);
    });

    document.getElementById("apply-filters").addEventListener("click", applyOrUpdateEmployee);
    document.getElementById("reset-filters").addEventListener("click", resetFilters);
};