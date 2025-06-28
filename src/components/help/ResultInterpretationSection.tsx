import React from "react";

export const ResultInterpretationSection: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-5 p-6">
            <h2 className="text-xl font-light text-slate-700 mb-4">
                計算結果の見方
            </h2>
            <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-blue-700 mb-4">
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
    );
};