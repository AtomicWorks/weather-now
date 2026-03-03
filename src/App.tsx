import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cloud,
  Home,
  Search,
  Map as MapIcon,
  Bell,
  ChevronDown,
  Wind,
  Sunrise,
  Sunset,
  MapPin,
  CloudRain,
  Sun,
  CloudLightning,
  CloudSnow
} from 'lucide-react';

// --- Types & Mock Data ---

type WeatherCondition = 'Sunny' | 'Cloudy' | 'Rainy' | 'Snowy' | 'Stormy';

type DayForecast = {
  day: string;
  temp: number;
  icon: React.ReactNode;
  condition: WeatherCondition;
  description: string;
};

const weeklyData: DayForecast[] = [
  { day: 'Monday', temp: 26, icon: <Cloud className="w-6 h-6 text-white" />, condition: 'Cloudy', description: 'Overcast clouds' },
  { day: 'Tuesday', temp: 28, icon: <Sun className="w-6 h-6 text-yellow-300" />, condition: 'Sunny', description: 'Clear skies' },
  { day: 'Wednesday', temp: 24, icon: <CloudRain className="w-6 h-6 text-blue-200" />, condition: 'Rainy', description: 'Light rain' },
  { day: 'Thursday', temp: 26, icon: <Sun className="w-6 h-6 text-yellow-300" />, condition: 'Sunny', description: 'Mostly sunny' },
  { day: 'Friday', temp: 23, icon: <CloudLightning className="w-6 h-6 text-purple-300" />, condition: 'Stormy', description: 'Thunderstorms' },
  { day: 'Saturday', temp: 20, icon: <CloudSnow className="w-6 h-6 text-white" />, condition: 'Snowy', description: 'Light snow' },
  { day: 'Sunday', temp: 27, icon: <Sun className="w-6 h-6 text-yellow-300" />, condition: 'Sunny', description: 'Clear skies' },
];

// --- Weather Effects ---

const CloudEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
    {Array.from({ length: 4 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-[800px] h-[400px] bg-white/20 rounded-full blur-[100px]"
        style={{
          top: `${Math.random() * 40}%`,
        }}
        initial={{ x: '-50vw' }}
        animate={{ x: '150vw' }}
        transition={{
          duration: 40 + Math.random() * 20,
          repeat: Infinity,
          ease: 'linear',
          delay: Math.random() * -40,
        }}
      />
    ))}
  </div>
);

const SunEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute top-[10%] left-[40%] w-[800px] h-[800px] bg-yellow-200/20 rounded-full blur-[120px] mix-blend-screen"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  </div>
);

const RainEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 100 }).map((_, i) => {
      const delay = Math.random() * 2;
      const duration = 0.5 + Math.random() * 0.3;
      return (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[40px] bg-gradient-to-b from-transparent via-blue-200/60 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-50px`,
          }}
          animate={{
            y: ['0vh', '120vh'],
            x: ['0vw', '-15vw'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'linear',
            delay,
          }}
        />
      );
    })}
  </div>
);

const SnowEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 100 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-white/80 rounded-full blur-[2px]"
        style={{
          left: `${Math.random() * 100}%`,
          top: `-20px`,
        }}
        animate={{
          y: ['0vh', '120vh'],
          x: ['0vw', `${(Math.random() - 0.5) * 30}vw`],
          opacity: [0, 1, 0.5, 1, 0],
          scale: [0, 1, 1, 0.5, 0],
        }}
        transition={{
          duration: 4 + Math.random() * 6,
          repeat: Infinity,
          ease: 'linear',
          delay: Math.random() * -10,
        }}
      />
    ))}
  </div>
);

const LightningEffect = () => (
  <motion.div
    className="absolute inset-0 bg-white mix-blend-overlay pointer-events-none"
    animate={{
      opacity: [0, 0, 0.8, 0, 0, 0.4, 0, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: 'linear',
      times: [0, 0.9, 0.92, 0.94, 0.96, 0.97, 0.98, 1]
    }}
  />
);

const weatherBackgrounds: Record<WeatherCondition, { image: string, gradients: React.ReactNode, effects?: React.ReactNode }> = {
  Sunny: {
    image: 'https://images.unsplash.com/photo-1534088568595-a066f410cbda?q=80&w=2574&auto=format&fit=crop',
    gradients: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-[#4a6b8c]/80 via-[#7a9cb8]/40 to-[#9cbcd6]/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-yellow-200/20" />
      </>
    ),
    effects: <SunEffect />
  },
  Cloudy: {
    image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=2574&auto=format&fit=crop',
    gradients: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-600/80 via-gray-500/50 to-gray-400/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/40 via-transparent to-gray-300/20" />
      </>
    ),
    effects: <CloudEffect />
  },
  Rainy: {
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2574&auto=format&fit=crop',
    gradients: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 via-blue-800/60 to-gray-800/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-blue-400/20" />
      </>
    ),
    effects: <><CloudEffect /><RainEffect /></>
  },
  Snowy: {
    image: 'https://images.unsplash.com/photo-1478265409131-1f65c88f965c?q=80&w=2574&auto=format&fit=crop',
    gradients: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-300/60 via-blue-200/40 to-white/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-white/40" />
      </>
    ),
    effects: <><CloudEffect /><SnowEffect /></>
  },
  Stormy: {
    image: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0ce30?q=80&w=2574&auto=format&fit=crop',
    gradients: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/90 via-gray-900/80 to-black/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-purple-500/20" />
      </>
    ),
    effects: <><CloudEffect /><RainEffect /><LightningEffect /></>
  }
};

// --- Helper Components ---

const GlassPanel = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] ${className}`}
  >
    {children}
  </motion.div>
);

const IconButton = ({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) => (
  <button
    className={`p-2 rounded-full transition-all duration-300 hover:bg-white/20 ${
      active ? 'bg-white/20 shadow-inner' : ''
    }`}
  >
    {icon}
  </button>
);

// --- Main Components ---

const Navbar = () => (
  <nav className="flex items-center justify-between w-full pt-8 pb-4 px-12 z-10 relative">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 text-white"
    >
      <Cloud className="w-6 h-6" fill="currentColor" />
      <span className="font-medium tracking-wide text-lg">forecast. now</span>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-6 py-2"
    >
      <IconButton icon={<Home className="w-5 h-5 text-white" />} active />
      <IconButton icon={<Search className="w-5 h-5 text-white/70" />} />
      <IconButton icon={<MapIcon className="w-5 h-5 text-white/70" />} />
      <IconButton icon={<Bell className="w-5 h-5 text-white/70" />} />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4 text-white"
    >
      <div className="text-right text-sm">
        <div className="font-medium">28 Aug | 11:52</div>
      </div>
      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full pl-2 pr-4 py-1.5 cursor-pointer hover:bg-white/20 transition-colors">
        <img
          src="https://i.pravatar.cc/150?img=32"
          alt="User"
          className="w-8 h-8 rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium leading-tight">Sam Row</span>
          <span className="text-[10px] text-white/70 leading-tight">Admin</span>
        </div>
        <ChevronDown className="w-4 h-4 ml-2 text-white/70" />
      </div>
    </motion.div>
  </nav>
);

const MainWeather = ({ data }: { data: DayForecast }) => (
  <div className="flex flex-col justify-center h-full max-w-xl z-10 relative text-white pl-12">
    <AnimatePresence mode="wait">
      <motion.div
        key={data.day + '-text'}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-7xl font-semibold tracking-tight mb-2">{data.condition}</h1>
        <h2 className="text-3xl font-light mb-6">{data.description}</h2>
        <p className="text-white/80 text-lg font-light leading-relaxed max-w-md mb-12">
          {data.condition === 'Sunny' && 'Clear skies with occasional clouds. Light winds keep temperatures comfortable, warm afternoons, and cooler evenings.'}
          {data.condition === 'Cloudy' && 'Overcast conditions throughout the day. Temperatures remain mild with a gentle breeze.'}
          {data.condition === 'Rainy' && 'Steady rain expected. Grab an umbrella and expect cooler temperatures.'}
          {data.condition === 'Snowy' && 'Light snow falling. Bundle up and enjoy the winter scenery.'}
          {data.condition === 'Stormy' && 'Thunderstorms in the area. Heavy rain and strong winds expected. Stay indoors.'}
        </p>
      </motion.div>
    </AnimatePresence>

    <AnimatePresence mode="wait">
      <motion.div
        key={data.day + '-temp'}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="flex items-end gap-6"
      >
        <div className="flex items-start">
          <span className="text-9xl font-semibold tracking-tighter leading-none">{data.temp}</span>
          <span className="text-5xl font-light mt-2">°</span>
          <div className="flex flex-col justify-end pb-4 ml-2">
            <span className="text-2xl font-light">+</span>
            <span className="text-2xl font-light leading-none">_</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="flex items-center gap-6 mt-8 text-white/80"
    >
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        <span className="text-lg">New York</span>
      </div>
      <div className="w-px h-5 bg-white/30"></div>
      <span className="text-lg">UV Ind.: {data.condition === 'Sunny' ? 6 : data.condition === 'Cloudy' ? 3 : 1}</span>
    </motion.div>
  </div>
);

const WindWidget = () => (
  <GlassPanel className="w-full h-[220px] flex flex-col justify-between relative overflow-hidden group hover:bg-white/15 transition-colors duration-500">
    <div className="flex justify-between items-center z-10">
      <div className="flex items-center gap-2 text-white/80">
        <Wind className="w-5 h-5" />
        <span className="font-medium">Wind status</span>
      </div>
      <div className="text-white">
        <span className="text-2xl font-semibold">3.40</span>
        <span className="text-sm text-white/70 ml-1">km/h</span>
      </div>
    </div>
    
    {/* Decorative Chart Background */}
    <div className="absolute bottom-0 left-0 w-full h-32 opacity-60">
      <svg viewBox="0 0 400 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d="M0,50 Q40,20 80,60 T160,40 T240,70 T320,30 T400,50"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
        />
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          d="M0,50 Q40,20 80,60 T160,40 T240,70 T320,30 T400,50 L400,100 L0,100 Z"
          fill="url(#windGradient)"
          stroke="none"
        />
        <defs>
          <linearGradient id="windGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    {/* Bar Chart overlay */}
    <div className="flex items-end justify-between w-full h-16 z-10 px-2">
      {[40, 60, 30, 80, 50, 90, 40, 70, 30, 60, 40, 80, 50, 70, 40].map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
          className="w-1.5 bg-white/30 rounded-t-sm"
        />
      ))}
    </div>
  </GlassPanel>
);

