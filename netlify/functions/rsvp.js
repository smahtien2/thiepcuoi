import { Client } from "pg";

export const handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const {
            full_name,
            number_of_guests,
            attending,
            message,
            side
        } = JSON.parse(event.body || "{}");

        if (!full_name || !attending) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Thiếu thông tin bắt buộc"
                })
            };
        }

        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });

        await client.connect();

        await client.query(
            `
            INSERT INTO rsvp_guests
            (full_name, number_of_guests, attending, message, side)
            VALUES ($1, $2, $3, $4, $5)
            `,
            [
                full_name,
                number_of_guests,
                attending,
                message,
                side
            ]
        );

        await client.end();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "🎉 Đã ghi nhận xác nhận của bạn!"
            })
        };
    } catch (err) {
        console.error("RSVP ERROR:", err);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "❌ Lỗi server",
                error: err.message
            })
        };
    }
};
