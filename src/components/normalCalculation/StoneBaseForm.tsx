import { Box, Stack } from "@mui/material";
import { ValidatedNumberField } from "./ValidatedNumberField";
import { useAtom } from "jotai";
import { desiredAmountAtom, isPityConsideredAtom, pityItemsFromPullAtom, requiredPityItemsAtom, currentPityItemsAtom, stoneForPullAtom, stonesAtom, pullRateAtom } from "../../stores/atoms";


export interface StoneBaseFormPresenterProps {
    children: React.ReactNode;
}

export const StoneBaseFormPresenter: React.FC<StoneBaseFormPresenterProps> = (props) => {
    return (
        <div className="space-y-4">
            {props.children}
        </div>
    );
}

export interface StoneBaseFormProps {}

export const StoneBaseForm: React.FC<StoneBaseFormProps> = () => {
    const [stones, setStones] = useAtom(stonesAtom)
    const [stoneForPull, setStoneForPull] = useAtom(stoneForPullAtom)
    const [pullRate, setPullRate] = useAtom(pullRateAtom);
    const [desiredAmount, setDesiredAmount] = useAtom(desiredAmountAtom);
    const [isPityConsidered] = useAtom(isPityConsideredAtom);
    const [pityItemsFromPull, setPityItemsFromPull] = useAtom(pityItemsFromPullAtom);
    const [requiredPityItems, setRequiredPityItems] = useAtom(requiredPityItemsAtom);
    const [currentPityItems, setCurrentPityItems] = useAtom(currentPityItemsAtom);

    return (
        <StoneBaseFormPresenter>
            <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ValidatedNumberField 
                        label="所持石" 
                        id="stones" 
                        unit="個" 
                        state={stones} 
                        setState={setStones} 
                    />
                    <ValidatedNumberField 
                        label="ガシャ1回に必要な石" 
                        id="stonesForPull" 
                        unit="個" 
                        state={stoneForPull} 
                        setState={setStoneForPull}
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ValidatedNumberField 
                        label="目玉の排出率" 
                        id="pullRate" 
                        unit="%" 
                        state={pullRate}
                        setState={setPullRate} 
                    />
                    <ValidatedNumberField 
                        label="希望個数" 
                        id="desiredNum"
                        unit="個" 
                        state={desiredAmount}
                        setState={setDesiredAmount} 
                    />
                </div>
                
                {isPityConsidered && (
                    <div className="border-t border-blue-100 pt-4">
                        <h3 className="text-base font-medium text-slate-600 mb-3">天井システム設定</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <ValidatedNumberField 
                                    label="ガシャ1回に付く天井アイテム数" 
                                    id="pityItemsFromPull" 
                                    unit="個"
                                    state={pityItemsFromPull} 
                                    setState={setPityItemsFromPull} 
                                />
                                <ValidatedNumberField 
                                    label="交換に必要な天井アイテム数" 
                                    id="requiredPityItems"
                                    unit="個" 
                                    state={requiredPityItems} 
                                    setState={setRequiredPityItems} 
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <ValidatedNumberField 
                                    label="現在の天井アイテム数" 
                                    id="currentPityItems"
                                    unit="個" 
                                    state={currentPityItems} 
                                    setState={setCurrentPityItems} 
                                />
                                <div></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </StoneBaseFormPresenter>
    );
}