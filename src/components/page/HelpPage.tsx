import React from "react";
import { ArrowBack } from "@mui/icons-material";
import { PageHeader } from "../PageHeader";

export interface HelpPageProps {
    onBack: () => void;
}

export const HelpPage: React.FC<HelpPageProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
            <div className="container mx-auto px-4 py-4 max-w-4xl">
                <PageHeader
                    title="ヘルプ"
                    buttonIcon={<ArrowBack />}
                    buttonText="戻る"
                    onButtonClick={onBack}
                />

                <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-5 p-6">
                    <h2 className="text-xl font-light text-slate-700 mb-4">
                        概要
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        ガシャ確率計算機は、ソーシャルゲーム等において目標のアイテムを獲得できる確率を計算するツールです。
                        所持している石(ガシャを引くためのリソース)の数やガシャ回数から、欲しいアイテムが手に入る確率を算出します。
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-5 p-6">
                    <h2 className="text-xl font-light text-slate-700 mb-4">
                        計算方法
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-sky-50 border border-sky-200 rounded-xl p-6">
                            <h3 className="text-xl font-medium text-sky-700 mb-4">
                                所持石から計算
                            </h3>
                            <p className="text-slate-600">
                                現在持っている石の数から、どれだけガシャを回せるかを計算し、
                                その回数での確率を算出します。
                            </p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <h3 className="text-xl font-medium text-blue-700 mb-4">
                                ガシャ回数から計算
                            </h3>
                            <p className="text-slate-600">
                                決まったガシャ回数での確率を直接計算します。
                                <br />
                                「○回まわしたら何％の確率で手に入るか」を知りたい時に使用します。
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-5 p-6">
                    <h2 className="text-xl font-light text-slate-700 mb-6">
                        入力項目の説明
                    </h2>

                    <div className="mb-8">
                        <h3 className="text-xl font-medium text-slate-700 mb-6 flex items-center">
                            <span className="bg-sky-200 text-sky-700 border border-sky-300 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                                1
                            </span>
                            基本設定
                        </h3>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-medium text-slate-700 mb-2">
                                        所持石
                                    </h4>
                                    <p className="text-slate-600 text-sm mb-2">
                                        現在持っているガシャ石の数
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        最大値: 1,000,000個
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-medium text-slate-700 mb-2">
                                        ガシャ1回に必要な石
                                    </h4>
                                    <p className="text-slate-600 text-sm mb-2">
                                        ガシャを1回回すのに必要な石の数
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        最大値: 10,000個
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-medium text-slate-700 mb-2">
                                        ガシャ回数
                                    </h4>
                                    <p className="text-slate-600 text-sm mb-2">
                                        実際に回すガシャの回数（ガシャ回数モード時）
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        最大値: 100,000回
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-xl font-medium text-slate-700 mb-6 flex items-center">
                            <span className="bg-sky-200 text-sky-700 border border-sky-300 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                                2
                            </span>
                            確率設定
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-medium text-slate-700 mb-2">
                                    目玉の排出率
                                </h4>
                                <p className="text-slate-600 text-sm mb-2">
                                    狙っているアイテムが出る確率（％）
                                </p>
                                <p className="text-xs text-slate-500">
                                    範囲: 0.001% ～ 100%
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-medium text-slate-700 mb-2">
                                    希望個数
                                </h4>
                                <p className="text-slate-600 text-sm mb-2">
                                    欲しいアイテムの個数
                                </p>
                                <p className="text-xs text-slate-500">
                                    最大値: 1,000個
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-medium text-slate-700 mb-6 flex items-center">
                            <span className="bg-sky-200 text-sky-700 border border-sky-300 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                                3
                            </span>
                            天井システム設定
                        </h3>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <p className="text-blue-800 text-sm">
                                天井システムとは、ガシャを回すたびに天井アイテムが蓄積され、
                                一定数貯まると目玉アイテムと交換できるシステムです。
                            </p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-medium text-slate-700 mb-2">
                                    ガシャ1回に付く天井アイテム数
                                </h4>
                                <p className="text-slate-600 text-sm mb-2">
                                    ガシャを1回回すごとに獲得できる天井アイテムの数
                                </p>
                                <p className="text-xs text-slate-500">
                                    最大値: 100個
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-medium text-slate-700 mb-2">
                                    交換に必要な天井アイテム数
                                </h4>
                                <p className="text-slate-600 text-sm mb-2">
                                    目玉アイテム1個と交換するのに必要な天井アイテムの数
                                </p>
                                <p className="text-xs text-slate-500">
                                    最大値: 10,000個
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-5 p-6">
                    <h2 className="text-xl font-light text-slate-700 mb-4">
                        計算結果の見方
                    </h2>
                    <div className="space-y-6">
                        <div className="bg-sky-50 border border-sky-200 rounded-xl p-6">
                            <h3 className="text-lg font-medium text-sky-700 mb-4">
                                ○個以上出る確率
                            </h3>
                            <p className="text-slate-600">
                                指定した個数以上のアイテムが手に入る確率です。
                                例：「3個以上出る確率 85%」=
                                3個、4個、5個...のいずれかの個数が手に入る確率が85%
                            </p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <h3 className="text-lg font-medium text-blue-700 mb-4">
                                ちょうど○個出る確率
                            </h3>
                            <p className="text-slate-600">
                                指定した個数ちょうどのアイテムが手に入る確率です。
                                例：「ちょうど3個出る確率 15%」=
                                3個ピッタリが手に入る確率が15%
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-8">
                    <h2 className="text-xl font-light text-slate-700 mb-4">
                        使用上の注意
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-slate-700">
                                ⚠️ 注意点
                            </h3>
                            <ul className="space-y-2 text-slate-600">
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2">•</span>
                                    計算結果は理論値であり、実際の結果とは異なる場合があります
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2">•</span>
                                    確率は参考値として使用し、計画的にガシャを楽しみましょう
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2">•</span>
                                    極端に大きな数値を入力すると計算が重くなる場合があります
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-slate-700">
                                💡 活用のヒント
                            </h3>
                            <ul className="space-y-2 text-slate-600">
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">
                                        •
                                    </span>
                                    「天井を考慮」により、現状で天井を叩けるか、天井をたたいたうえで2つ目を狙えるかがわかります
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">
                                        •
                                    </span>
                                    複数の希望個数で計算して比較することで、最適な戦略を見つけられます
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">
                                        •
                                    </span>
                                    欲しいアイテムを(ほぼ)確実に手に入れるための石の数を把握できます
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
