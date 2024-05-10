"use client";
import { NoFallbackError } from "next/dist/server/base-server";
import NumberField from "./NumberField";


export default function Home() {
  return (
    <main>
      <h1 className="px-4 py-5 bg-zinc-300 font-bold">ガシャ確率計算機</h1>
      <div className="px-4 py-5">test</div>

      <NumberField id="stones" label="所持している石" unit="個" />
      <NumberField id="stonesForMultiSummon" label="10連ガシャに必要な石" unit="個" />
      <NumberField id="summonRate" label="排出率" unit="%" />
      <NumberField id="desiredNum" label="希望個数" unit="個" />

      <h1 className="text-center py-10">
        ~連可
        <br />~個以上出る確率は~%
      </h1>
    </main>
  );
}