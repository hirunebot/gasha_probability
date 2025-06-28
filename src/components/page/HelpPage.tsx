import React from "react";
import { ArrowBack } from "@mui/icons-material";
import { PageHeader } from "../PageHeader";
import {
    OverviewSection,
    CalculationMethodSection,
    InputFieldsSection,
    ResultInterpretationSection,
    UsageNotesSection,
} from "../help";

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

                <OverviewSection />
                <CalculationMethodSection />
                <InputFieldsSection />
                <ResultInterpretationSection />
                <UsageNotesSection />
            </div>
        </div>
    );
};
