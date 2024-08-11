import { useState } from "react";
import { NumberField } from "../NumberField";
import { Box } from "@mui/material";

export default function NumberFieldPage() {
    const [stones, setStones] = useState(0)
    const [stoneForSummon, setStoneForSummon] = useState(0)
    const [summonRate, setSummonRate] = useState(0)
    const [desiredNum, setDesiredNum] = useState(0)
    let summonable: number = 0
    if (stones > 0 && stoneForSummon > 0) {
        summonable = Math.trunc(stones / stoneForSummon)
    }

    const math = require('mathjs')
    const n = summonable
    const k = desiredNum
    const p = summonRate / 100
    let p_n_k = 0
    if (n >= k) {
        p_n_k = math.combinations(n, k) * math.pow(p, k) * math.pow(1 - p, n - k)
        p_n_k = Math.round(p_n_k * 100000) / 1000
    }
    let test = 0
    if (n >= k) {
        for (let i = 0; i < k; i++) {
            test += math.combinations(n, i) * math.pow(p, i) * math.pow(1 - p, n - i)
        }
        test = Math.round((1 - test) * 100000) / 1000
    }

    return (
        <main>
            <h1 className="px-4 py-5 bg-zinc-300 font-bold">ガシャ確率計算機</h1>
            <div className="px-4 py-5">test</div>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'row', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <div>所持石</div>
                    <NumberField id="stones" unit="個" func={setStones} />
                    <div>目玉の排出率</div>
                    <NumberField id="summonRate" unit="%" func={setSummonRate} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <div>ガシャ1回に必要な石</div>
                    <NumberField id="stonesForSummon" unit="個" func={setStoneForSummon} />
                    <div>希望個数</div>
                    <NumberField id="desiredNum" unit="個" func={setDesiredNum} />
                </Box>
            </Box>
            <div className="px-4">
                <button>計算</button>
            </div>
            <h1 className="text-center py-10">
                {summonable}連可
                <br />{desiredNum}個以上出る確率は{test}%
                <br />ちょうど{k}回出る確率は{p_n_k}%
            </h1>
    </main>
    );
}
