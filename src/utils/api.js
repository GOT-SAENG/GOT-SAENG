export const getTodoPriorityByAI = async (todos) => {
  const MY_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  if (!MY_API_KEY) {
    throw new Error("Gemini API 키가 설정되지 않았습니다.");
  }

  // 제미나이 2.0 으로
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-lite:generateContent?key=${MY_API_KEY}`;

  const prompt = `
너는 사용자의 하루 계획을 도와주는 우선순위 플래너야.

아래의 투두 리스트를 보고, 각 할 일에 대해
1) 우선순위 순서(rank: 숫자, 1이 가장 높음)
2) 우선순위 레벨(level: high, medium, low)
3) 짧은 이유(reason)

JSON 배열 형태만 출력해줘.
❗ 절대 코드블록(\`\`\`)을 사용하지 말고, JSON만 반환해.

예시:
[
  {
    "id": 1,
    "rank": 1,
    "level": "high",
    "reason": "기한이 가까움"
  }
]

투두 리스트:
${JSON.stringify(todos)}
`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API 에러 응답:", errorData);
      throw new Error(
        `API 요청 실패: ${response.status} - ${
          errorData.error?.message || "알 수 없는 오류"
        }`
      );
    }

    const data = await response.json();

    // AI 응답 구조: data.candidates[0].content.parts[0].text
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!text) {
      throw new Error("AI 응답이 비어있습니다.");
    }

    const cleanText = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    try {
      return JSON.parse(cleanText);
    } catch (err) {
      console.error("❌ JSON 파싱 실패:", err);
      console.error("원본 텍스트:", cleanText);
      throw new Error("AI 응답 파싱 실패");
    }
  } catch (error) {
    console.error("Gemini API 오류:", error);
    throw error;
  }
};
