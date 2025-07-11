import { Box, Stack } from "@mui/material";
import { useAtom } from "jotai";
import {
    calculatePullsAtom,
    currentPityItemsAtom,
    desiredAmountAtom,
    isPityConsideredAtom,
    pityItemsFromPullAtom,
    pullRateAtom,
    requiredPityItemsAtom,
} from "../../stores/atoms";
import { ValidatedNumberField } from "./ValidatedNumberField";

export interface PullBaseFormPresenterProps {
    children: React.ReactNode;
}

export const PullBaseFormPresenter: React.FC<PullBaseFormPresenterProps> = (props) => {
    return <div className="space-y-4">{props.children}</div>;
};

export type PullBaseFormProps = {};

export const PullBaseForm: React.FC<PullBaseFormProps> = () => {
    const [pulls, calculatePulls] = useAtom(calculatePullsAtom);
    const [pullRate, setPullRate] = useAtom(pullRateAtom);
    const [desiredAmount, setDesiredAmount] = useAtom(desiredAmountAtom);
    const [isPityConsidered] = useAtom(isPityConsideredAtom);
    const [pityItemsFromPull, setPityItemsFromPull] = useAtom(pityItemsFromPullAtom);
    const [requiredPityItems, setRequiredPityItems] = useAtom(requiredPityItemsAtom);
    const [currentPityItems, setCurrentPityItems] = useAtom(currentPityItemsAtom);

    return (
        <PullBaseFormPresenter>
            <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ValidatedNumberField
                        label="ガシャ回数"
                        id="pulls"
                        unit="回"
                        state={pulls}
                        setState={calculatePulls}
                    />
                    <ValidatedNumberField
                        label="目玉の排出率"
                        id="pullRate"
                        unit="%"
                        state={pullRate}
                        setState={setPullRate}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ValidatedNumberField
                        label="希望個数"
                        id="desiredNum"
                        unit="個"
                        state={desiredAmount}
                        setState={setDesiredAmount}
                    />
                    <div></div>
                </div>

                {isPityConsidered && (
                    <div className="border-t border-blue-100 pt-4">
                        <h3 className="text-base font-medium text-slate-600 mb-3">
                            天井システム設定
                        </h3>
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
        </PullBaseFormPresenter>
    );
};
