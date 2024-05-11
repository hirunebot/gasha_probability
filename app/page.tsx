"use client";
import { NoFallbackError } from "next/dist/server/base-server";
import NumberField from "./NumberField";
import { useState } from "react";


export default function Home() {
  const [stones, setStones] = useState(0)
  const [stoneForSummon, setStoneForSummon] = useState(0)
  const [summonRate, setSummonRate] = useState(0)
  const [desiredNum, setDesiredNum] = useState(0)
  const sendValue1 = (newVal: number) => {
    setStones(newVal)
  }
  const sendValue2 = (newVal: number) => {
    setStoneForSummon(newVal)
  }
  const sendValue3 = (newVal: number) => {
    setSummonRate(newVal)
  }
  const sendValue4 = (newVal: number) => {
    setDesiredNum(newVal)
  }
  let summonable: number = 0
  if (stones > 0 && stoneForSummon > 0) {
    summonable = Math.trunc(stones / stoneForSummon)
  }
  return (
    <main>
      <h1 className="px-4 py-5 bg-zinc-300 font-bold">ガシャ確率計算機</h1>
      <div className="px-4 py-5">test</div>

      <NumberField id="stones" label="所持している石" unit="個" func={sendValue1} />
      <NumberField id="stonesForSummon" label="ガシャ1回に必要な石" unit="個" func={sendValue2} />
      <NumberField id="summonRate" label="排出率" unit="%" func={sendValue3} />
      <NumberField id="desiredNum" label="希望個数" unit="個" func={sendValue4} />
      <div>
        <button>計算</button>
      </div>

      <h1 className="text-center py-10">
        {summonable}連可
        <br />{desiredNum}個以上出る確率は~%
      </h1>
    </main>
  );
}