const SunWidget = () => (
  <GlassPanel className="w-full h-[220px] flex flex-col justify-between relative group hover:bg-white/15 transition-colors duration-500">
    <div className="flex justify-between items-center z-10 text-white/80 text-sm">
      <div className="flex items-center gap-2">
        <Sunrise className="w-4 h-4" />
        <span>Sunrise ↗</span>
      </div>
      <div className="flex items-center gap-2">
        <span>↙ Sunset</span>
        <Sunset className="w-4 h-4" />
      </div>
    </div>

    <div className="relative w-full h-32 flex items-end justify-center pb-4">
      {/* Semi-circle arc */}
      <svg viewBox="0 0 200 100" className="w-[80%] h-full overflow-visible">
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          d="M 10 90 A 80 80 0 0 1 190 90"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        
        {/* Sun position indicator */}
        <motion.circle
          initial={{ cx: 10, cy: 90 }}
          animate={{ cx: 140, cy: 35 }} // Approximate position on arc
          transition={{ delay: 1, duration: 1, ease: "easeOut" }}
          r="4"
          fill="#FCD34D"
          className="drop-shadow-[0_0_8px_rgba(252,211,77,0.8)]"
        />
        
        {/* Sunrise/Sunset dots */}
        <circle cx="10" cy="90" r="3" fill="rgba(255,255,255,0.8)" />
        <circle cx="190" cy="90" r="3" fill="rgba(255,255,255,0.8)" />
        
        {/* Inner solid arc */}
        <path
          d="M 60 90 A 40 40 0 0 1 140 90"
          fill="none"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="2"
        />
        <line x1="40" y1="90" x2="160" y2="90" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
      </svg>
    </div>
  </GlassPanel>
);

