import { NoFallbackError } from "next/dist/server/base-server";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import NumberField from "./NumberField";


export default function Home() {
  return (
    <main>
      <h1 className="px-4 py-5 bg-zinc-300 font-bold">ガシャ確率計算機</h1>
      <div className="px-4 py-5">test</div>

      <NumberField label="所持している石" unit="個" />
      <NumberField label="10連ガシャに必要な石" unit="個" />
      <NumberField label="排出率" unit="%" />
      <NumberField label="希望個数" unit="個" />

      <div className="px-4">
        ~連可能
      </div>
      <div className="px-4">
        ~個以上出る確率は~%
      </div>
    </main>
  );
}