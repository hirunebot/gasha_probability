import React from "react";

const SectionHeader: React.FC<{ number: number; title: string }> = ({ number, title }) => (
    <h3 className="text-xl font-medium text-slate-700 mb-6 flex items-center">
        <span className="bg-blue-200 text-blue-700 border border-blue-300 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
            {number}
        </span>
        {title}
    </h3>
);

const FieldDescription: React.FC<{ title: string; description: string; limit: string }> = ({ title, description, limit }) => (
    <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-slate-700 mb-2">
            {title}
        </h4>
        <p className="text-slate-600 text-sm mb-2">
            {description}
        </p>
        <p className="text-xs text-slate-500">
            {limit}
        </p>
    </div>
);

export const InputFieldsSection: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-5 p-6">
            <h2 className="text-xl font-light text-slate-700 mb-6">
                入力項目の説明
            </h2>

            <div className="mb-8">
                <SectionHeader number={1} title="基本設定" />
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <FieldDescription
                            title="所持石"
                            description="現在持っているガシャ石の数"
                            limit="最大値: 999,999個"
                        />
                        <FieldDescription
                            title="ガシャ1回に必要な石"
                            description="ガシャを1回回すのに必要な石の数"
                            limit="最大値: 999,999個"
                        />
                        <FieldDescription
                            title="ガシャ回数"
                            description="実際に回すガシャの回数（ガシャ回数モード時）"
                            limit="最大値: 9,999回"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <SectionHeader number={2} title="確率設定" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FieldDescription
                        title="目玉の排出率"
                        description="狙っているアイテムが出る確率（％）"
                        limit="範囲: 0.001% ～ 100%"
                    />
                    <FieldDescription
                        title="希望個数"
                        description="欲しいアイテムの個数"
                        limit="最大値: 9,999個"
                    />
                </div>
            </div>

            <div className="mb-6">
                <SectionHeader number={3} title="天井システム設定" />
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-blue-800 text-sm">
                        天井システムとは、ガシャを回すたびに天井アイテムが蓄積され、
                        一定数貯まると目玉アイテムと交換できるシステムです。
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FieldDescription
                        title="ガシャ1回に付く天井アイテム数"
                        description="ガシャを1回回すごとに獲得できる天井アイテムの数"
                        limit="最大値: 9,999個"
                    />
                    <FieldDescription
                        title="交換に必要な天井アイテム数"
                        description="目玉アイテム1個と交換するのに必要な天井アイテムの数"
                        limit="最大値: 9,999個"
                    />
                </div>
            </div>
        </div>
    );
};