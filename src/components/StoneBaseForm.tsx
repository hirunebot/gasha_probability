import { Box, Stack } from "@mui/material";
import { NumberField } from "./NumberField";
import { useAtom } from "jotai";
import { desiredAmountAtom, isPityConsideredAtom, pityItemsFromSummonAtom, requiredPityItemsAtom, stoneForSummonAtom, stonesAtom, summonRateAtom } from "../stores/atoms";


export interface StoneBaseFormPresenterProps {
    children: React.ReactNode;
}

export const StoneBaseFormPresenter: React.FC<StoneBaseFormPresenterProps> = (props) => {
    return (
        <div>
            <span>{props.children}</span>
        </div>
    );
}

export interface StoneBaseFormProps {}

export const StoneBaseForm: React.FC<StoneBaseFormProps> = () => {
    const [stones, setStones] = useAtom(stonesAtom)
    const [stoneForSummon, setStoneForSummon] = useAtom(stoneForSummonAtom)
    const [summonRate, setSummonRate] = useAtom(summonRateAtom);
    const [desiredAmount, setDesiredAmount] = useAtom(desiredAmountAtom);
    const [isPityConsidered] = useAtom(isPityConsideredAtom);
    const [pityItemsFromSummon, setPityItemsFromSummon] = useAtom(pityItemsFromSummonAtom);
    const [requiredPityItems, setRequiredPityItems] = useAtom(requiredPityItemsAtom);

    return (
        <StoneBaseFormPresenter>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column', 
                    gap: 1,
                }}
                >
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <NumberField 
                            label="所持石" 
                            id="stones" 
                            unit="個" 
                            state={stones} 
                            setState={setStones} 
                        />
                        <NumberField 
                            label="ガチャ1回に必要な石" 
                            id="stonesForSummon" 
                            unit="個" 
                            state={stoneForSummon} 
                            setState={setStoneForSummon}
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
        </StoneBaseFormPresenter>
    );
}