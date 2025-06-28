import { Box, Stack } from '@mui/material';
import { useAtom } from 'jotai';
import React from 'react';
import { calculationModeAtom, desiredAmountNumAtom, hitsFromPityAtom, isPityConsideredAtom, pityItemsAtom, probAtLeastNAtom, probJustNAtom, pullsNumAtom } from '../../stores/atoms';

export interface CalculationResultPresenterProps {
    children: React.ReactNode;
}

export const CalculationResultPresenter: React.FC<CalculationResultPresenterProps> = (props) => {
    return (
        <div className="space-y-3">
            {props.children}
        </div>
    );
}

export interface CalculationResultProps {}

export const CalculationResult: React.FC<CalculationResultProps> = () => {
    const [desiredAmount] = useAtom(desiredAmountNumAtom);
    const [isPityConsidered] = useAtom(isPityConsideredAtom);
    const [pulls] = useAtom(pullsNumAtom);
    const [calculationMode] = useAtom(calculationModeAtom);
    const [pityItems] = useAtom(pityItemsAtom);
    const [hitsFromPity] = useAtom(hitsFromPityAtom);
    const [probJustN] = useAtom(probJustNAtom);
    const [probAtLeastN] = useAtom(probAtLeastNAtom);

    return (
        <CalculationResultPresenter>
            <div className="grid gap-4">
                {calculationMode === "stoneBase" && (
                    <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div className="text-slate-600 text-base font-medium">回せる回数</div>
                            <div className="text-sky-700 text-4xl font-medium">{pulls}<span className="text-xl ml-1">回</span></div>
                        </div>
                    </div>
                )}

                {isPityConsidered && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                        <h4 className="text-slate-700 font-medium text-base mb-3">天井システム</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="flex items-center justify-between">
                                <div className="text-slate-600">獲得天井アイテム</div>
                                <div className="text-blue-700 text-3xl font-medium">{pityItems}<span className="text-lg ml-1">個</span></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-slate-600">天井交換総数</div>
                                <div className="text-blue-700 text-3xl font-medium">{hitsFromPity}<span className="text-lg ml-1">個</span></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-slate-600">既存分で交換</div>
                                <div className="text-green-700 text-3xl font-medium">{Math.min(desiredAmount, hitsFromPity)}<span className="text-lg ml-1">個</span></div>
                            </div>
                        </div>
                        {hitsFromPity > 0 && (
                            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-800 text-sm">
                                    <span className="font-medium text-base">天井で<span className="text-xl font-semibold">{Math.min(desiredAmount, hitsFromPity)}</span>個入手確定</span>
                                    {hitsFromPity >= desiredAmount 
                                        ? "（目標達成済み）" 
                                        : `（残り<span class="text-lg font-medium">${desiredAmount - hitsFromPity}</span>個をガシャで狙う）`
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 space-y-3">
                    <h4 className="text-slate-700 font-medium text-base mb-3">確率計算結果</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-white rounded-lg border border-sky-100">
                            <div className="text-slate-600 text-sm mb-2">{desiredAmount}個以上出る確率</div>
                            <div className="text-sky-700 text-5xl font-semibold">{probAtLeastN.toFixed(2)}<span className="text-2xl ml-1">%</span></div>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg border border-sky-100">
                            <div className="text-slate-600 text-sm mb-2">
                                {desiredAmount == 0 ? "1回も出ない確率" : `ちょうど${desiredAmount}個出る確率`}
                            </div>
                            <div className="text-sky-700 text-5xl font-semibold">{probJustN.toFixed(2)}<span className="text-2xl ml-1">%</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </CalculationResultPresenter>
    );
}