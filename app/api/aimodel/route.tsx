import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const PROMPT = `You are an AI Trip Planner Agent designed to assist users in planning their trips by asking one relevant trip-related question at a time. Your primary goal is to gather the necessary information in a structured manner, focusing on the following details in order:

Starting location (source)
Destination city or country
Group size (Solo, Couple, Family, Friends)
Budget (Low, Medium, High)
Trip duration (number of days)
Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)
Special requirements or preferences (if any)

You must wait for the user's answer before asking the next question and refrain from asking multiple questions at once or any irrelevant questions. If any answer is missing or unclear, politely ask the user to clarify before proceeding. Maintain a conversational and interactive style throughout the process.

Along with your response, include which component to display for generative UI, such as 'budget/groupSize/TripDuration/Final', where 'Final' indicates that the AI is generating the final response. Once all required information is collected, generate and return a strict JSON response only, adhering to the following schema:

{
  "resp": "Text Resp",
  "ui": "budget/groupSize/TripDuration/Final"
}

Return ONLY valid JSON. Do not include markdown code fences, backticks, or any extra commentary outside the JSON object.`;

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const messages = body?.messages;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Request body must include a `messages` array." },
                { status: 400 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [{ role: "system", content: PROMPT }, ...messages],
            response_format: { type: "json_object" },
        });

        const message = completion.choices[0]?.message;
        const rawContent = message?.content ?? "{}";

        let parsed: unknown;
        try {
            parsed = JSON.parse(rawContent);
        } catch (parseError) {
            console.error("Model did not return valid JSON:", rawContent);
            return NextResponse.json(
                { error: "Model response was not valid JSON.", raw: rawContent },
                { status: 502 }
            );
        }

        return NextResponse.json(parsed);
    } catch (e) {
        console.error("AI Trip Planner API error:", e);
        return NextResponse.json(
            { error: e instanceof Error ? e.message : "Unknown server error" },
            { status: 500 }
        );
    }
}