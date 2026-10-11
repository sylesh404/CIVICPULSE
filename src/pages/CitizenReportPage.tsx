import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Mic, 
  MapPin, 
  Sparkles, 
  Upload, 
  Play, 
  Square, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  FileText,
  Search,
  Crosshair,
  Layers,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCivic } from '../context/CivicContext';
import { aiService, AiAnalysisResult } from '../services/aiService';
import { geocodingService } from '../services/geocodingService';
import { Complaint, Category, Severity } from '../types';

export const CitizenReportPage: React.FC = () => {
  const { 
    complaints, 
    addNewComplaint, 
    joinExistingComplaint, 
    setActiveTab, 
    setSelectedComplaint,
    userLocation,
    requestLocation,
    draftPinLocation,
    setIsPinningMode
  } = useCivic();

  // Multi-step state: 1 = Details, 2 = Location, 3 = AI Processing, 4 = Result & Duplicates, 5 = Success
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Inputs
  const [description, setDescription] = useState('Severe road pothole forming deep crater right near Metro pillar 142 on MG Road. Vehicles and two-wheelers are violently swerving to avoid it during peak hours.');
  const [uploadedImage, setUploadedImage] = useState<string | null>('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=600');
  const [isRecording, setIsRecording] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasRecordedAudio, setHasRecordedAudio] = useState(true);

  // Location state: Initialize from draftPinLocation or userLocation or realistic default
  const [locationName, setLocationName] = useState(draftPinLocation?.address || 'MG Road, Metro Pillar 142, Bengaluru');
  const [coordinates, setCoordinates] = useState({ 
    lat: draftPinLocation?.lat || userLocation?.latitude || 12.9716, 
    lng: draftPinLocation?.lng || userLocation?.longitude || 77.5946 
  });
  const [locSearchInput, setLocSearchInput] = useState(draftPinLocation?.address || 'MG Road, Bengaluru');

  // Synchronize when draftPinLocation arrives
  useEffect(() => {
    if (draftPinLocation) {
      setLocationName(draftPinLocation.address);
      setCoordinates({ lat: draftPinLocation.lat, lng: draftPinLocation.lng });
      setLocSearchInput(draftPinLocation.address);
    }
  }, [draftPinLocation]);

  // AI Pipeline simulation state
  const [aiStage, setAiStage] = useState<number>(0);
  const aiStages = [
    'ANALYZING IMAGE & ACOUSTICS',
    'IDENTIFYING ISSUE CLASSIFICATION',
    'ESTIMATING CIVIC SEVERITY & RISK',
    'CHECKING SPATIAL DUPLICATE CLUSTERS',
    'ROUTING MUNICIPAL DEPARTMENT & SLA'
  ];
  const [analysisResult, setAnalysisResult] = useState<AiAnalysisResult | null>(null);

  // Duplicate decision
  const [showDuplicateView, setShowDuplicateView] = useState(true);

  // Audio recording timer simulation
  useEffect(() => {
    let timer: any;
    if (isRecording && !isAudioPaused) {
      timer = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording, isAudioPaused]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsAudioPaused(false);
    setRecordingSeconds(0);
    setHasRecordedAudio(false);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsAudioPaused(false);
    setHasRecordedAudio(true);
  };

  const handleResetRecording = () => {
    setIsRecording(false);
    setIsAudioPaused(false);
    setRecordingSeconds(0);
    setHasRecordedAudio(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  };

  // Run AI Analysis Pipeline
  const runAiPipeline = async () => {
    setCurrentStep(3);
    setAiStage(0);

    // Sequence stages smoothly
    for (let i = 0; i < 5; i++) {
      setAiStage(i);
      await new Promise((r) => setTimeout(r, 650));
    }

    const result = await aiService.analyzeComplaint(
      {
        text: description,
        hasImage: !!uploadedImage,
        hasAudio: hasRecordedAudio,
        lat: coordinates.lat,
        lng: coordinates.lng,
        address: locationName,
      },
      complaints
    );

    setAnalysisResult(result);
    // If duplicates exist, default to showing duplicate resolution screen
    setShowDuplicateView(result.potentialDuplicates.length > 0);
    setCurrentStep(4);
  };

  const handleJoinCase = async (caseId: string) => {
    await joinExistingComplaint(caseId);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22d3ee', '#3b82f6', '#10b981'],
    });
    setCurrentStep(5);
  };

  const handleConfirmNewReport = async () => {
    if (!analysisResult) return;

    await addNewComplaint({
      title: `${analysisResult.severity} ${analysisResult.detectedCategory.replace('_', ' ')}: ${locationName}`,
      description,
      category: analysisResult.detectedCategory,
      severity: analysisResult.severity,
      status: 'AI_ANALYZED',
      location: {
        lat: coordinates.lat,
        lng: coordinates.lng,
        address: locationName,
        zone: 'Central Urban Core',
        city: 'Bengaluru',
      },
      reportsCount: 1,
      priorityScore: analysisResult.priorityScore,
      priorityBreakdown: {
        baseSeverity: 25,
        publicImpact: 22,
        complaintFrequency: 20,
        locationRisk: 14,
        timeUnresolved: 11,
        totalScore: analysisResult.priorityScore,
      },
      department: analysisResult.recommendedDepartment,
      confidence: analysisResult.confidence,
      estimatedImpact: analysisResult.estimatedImpact,
      aiSummary: analysisResult.summary,
      impactRadius: 250,
      nearbyFacilities: analysisResult.facilitiesImpacted,
      imageUrl: uploadedImage || undefined,
      timeline: [
        { stage: 'REPORTED', label: 'Reported', timestamp: 'Just now', description: 'Complaint filed by citizen', completed: true },
        { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: 'Just now', description: `Verified by CivicPulse Neural Engine (${Math.round(analysisResult.confidence * 100)}% confidence)`, completed: true },
        { stage: 'ASSIGNED', label: 'Assigned', timestamp: 'Pending', description: `Auto-routed to ${analysisResult.recommendedDepartment}`, completed: false },
        { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: 'Pending', description: 'Crew field dispatch', completed: false },
        { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Pending', description: 'Photographic resolution signoff', completed: false },
      ],
    });

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#22d3ee', '#38bdf8', '#0ea5e9'],
    });

    setCurrentStep(5);
  };

  return (
    <div className="min-h-screen bg-[#F3F2EC] text-[#050505] pt-16 sm:pt-24 pb-20 sm:pb-24 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Step Progress Tracker - Neo-Brutalist Editorial Header */}
        <div className="mb-6 sm:mb-8 border-2 border-[#050505] bg-white p-3.5 sm:p-4 shadow-[4px_4px_0px_#050505]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#DFFF00] border border-[#050505]" />
              <span className="bg-[#050505] text-white px-2 py-0.5">STEP {currentStep} OF 4</span>
            </span>
            <span className="text-slate-600">
              {currentStep === 1 && '01 / INCIDENT TELEMETRY & MEDIA'}
              {currentStep === 2 && '02 / GEOSPATIAL COORDINATES'}
              {currentStep === 3 && '03 / NEURAL INGESTION & TRIAGE'}
              {currentStep === 4 && '04 / SEVERITY & DUPLICATE SYNTHESIS'}
              {currentStep === 5 && 'COMPLETED / DISPATCH TRANSMITTED'}
            </span>
          </div>
          <div className="h-2 w-full bg-[#E5E4DC] border border-[#050505] overflow-hidden">
            <motion.div
              className="h-full bg-[#050505]"
              initial={{ width: '25%' }}
              animate={{ width: `${(Math.min(currentStep, 4) / 4) * 100}%` }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* STEP 1: WHAT HAPPENED? */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-8 bg-white border-2 border-[#050505] shadow-[6px_6px_0px_#050505] space-y-6"
          >
            <div className="border-b-2 border-[#050505] pb-4">
              <span className="text-xs font-mono font-black uppercase tracking-widest bg-[#DFFF00] text-[#050505] px-2 py-0.5 border border-[#050505]">
                CIVIC INTAKE 01
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-display text-[#050505] mt-2 uppercase tracking-tight">
                REPORT A PROBLEM.
              </h2>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
                Upload photography, record audio description, or specify details. The neural model will triage and score severity.
              </p>
            </div>

            {/* Image Upload Area */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#050505] mb-2 flex items-center justify-between">
                <span>01. PHOTOGRAPHIC EVIDENCE</span>
                <span className="bg-[#050505] text-[#DFFF00] px-1.5 py-0.5 text-[10px]">VISION INGESTION READY</span>
              </label>

              <div className="border-2 border-dashed border-[#050505] bg-[#F9F8F3] p-6 text-center transition-all group">
                {uploadedImage ? (
                  <div className="relative inline-block max-w-full">
                    <img
                      src={uploadedImage}
                      alt="Uploaded civic hazard"
                      className="max-h-60 object-cover border-2 border-[#050505] shadow-[4px_4px_0px_#050505]"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => setUploadedImage(null)}
                        className="px-3 py-1 bg-[#050505] hover:bg-red-600 text-white text-xs font-mono uppercase font-bold border border-white transition-colors"
                      >
                        REMOVE
                      </button>
                    </div>
                    <div className="mt-3 text-xs font-mono font-bold text-[#050505] flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-black" />
                      <span>EXIF METADATA ATTACHED & VALIDATED</span>
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center py-6">
                    <div className="w-14 h-14 bg-[#DFFF00] border-2 border-[#050505] flex items-center justify-center text-[#050505] mb-3 shadow-[2px_2px_0px_#050505]">
                      <Camera className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <span className="text-sm font-black uppercase tracking-wider text-[#050505]">UPLOAD OR DROP PHOTO</span>
                    <span className="text-xs font-mono text-slate-500 mt-1">JPEG, PNG, WEBP (MAX 15MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Voice Recording Interface with High-Contrast Waveform */}
            <div className="p-4 bg-[#F9F8F3] border-2 border-[#050505]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase text-[#050505] flex items-center gap-2">
                  <Mic className="w-4 h-4 text-[#050505]" />
                  <span>02. VOICE RECORDING (AUDIO SPEECH-TO-TEXT)</span>
                </span>
                <span className="text-xs font-mono font-bold">
                  {isRecording ? (
                    <span className="bg-red-600 text-white px-2 py-0.5 border border-[#050505] animate-pulse">
                      REC 00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}
                    </span>
                  ) : hasRecordedAudio ? (
                    <span className="bg-[#050505] text-[#DFFF00] px-2 py-0.5">00:24 AUDIO RECORDED</span>
                  ) : (
                    <span className="text-slate-500">OPTIONAL</span>
                  )}
                </span>
              </div>

              {/* Stark Monochrome Waveform */}
              <div className="h-12 w-full bg-white border border-[#050505] px-4 flex items-center justify-center gap-1.5 overflow-hidden">
                {[4, 14, 26, 16, 34, 28, 14, 8, 28, 40, 20, 10, 32, 22, 16, 36, 18, 12, 28, 14].map((h, i) => (
                  <motion.div
                    key={i}
                    className={`w-1.5 ${
                      isRecording ? 'bg-red-600' : hasRecordedAudio ? 'bg-[#050505]' : 'bg-[#D0CEBF]'
                    }`}
                    animate={
                      isRecording
                        ? { height: [h * 0.4, h, h * 0.3] }
                        : { height: hasRecordedAudio ? h * 0.6 : 6 }
                    }
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.03 }}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {!isRecording ? (
                    <button
                      onClick={handleStartRecording}
                      className="px-4 py-2 bg-white hover:bg-[#DFFF00] text-[#050505] border-2 border-[#050505] text-xs font-mono font-bold flex items-center gap-2 transition-colors shadow-[2px_2px_0px_#050505]"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>{hasRecordedAudio ? 'RE-RECORD AUDIO' : 'RECORD VOICE MEMO'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleStopRecording}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white border-2 border-[#050505] text-xs font-mono font-bold flex items-center gap-2 transition-colors shadow-[2px_2px_0px_#050505]"
                    >
                      <Square className="w-3.5 h-3.5" />
                      <span>STOP & ENCODE</span>
                    </button>
                  )}

                  {hasRecordedAudio && !isRecording && (
                    <button
                      onClick={handleResetRecording}
                      className="p-2 bg-white hover:bg-slate-200 border-2 border-[#050505] text-[#050505] transition-colors"
                      title="Clear Recording"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <span className="text-[11px] font-mono font-semibold text-slate-500 uppercase">
                  WHISPER NLP ACTIVE
                </span>
              </div>
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#050505] mb-2">
                03. INCIDENT DESCRIPTION
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-white border-2 border-[#050505] p-3 text-sm font-mono text-[#050505] placeholder-slate-400 focus:outline-none focus:bg-[#FFFDE6] transition-colors shadow-[2px_2px_0px_#050505]"
                placeholder="Describe what you see, depth, water flow, or traffic hazards..."
              />
            </div>

            {/* Continue CTA */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full sm:w-auto px-6 py-3.5 min-h-[48px] bg-[#DFFF00] hover:bg-[#050505] text-[#050505] hover:text-[#DFFF00] border-2 border-[#050505] font-black text-xs font-mono tracking-wider uppercase shadow-[4px_4px_0px_#050505] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 touch-manipulation"
              >
                <span>PROCEED TO LOCATION ↗</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: WHERE? */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-8 bg-white border-2 border-[#050505] shadow-[6px_6px_0px_#050505] space-y-6"
          >
            <div className="border-b-2 border-[#050505] pb-4">
              <span className="text-xs font-mono font-black uppercase tracking-widest bg-[#DFFF00] text-[#050505] px-2 py-0.5 border border-[#050505]">
                GEOSPATIAL ANCHOR 02
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-display text-[#050505] mt-2 uppercase tracking-tight">
                WHERE IS THE ISSUE?
              </h2>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
                Confirm geolocation. Auto-detected from browser GPS or pin directly on the city map.
              </p>
            </div>

            {/* Search location bar */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={locSearchInput}
                  onChange={(e) => setLocSearchInput(e.target.value)}
                  className="w-full bg-[#F9F8F3] border-2 border-[#050505] pl-10 pr-4 py-2.5 text-xs font-mono font-bold text-[#050505] focus:outline-none focus:bg-white"
                  placeholder="Search landmark, street, metro pillar..."
                />
              </div>
              <button
                onClick={async () => {
                  if (userLocation) {
                    const addr = await geocodingService.reverseGeocode(userLocation.latitude, userLocation.longitude);
                    setLocationName(addr);
                    setCoordinates({ lat: userLocation.latitude, lng: userLocation.longitude });
                    setLocSearchInput(addr);
                  } else {
                    await requestLocation();
                  }
                }}
                className="px-4 py-2.5 bg-white hover:bg-[#DFFF00] border-2 border-[#050505] text-xs font-mono font-bold text-[#050505] flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#050505] transition-colors"
                title="Use real browser GPS position"
              >
                <Crosshair className="w-4 h-4" />
                <span>{userLocation ? 'SYNC REAL GPS' : 'DETECT BROWSER GPS'}</span>
              </button>

              <button
                onClick={() => {
                  setIsPinningMode(true);
                  setActiveTab('map');
                }}
                className="px-4 py-2.5 bg-[#050505] hover:bg-[#DFFF00] text-white hover:text-[#050505] border-2 border-[#050505] text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#050505] transition-colors"
                title="Open interactive map to drop pin"
              >
                <MapPin className="w-4 h-4" />
                <span>DROP PIN ON MAP ↗</span>
              </button>
            </div>

            {/* Interactive Geo-Map Card Mock */}
            <div className="relative h-64 w-full border-2 border-[#050505] bg-[#E9E8DF] flex items-center justify-center overflow-hidden">
              {/* Map grid lines */}
              <div 
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #050505 1px, transparent 1px),
                    linear-gradient(to bottom, #050505 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }}
              />

              {/* Pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 bg-[#DFFF00] border-2 border-[#050505] flex items-center justify-center shadow-[4px_4px_0px_#050505]">
                  <MapPin className="w-6 h-6 text-[#050505] stroke-[2.5]" />
                </div>
                <div className="mt-3 px-3 py-1.5 bg-[#050505] text-white text-xs font-mono font-bold border border-black shadow-[3px_3px_0px_rgba(0,0,0,0.3)]">
                  {locationName}
                </div>
              </div>

              {/* Corner Coordinates */}
              <div className="absolute bottom-3 left-3 px-2 py-1 bg-white border border-[#050505] text-[10px] font-mono font-bold text-[#050505]">
                LAT: {coordinates.lat.toFixed(5)} | LNG: {coordinates.lng.toFixed(5)}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                onClick={() => setCurrentStep(1)}
                className="w-full sm:w-auto px-5 py-3 min-h-[44px] bg-white hover:bg-slate-200 border-2 border-[#050505] text-xs font-mono font-bold text-[#050505] flex items-center justify-center gap-2 shadow-[2px_2px_0px_#050505] transition-colors touch-manipulation"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK</span>
              </button>

              <button
                onClick={runAiPipeline}
                className="w-full sm:w-auto px-6 py-3.5 min-h-[48px] bg-[#DFFF00] hover:bg-[#050505] text-[#050505] hover:text-[#DFFF00] border-2 border-[#050505] font-black text-xs font-mono tracking-wider uppercase shadow-[4px_4px_0px_#050505] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 touch-manipulation"
              >
                <Sparkles className="w-4 h-4" />
                <span>LAUNCH AI ANALYSIS ↗</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: AI PROCESSING TICKER */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="p-8 sm:p-12 bg-white border-2 border-[#050505] shadow-[6px_6px_0px_#050505] text-center"
          >
            <div className="w-16 h-16 bg-[#DFFF00] border-2 border-[#050505] flex items-center justify-center mx-auto mb-5 shadow-[4px_4px_0px_#050505]">
              <Sparkles className="w-8 h-8 text-[#050505] stroke-[2.5]" />
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-widest bg-[#050505] text-[#DFFF00] px-3 py-1">
              NEURAL INTAKE CLUSTER ACTIVE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-[#050505] mt-3 uppercase tracking-tight">
              {aiStages[aiStage]}
            </h3>

            {/* Simple ASCII-like Block Progress Bar */}
            <div className="mt-4 max-w-xs mx-auto text-xs font-mono text-[#050505] font-bold">
              [ {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className={i <= aiStage * 2 + 1 ? 'text-[#050505]' : 'text-slate-300'}>
                  █
                </span>
              ))} ] {Math.min(100, Math.round(((aiStage + 1) / 5) * 100))}%
            </div>

            {/* Stages Stack */}
            <div className="mt-8 max-w-md mx-auto space-y-2 text-left">
              {aiStages.map((stageName, index) => {
                const isPassed = index < aiStage;
                const isCurrent = index === aiStage;

                return (
                  <div
                    key={index}
                    className={`p-3 border-2 border-[#050505] flex items-center justify-between text-xs font-mono font-bold transition-all ${
                      isPassed
                        ? 'bg-[#EBF7E6] text-[#050505]'
                        : isCurrent
                        ? 'bg-[#DFFF00] text-[#050505] shadow-[2px_2px_0px_#050505]'
                        : 'bg-[#F9F8F3] text-slate-400 border-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 ${isPassed ? 'bg-[#050505]' : isCurrent ? 'bg-[#050505]' : 'bg-slate-300'}`} />
                      <span>{stageName}</span>
                    </span>
                    <span className="text-[10px]">
                      {isPassed ? '[ OK ]' : isCurrent ? '[ RUNNING ]' : '[ QUEUED ]'}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* STEP 4: AI RESULT CARD & DUPLICATE DETECTION */}
        {currentStep === 4 && analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* DUPLICATE DETECTION BANNER */}
            {analysisResult.potentialDuplicates.length > 0 && showDuplicateView && (
              <div className="p-6 bg-[#DFFF00] border-2 border-[#050505] shadow-[6px_6px_0px_#050505]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#050505] text-white border border-[#050505]">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="inline-block bg-[#050505] text-white text-[10px] font-mono font-black uppercase px-2 py-0.5">
                        POSSIBLE DUPLICATE CLUSTER
                      </div>
                      <h4 className="text-xl font-black font-display text-[#050505] mt-1 uppercase">
                        37 CITIZENS HAVE ALREADY REPORTED THIS HAZARD
                      </h4>
                      <p className="text-xs font-mono text-[#050505] mt-0.5">
                        Case #CP-48291 matches your photo & location with 96% spatial confidence.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Duplicate comparison card */}
                <div className="mt-4 p-4 bg-white border-2 border-[#050505] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">MASTER CASE</span>
                    <span className="font-bold text-[#050505] text-sm">#CP-48291</span>
                    <span className="text-[11px] text-slate-600 block mt-0.5">MG Road, Metro Pillar 142</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">GEO OFFSET</span>
                    <span className="font-bold text-[#050505] text-sm">35 METERS AWAY</span>
                    <span className="text-[11px] text-slate-600 block mt-0.5">Within 250m Impact Radius</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">AI SIMILARITY</span>
                    <span className="font-bold text-[#050505] text-sm">96% MATCH</span>
                    <span className="text-[11px] text-slate-600 block mt-0.5">Surface fissure match</span>
                  </div>
                </div>

                {/* Duplicate choice buttons */}
                <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => handleJoinCase('CP-48291')}
                    className="w-full sm:w-auto px-6 py-3 bg-[#050505] hover:bg-white text-white hover:text-[#050505] border-2 border-[#050505] font-mono font-bold text-xs uppercase shadow-[3px_3px_0px_rgba(0,0,0,0.3)] transition-colors flex items-center justify-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>JOIN EXISTING CASE (+1 ENDORSEMENT)</span>
                  </button>

                  <button
                    onClick={() => setShowDuplicateView(false)}
                    className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-200 border-2 border-[#050505] text-xs font-mono font-bold text-[#050505] transition-colors"
                  >
                    CREATE SEPARATE INDEPENDENT CASE
                  </button>
                </div>
              </div>
            )}

            {/* AI RESULT CARD */}
            <div className="p-6 sm:p-8 bg-white border-2 border-[#050505] shadow-[6px_6px_0px_#050505] space-y-6">
              <div className="flex items-center justify-between border-b-2 border-[#050505] pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#DFFF00] border border-[#050505]" />
                  <span className="text-xs font-mono font-black tracking-widest text-[#050505] uppercase flex items-center gap-2">
                    <span>AI DETECTION SYNTHESIS</span>
                    <span className="bg-[#DFFF00] text-[#050505] border border-[#050505] px-1.5 py-0.2 text-[10px] font-bold">GROQ LPU</span>
                  </span>
                </div>
                <div className="px-3 py-1 bg-red-600 text-white text-xs font-mono font-black uppercase border border-[#050505]">
                  SEVERITY: {analysisResult.severity}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-[#F9F8F3] border-2 border-[#050505] text-center">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">CONFIDENCE</span>
                  <span className="text-3xl font-black font-mono text-[#050505] mt-1 block">
                    {Math.round(analysisResult.confidence * 100)}%
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase mt-1 block">NEURAL RELIABILITY</span>
                </div>

                <div className="p-4 bg-[#F9F8F3] border-2 border-[#050505]">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">IDENTIFIED ISSUE</span>
                  <span className="text-lg font-black font-display text-[#050505] mt-1 block truncate">
                    {analysisResult.detectedCategory}
                  </span>
                  <span className="text-[11px] font-mono text-slate-600 mt-0.5 block">Surface fracture</span>
                </div>

                <div className="p-4 bg-[#F9F8F3] border-2 border-[#050505]">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">DEPARTMENT</span>
                  <span className="text-sm font-black font-mono text-[#050505] mt-1 block truncate">
                    {analysisResult.recommendedDepartment}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-600 mt-0.5 block">SLA: &lt; 12 HOURS</span>
                </div>

                <div className="p-4 bg-[#050505] text-white border-2 border-[#050505]">
                  <span className="text-[10px] font-mono font-bold text-[#DFFF00] uppercase block">PRIORITY SCORE</span>
                  <span className="text-3xl font-black font-mono text-[#DFFF00] mt-1 block">
                    {analysisResult.priorityScore} <span className="text-xs font-normal text-white">/ 100</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase mt-0.5 block text-white">
                    CRITICAL INTERVENTION
                  </span>
                </div>
              </div>

              {/* AI Explanation Quote Box */}
              <div className="p-4 bg-[#F9F8F3] border-l-4 border-[#050505] text-xs font-mono text-[#050505] leading-relaxed">
                <span className="font-bold text-[#050505] text-[11px] block mb-1 uppercase">AI REASONING LOG:</span>
                “{analysisResult.summary}”
              </div>

              {/* Impact Details Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono pt-1">
                <div className="p-3 bg-white border border-[#050505]">
                  <span className="text-[10px] text-slate-500 block uppercase">IMPACT RADIUS</span>
                  <span className="font-bold text-[#050505]">250m around MG Road</span>
                </div>
                <div className="p-3 bg-white border border-[#050505]">
                  <span className="text-[10px] text-slate-500 block uppercase">NEARBY SENSITIVE ZONES</span>
                  <span className="font-bold text-[#050505]">3 Schools, 2 Hospitals</span>
                </div>
                <div className="p-3 bg-white border border-[#050505]">
                  <span className="text-[10px] text-slate-500 block uppercase">DUPLICATES MERGED</span>
                  <span className="font-bold text-[#050505]">37 Citizen Corroborations</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3 border-t-2 border-[#050505]">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-200 border-2 border-[#050505] text-xs font-mono font-bold text-[#050505] transition-colors"
                >
                  EDIT DETAILS
                </button>

                <button
                  onClick={handleConfirmNewReport}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#DFFF00] hover:bg-[#050505] text-[#050505] hover:text-[#DFFF00] border-2 border-[#050505] font-black text-xs font-mono tracking-wider uppercase shadow-[4px_4px_0px_#050505] active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>CONFIRM & TRANSMIT REPORT ↗</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 5: SUCCESS CONFIRMATION */}
        {currentStep === 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="p-8 sm:p-12 bg-white border-2 border-[#050505] shadow-[6px_6px_0px_#050505] text-center space-y-6"
          >
            <div className="w-16 h-16 bg-[#DFFF00] border-2 border-[#050505] flex items-center justify-center mx-auto text-[#050505] shadow-[4px_4px_0px_#050505]">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest bg-[#050505] text-[#DFFF00] px-3 py-1">
                TRANSMISSION CONFIRMED
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-[#050505] mt-3 uppercase tracking-tight">
                COMPLAINT LOGGED INTO CITY GRID.
              </h2>
              <p className="text-xs sm:text-sm font-medium text-slate-600 max-w-md mx-auto mt-2">
                Your report has been auto-assigned with priority score 92. Municipal crew dispatch notification has been scheduled.
              </p>
            </div>

            <div className="inline-block p-4 bg-[#F9F8F3] border-2 border-[#050505] text-xs font-mono text-[#050505]">
              <div className="text-slate-500 text-[10px] uppercase font-bold">CASE TRACKING ID</div>
              <div className="text-xl font-black text-[#050505] mt-0.5">#CP-48291</div>
              <div className="text-slate-600 text-[11px] mt-1 font-bold">Road Maintenance Rapid Response Unit 4</div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  const targetCase = complaints.find((c) => c.id === 'CP-48291');
                  if (targetCase) setSelectedComplaint(targetCase);
                  setActiveTab('map');
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#DFFF00] hover:bg-[#050505] text-[#050505] hover:text-[#DFFF00] border-2 border-[#050505] font-black text-xs font-mono tracking-wider uppercase shadow-[4px_4px_0px_#050505] flex items-center justify-center gap-2 transition-all"
              >
                <MapPin className="w-4 h-4" />
                <span>TRACK ON LIVE CITY MAP ↗</span>
              </button>

              <button
                onClick={() => setActiveTab('my-complaints')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-200 border-2 border-[#050505] text-[#050505] text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-[2px_2px_0px_#050505] transition-colors"
              >
                <span>VIEW IN MY COMPLAINTS</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
