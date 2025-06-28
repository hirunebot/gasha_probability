import { ArrowBack } from "@mui/icons-material";
import type React from "react";
import {
    CalculationMethodSection,
    InputFieldsSection,
    OverviewSection,
    ResultInterpretationSection,
    UsageNotesSection,
} from "../help";
import { PageHeader } from "../PageHeader";

export interface HelpPageProps {
    onBack: () => void;
}

export const HelpPage: React.FC<HelpPageProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-blue-50">
            <div className="container mx-auto px-4 py-4 pb-12 max-w-4xl">
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
