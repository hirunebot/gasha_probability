import React from "react";

export const UsageNotesSection: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-8">
            <h2 className="text-xl font-light text-slate-700 mb-4">
                使用上の注意
            </h2>
            <div className="space-y-4">
                <ul className="space-y-3 text-slate-600">
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
        </div>
    );
};
