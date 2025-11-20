import { useState } from 'react';
import { Upload, Loader2, AlertCircle, CheckCircle, Droplets, Sun, Activity, Eye, Zap, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SkinAnalysis = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
            setResult(null);
            setError(null);
        }
    };

    const analyzeSkin = async () => {
        if (!previewUrl) return;

        setIsAnalyzing(true);
        setError(null);

        try {
            const base64Image = previewUrl.split(',')[1];
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

            let data;

            if (isLocal && !window.netlifyIdentity) {
                // ENHANCED DEMO DATA
                console.warn("Running in DEMO MODE.");
                await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate deeper analysis
                data = {
                    result: {
                        skinAge: 23,
                        skinType: 'Combination',
                        skinScore: 88,
                        summary: "Your skin is in excellent condition with high hydration levels. Minor attention needed for texture and pore visibility.",
                        concerns: [
                            { name: 'Hydration', score: 92, status: 'Excellent', icon: Droplets, color: 'text-blue-400', bg: 'bg-blue-500' },
                            { name: 'Oiliness', score: 45, status: 'Balanced', icon: Droplets, color: 'text-yellow-400', bg: 'bg-yellow-500' }, // Lower is better for oil usually, but here score represents health/balance
                            { name: 'Texture', score: 78, status: 'Good', icon: Activity, color: 'text-purple-400', bg: 'bg-purple-500' },
                            { name: 'Wrinkles', score: 95, status: 'None', icon: Activity, color: 'text-rose-400', bg: 'bg-rose-500' },
                            { name: 'Spots', score: 82, status: 'Good', icon: Sun, color: 'text-orange-400', bg: 'bg-orange-500' },
                            { name: 'Dark Circles', score: 68, status: 'Moderate', icon: Eye, color: 'text-indigo-400', bg: 'bg-indigo-500' },
                            { name: 'Redness', score: 88, status: 'Low', icon: Thermometer, color: 'text-red-400', bg: 'bg-red-500' },
                            { name: 'Pores', score: 70, status: 'Visible', icon: Zap, color: 'text-teal-400', bg: 'bg-teal-500' },
                        ]
                    }
                };
            } else {
                // Real API Call
                const response = await fetch('/.netlify/functions/skin-analysis', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: base64Image }),
                });

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.error || 'Analysis failed');
                }

                data = await response.json();
                // If real API doesn't return this structure, we might need a mapper here.
                // For now, assuming backend returns similar structure or we'd need to map it.
            }

            setResult(data);
        } catch (err) {
            console.error("Analysis error:", err);
            setError(err.message || "Failed to analyze image. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-400';
        if (score >= 60) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <section className="min-h-screen pt-32 pb-20 bg-zinc-950 text-white">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-thin tracking-tight mb-4">
                        Advanced AI <span className="text-rose-400">Skin Diagnostics</span>
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Clinical-grade analysis of 8 key skin health metrics.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Upload & Preview */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
                            {previewUrl ? (
                                <div className="relative w-full h-full flex flex-col items-center">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full h-80 object-cover rounded-lg mb-6 shadow-lg shadow-black/50"
                                    />
                                    <div className="flex gap-4 w-full">
                                        <Button
                                            variant="outline"
                                            onClick={() => { setSelectedImage(null); setPreviewUrl(null); setResult(null); }}
                                            className="flex-1 border-zinc-700 hover:bg-zinc-800 text-zinc-300"
                                            disabled={isAnalyzing}
                                        >
                                            Retake
                                        </Button>
                                        <Button
                                            onClick={analyzeSkin}
                                            className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
                                            disabled={isAnalyzing}
                                        >
                                            {isAnalyzing ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scanning...
                                                </>
                                            ) : (
                                                'Analyze'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Upload className="w-10 h-10 text-zinc-400" />
                                    </div>
                                    <h3 className="text-xl font-medium mb-2">Upload Photo</h3>
                                    <p className="text-zinc-500 text-sm mb-8 max-w-xs mx-auto">
                                        Front-facing, good lighting, no makeup.
                                    </p>
                                    <label className="cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                        />
                                        <span className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-zinc-200 transition-colors">
                                            Select Image
                                        </span>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Results */}
                    <div className="lg:col-span-8 min-h-[400px]">
                        {error && (
                            <div className="h-full flex flex-col items-center justify-center text-center text-red-400 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 p-8">
                                <AlertCircle className="w-12 h-12 mb-4 opacity-80" />
                                <p className="text-lg">{error}</p>
                            </div>
                        )}

                        {!result && !error && !isAnalyzing && (
                            <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 p-8">
                                <div className="w-16 h-16 border-2 border-dashed border-zinc-800 rounded-full flex items-center justify-center mb-4">
                                    <Activity className="w-8 h-8 opacity-50" />
                                </div>
                                <p className="text-lg">Ready to analyze your skin health.</p>
                            </div>
                        )}

                        {isAnalyzing && (
                            <div className="h-full flex flex-col items-center justify-center text-center bg-zinc-900/30 rounded-2xl border border-zinc-800/50 p-8">
                                <div className="relative w-24 h-24 mb-6">
                                    <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-rose-500 rounded-full border-t-transparent animate-spin"></div>
                                    <Loader2 className="absolute inset-0 m-auto w-8 h-8 text-rose-500 animate-pulse" />
                                </div>
                                <p className="text-zinc-300 text-xl font-light animate-pulse">Analyzing 8 skin metrics...</p>
                                <p className="text-zinc-500 text-sm mt-2">Detecting texture, spots, and hydration levels</p>
                            </div>
                        )}

                        {result && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">
                                {/* Top Stats Row */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 text-center">
                                        <p className="text-zinc-400 text-xs uppercase tracking-wider mb-2">Overall Health</p>
                                        <div className="text-5xl font-light text-white mb-1">
                                            {result.result?.skinScore || 85}
                                            <span className="text-lg text-zinc-500">/100</span>
                                        </div>
                                        <p className={cn("text-sm font-medium", getScoreColor(result.result?.skinScore))}>
                                            {result.result?.skinScore >= 80 ? 'Excellent' : 'Good'}
                                        </p>
                                    </div>
                                    <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 text-center flex flex-col justify-center">
                                        <p className="text-zinc-400 text-xs uppercase tracking-wider mb-2">Skin Age</p>
                                        <p className="text-4xl font-light text-white">{result.result?.skinAge || '--'}</p>
                                        <p className="text-zinc-500 text-sm">Years Old</p>
                                    </div>
                                    <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 text-center flex flex-col justify-center">
                                        <p className="text-zinc-400 text-xs uppercase tracking-wider mb-2">Skin Type</p>
                                        <p className="text-3xl font-light text-rose-300">{result.result?.skinType || '--'}</p>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-6">
                                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-500" /> Analysis Summary
                                    </h3>
                                    <p className="text-zinc-300 leading-relaxed">
                                        {result.result?.summary || "Analysis complete."}
                                    </p>
                                </div>

                                {/* Detailed Metrics Grid */}
                                <h3 className="text-xl font-light mt-8 mb-4">Detailed Metrics</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {result.result?.concerns?.map((concern, index) => (
                                        <div key={index} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center bg-zinc-800", concern.color)}>
                                                        {concern.icon ? <concern.icon className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-zinc-200">{concern.name}</h4>
                                                        <p className={cn("text-xs font-medium", concern.color)}>
                                                            {concern.status}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="text-2xl font-light text-zinc-400">{concern.score}</span>
                                            </div>

                                            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                                                <div
                                                    className={cn("h-full rounded-full transition-all duration-1000", concern.bg || "bg-zinc-500")}
                                                    style={{ width: `${concern.score}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
                                    <Button variant="link" className="text-rose-400 hover:text-rose-300 p-0 h-auto font-normal text-lg">
                                        View Personalized Treatment Plan &rarr;
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkinAnalysis;
