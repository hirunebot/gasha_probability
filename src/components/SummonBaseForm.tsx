import { Box, Stack } from "@mui/material";
import { NumberField } from "./NumberField";
import { useAtom } from "jotai";
import { calculateSummonsAtom, desiredAmountAtom, isPityConsideredAtom, pityItemsFromSummonAtom, requiredPityItemsAtom, summonRateAtom } from "../stores/atoms";


export interface SummonBaseFormPresenterProps {
    children: React.ReactNode;
}

export const SummonBaseFormPresenter: React.FC<SummonBaseFormPresenterProps> = (props) => {
    return (
        <div>
            <span>{props.children}</span>
        </div>
    );
}

export interface SummonBaseFormProps {}

export const SummonBaseForm: React.FC<SummonBaseFormProps> = () => {
    const [summons, calculateSummons] = useAtom(calculateSummonsAtom);
    const [summonRate, setSummonRate] = useAtom(summonRateAtom);
    const [desiredAmount, setDesiredAmount] = useAtom(desiredAmountAtom);
    const [isPityConsidered] = useAtom(isPityConsideredAtom);
    const [pityItemsFromSummon, setPityItemsFromSummon] = useAtom(pityItemsFromSummonAtom);
    const [requiredPityItems, setRequiredPityItems] = useAtom(requiredPityItemsAtom);
    
    return (
        <SummonBaseFormPresenter>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column', 
                    gap: 1,
                }}
                >
                    <Stack direction="row" spacing={2} justifyContent="center" sx={{position:"relative", right: "131px"}}>
                        <NumberField 
                            label="ガチャ回数" 
                            id="summons" 
                            unit="回" 
                            state={summons}
                            setState={calculateSummons}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <NumberField 
                            label="目玉の排出率" 
                            id="summonRate" 
                            unit="%"
                            state={summonRate}
                            setState={setSummonRate} 
                        />
                        <NumberField 
                            label="希望個数"
                            id="desiredNum"
                            unit="個" 
                            state={desiredAmount}
                            setState={setDesiredAmount} 
                        />
                    </Stack>
                    {isPityConsidered && 
                        <Stack direction="row" spacing={2} justifyContent="center">
                            <NumberField 
                                label="ガチャ1回に付く天井アイテム数" 
                                id="pityItemsFromSummon" 
                                unit="個" 
                                state={pityItemsFromSummon}
                                setState={setPityItemsFromSummon} 
                            />
                            <NumberField 
                                label="交換に必要な天井アイテム数" 
                                id="requiredPityItems" 
                                unit="個" 
                                state={requiredPityItems}
                                setState={setRequiredPityItems} 
                            />
                        </Stack>
                    }
                </Box>
        </SummonBaseFormPresenter>
    );
}