"use client";
import { NoFallbackError } from "next/dist/server/base-server";
import { NumberFieldPage } from "../components/page/NumberFieldPage";

export default function Home() {
    return <NumberFieldPage />;
}
