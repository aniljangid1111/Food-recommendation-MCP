import { getFoodFromSheet } from "@/lib/google/sheets.service";

export async function GET() {
  try {
    const foods = await getFoodFromSheet();

    return Response.json({
      success: true,
      count: foods.length,
      data: foods,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to read Google Sheet",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}