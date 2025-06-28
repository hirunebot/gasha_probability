import React from "react";

export const OverviewSection: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-5 p-6">
            <h2 className="text-xl font-light text-slate-700 mb-4">
                概要
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
                ガシャ確率計算機は、ソーシャルゲーム等において目標のアイテムを獲得できる確率を計算するツールです。
                所持している石(ガシャを引くためのリソース)の数やガシャ回数から、欲しいアイテムが手に入る確率を算出します。
            </p>
        </div>
    );
};