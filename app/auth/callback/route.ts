import { NextRequest, NextResponse } from "next/server";
import { handleDimoCallback } from "../../lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  try {
    const user = await handleDimoCallback(code!);

    // Optional: Set a session or cookies here
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
