const axios = require("axios");

async function getBase64Image(imageUrl) {
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const base64 = Buffer.from(response.data, "binary").toString("base64");
  return base64;
}

async function handleText(text, replyToken) {
  console.log({ text, replyToken });

  // คีย์เวิร์ดที่ต้องการให้ตรงเป็นตัวพิมพ์เล็ก-ใหญ่
  const greetings = [
    "สวัสดีครับ",
    "สวั",
    "สวัสดีค้าบ",
    "สวัสดี",
    "สวัส ดี",
    "สวัสดีคะ",
    "สวัสดีค่ะ",
    "ดีครับ",
    "ดีจ้า",
    "ดีจ่ะ",
    "ดีคับ",
  ];
  const goodbye = [
    "ขอบคุณครับ",
    "ขอบคุณ",
    "ขอบคุณมาก",
    "ขอบคุณมากครับ",
    "ขอบคุณมากค่ะ",
    "ขอบ",
    "แต๊งจ่ะ",
    "thx",
    "ใจมาก",
    "ใจจร้า",
    "จัยนะ",
    "ขอบจัย",
  ];
  const questions = [
    "งบประมาณ",
    "ให้ไปตอนไหน",
    "มีใครอยู่มั้ย",
    "เปิดกี่โมง",
  ];

  const urlwebsize = [
    "เว็บไซต์",
    "ขอช่องทางติดต่อเพิ่มเติม",
    "ขอเบอร์",
    "ขอเฟส",
    "ขอเว็บ",
    "ขอเว็บไซต์ของ อบต",
    "ขอเว็บไซต์ของทาง อบต",
  ];

  const pictureKeywords = ["ขอดูรูป", "ขอดูรูปหน่อย"];
  const locationKeywords = [
    "ที่ตั้ง",
    "สถานที่",
    "ที่อยู่อบต",
    "ที่อยู่อ.บ.ต",
    "โลเคชั่น",
    "ขอโลเคชั่น",
    "หน่วยงานคุณอยู่ที่ใหน",
    "อยู่ที่ใหน",
    "ขอที่อยู่ที่ทำการ",
    "อยู่ที่ไหน",
    "ขอที่อยู่",
    "ที่ทำการอยู่ไหน",
    "อยู่ไหน",
    "ตำแหน่งที่ตั้ง",
  ];

  const normalizedText = text.trim().toLowerCase();

  // ฟังก์ชันตรวจสอบว่าข้อความตรงกับคำใดคำหนึ่งใน array หรือไม่
  const isMatched = (keywords, input) => keywords.some((keyword) => input.includes(keyword));

  if (isMatched(greetings, normalizedText)) {
    return {
      type: "text",
      text: "สวัสดีค่ะ",
    };
  } else if (isMatched(goodbye, normalizedText)) {
    return {
      type: "text",
      text: "ไม่เป็นไรค่ะ",
    };
  } else if (isMatched(questions, normalizedText)) {
    return {
      type: "text",
      text: "ตอนนี้ยังไม่สามารถตอบได้",
    };
  } else if (isMatched(urlwebsize, normalizedText)) {
    const websize = "http://obt-bangsaotong.go.th/index";
    return {
      type: "text",
      text: ` เว็บของเรา ${websize} `,
    };
  } else if (isMatched(locationKeywords, normalizedText)) {
    // ส่งที่อยู่ที่ตั้งของคุณพร้อมลิ้ง URL
    const yourLocation =
      "องค์การบริหารส่วนตำบลบางเสาธง  ตำบลบางเสาธง อำเภอบางเสาธง สมุทรปราการ 10540";
    const locationUrl = "https://maps.app.goo.gl/NGfS8z4cUFHkKXMq9";
    return {
      type: "text",
      text: `ที่ตั้งของเราคือ: ${yourLocation}\nรายละเอียดเพิ่มเติม: ${locationUrl}`,
    };
  } else if (isMatched(pictureKeywords, normalizedText)) {
    // รูปภาพที่ต้องการแสดง
    const imageUrl =
      "https://scontent.fbkk28-1.fna.fbcdn.net/v/t39.30808-6/367717014_6238341949610657_708588569749229337_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=VhGlr1iThvkAX9RLsSs&_nc_ht=scontent.fbkk28-1.fna&oh=00_AfBJyBssgnoet5NTFyDHw3M-A7YXuiK1flwKsGt3OxR8WQ&oe=65899CFA";

    // สร้าง URL แบบ Base64 จากรูปภาพที่ต้องการแสดง
    const base64Image = await getBase64Image(imageUrl);
    // ส่งข้อมูลรูปภาพกลับ
    return {
      type: "image",
      originalContentUrl: imageUrl,
      previewImageUrl: imageUrl,
    };
  } else {
    // ถ้าไม่ตรงกับเงื่อนไขใดเลย ให้ทำการ return ข้อความเดิมที่ถูกส่งเข้ามา
    return {
      type: "text",
      text: text,
    };
  }
}

module.exports = {
  handleText,
};
