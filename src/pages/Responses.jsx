import React from 'react';
import { useSearchParams } from 'react-router-dom';

class Responses extends React.Component {
    render() {
        // Grab the ID from props (passed by the wrapper below)
        const { questionnaireId } = this.props;

        // --- PASTE YOUR FILTER LOGIC HERE ---
        // Example: const filteredResponses = allData.filter(r => r.id === questionnaireId);

        return (
            <div>
                <h1>Responses for ID: {questionnaireId}</h1>
                {/* Your conditional rendering logic from earlier */}
            </div>
        );
    }
}

export default function ResponsesWrapper() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("questionnaireId");

    return <Responses questionnaireId={id} />;
}