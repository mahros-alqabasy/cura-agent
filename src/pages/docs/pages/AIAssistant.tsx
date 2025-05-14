
import React from "react";
import DocContent from "../components/DocContent";

const AIAssistantDocs = () => {
  // Table of contents for this page
  const tableOfContents = [
    { id: "introduction", title: "Introduction", level: 2 },
    { id: "accessing", title: "Accessing the AI Assistant", level: 2 },
    { id: "capabilities", title: "Key Capabilities", level: 2 },
    { id: "clinical-decision", title: "Clinical Decision Support", level: 3 },
    { id: "documentation", title: "Documentation Assistance", level: 3 },
    { id: "research", title: "Medical Research", level: 3 },
    { id: "patient-education", title: "Patient Education", level: 3 },
    { id: "workflows", title: "Common Workflows", level: 2 },
    { id: "prompting", title: "Effective Prompt Engineering", level: 2 },
    { id: "templates", title: "Prompt Templates", level: 2 },
    { id: "best-practices", title: "Best Practices", level: 2 },
    { id: "limitations", title: "Limitations and Safety Guidelines", level: 2 },
  ];

  return (
    <DocContent
      title="AI Assistant Guide"
      lastUpdated={new Date("2025-05-14")}
      author="Cura AI Team"
      tableOfContents={tableOfContents}
    >
      <h2 id="introduction">Introduction</h2>
      <p>
        Cura Agent's AI Assistant is an advanced clinical support tool powered by large language models (LLMs) specifically trained on medical knowledge. It's designed to assist healthcare professionals with various tasks, from clinical decision-making to documentation, while always maintaining human oversight for all critical decisions.
      </p>
      <p>
        The AI Assistant serves as a digital colleague that can provide evidence-based suggestions, help interpret complex data, draft clinical notes, and answer medical questions – all while referencing the most current medical literature and best practice guidelines.
      </p>

      <h2 id="accessing">Accessing the AI Assistant</h2>
      <p>
        The AI Assistant can be accessed in several ways throughout Cura Agent:
      </p>
      <ol className="list-decimal pl-5 space-y-3 mb-6">
        <li>
          <strong>Dedicated AI Assistant Page</strong>: Navigate to "AI Assistant" in the sidebar menu for a full-screen conversational interface.
        </li>
        <li>
          <strong>Contextual Help</strong>: Click the AI icon <span className="inline-block w-5 h-5 text-center bg-primary text-white rounded-full">AI</span> that appears in various modules for context-specific assistance.
        </li>
        <li>
          <strong>Documentation Support</strong>: When writing clinical notes, click the "AI Assist" button to get suggestions based on the current patient's data.
        </li>
      </ol>

      <h2 id="capabilities">Key Capabilities</h2>
      
      <h3 id="clinical-decision">Clinical Decision Support</h3>
      <p>
        The AI Assistant can help analyze patient data and provide evidence-based suggestions for diagnosis and treatment:
      </p>
      <ul className="list-disc pl-5 mt-2 mb-4">
        <li>Analyze symptoms and suggest potential diagnoses with differential considerations</li>
        <li>Recommend appropriate diagnostic tests based on presenting symptoms</li>
        <li>Provide treatment options according to current clinical guidelines</li>
        <li>Alert to potential drug interactions or contraindications</li>
        <li>Highlight relevant factors from the patient's history</li>
      </ul>

      <div className="bg-gray-50 border rounded-md p-4 my-4">
        <p className="font-medium mb-2">Example Prompt:</p>
        <p className="font-mono text-sm bg-gray-100 p-2 rounded">
          "Patient is a 56-year-old female with type 2 diabetes presenting with sudden onset chest pain radiating to the left arm, shortness of breath, and nausea. What are the possible diagnoses and what initial tests should be ordered?"
        </p>
      </div>

      <h3 id="documentation">Documentation Assistance</h3>
      <p>
        Streamline clinical documentation with AI-powered assistance:
      </p>
      <ul className="list-disc pl-5 mt-2 mb-4">
        <li>Generate draft clinical notes based on patient encounters</li>
        <li>Summarize lengthy medical records into concise overviews</li>
        <li>Convert dictated audio into structured clinical documentation</li>
        <li>Extract relevant information from previous visits</li>
        <li>Ensure documentation meets billing and compliance requirements</li>
      </ul>

      <div className="bg-gray-50 border rounded-md p-4 my-4">
        <p className="font-medium mb-2">Example Prompt:</p>
        <p className="font-mono text-sm bg-gray-100 p-2 rounded">
          "Draft a follow-up note for diabetes management based on these lab results: HbA1c 7.8%, FBS 156 mg/dL, patient reports improved diet adherence but occasional hyperglycemia in evenings."
        </p>
      </div>

      <h3 id="research">Medical Research</h3>
      <p>
        Access current medical information and research:
      </p>
      <ul className="list-disc pl-5 mt-2 mb-4">
        <li>Retrieve information about medications, including dosing and side effects</li>
        <li>Summarize recent research on specific conditions</li>
        <li>Provide current treatment guidelines for various conditions</li>
        <li>Compare different treatment approaches</li>
      </ul>

      <h3 id="patient-education">Patient Education</h3>
      <p>
        Generate patient-friendly educational materials:
      </p>
      <ul className="list-disc pl-5 mt-2 mb-4">
        <li>Create customized educational content for specific conditions</li>
        <li>Generate easy-to-understand discharge instructions</li>
        <li>Develop medication information sheets in plain language</li>
        <li>Produce dietary and lifestyle guidelines for various health conditions</li>
      </ul>

      <h2 id="workflows">Common Workflows</h2>
      <p>
        Here are step-by-step examples of how healthcare providers typically use the AI Assistant:
      </p>

      <div className="space-y-6 my-6">
        <div className="border rounded-md p-4">
          <h4 className="font-medium mb-2">Clinical Decision Support Workflow</h4>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Open a patient's chart and review their current presentation</li>
            <li>Click on the AI Assistant icon in the clinical notes section</li>
            <li>Enter a query about possible diagnoses or treatment options</li>
            <li>Review the AI suggestions alongside the patient's data</li>
            <li>Select relevant information to incorporate into your clinical decision-making</li>
          </ol>
        </div>

        <div className="border rounded-md p-4">
          <h4 className="font-medium mb-2">Documentation Workflow</h4>
          <ol className="list-decimal pl-5 space-y-1">
            <li>After a patient encounter, open the documentation module</li>
            <li>Click "AI Draft" to generate an initial note based on the encounter</li>
            <li>Review and edit the AI-generated content</li>
            <li>Add any additional information not captured by the AI</li>
            <li>Finalize and sign the note</li>
          </ol>
        </div>

        <div className="border rounded-md p-4">
          <h4 className="font-medium mb-2">Patient Education Workflow</h4>
          <ol className="list-decimal pl-5 space-y-1">
            <li>From the patient's chart, click on "Patient Education"</li>
            <li>Select the condition or topic for education materials</li>
            <li>Click "Generate with AI" to create customized educational content</li>
            <li>Review and edit the content to ensure it's appropriate for your patient</li>
            <li>Print or send electronically to the patient</li>
          </ol>
        </div>
      </div>

      <h2 id="prompting">Effective Prompt Engineering</h2>
      <p>
        Getting the most useful responses from the AI Assistant depends on how you phrase your questions. Here are some tips for effective prompting:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="border rounded-md p-4 bg-green-50">
          <h4 className="font-medium text-green-700 mb-2">Effective Prompts</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Be specific about the patient's characteristics (age, sex, relevant history)</li>
            <li>Clearly state what type of assistance you need</li>
            <li>Include relevant lab values and clinical findings</li>
            <li>Specify the format you want for the response</li>
          </ul>
        </div>

        <div className="border rounded-md p-4 bg-red-50">
          <h4 className="font-medium text-red-700 mb-2">Ineffective Prompts</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Vague questions without patient context</li>
            <li>Overly broad requests ("tell me about diabetes")</li>
            <li>Missing critical information needed for assessment</li>
            <li>Asking for definitive diagnoses without clinical judgment</li>
          </ul>
        </div>
      </div>

      <h2 id="templates">Prompt Templates</h2>
      <p>
        Cura Agent provides pre-built prompt templates for common scenarios. Access these by clicking the "Templates" button in the AI Assistant interface:
      </p>

      <div className="space-y-4 my-6">
        <div className="border rounded-md p-4">
          <h4 className="font-medium mb-1">Differential Diagnosis Template</h4>
          <p className="font-mono text-sm bg-gray-100 p-2 rounded">
            "Patient profile: [age] [sex] with history of [relevant conditions]. Presenting with [symptoms] for [duration]. Vital signs: [vitals if relevant]. Key findings on examination: [exam findings]. What are the top 3-5 differential diagnoses to consider, and what additional tests should be ordered to narrow the diagnosis?"
          </p>
        </div>

        <div className="border rounded-md p-4">
          <h4 className="font-medium mb-1">Treatment Plan Template</h4>
          <p className="font-mono text-sm bg-gray-100 p-2 rounded">
            "Patient with confirmed diagnosis of [condition]. Notable factors: [relevant comorbidities, allergies, current medications]. Please provide evidence-based treatment options with considerations for this specific patient profile."
          </p>
        </div>

        <div className="border rounded-md p-4">
          <h4 className="font-medium mb-1">Patient Education Template</h4>
          <p className="font-mono text-sm bg-gray-100 p-2 rounded">
            "Create patient-friendly educational material about [condition/treatment]. The patient is a [brief description including education level if relevant]. Include: 1) Simple explanation of the condition, 2) Key self-management steps, 3) When to seek medical attention, 4) Common questions and answers."
          </p>
        </div>
      </div>

      <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6">
        <div className="flex">
          <div className="flex-shrink-0 text-green-400">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Tip</h3>
            <div className="mt-2 text-sm text-green-700">
              <p>
                Save your own custom templates by clicking the star icon next to any prompt you've used. These will appear in your "Saved Templates" section for quick access.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 id="best-practices">Best Practices</h2>
      <p>
        Follow these guidelines to maximize the value of the AI Assistant while ensuring patient safety:
      </p>

      <ul className="list-disc pl-5 space-y-3 mb-6">
        <li>
          <strong>Always verify AI suggestions</strong> against your clinical judgment and other reliable sources.
        </li>
        <li>
          <strong>Review AI-generated content thoroughly</strong> before incorporating it into patient care or documentation.
        </li>
        <li>
          <strong>Use the AI Assistant as a complement to</strong>, not a replacement for, your clinical expertise.
        </li>
        <li>
          <strong>Be aware of the context</strong> in which you're working—the AI has access to the current patient's data when accessed from within their chart.
        </li>
        <li>
          <strong>Provide feedback</strong> on AI responses using the thumbs up/down buttons to help improve the system.
        </li>
        <li>
          <strong>Document your clinical reasoning</strong> when you accept or reject AI suggestions in critical decisions.
        </li>
      </ul>

      <h2 id="limitations">Limitations and Safety Guidelines</h2>
      <p>
        While the AI Assistant is a powerful tool, it's important to understand its limitations:
      </p>

      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6">
        <div className="flex">
          <div className="flex-shrink-0 text-amber-400">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800">Important Limitations</h3>
            <div className="mt-2 text-sm text-amber-700">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Not a diagnostic replacement:</strong> The AI Assistant provides suggestions, not definitive diagnoses. Clinical decisions remain the responsibility of licensed healthcare professionals.
                </li>
                <li>
                  <strong>Information cutoff:</strong> The AI's knowledge has a training cutoff date, after which new medical developments may not be included.
                </li>
                <li>
                  <strong>Rare conditions:</strong> The system may have limited information about extremely rare conditions or unusual presentations.
                </li>
                <li>
                  <strong>Emergencies:</strong> Do not rely solely on the AI Assistant in life-threatening emergencies when immediate action is required.
                </li>
                <li>
                  <strong>Patient-specific factors:</strong> The AI may not account for all unique patient factors unless explicitly included in your prompt.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <h3>Safety Protocols</h3>
      <p>
        Cura Agent has implemented several safety measures:
      </p>
      <ul className="list-disc pl-5 mt-2 mb-6">
        <li>All AI suggestions are clearly marked as AI-generated</li>
        <li>Critical recommendations require human verification before implementation</li>
        <li>System logs track all AI interactions for quality assurance</li>
        <li>Regular audits of AI performance against gold standards are conducted</li>
        <li>Content filters prevent inappropriate or dangerous recommendations</li>
      </ul>

      <p className="mt-6">
        The AI Assistant is designed to enhance, not replace, the expertise of healthcare professionals. By understanding its capabilities and limitations, you can effectively leverage this tool to improve efficiency, access evidence-based information quickly, and ultimately provide better patient care.
      </p>
    </DocContent>
  );
};

export default AIAssistantDocs;
