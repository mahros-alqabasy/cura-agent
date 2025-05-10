import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Lightbulb } from "lucide-react";
import latestFeatures from "@/data/latestFeatures.json";
import backlog from "@/data/backlog.json";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import BacklogForm from "@/features/backlogs/components/BacklogForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const iconMap = {
    check: <CheckCircle className="text-green-500" />,
    lightbulb: <Lightbulb className="text-yellow-500" />,
    clock: <Clock className="text-gray-400" />,
    blueLightbulb: <Lightbulb className="text-blue-400" />,
};

export default function FeaturesBacklog() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [suggestedFeatures, setSuggestedFeatures] = useState<{ title: string; description: string }[]>([]);

    const handleFormSubmit = (newFeature: { title: string; description: string }) => {
        setSuggestedFeatures((prev) => [...prev, newFeature]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-primary-50 flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-3xl space-y-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2 text-primary">Latest Features & Backlog</h1>
                    <p className="text-gray-600 text-lg">Stay up to date with the newest features and see what's coming next!</p>
                </div>
                <Tabs defaultValue='latest' className='w-full'>
                    <TabsList>
                        <TabsTrigger value='latest'>Latest Features</TabsTrigger>
                        <TabsTrigger value='backlog'>Backlog</TabsTrigger>
                    </TabsList>
                    <TabsContent value='latest'>
                        <Card className="shadow-md w-full">
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
                    </TabsContent>
                    <TabsContent value='backlog'>
                        <Card className="shadow-md w-full">
                            <CardHeader className="flex flex-row items-baseline justify-between pb-2">
                                <CardTitle>Backlog</CardTitle>
                                <Button variant="ghost" size="sm" className="text-primary" onClick={() => setIsFormOpen(true)}>
                                    <span className="text-xl font-semibold">Add</span>
                                </Button>
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
                    </TabsContent>
                </Tabs>
                <BacklogForm
                    open={isFormOpen}
                    onOpenChange={setIsFormOpen}
                    onSubmit={handleFormSubmit}
                />
            </div>
        </div>
    );
}
