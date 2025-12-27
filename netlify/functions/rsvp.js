export const handler = async (event) => {

  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwdgQmdBGOBvRerbP0hCyDOlJHxTDDMfn39oD9axngWJ8RZp86_BQEAC63bqJAXeBO4/exec";



  try {

    const data = JSON.parse(event.body);



    // Gửi dữ liệu sang Google Sheet

    await fetch(GOOGLE_SHEET_URL, {

      method: "POST",

      body: JSON.stringify(data)

    });



    return {

      statusCode: 200,

      body: JSON.stringify({ message: "Đã lưu vào Google Sheet!" })

    };

  } catch (err) {

    return {

      statusCode: 500,

      body: JSON.stringify({ error: err.message })

    };

  }

};
