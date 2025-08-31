document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("internshipForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop actual submission for now

    // ✅ For testing: skip validation completely
    // Later you can enable checks like if(field.value.trim() === "")

    // Redirect to internship page
    window.location.href = "internshippage.html";
  });
});
