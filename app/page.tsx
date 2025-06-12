"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function KarenHologram() {
  const [isLaunched, setIsLaunched] = useState(false)
  const [isMicOn, setIsMicOn] = useState(false)

  // Settings state
  const [settings, setSettings] = useState({
    autoListen: true,
    volume: 80,
    enableBackground: true,
  })

  const handleLaunch = () => {
    // In the actual implementation, this would connect to LiveKit
    setIsLaunched(true)
  }

  const toggleMic = () => {
    setIsMicOn(!isMicOn)
    // In the actual implementation, this would enable/disable microphone
  }

  if (!isLaunched) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">VOKA Hologram</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-listen" className="flex flex-col">
                  <span>Auto-listen</span>
                  <span className="text-sm text-muted-foreground">Start listening automatically</span>
                </Label>
                <Switch
                  id="auto-listen"
                  checked={settings.autoListen}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoListen: checked })}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="volume">Volume</Label>
                  <span className="text-sm text-muted-foreground">{settings.volume}%</span>
                </div>
                <Slider
                  id="volume"
                  min={0}
                  max={100}
                  step={1}
                  value={[settings.volume]}
                  onValueChange={(value) => setSettings({ ...settings, volume: value[0] })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="background" className="flex flex-col">
                  <span>Background</span>
                  <span className="text-sm text-muted-foreground">Enable animated background</span>
                </Label>
                <Switch
                  id="background"
                  checked={settings.enableBackground}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableBackground: checked })}
                />
              </div>
            </div>

            <Button
              onClick={handleLaunch}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              size="lg"
            >
              Launch Hologram
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Main Hologram Container */}
      <div className="flex flex-col items-center justify-center space-y-8">
        {/* Avatar Portrait Frame with Glowing Border */}
        <div className="relative">
          {/* Outer Glow Ring - Portrait Oval */}
          <div className="absolute inset-0 w-80 h-[32rem] rounded-full border-4 border-cyan-400 shadow-2xl shadow-cyan-400/50 animate-pulse"></div>

          {/* Inner Avatar Container - Portrait */}
          <div className="w-80 h-[32rem] rounded-full overflow-hidden border-2 border-cyan-300/50 relative bg-gradient-to-b from-blue-900/20 to-slate-900/20 backdrop-blur-sm">
            {isMicOn ? (
              <div className="w-full h-full bg-gradient-to-b from-blue-900/80 to-purple-900/80 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-32 h-32 rounded-full bg-cyan-500/30 flex items-center justify-center mb-4 mx-auto shadow-lg shadow-cyan-500/30">
                    <div className="w-16 h-16 rounded-full bg-cyan-400 animate-pulse shadow-inner"></div>
                  </div>
                  <p className="text-xl font-light drop-shadow-lg">Listening...</p>
                </div>
              </div>
            ) : (
              <video
                src="/api/blob/karen-standby-mode.mp4" // This will be updated after upload
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Holographic Microphone Platform */}
        <div className="relative">
          {/* Platform Base with Concentric Circles */}
          <div className="relative w-48 h-12">
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/60 shadow-lg shadow-cyan-400/30 animate-pulse"></div>
            {/* Middle Ring */}
            <div className="absolute inset-2 rounded-full border border-cyan-300/40"></div>
            {/* Inner Ring */}
            <div className="absolute inset-4 rounded-full border border-cyan-200/30"></div>

            {/* Platform Surface */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm"></div>
          </div>

          {/* Microphone */}
          <div
            className={`absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-16 cursor-pointer transition-all duration-300 ${
              isMicOn ? "scale-110" : "hover:scale-105"
            }`}
            onClick={toggleMic}
          >
            {/* Microphone Stand */}
            <div className="w-2 h-12 bg-gradient-to-b from-slate-600 to-slate-800 mx-auto rounded-full shadow-lg"></div>

            {/* Microphone Head */}
            <div
              className={`w-8 h-12 rounded-full mx-auto -mt-2 shadow-xl transition-all duration-300 ${
                isMicOn
                  ? "bg-gradient-to-b from-red-500 to-red-700 shadow-red-500/50 animate-pulse"
                  : "bg-gradient-to-b from-slate-700 to-slate-900 hover:from-cyan-600 hover:to-cyan-800"
              }`}
            >
              {/* Microphone Grille */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-slate-800/50 to-slate-900/50 flex items-center justify-center">
                <div className="w-4 h-6 bg-slate-900/80 rounded-sm"></div>
              </div>
            </div>

            {/* Microphone Glow Effect */}
            {isMicOn && (
              <div className="absolute inset-0 w-8 h-12 rounded-full bg-red-400/30 blur-md animate-pulse mx-auto"></div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Settings Button */}
      <Button
        onClick={() => setIsLaunched(false)}
        className="fixed top-6 right-6 bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-cyan-400/30 z-10"
        variant="outline"
        size="sm"
      >
        ⚙️ Settings
      </Button>

      {/* Status Indicator */}
      <div className="fixed top-6 left-6 z-10">
        <div className="flex items-center space-x-3 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-cyan-400/30">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
          <span className="text-white text-sm font-medium">VOKA Hologram Active</span>
        </div>
      </div>

      {/* Background Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  )
}
