const rsvpForm = document.getElementById("rsvpForm1");

rsvpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        full_name: document.getElementById("full_name").value.trim(),
        number_of_guests: parseInt(
            document.getElementById("number_of_guests").value
        ) || 1,
        attending: document.getElementById("attending").value,
        message: document.getElementById("message").value.trim(),
        side: document.getElementById("rsvpSide").value
    };

    try {
        const res = await fetch("/.netlify/functions/rsvp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        alert(data.message || "🎉 Đã gửi xác nhận!");
        rsvpForm.reset();
        closeModal("rsvpModal");
    } catch (err) {
        console.error(err);
        alert("❌ Gửi thất bại, vui lòng thử lại");
    }
});
