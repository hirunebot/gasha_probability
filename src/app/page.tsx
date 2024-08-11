"use client";
import { NoFallbackError } from "next/dist/server/base-server";
import { NumberField } from "../components/NumberField";
import { useState } from "react";
import NumberFieldPage from "../components/page/NumberFieldPage";


export default function Home() {
    return (
        <NumberFieldPage />
    );
}