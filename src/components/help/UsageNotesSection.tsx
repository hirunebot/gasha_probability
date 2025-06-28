import React from "react";

export const UsageNotesSection: React.FC = () => {
    return (
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
    );
};