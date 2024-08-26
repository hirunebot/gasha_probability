import { Box, Stack } from "@mui/material";
import { NumberField } from "./NumberField";


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

export interface StoneBaseFormProps {
    summonRate: string;
    desiredNum: string;
    pityItemsFromSummon: string;
    requiredPityItems: string;
    stoneForSummon: string;
    stones: string;
    setStones: (value: string) => void;
    setStoneForSummon: (value: string) => void;
    setSummonRate: (value: string) => void;
    setDesiredNum: (value: string) => void;
    isPityConsidered: boolean;
    setPityItemsFromSummon: (value: string) => void;
    setRequiredPityItems: (value: string) => void;
    calculationMode: string;
}

export const StoneBaseForm: React.FC<StoneBaseFormProps> = (props) => {
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
                            state={props.stones} 
                            setState={props.setStones} 
                            key={props.calculationMode} 
                        />
                        <NumberField 
                            label="ガチャ1回に必要な石" 
                            id="stonesForSummon" 
                            unit="個" 
                            state={props.stoneForSummon} 
                            setState={props.setStoneForSummon}
                            key={props.calculationMode} 
                        />
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <NumberField 
                            label="目玉の排出率" 
                            id="summonRate" 
                            unit="%" 
                            state={props.summonRate}
                            setState={props.setSummonRate} 
                        />
                        <NumberField 
                            label="希望個数" 
                            id="desiredNum"
                            unit="個" 
                            state={props.desiredNum}
                            setState={props.setDesiredNum} 
                        />
                    </Stack>
                    {props.isPityConsidered && 
                        <Stack direction="row" spacing={2} justifyContent="center">
                            <NumberField 
                                label="ガチャ1回に付く天井アイテム数" 
                                id="pityItemsFromSummon" 
                                unit="個"
                                state={props.pityItemsFromSummon} 
                                setState={props.setPityItemsFromSummon} 
                            />
                            <NumberField 
                                label="交換に必要な天井アイテム数" 
                                id="requiredPityItems"
                                unit="個" 
                                state={props.requiredPityItems} 
                                setState={props.setRequiredPityItems} 
                            />
                        </Stack>
                    }
                </Box>
        </StoneBaseFormPresenter>
    );
}