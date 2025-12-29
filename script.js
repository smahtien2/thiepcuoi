
fetch("/.netlify/functions/rsvp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    full_name: document.getElementById("full_name").value,
    number_of_guests: document.getElementById("number_of_guests").value,
    attending: document.querySelector('input[name="attending"]:checked')?.value,
    message: document.getElementById("message").value
  })
})
.then(res => res.json())
.then(data => {
  alert(data.message || "Đã gửi xác nhận!");
})
.catch(err => {
  console.error(err);
  alert("Gửi thất bại");
});