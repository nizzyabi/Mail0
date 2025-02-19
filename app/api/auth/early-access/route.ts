import { NextRequest, NextResponse } from "next/server";
import { earlyAccess } from "@/db/schema";
import { env } from "@/lib/env";
import { db } from "@/db";
import pino from "pino";

type PostgresError = {
  code: string;
  message: string;
};

const logger = pino();
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 3;
const HOUR_IN_MS = 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    logger.info(`Request from IP: ${ip}`);
    const now = Date.now();
    const ipRequests = rateLimitMap.get(ip) || [];
    const recentRequests = ipRequests.filter((timestamp) => now - timestamp < HOUR_IN_MS);
    if (recentRequests.length >= RATE_LIMIT) {
      logger.warn(`Rate limit exceeded for IP ${ip}. Recent requests: ${recentRequests.length}`);
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }
    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);
    const body = await req.json();
    logger.info("Request body received", { body });
    const { email } = body;
    if (!email) {
      logger.warn("Email missing from request");
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const nowDate = new Date();
    try {
      logger.info("Attempting to insert email", { email });
      const result = await db.insert(earlyAccess).values({
        id: crypto.randomUUID(),
        email,
        createdAt: nowDate,
        updatedAt: nowDate,
      });
      logger.info("Insert successful", { result });
    } catch (err) {
      const pgError = err as PostgresError;
      logger.error(
        { err, code: pgError.code, message: pgError.message },
        "Database error during insert",
      );
      if (pgError.code === "23505") {
        return NextResponse.json(
          { message: "Email already registered for early access" },
          { status: 200 },
        );
      }
      throw err;
    }
    return NextResponse.json({ message: "Successfully joined early access" }, { status: 201 });
  } catch (error: any) {
    logger.error(
      { error, stack: error instanceof Error ? error.stack : undefined },
      "Early access registration error",
    );
    const responseError =
      env.NODE_ENV === "development"
        ? {
            error: "Internal server error",
            details: error instanceof Error ? error.message : String(error),
          }
        : { error: "Internal server error" };
    return NextResponse.json(responseError, { status: 500 });
  }
}
