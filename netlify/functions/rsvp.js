import { neon } from "@netlify/neon";

export const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { full_name, number_of_guests, attending, message } =
      JSON.parse(event.body || "{}");

    const sql = neon(); // tự động dùng NETLIFY_DATABASE_URL

    await sql`
      INSERT INTO rsvp_guests (full_name, number_of_guests, attending, message)
      VALUES (${full_name}, ${number_of_guests}, ${attending}, ${message})
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "🎉 Đã ghi nhận xác nhận của bạn!" }),
    };

  } catch (err) {
    console.error("RSVP ERROR:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "❌ Lỗi server", error: err.message }),
    };
  }
};
