// src/pages/FeaturesBacklog.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Lightbulb } from "lucide-react";
import latestFeatures from "@/data/latestFeatures.json";
import backlog from "@/data/backlog.json";
import { Link } from "react-router-dom";


import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


const iconMap = {
    check: <CheckCircle className="text-green-500" />,
    lightbulb: <Lightbulb className="text-yellow-500" />,
    clock: <Clock className="text-gray-400" />,
    blueLightbulb: <Lightbulb className="text-blue-400" />,
};

export default function FeaturesBacklog() {
    const [suggestedFeatures, setSuggestedFeatures] = useState<{ title: string; description: string }[]>([]);
    const [newFeature, setNewFeature] = useState({ title: "", description: "" });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewFeature((prev) => ({ ...prev, [name]: value }));
    };
    const formatMessageForWhatsApp = (features: { title: string; description: string }[]) => {
        if (features.length === 0) return "No suggestions submitted.";

        return features
            .map((f, idx) => `#${idx + 1} ${f.title}\n    ${f.description}`)
            .join("\n\n");
    };
    const sendSuggestionsViaWhatsApp = () => {
        const phoneNumber = "+201015888272"; // your WhatsApp number with country code
        const message = formatMessageForWhatsApp(suggestedFeatures);
        const encodedMessage = encodeURIComponent(message);

        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, "_blank");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newFeature.title && newFeature.description) {
            setSuggestedFeatures((prev) => [...prev, newFeature]);

            setNewFeature({ title: "", description: "" });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-primary-50 flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-3xl space-y-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2 text-primary">Latest Features & Backlog</h1>
                    <p className="text-gray-600 text-lg">Stay up to date with the newest features and see what's coming next!</p>
                </div>
                {/* Latest Features */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Latest Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {latestFeatures.length === 0 ? (
                            <div className="text-center text-gray-400 py-8">No features have been added yet.</div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                                {latestFeatures.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="mt-1">{iconMap[feature.icon] || null}</div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">{feature.title}</span>
                                                {feature.badge && (
                                                    <Badge variant="outline" className="text-xs">{feature.badge}</Badge>
                                                )}
                                            </div>
                                            <div className="text-gray-600 text-sm">{feature.description}</div>
                                            {feature.link && (
                                                <Link
                                                    to={feature.link}
                                                    className="inline-block mt-2 text-primary underline text-xs hover:text-primary-700 transition-colors"
                                                >
                                                    Try this feature
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Separator */}
                <div className="flex justify-center"><Separator className="my-4 w-2/3" /></div>

                {/* Backlog */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Backlog</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {backlog.length === 0 ? (
                            <div className="text-center text-gray-400 py-8">No backlog items at the moment. All caught up!</div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                                {backlog.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="mt-1">{iconMap[item.icon] || null}</div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">{item.title}</span>
                                                <Badge variant="secondary" className="text-xs">{item.status}</Badge>
                                            </div>
                                            <div className="text-gray-600 text-sm">{item.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>


                {/* Suggest a Feature */}
                <Card className="shadow-md">
                    <CardHeader>

                        <CardTitle className="flex justify-center justify-between">
                            <span>Suggest a New Feature</span>

                            {suggestedFeatures.length > 0 && (

                                <button
                                    onClick={sendSuggestionsViaWhatsApp}
                                    className="p-2 py-2 border text-white text-m rounded bg-primary"
                                >
                                    Send
                                </button>

                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                name="title"
                                value={newFeature.title}
                                onChange={handleInputChange}
                                placeholder="Feature title"
                                required
                            />
                            <Textarea
                                name="description"
                                value={newFeature.description}
                                onChange={handleInputChange}
                                placeholder="Describe the feature"
                                required
                            />
                            <Button type="submit">Submit Suggestion</Button>

                        </form>

                        {suggestedFeatures.length > 0 && (
                            <div className="mt-6 space-y-4">
                                <h4 className="text-md font-semibold">Submitted Suggestions</h4>
                                {suggestedFeatures.map((feature, idx) => (
                                    <div key={idx} className="border p-3 rounded-md bg-primary-50">
                                        <div className="font-medium">{feature.title}</div>
                                        <div className="text-sm text-gray-600">{feature.description}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

            </div>
        </div >
    );
}