const WeeklyForecast = ({ activeDay, onDayClick }: { activeDay: string, onDayClick: (day: string) => void }) => {
  // Generate a smooth curve path for the forecast
  const generatePath = () => {
    const width = 1000;
    const height = 60;
    const points = weeklyData.map((d, i) => {
      const x = (i / (weeklyData.length - 1)) * width;
      // Map temp 20-30 to y 60-0
      const y = height - ((d.temp - 20) / 10) * height;
      return { x, y };
    });

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cx = (p0.x + p1.x) / 2;
      path += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return path;
  };

  return (
    <div className="w-full px-12 pb-8 z-10 relative mt-auto">
      <div className="relative w-full h-[180px] flex flex-col justify-end">
        {/* SVG Curve */}
        <div className="absolute bottom-10 left-0 w-full h-[60px] px-8">
          <svg width="100%" height="100%" viewBox="0 0 1000 60" preserveAspectRatio="none" className="overflow-visible">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d={generatePath()}
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Data Points */}
        <div className="flex justify-between items-end w-full relative z-10 px-8">
          {weeklyData.map((data, index) => {
            // Calculate relative Y position for the dot and icon
            const yOffset = ((data.temp - 20) / 10) * 60;
            const isActive = data.day === activeDay;
            
            return (
              <motion.div
                key={data.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => onDayClick(data.day)}
              >
                <span className={`text-sm mb-2 font-medium transition-colors ${isActive ? 'text-white' : 'text-white/80'}`}>{data.day}</span>
                <span className={`text-3xl font-light mb-4 transition-colors ${isActive ? 'text-white' : 'text-white/80'}`}>{data.temp}°</span>
                
                {/* The dot on the line */}
                <div 
                  className="relative flex items-center justify-center w-full"
                  style={{ bottom: `${yOffset - 10}px` }}
                >
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${isActive ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] scale-150' : 'bg-white/50 group-hover:bg-white group-hover:scale-125'}`} />
                  
                  {/* Vertical dashed line for active item */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 40, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="absolute bottom-4 w-px border-l border-dashed border-white/50"
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Icon below the line */}
                  <div className="absolute top-6">
                    <div className={`p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${isActive ? 'bg-white/20 border-white/40 shadow-lg' : 'bg-white/5 border-white/10 group-hover:bg-white/15'}`}>
                      {data.icon}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeDay, setActiveDay] = useState('Thursday');

  const currentData = weeklyData.find(d => d.day === activeDay) || weeklyData[3];
  const weatherStyle = weatherBackgrounds[currentData.condition];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#5b7c99] font-sans selection:bg-white/30 transition-colors duration-1000">
      {/* Dynamic Background Image with Parallax */}
      <motion.div
        animate={{
          x: mousePosition.x * -1,
          y: mousePosition.y * -1,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        className="absolute inset-[-5%] w-[110%] h-[110%] z-0"
      >
        <AnimatePresence>
          <motion.img
            key={weatherStyle.image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            src={weatherStyle.image}
            alt="Sky Background"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        
        {/* Gradient Overlays for better text readability and mood */}
        <AnimatePresence>
          <motion.div
            key={currentData.condition + '-gradients'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {weatherStyle.gradients}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Weather Effects (Rain, Snow, Lightning) */}
      <AnimatePresence>
        {weatherStyle.effects && (
          <motion.div
            key={currentData.condition + '-effects'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            {weatherStyle.effects}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout Container */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <Navbar />
        
        <div className="flex-1 flex items-center justify-between px-12 w-full max-w-[1600px] mx-auto">
          <MainWeather data={currentData} />
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col gap-6 w-[400px] pr-12"
          >
            <WindWidget />
            <SunWidget />
          </motion.div>
        </div>

        <WeeklyForecast activeDay={activeDay} onDayClick={setActiveDay} />
      </div>
    </div>
  );
}
