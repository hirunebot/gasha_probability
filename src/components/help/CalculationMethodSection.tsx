import type React from "react";

export const CalculationMethodSection: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-5 p-6">
            <h2 className="text-xl font-light text-slate-700 mb-4">計算方法</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-xl font-medium text-blue-700 mb-4">所持石から計算</h3>
                    <p className="text-slate-600">
                        現在持っている石の数から、どれだけガシャを回せるかを計算し、
                        その回数での確率を算出します。
                    </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-xl font-medium text-blue-700 mb-4">ガシャ回数から計算</h3>
                    <p className="text-slate-600">ガシャ回数から確率を計算します。</p>
                </div>
            </div>
        </div>
    );
};
