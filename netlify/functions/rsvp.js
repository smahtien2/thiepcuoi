import { Client } from "pg";

export const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { full_name, number_of_guests, attending, message } =
      JSON.parse(event.body || "{}");

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();

    await client.query(
      `INSERT INTO rsvp_guests
      (full_name, number_of_guests, attending, message)
      VALUES ($1, $2, $3, $4)`,
      [full_name, number_of_guests, attending, message]
    );

    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "🎉 Đã ghi nhận xác nhận của bạn!" })
    };

  } catch (err) {
    console.error("RSVP ERROR:", err.message);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "❌ Lỗi server",
        error: err.message
      })
    };
  }
};
