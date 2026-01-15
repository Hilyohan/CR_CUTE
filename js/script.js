// ==========================================
// 1. Constants & Configurations
// ==========================================

const MAX_CHARS = 10;
const GIF_FPS = 30;
const GIF_DELAY = 1000 / GIF_FPS;
const MAX_TIME_WEBM = 60000;
const MAX_TIME_GIF = 10000;

const STYLE_DEF = {
    walk: { label: "1. 총총 걷기 (Walk)", params: [{key:'stepHeight', label:'높이', min:0, max:20, step:1, def:5}, {key:'stepFreq', label:'빈도', min:0.2, max:3.0, step:0.1, def:1.0}] }, 
    bounce: { label: "2. 통통 튀기 (Bounce)", params: [{key:'jumpHeight', label:'높이', min:0.5, max:4.0, step:0.1, def:1.5}, {key:'squash', label:'탄력', min:0, max:0.4, step:0.01, def:0.1}] }, 
    wobble: { label: "3. 뒤뚱뒤뚱 (Wobble)", params: [{key:'tiltAngle', label:'각도', min:0.05, max:1.0, step:0.05, def:0.2}, {key:'waddleSpeed', label:'속도', min:0.05, max:1.0, step:0.05, def:0.2}] }, 
    float: { label: "4. 둥둥 떠다니기 (Float)", params: [{key:'altitude', label:'고도', min:0.1, max:0.9, step:0.01, def:0.4}, {key:'waveAmp', label:'범위', min:0, max:100, step:1, def:20}] }, 
    roll: { label: "5. 데굴데굴 (Roll)", params: [{key:'spinSpeed', label:'회전', min:0.5, max:5.0, step:0.1, def:2.0}] }, 
    sleigh: { label: "6. 썰매 타기 (Sleigh)", params: [{key:'altitude', label:'고도', min:0.1, max:0.9, step:0.01, def:0.5}, {key:'waveAmp', label:'굴곡', min:0, max:100, step:1, def:30}] }, 
    zoom: { label: "7. 주인공 (Zoom)", params: [{key:'maxScale', label:'확대', min:1.1, max:3.0, step:0.1, def:1.5}, {key:'pulseSpeed', label:'속도', min:0.01, max:0.2, step:0.01, def:0.05}] }, 
    panic: { label: "8. 허둥지둥 (Panic)", params: [{key:'jitterRange', label:'떨림', min:1, max:30, step:1, def:10}, {key:'panicSpeed', label:'속도', min:1.0, max:5.0, step:0.1, def:3.0}] }, 
    teleport: { label: "9. 순간이동 (Teleport)", params: [{key:'interval', label:'빈도', min:0.005, max:0.1, step:0.001, def:0.02}, {key:'alphaSpeed', label:'깜빡임', min:0.01, max:0.5, step:0.01, def:0.1}] },
    moonwalk: { label: "10. 문워크 (Moonwalk)", params: [{key:'stepHeight', label:'스텝', min:0, max:20, step:1, def:5}] }, 
    ghost: { label: "11. 유령 (Ghost)", params: [{key:'fadeMin', label:'투명', min:0.0, max:0.8, step:0.01, def:0.2}, {key:'fadeSpd', label:'깜빡임', min:0.01, max:0.2, step:0.01, def:0.05}] },
    jelly: { label: "12. 젤리 (Jelly)", params: [{key:'amount', label:'말랑', min:0.0, max:0.5, step:0.01, def:0.2}, {key:'spd', label:'속도', min:0.05, max:0.5, step:0.01, def:0.2}] }, 
    drunk: { label: "13. 취한 걸음 (Drunk)", params: [{key:'sway', label:'비틀', min:0.1, max:2.0, step:0.1, def:0.8}] },
    spin: { label: "14. 제자리 회전 (Spin)", params: [{key:'spd', label:'속도', min:0.1, max:2.0, step:0.1, def:0.5}] },
    pulse: { label: "15. 심장박동 (Pulse)", params: [{key:'spd', label:'속도', min:0.1, max:1.0, step:0.1, def:0.3}, {key:'amp', label:'강도', min:0.1, max:0.5, step:0.01, def:0.2}] },
    shake: { label: "16. 흔들흔들 (Shake)", params: [{key:'spd', label:'빈도', min:0.1, max:2.0, step:0.1, def:0.5}, {key:'amp', label:'범위', min:1, max:20, step:1, def:5}] },
    swing: { label: "17. 그네 (Swing)", params: [{key:'spd', label:'속도', min:0.01, max:0.2, step:0.01, def:0.05}, {key:'amp', label:'각도', min:0.1, max:1.0, step:0.1, def:0.3}] },
    jump: { label: "18. 점프 (Jump)", params: [{key:'height', label:'높이', min:10, max:100, step:5, def:50}, {key:'spd', label:'속도', min:0.05, max:0.5, step:0.01, def:0.1}] }
};

const TITLE_STYLE_DEF = {
    pulse: { label: "1. 두근두근 (Heartbeat)", params: [{key:'spd', label:'심박수', min:0.05, max:0.3, step:0.01, def:0.15}, {key:'amp', label:'크기 변화', min:0.01, max:0.3, step:0.01, def:0.1}] },
    jelly: { label: "2. 젤리 바운스 (Jelly)", params: [{key:'spd', label:'탄성 속도', min:0.05, max:0.3, step:0.01, def:0.15}, {key:'amp', label:'말랑함', min:0.05, max:0.3, step:0.01, def:0.15}] },
    spinY: { label: "3. 3D 회전 (Coin Spin)", params: [{key:'spd', label:'회전 속도', min:0.01, max:0.2, step:0.01, def:0.05}] },
    ghost: { label: "4. 유령 (Ghost)", params: [{key:'spd', label:'부유 속도', min:0.01, max:0.1, step:0.01, def:0.05}, {key:'alpha', label:'투명도', min:0.1, max:0.8, step:0.01, def:0.3}] },
    glitch: { label: "5. 글리치 (Cyber)", params: [{key:'freq', label:'빈도', min:0.01, max:0.5, step:0.01, def:0.1}, {key:'amp', label:'파괴력', min:1, max:30, step:1, def:10}] },
    spot_stage: { label: "6. 서치라이트 (Stage)", params: [{key:'spd', label:'회전 속도', min:0.01, max:0.1, step:0.01, def:0.03}, {key:'width', label:'빛 크기', min:30, max:200, step:1, def:100}, {key:'count', label:'조명 개수', min:1, max:10, step:1, def:2}] },
    spot_random: { label: "7. 랜덤 포커스 (Random)", params: [{key:'spd', label:'이동 반응', min:0.01, max:0.2, step:0.01, def:0.05}, {key:'width', label:'빛 크기', min:30, max:200, step:1, def:80}] },
    spot_pulse: { label: "8. 센터 펄스 (Pulse Light)", params: [{key:'spd', label:'펄스 속도', min:0.05, max:0.3, step:0.01, def:0.1}, {key:'width', label:'최대 크기', min:100, max:400, step:1, def:250}] },
    quake: { label: "9. 지진 (Quake)", params: [{key:'amp', label:'강도', min:1, max:20, step:1, def:5}, {key:'spd', label:'빈도', min:0.5, max:2.0, step:0.1, def:1.0}] },
    wave: { label: "10. 리퀴드 웨이브 (Wave)", params: [{key:'spd', label:'물결 속도', min:0.05, max:0.3, step:0.01, def:0.1}, {key:'amp', label:'물결 높이', min:1, max:20, step:1, def:5}] },
    pendulum: { label: "11. 시계추 (Swing)", params: [{key:'spd', label:'왕복 속도', min:0.01, max:0.1, step:0.01, def:0.04}, {key:'angle', label:'각도', min:0.05, max:0.5, step:0.01, def:0.15}] },
    zoom: { label: "12. 줌인 (Zoom In)", params: [{key:'spd', label:'반복 속도', min:0.01, max:0.1, step:0.01, def:0.03}, {key:'scale', label:'확대 범위', min:1.1, max:2.0, step:0.1, def:1.5}] },
    starlight: { label: "13. 별가루 (Stardust)", params: [{key:'spd', label:'반짝임', min:0.01, max:0.2, step:0.01, def:0.05}, {key:'count', label:'별 개수', min:5, max:50, step:1, def:15}, {key:'size', label:'별 크기', min:0.5, max:3.0, step:0.1, def:1.0}, {key:'hue', label:'색상', min:0, max:360, step:10, def:60}] },
    neon: { label: "14. 네온 사인 (Neon)", params: [{key:'spd', label:'깜빡임', min:0.05, max:0.5, step:0.01, def:0.1}, {key:'intensity', label:'빛 강도', min:5, max:50, step:1, def:20}, {key:'hue', label:'색상', min:0, max:360, step:10, def:300}] },
    glow: { label: "15. 후광 (Backlight)", params: [{key:'spd', label:'숨쉬기', min:0.01, max:0.1, step:0.01, def:0.03}, {key:'size', label:'후광 크기', min:10, max:100, step:1, def:40}, {key:'hue', label:'색상', min:0, max:360, step:10, def:50}] }
};

const DECOR_STYLE_DEF = {
    normal: { label: "1. 기본 (Normal)" },
    warm_light: { label: "2. 따뜻한 빛 (Warm Light)" },
    cold_light: { label: "3. 차가운 빛 (Cold Light)" },
    neon: { label: "4. 네온 사인 (Neon)" },
    twinkle: { label: "5. 반짝임 (Twinkle)" },
    silhouette: { label: "6. 실루엣 (Silhouette)" },
    ghost: { label: "7. 유령 (Ghost)" },
    breathe: { label: "8. 숨쉬기 (Breathe)" },
    float: { label: "9. 둥둥 (Float)" },
    swing: { label: "10. 흔들흔들 (Swing)" },
    spin: { label: "11. 빙글빙글 (Spin)" },
    jelly: { label: "12. 젤리 (Jelly)" },
};

const PARTICLE_DEF = {
    snow: { 
        label: "❄️ 눈 (Snow)", 
        params: [
            {key:'count', label:'개수', min:10, max:500, step:10, def:150},
            {key:'speed', label:'속도', min:0.5, max:5.0, step:0.1, def:1.5},
            {key:'wind', label:'바람', min:-3, max:3, step:0.1, def:0},
            {key:'size', label:'크기', min:0.5, max:4, step:0.1, def:2}
        ] 
    },
    rain: { 
        label: "🌧️ 비 (Rain)", 
        params: [
            {key:'count', label:'강수량', min:50, max:1000, step:10, def:400},
            {key:'speed', label:'낙하 속도', min:5, max:25, step:1, def:15},
            {key:'angle', label:'기울기', min:-0.5, max:0.5, step:0.01, def:0.05},
            {key:'length', label:'길이', min:5, max:30, step:1, def:15}
        ] 
    },
    sakura: { 
        label: "🌸 벚꽃 (Sakura)", 
        params: [
            {key:'count', label:'꽃잎 수', min:10, max:100, step:1, def:40},
            {key:'speed', label:'낙하 속도', min:0.5, max:3, step:0.1, def:1},
            {key:'wind', label:'바람', min:-2, max:2, step:0.1, def:0.5},
            {key:'sway', label:'흔들림', min:0.5, max:5, step:0.1, def:2}
        ] 
    },
    firefly: { 
        label: "✨ 반딧불이 (Fireflies)", 
        params: [
            {key:'count', label:'개수', min:10, max:100, step:1, def:30},
            {key:'speed', label:'비행 속도', min:0.2, max:2, step:0.1, def:0.5},
            {key:'size', label:'크기', min:1, max:5, step:0.1, def:2},
            {key:'chaos', label:'불규칙성', min:0.1, max:2.0, step:0.1, def:0.5}
        ] 
    },
    ember: { 
        label: "🔥 불티 (Embers)", 
        params: [
            {key:'count', label:'개수', min:20, max:200, step:10, def:80},
            {key:'speed', label:'상승 속도', min:1, max:5, step:0.1, def:2},
            {key:'size', label:'크기', min:1, max:4, step:0.1, def:2},
            {key:'life', label:'수명', min:50, max:200, step:10, def:100}
        ] 
    },
    confetti: { 
        label: "🎉 컨페티 (Confetti)", 
        params: [
            {key:'count', label:'조각 수', min:20, max:300, step:10, def:100},
            {key:'speed', label:'낙하 속도', min:1, max:6, step:0.1, def:3},
            {key:'spread', label:'퍼짐', min:0, max:10, step:1, def:2},
            {key:'spin', label:'회전 속도', min:0.1, max:1.0, step:0.1, def:0.2}
        ] 
    },
    bubble: { 
        label: "🫧 비눗방울 (Bubbles)", 
        params: [
            {key:'count', label:'방울 수', min:5, max:50, step:1, def:15},
            {key:'speed', label:'상승 속도', min:0.5, max:3, step:0.1, def:1},
            {key:'size', label:'크기', min:2, max:20, step:1, def:8},
            {key:'wobble', label:'흔들림', min:0.1, max:2.0, step:0.1, def:0.5}
        ] 
    },
    fog: { 
        label: "☁️ 안개 (Fog)", 
        params: [
            {key:'count', label:'밀도', min:3, max:15, step:1, def:6},
            {key:'speed', label:'흐름 속도', min:0.1, max:2, step:0.1, def:0.5},
            {key:'size', label:'입자 크기', min:50, max:300, step:10, def:150},
            {key:'opacity', label:'투명도', min:0.1, max:0.5, step:0.01, def:0.15}
        ] 
    },
    star: { 
        label: "⭐ 별 (Stars)", 
        params: [
            {key:'count', label:'별 개수', min:50, max:500, step:10, def:200},
            {key:'twinkle', label:'반짝임 속도', min:0.01, max:0.2, step:0.01, def:0.05},
            {key:'size', label:'크기', min:0.5, max:3, step:0.1, def:1.0},
            {key:'hue', label:'색상 (Hue)', min:0, max:360, step:10, def:50}
        ] 
    },
    heart: { 
        label: "❤️ 하트 (Hearts)", 
        params: [
            {key:'count', label:'하트 수', min:10, max:100, step:5, def:30},
            {key:'speed', label:'상승 속도', min:0.5, max:3, step:0.1, def:1.5},
            {key:'size', label:'크기', min:5, max:20, step:1, def:10},
            {key:'sway', label:'흔들림', min:0, max:3, step:0.1, def:1}
        ] 
    }
};

// ==========================================
// 2. State Management
// ==========================================

// Canvas & Context
const canvas = document.getElementById('mainCanvas');
const canvasContainer = document.getElementById('canvasContainer');
const ctx = canvas.getContext('2d');

// UI Elements
const overlay = document.getElementById('overlay');
const resolutionDisplay = document.getElementById('resolutionDisplay');
const emptyState = document.getElementById('emptyState');
const emptyDecor = document.getElementById('emptyDecor');
const bgInput = document.getElementById('bgInput');
const btnBgTransparent = document.getElementById('btnBgTransparent');
const btnBgColor = document.getElementById('btnBgColor');
const btnBgImage = document.getElementById('btnBgImage');
const bgColorControl = document.getElementById('bgColorControl');
const bgImageControl = document.getElementById('bgImageControl');
const bgColorInput = document.getElementById('bgColorInput');
const bgColorHex = document.getElementById('bgColorHex');
const bgImageName = document.getElementById('bgImageName');

const charInput = document.getElementById('charInput');
const decorInput = document.getElementById('decorInput');
const titleInput = document.getElementById('titleInput');
const titleStyleSelect = document.getElementById('titleStyle');
const titleParamsContainer = document.getElementById('titleParamsContainer');
const aspectRatioSelect = document.getElementById('aspectRatio');

// Particle UI
const particleToggle = document.getElementById('particleToggle');
const particleSettingsPanel = document.getElementById('particleSettingsPanel');
const particleTypeSelect = document.getElementById('particleType');
const particleParamsContainer = document.getElementById('particleParamsContainer');

const charListContainer = document.getElementById('charList');
const decorListContainer = document.getElementById('decorList');
const charCountLabel = document.getElementById('charCount');
const decorCountLabel = document.getElementById('decorCount');
const recordFormat = document.getElementById('recordFormat');
const recordBtn = document.getElementById('recordBtn');
const recordIcon = document.getElementById('recordIcon');
const recordText = document.getElementById('recordText');
const recordingStatus = document.getElementById('recordingStatus');
const processingOverlay = document.getElementById('processingOverlay');

const sceneSettings = document.getElementById('sceneSettings');
const objectSettings = document.getElementById('objectSettings');
const inspectorContent = document.getElementById('inspectorContent');

const galleryPage = document.getElementById('galleryPage');
const styleListContainer = document.getElementById('styleListContainer');
const galleryPreviewMount = document.getElementById('galleryPreviewMount');
const previewStyleName = document.getElementById('previewStyleName');
const previewStyleKey = document.getElementById('previewStyleKey');

// Application State
let bgMode = 'transparent'; 
let bgColor = '#0f172a';
let bgImage = null;
let titleEntity = null;
let characters = []; 
let decorations = []; 
let tick = 0;
let lastTime = 0; // Delta Time tracking
let selectedObjectId = null; // New Selection State

// Particle State
let particleSystem = null;

// Recorder State
let mediaRecorder;
let recordedChunks = [];
let isRecording = false;
let recordingStartTime = 0;
let recordingInterval = null;
let gifInstance = null;
let gifIntervalId = null;

// Gallery Preview State
let previewReqId = null;
let previewCtx = null;
let previewChar = null;
let previewLastTime = 0;
let previewCanvas = null; // Re-use single canvas

// ==========================================
// 3. Classes
// ==========================================

class Particle {
    constructor(canvasW, canvasH, type, config) {
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.type = type;
        this.config = config;
        this.reset(true);
    }

    reset(initial = false) {
        // Common initialization
        this.x = Math.random() * this.canvasW;
        this.y = initial ? Math.random() * this.canvasH : (this.isRising() ? this.canvasH + 20 : -20);
        this.z = Math.random() * 0.5 + 0.5; // Depth factor
        this.vx = 0;
        this.vy = 0;
        this.life = 0;
        this.maxLife = 100 + Math.random() * 100;
        this.opacity = 1;
        this.color = 'white';
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        this.phase = Math.random() * Math.PI * 2;
        
        // Type specific init
        const P = this.config;
        switch(this.type) {
            case 'snow':
                this.y = initial ? Math.random() * this.canvasH : -10;
                this.size = (Math.random() * 2 + 1) * (P.size || 1);
                this.vy = (Math.random() * 1 + 0.5) * (P.speed || 1);
                this.vx = (P.wind || 0) * 0.5 + (Math.random() - 0.5) * 0.5;
                break;
            case 'rain':
                this.y = initial ? Math.random() * this.canvasH : -50;
                this.vx = (P.angle || 0) * 10;
                this.vy = (Math.random() * 5 + 15) * (P.speed || 1) * 0.1;
                this.size = Math.random() * 1 + 1; // Width
                break;
            case 'sakura':
                this.y = initial ? Math.random() * this.canvasH : -20;
                this.size = (Math.random() * 5 + 5) * 1; 
                this.vy = (Math.random() * 0.5 + 0.5) * (P.speed || 1);
                this.vx = (P.wind || 0.5) + (Math.random() - 0.5);
                this.color = `hsl(${340 + Math.random()*20}, 80%, 85%)`;
                break;
            case 'firefly':
                this.vx = (Math.random() - 0.5) * (P.speed || 0.5);
                this.vy = (Math.random() - 0.5) * (P.speed || 0.5);
                this.size = (Math.random() * 2 + 1) * (P.size || 1);
                this.color = `hsl(${50 + Math.random()*20}, 100%, 70%)`;
                break;
            case 'ember':
                this.y = initial ? Math.random() * this.canvasH : this.canvasH + 10;
                this.vy = -(Math.random() * 1 + 0.5) * (P.speed || 1);
                this.vx = (Math.random() - 0.5) * 0.5;
                this.size = (Math.random() * 3 + 1) * (P.size || 1);
                this.life = 0;
                this.maxLife = (P.life || 100);
                this.color = `hsl(${10 + Math.random()*30}, 100%, 60%)`;
                break;
            case 'confetti':
                this.rotation += this.rotationSpeed * 10 * dt;
                this.x += Math.sin(this.life * 0.05) * (P.spread || 1) * dt;
                if(this.y > this.canvasH) this.reset();
                break;
            case 'bubble':
                this.x += Math.sin(this.life * 0.05 + this.phase) * (P.wobble || 0.5) * dt;
                if(this.y < -50) this.reset();
                break;
            case 'fog':
                if(this.x > this.canvasW + this.size) this.x = -this.size;
                break;
            case 'star':
                this.opacity = 0.5 + Math.sin(this.life * (P.twinkle || 0.05) + this.phase) * 0.5;
                break;
            case 'heart':
                this.x += Math.sin(this.life * 0.05 + this.phase) * (P.sway || 1) * dt;
                this.opacity = Math.min(1, (this.canvasH - this.y) / 100);
                if(this.y < -50) this.reset();
                break;
        }
    }

    update(dt) {
        const P = this.config;
        this.life += dt;
        
        // General movement
        this.x += this.vx * dt;
        this.y += this.vy * dt;

        // Specific Logic
        switch(this.type) {
            case 'snow':
                this.x += Math.sin(this.life * 0.02 + this.phase) * 0.5 * dt;
                if(this.y > this.canvasH) { this.y = -10; this.x = Math.random() * this.canvasW; }
                if(this.x > this.canvasW) this.x = 0;
                else if(this.x < 0) this.x = this.canvasW;
                break;
            case 'rain':
                this.x += (P.angle || 0) * 2 * dt;
                if(this.y > this.canvasH) { this.y = -50; this.x = Math.random() * this.canvasW; }
                if(this.x > this.canvasW) this.x = 0;
                else if(this.x < 0) this.x = this.canvasW;
                break;
            case 'sakura':
                this.x += Math.sin(this.life * 0.03 + this.phase) * (P.sway || 1) * dt;
                this.rotation += this.rotationSpeed * dt;
                if(this.y > this.canvasH) { this.y = -10; this.x = Math.random() * this.canvasW; }
                break;
            case 'firefly':
                this.vx += (Math.random() - 0.5) * (P.chaos || 0.1) * dt;
                this.vy += (Math.random() - 0.5) * (P.chaos || 0.1) * dt;
                // Clamp speed
                const maxV = (P.speed || 1) * 2;
                this.vx = Math.max(-maxV, Math.min(maxV, this.vx));
                this.vy = Math.max(-maxV, Math.min(maxV, this.vy));
                // Bounds (bounce)
                if(this.x < 0 || this.x > this.canvasW) this.vx *= -1;
                if(this.y < 0 || this.y > this.canvasH) this.vy *= -1;
                this.opacity = 0.5 + Math.sin(this.life * 0.1) * 0.5;
                break;
            case 'ember':
                this.x += Math.sin(this.life * 0.1) * 0.5 * dt;
                this.opacity = 1 - (this.life / this.maxLife);
                if(this.life >= this.maxLife) this.reset();
                break;
            case 'confetti':
                this.rotation += this.rotationSpeed * 10 * dt;
                this.x += Math.sin(this.life * 0.05) * (P.spread || 1) * dt;
                if(this.y > this.canvasH) this.reset();
                break;
            case 'bubble':
                this.x += Math.sin(this.life * 0.05 + this.phase) * (P.wobble || 0.5) * dt;
                if(this.y < -50) this.reset();
                break;
            case 'fog':
                if(this.x > this.canvasW + this.size) this.x = -this.size;
                break;
            case 'star':
                this.opacity = 0.5 + Math.sin(this.life * (P.twinkle || 0.05) + this.phase) * 0.5;
                break;
            case 'heart':
                this.x += Math.sin(this.life * 0.05 + this.phase) * (P.sway || 1) * dt;
                this.opacity = Math.min(1, (this.canvasH - this.y) / 100);
                if(this.y < -50) this.reset();
                break;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        
        switch(this.type) {
            case 'snow':
                ctx.beginPath(); ctx.arc(0, 0, this.size, 0, Math.PI*2); ctx.fill();
                break;
            case 'rain':
                ctx.strokeStyle = 'rgba(200, 220, 255, 0.6)';
                ctx.lineWidth = this.size;
                ctx.beginPath();
                ctx.moveTo(0,0);
                const len = (this.config.length || 15);
                ctx.lineTo(-(this.config.angle||0)*20, len);
                ctx.stroke();
                break;
            case 'sakura':
                ctx.rotate(this.rotation);
                // Simple petal shape
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size, this.size/2, 0, 0, Math.PI*2);
                ctx.fill();
                break;
            case 'firefly':
                ctx.shadowBlur = 10; ctx.shadowColor = this.color;
                ctx.beginPath(); ctx.arc(0, 0, this.size, 0, Math.PI*2); ctx.fill();
                break;
            case 'ember':
                ctx.shadowBlur = 10; ctx.shadowColor = 'orange';
                ctx.beginPath(); ctx.rect(-this.size/2, -this.size/2, this.size, this.size); ctx.fill();
                break;
            case 'confetti':
                ctx.rotate(this.rotation);
                // Simulate 3D flip by scaling Y based on sine
                const scaleY = Math.abs(Math.sin(this.rotation));
                ctx.scale(1, scaleY);
                ctx.beginPath(); ctx.rect(-this.size/2, -this.size/2, this.size, this.size); ctx.fill();
                break;
            case 'bubble':
                ctx.strokeStyle = 'rgba(255,255,255,0.4)';
                ctx.lineWidth = 1;
                ctx.beginPath(); ctx.arc(0,0, this.size, 0, Math.PI*2); ctx.stroke();
                // Highlight
                ctx.beginPath(); ctx.arc(-this.size*0.3, -this.size*0.3, this.size*0.2, 0, Math.PI*2); ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.fill();
                break;
            case 'fog':
                let g = ctx.createRadialGradient(0,0,0, 0,0,this.size);
                g.addColorStop(0, `rgba(200,210,230, ${this.config.opacity||0.1})`);
                g.addColorStop(1, 'rgba(200,210,230, 0)');
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(0,0, this.size, 0, Math.PI*2); ctx.fill();
                break;
            case 'star':
                ctx.shadowBlur = this.size * 5; ctx.shadowColor = 'white';
                ctx.beginPath(); ctx.arc(0,0, this.size, 0, Math.PI*2); ctx.fill();
                break;
            case 'heart':
                const s = this.size;
                ctx.beginPath();
                ctx.moveTo(0, -s/2);
                ctx.bezierCurveTo(s/2, -s, s, -s/3, 0, s);
                ctx.bezierCurveTo(-s, -s/3, -s/2, -s, 0, -s/2);
                ctx.fill();
                break;
        }
        ctx.restore();
    }
}

class ParticleSystem {
    constructor() {
        this.type = 'snow';
        this.particles = [];
        this.config = {};
        this.paramsDef = PARTICLE_DEF.snow.params;
        this.initParams();
        this.initParticles();
    }

    setType(type) {
        if (!PARTICLE_DEF[type]) return;
        this.type = type;
        this.paramsDef = PARTICLE_DEF[type].params;
        this.initParams();
        this.initParticles();
    }

    initParams() {
        this.config = {};
        this.paramsDef.forEach(p => {
            this.config[p.key] = p.def;
        });
    }

    initParticles() {
        this.particles = [];
        const count = this.config.count || 100;
        for(let i=0; i<count; i++) {
            this.particles.push(new Particle(canvas.width, canvas.height, this.type, this.config));
        }
    }

    updateConfig(key, val) {
        this.config[key] = parseFloat(val);
        if(key === 'count') {
            const diff = this.config.count - this.particles.length;
            if(diff > 0) {
                for(let i=0; i<diff; i++) this.particles.push(new Particle(canvas.width, canvas.height, this.type, this.config));
            } else if (diff < 0) {
                this.particles.splice(0, -diff);
            }
        }
    }

    draw(ctx, dt) {
        this.particles.forEach(p => {
            p.update(dt);
            p.draw(ctx);
        });
    }
    
    resize(w, h) {
        this.particles.forEach(p => {
            p.canvasW = w;
            p.canvasH = h;
        });
    }
}

class Decoration {
    constructor(id, image, name) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.x = 0.5; // Normalized X (0-1)
        this.y = 0.5; // Normalized Y (0-1)
        this.scale = 1.0;
        this.rotation = 0; // Degrees
        this.style = 'normal';
    }
    
    draw(ctx, canvasWidth, canvasHeight, dt) {
        const drawW = (this.image.width * this.scale) * (canvasHeight * 0.0015);
        const aspectRatio = this.image.width / this.image.height;
        const drawH = drawW / aspectRatio;
        
        const posX = this.x * canvasWidth;
        const posY = this.y * canvasHeight;

        ctx.save();
        
        let renderScaleX = 1, renderScaleY = 1;
        let renderRotation = this.rotation * Math.PI / 180;
        let renderX = posX;
        let renderY = posY;
        let renderAlpha = 1;

        switch(this.style) {
            case 'warm_light':
                ctx.shadowBlur = 30; ctx.shadowColor = 'orange'; ctx.globalCompositeOperation = 'lighter';
                break;
            case 'cold_light':
                ctx.shadowBlur = 30; ctx.shadowColor = 'cyan'; ctx.globalCompositeOperation = 'lighter';
                break;
            case 'neon':
                ctx.shadowBlur = 20; 
                ctx.shadowColor = `hsl(${tick * 2 % 360}, 100%, 50%)`;
                break;
            case 'twinkle':
                renderAlpha = 0.5 + Math.sin(tick * 0.1 + this.x * 10) * 0.4;
                ctx.globalCompositeOperation = 'lighter';
                break;
            case 'silhouette':
                ctx.filter = 'brightness(0%)';
                break;
            case 'ghost':
                renderAlpha = 0.6;
                renderY += Math.sin(tick * 0.05) * 10;
                break;
            case 'breathe':
                const breath = 1 + Math.sin(tick * 0.05) * 0.1;
                renderScaleX = breath; renderScaleY = breath;
                break;
            case 'float':
                renderY += Math.sin(tick * 0.05) * 15;
                break;
            case 'swing':
                renderRotation += Math.sin(tick * 0.05) * 0.2;
                break;
            case 'spin':
                renderRotation += tick * 0.05;
                break;
            case 'jelly':
                const sq = Math.sin(tick * 0.2) * 0.1;
                renderScaleY = 1 + sq; renderScaleX = 1 - sq;
                break;
        }

        ctx.translate(renderX, renderY);
        ctx.rotate(renderRotation);
        ctx.scale(renderScaleX, renderScaleY);
        ctx.globalAlpha = renderAlpha;
        
        ctx.drawImage(this.image, -drawW / 2, -drawH / 2, drawW, drawH);
        
        ctx.restore();
    }
}

class TitleEntity {
    constructor(image) {
        this.image = image;
        this.style = 'pulse';
        this.customParams = {};
        this.setStyle('pulse');
        this.stars = Array(100).fill().map(() => ({ x: Math.random(), y: Math.random(), a: Math.random() * Math.PI * 2, spd: 0.02 + Math.random() * 0.05, r: 1 + Math.random() * 2 }));
        this.randTarget = { x: 0, y: 0 };
        this.randCurrent = { x: 0, y: 0 };
    }
    setStyle(styleName) {
        this.style = styleName;
        this.customParams = {};
        if (TITLE_STYLE_DEF[styleName]) { TITLE_STYLE_DEF[styleName].params.forEach(p => { this.customParams[p.key] = p.def; }); }
    }
    drawSpotlight(ctx, x, y, radius) {
        let g = ctx.createRadialGradient(x, y, 0, x, y, radius);
        g.addColorStop(0, 'rgba(255, 255, 255, 0.8)'); g.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)'); g.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
    }
    draw(ctx, canvasWidth, canvasHeight, dt) {
        let targetW = Math.min(canvasWidth * 0.6, 500);
        let ratio = this.image.width / this.image.height;
        let targetH = targetW / ratio;
        let anchorX = canvasWidth / 2;
        let anchorY = canvasHeight * 0.15; 
        let renderX = anchorX, renderY = anchorY, rotation = 0, scaleX = 1, scaleY = 1, alpha = 1, filter = 'none', shadowBlur = 0, shadowColor = 'transparent', globalComposite = 'source-over';
        const P = this.customParams;

        switch(this.style) {
            case 'pulse': let pulse = 1 + Math.sin(tick * (P.spd||0.15)) * (P.amp||0.1); scaleX = pulse; scaleY = pulse; break;
            case 'jelly': scaleX = 1 + Math.sin(tick * (P.spd||0.15)) * (P.amp||0.15); scaleY = 1 - Math.sin(tick * (P.spd||0.15)) * (P.amp||0.15); break;
            case 'spinY': scaleX = Math.cos(tick * (P.spd||0.05)); break;
            case 'ghost': renderY += Math.sin(tick * (P.spd||0.05)) * 10; alpha = 0.5 + Math.sin(tick * 0.03) * 0.2; break;
            case 'glitch': if(Math.random() < (P.freq||0.1)) { renderX += (Math.random()-0.5) * (P.amp||10); renderY += (Math.random()-0.5) * (P.amp||10); filter = `hue-rotate(${Math.random()*360}deg) contrast(150%)`; } break;
            case 'quake': renderX += (Math.random()-0.5) * (P.amp||5); renderY += (Math.random()-0.5) * (P.amp||5); break;
            case 'pendulum': rotation = Math.sin(tick * (P.spd||0.04)) * (P.angle||0.15); break;
            case 'zoom': let zPhase = (tick * (P.spd||0.03)) % Math.PI; let zScale = 1 + Math.sin(zPhase) * ((P.scale||1.5) - 1); scaleX = zScale; scaleY = zScale; alpha = 1 - (zPhase / Math.PI) * 0.5; break;
            case 'neon': if(Math.random() < (P.spd||0.1)) alpha = 0.5 + Math.random() * 0.5; shadowBlur = P.intensity || 20; shadowColor = `hsla(${P.hue||300}, 100%, 50%, 1)`; globalComposite = 'lighter'; break;
            case 'glow': let breath = (Math.sin(tick * (P.spd||0.03)) + 1) / 2; shadowBlur = (P.size||40) * (0.5 + breath * 0.5); shadowColor = `hsla(${P.hue||50}, 100%, 60%, 0.8)`; break;
        }

        ctx.save();
        let pivotY = (this.style !== 'pendulum') ? targetH / 2 : 0;
        ctx.translate(renderX, renderY + pivotY); ctx.rotate(rotation); ctx.scale(scaleX, scaleY); ctx.globalAlpha = alpha;
        if(filter !== 'none') ctx.filter = filter;
        if (shadowBlur > 0) { ctx.shadowBlur = shadowBlur; ctx.shadowColor = shadowColor; }
        if (globalComposite !== 'source-over') { ctx.globalCompositeOperation = globalComposite; }

        let drawX = -targetW / 2; let drawY = -pivotY;

        if(this.style === 'wave') {
            const slices = 20; const sliceH = targetH / slices; const waveAmp = P.amp || 5; const waveSpd = P.spd || 0.1;
            for(let i=0; i<slices; i++) { let sy = i * (this.image.height / slices); let sh = this.image.height / slices; let dy = drawY + i * sliceH; let offset = Math.sin((tick * waveSpd) + (i * 0.5)) * waveAmp; ctx.drawImage(this.image, 0, sy, this.image.width, sh, drawX + offset, dy, targetW, sliceH); }
        } else {
            ctx.drawImage(this.image, drawX, drawY, targetW, targetH);
            if (this.style === 'neon') { ctx.globalCompositeOperation = 'source-over'; ctx.shadowBlur = 0; ctx.drawImage(this.image, drawX, drawY, targetW, targetH); }
        }

        if(this.style === 'spot_stage') {
            ctx.globalCompositeOperation = 'source-atop'; ctx.shadowBlur = 0;
            let count = P.count || 2; let r = P.width || 100; let spd = P.spd || 0.03;
            for(let i=0; i<count; i++) { let angle = (tick * spd) + (i * (Math.PI * 2 / count)); let sx = Math.cos(angle) * (targetW * 0.5); let sy = Math.sin(angle) * (targetH * 0.8); this.drawSpotlight(ctx, sx, sy, r); }
        } else if (this.style === 'spot_random') {
            ctx.globalCompositeOperation = 'source-atop'; ctx.shadowBlur = 0;
            let r = P.width || 80; let spd = P.spd || 0.05;
            if(Math.random() < 0.02) { this.randTarget.x = (Math.random() - 0.5) * targetW * 2; this.randTarget.y = (Math.random() - 0.5) * targetH * 2; }
            let dx = this.randTarget.x - this.randCurrent.x; let dy = this.randTarget.y - this.randCurrent.y; this.randCurrent.x += dx * spd * dt; this.randCurrent.y += dy * spd * dt;
            this.drawSpotlight(ctx, this.randCurrent.x, this.randCurrent.y, r);
        } else if(this.style === 'spot_pulse') {
            ctx.globalCompositeOperation = 'source-atop'; ctx.shadowBlur = 0;
            let r = P.width || 250; let spd = P.spd || 0.1; let pr = r * (0.5 + Math.sin(tick * spd)*0.5); this.drawSpotlight(ctx, 0, 0, pr);
        }

        if(this.style === 'starlight') {
            ctx.globalCompositeOperation = 'lighter'; ctx.shadowBlur = 0;
            const hue = P.hue || 60; const baseSize = P.size || 1.0;
            for(let i=0; i < (P.count||10); i++) {
                let star = this.stars[i]; star.a += star.spd * (P.spd ? P.spd * 20 : 1) * dt;
                let sAlpha = 0.2 + (Math.sin(star.a) + 1) / 2 * 0.8;
                let sx = drawX + star.x * targetW; let sy = drawY + star.y * targetH;
                ctx.fillStyle = `hsla(${hue}, 100%, 80%, ${sAlpha})`; ctx.shadowColor = `hsla(${hue}, 100%, 50%, ${sAlpha})`; ctx.shadowBlur = 10 * baseSize;
                let r = (star.r || 1) * baseSize; ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI*2); ctx.fill(); ctx.shadowBlur = 0; 
            }
        }
        ctx.restore();
    }
}

class Character {
    constructor(id, image, name) { 
        this.id = id; 
        this.image = image; 
        this.name = name; 
        this.x = Math.random() * (canvas.width - 100); 
        this.y = 0; 
        this.direction = Math.random() > 0.5 ? 1 : -1; 
        this.tick = Math.random() * 1000; 
        this.speed = 2.0; 
        this.scale = 1.0; 
        this.isClamped = false; 
        this.isFlipped = false; 
        this.surfaceMode = 'floor'; // 'floor', 'ceiling', 'wall_left', 'wall_right', 'wall_all'
        this.setStyle('walk'); 
    }
    setStyle(styleName) { this.style = styleName; this.customParams = {}; if (STYLE_DEF[styleName]) { STYLE_DEF[styleName].params.forEach(p => this.customParams[p.key] = p.def); } }
    
    updateAndDraw(ctx, canvasWidth, canvasHeight, dt) {
        if (!this.image || !this.image.complete || this.image.naturalWidth === 0) return;
        
        // --- SURFACE DIMENSION LOGIC ---
        let surfaceLen = canvasWidth;
        let isAllWalls = (this.surfaceMode === 'wall_all');
        
        if (this.surfaceMode === 'wall_left' || this.surfaceMode === 'wall_right') {
            surfaceLen = canvasHeight;
        } else if (isAllWalls) {
            surfaceLen = (canvasWidth * 2) + (canvasHeight * 2);
        }

        const baseSize = (this.surfaceMode.includes('wall') && !isAllWalls ? canvasWidth : canvasHeight) * 0.15; 
        const aspectRatio = this.image.width / this.image.height; 
        const drawH = baseSize * this.scale; 
        const drawW = drawH * aspectRatio;
        
        this.tick += dt; 
        const P = this.customParams;
        
        let speedMultiplier = 1; 
        if (['sleigh'].includes(this.style)) speedMultiplier = 1.5; 
        if (['panic', 'drunk'].includes(this.style)) speedMultiplier = P.panicSpeed || 2.5; 
        if (['teleport', 'zoom'].includes(this.style)) speedMultiplier = 0; 
        
        // --- MOVEMENT LOGIC ---
        if (!this.isClamped) {
            const moveSpeed = (isAllWalls ? (canvasWidth+canvasHeight)*0.002 : surfaceLen * 0.002) * this.speed * speedMultiplier;
            
            if (!['zoom'].includes(this.style)) { 
                this.x += moveSpeed * this.direction * dt; 
            }
            
            // Boundary Checks
            if (isAllWalls) {
                if (this.x > surfaceLen) this.x -= surfaceLen;
                else if (this.x < 0) this.x += surfaceLen;
            } else {
                if (this.direction === 1 && this.x > surfaceLen - drawW) { 
                    this.direction = -1; this.x = surfaceLen - drawW; 
                } else if (this.direction === -1 && this.x < 0) { 
                    this.direction = 1; this.x = 0; 
                }
            }
        }

        // --- ANIMATION OFFSETS ---
        let groundOffset = 0; 
        let rotation = 0; 
        let scaleX = 1; 
        let scaleY = 1; 
        let alpha = 1;
        
        switch(this.style) {
            case 'walk': groundOffset = Math.sin(this.tick * 0.2 * (P.stepFreq||1)) * (P.stepHeight||5); rotation = Math.sin(this.tick * 0.1 * (P.stepFreq||1)) * 0.05; break;
            case 'bounce': const bPhase = Math.abs(Math.sin(this.tick * 0.1)); groundOffset = bPhase * (drawH * (P.jumpHeight||1.5)); if (bPhase < 0.2) { scaleY = 1 - (P.squash||0.05); scaleX = 1 + (P.squash||0.05); } break;
            case 'wobble': rotation = Math.sin(this.tick * (P.waddleSpeed||0.2)) * (P.tiltAngle||0.2); break;
            case 'float': groundOffset = (baseSize * 2) + Math.sin(this.tick * 0.05) * (P.waveAmp||30); alpha = 0.9; break; 
            case 'roll': rotation = (this.x / (drawW * Math.PI)) * Math.PI * 2 * (P.spinSpeed||2); break;
            case 'sleigh': groundOffset = (baseSize * 2) + Math.sin(this.tick * 0.05) * (P.waveAmp||50); rotation = Math.sin(this.tick * 0.05) * 0.1; break;
            case 'zoom': this.x = (surfaceLen - drawW) / 2; groundOffset = baseSize * 2; const pulse = 1 + (Math.sin(this.tick * (P.pulseSpeed||0.1)) + 1) / 2 * ((P.maxScale||1.5) - 1); scaleX = pulse; scaleY = pulse; break;
            case 'panic': this.x += (Math.random() - 0.5) * (P.jitterRange||10); groundOffset = (Math.random()) * (P.jitterRange||10); break;
            case 'teleport': if (Math.random() < (P.interval||0.02)) this.x = Math.random() * (surfaceLen - drawW); alpha = Math.abs(Math.sin(this.tick * (P.alphaSpeed||0.1))); break;
            case 'moonwalk': groundOffset = Math.sin(this.tick * 0.2) * (P.stepHeight||5); break;
            case 'ghost': groundOffset = (baseSize * 3) + Math.sin(this.tick * 0.02) * 50; alpha = (P.fadeMin||0.1) + Math.abs(Math.sin(this.tick * (P.fadeSpd||0.05))) * (1-(P.fadeMin||0.1)); break;
            case 'jelly': const sq = Math.sin(this.tick * (P.spd||0.2)) * (P.amount||0.3); scaleY = 1 + sq; scaleX = 1 - sq; groundOffset = -(drawH * sq * 0.5); break; 
            case 'drunk': rotation = Math.sin(this.tick * 0.05) * (P.sway||0.7); if (Math.random() < 0.02) this.direction *= -1; this.x += Math.sin(this.tick * 0.1) * 2 * dt; break;
            case 'spin': rotation = this.tick * (P.spd || 0.5); groundOffset = baseSize; break;
            case 'pulse': const pls = 1 + Math.sin(this.tick * (P.spd||0.3)) * (P.amp||0.2); scaleX = pls; scaleY = pls; groundOffset = baseSize; break;
            case 'shake': this.x += Math.sin(this.tick * (P.spd||0.5)) * (P.amp||5); break;
            case 'swing': rotation = Math.sin(this.tick * (P.spd||0.05)) * (P.amp||0.3); groundOffset = canvasHeight - drawH; break;
            case 'jump': groundOffset = Math.abs(Math.sin(this.tick * (P.spd||0.1))) * (P.height||50); break;
        }
        
        if (this.isClamped && !isAllWalls) {
            if (this.x < 0) this.x = 0;
            if (this.x > surfaceLen - drawW) this.x = surfaceLen - drawW;
        }

        // --- DRAWING ---
        ctx.save();
        
        if (isAllWalls) {
            let pos = this.x % surfaceLen;
            if (pos < 0) pos += surfaceLen;
            
            let localX = 0;
            
            if (pos < canvasWidth) {
                // Bottom
                localX = pos;
                ctx.translate(0, canvasHeight - 10); 
                ctx.scale(1, -1);
            } else if (pos < canvasWidth + canvasHeight) {
                // Right
                localX = pos - canvasWidth;
                ctx.translate(canvasWidth - 10, canvasHeight); 
                ctx.rotate(-Math.PI/2);
                ctx.scale(1, -1); 
            } else if (pos < (canvasWidth * 2) + canvasHeight) {
                // Top
                localX = pos - (canvasWidth + canvasHeight);
                ctx.translate(canvasWidth, 10);
                ctx.rotate(Math.PI);
                ctx.scale(1, -1);
            } else {
                // Left
                localX = pos - ((canvasWidth * 2) + canvasHeight);
                ctx.translate(10, 0);
                ctx.rotate(Math.PI/2);
                ctx.scale(1, -1);
            }
            
                        // Adjust to local coordinates relative to the side start
                        ctx.translate(localX - this.x, 0);
            
                        // --- CORNER SMOOTHING ---
                        // Add extra rotation when near corners to look natural
                        const cornerDist = 60; // Pixels from corner to start turning
                        let cornerRot = 0;
                        
                        // Check distances to 4 corners
                        const dist1 = canvasWidth - pos; // Bottom-Right
                        const dist2 = (canvasWidth + canvasHeight) - pos; // Top-Right
                        const dist3 = ((canvasWidth * 2) + canvasHeight) - pos; // Top-Left
                        const dist4 = surfaceLen - pos; // Bottom-Left (Loop)
                        
                        // Helper: 0 to -90 degrees transition
                        // 0 -> -PI/2.
                        // We want to rotate 'into' the turn.
                        // Moving Right (0 deg). Turn Right (-90 deg).
                        // So we want to subtract angle.
                        
                        if (Math.abs(dist1) < cornerDist) {
                            // Bottom-Right Corner
                            // Dist +: Approaching (0 -> -45)
                            // Dist -: Leaving (-90 base. Need +45 -> 0 relative to -90? No)
                            // Let's think relative to visual.
                            // Approaching: 0 -> -45.
                            // Leaving: Starts at -90 (Right Wall). We want it to look like -45. So add +45.
                            // Then fade to 0.
                            if (dist1 > 0) cornerRot = -Math.PI/4 * (1 - dist1/cornerDist);
                            else cornerRot = Math.PI/4 * (1 - Math.abs(dist1)/cornerDist);
                        }
                        else if (Math.abs(dist2) < cornerDist) {
                            // Top-Right Corner
                            // Right Wall (-90) -> Top Wall (-180 / PI).
                            // Approaching: -90 -> -135. (Subtract 45)
                            // Leaving: -180. Want -135. (Add 45)
                            if (dist2 > 0) cornerRot = -Math.PI/4 * (1 - dist2/cornerDist);
                            else cornerRot = Math.PI/4 * (1 - Math.abs(dist2)/cornerDist);
                        }
                        else if (Math.abs(dist3) < cornerDist) {
                            // Top-Left Corner
                            // Top (180) -> Left (-270 / 90).
                            // Wait, Top is PI. Left is PI/2 (90).
                            // Visual sequence: Bottom(0) -> Right(-90) -> Top(-180) -> Left(-270/90).
                            // Let's stick to negative progression for smoothness.
                            // Top (-180) -> Left (-270).
                            // Approaching: -180 -> -225. (Subtract 45).
                            // Leaving: Left base is 90 (PI/2). Which is -270.
                            // Leaving: -270. Want -225. (Add 45).
                            if (dist3 > 0) cornerRot = -Math.PI/4 * (1 - dist3/cornerDist);
                            else cornerRot = Math.PI/4 * (1 - Math.abs(dist3)/cornerDist);
                        }
                        else if (Math.abs(dist4) < cornerDist || pos < cornerDist) {
                            // Bottom-Left Corner (Loop)
                            // Left (-270/90) -> Bottom (0/-360).
                            // Approaching (dist4): 90 -> 45 (which is -315). 
                            // Left base 90. We want to turn Right. 90 -> 0.
                            // So 90 -> 45. (Subtract 45).
                            // Leaving (pos): Base 0. Want 45. (Add 45).
                            
                            if (pos < cornerDist) {
                                // Leaving (Base 0)
                                cornerRot = Math.PI/4 * (1 - pos/cornerDist);
                            } else {
                                // Approaching (Base 90)
                                cornerRot = -Math.PI/4 * (1 - dist4/cornerDist);
                            }
                        }
                        
                        rotation += cornerRot;
                        
                    } else if (this.surfaceMode === 'ceiling') {            ctx.translate(canvasWidth, 0); 
            ctx.scale(-1, 1); 
            ctx.translate(0, 10); 
        } else if (this.surfaceMode === 'wall_left') {
            ctx.translate(0, canvasHeight);
            ctx.rotate(-Math.PI / 2);
            ctx.translate(0, 10);
        } else if (this.surfaceMode === 'wall_right') {
            ctx.translate(canvasWidth, 0);
            ctx.rotate(Math.PI / 2);
            ctx.translate(0, 10);
        } else {
            // Floor
            ctx.translate(0, canvasHeight - 10);
            ctx.scale(1, -1);
        }

        const centerX = this.x + drawW / 2;
        const centerY = groundOffset + drawH / 2;
        
        ctx.translate(centerX, centerY);
        
        let flip = (this.direction === -1) ? 1 : -1;
        if (this.style === 'moonwalk') flip *= -1; 
        if (['roll'].includes(this.style)) flip = 1; 
        const userFlip = this.isFlipped ? -1 : 1;
        
        ctx.scale(flip * scaleX * userFlip, -scaleY); 
        ctx.rotate(rotation); 
        ctx.globalAlpha = alpha;
        
        ctx.drawImage(this.image, -drawW / 2, -drawH / 2, drawW, drawH);
        
        ctx.restore();
    }
}

// ==========================================
// 4. Core Logic
// ==========================================

// --- UI Toggle Handlers ---
window.toggleSection = (id) => {};

window.toggleParticleSettings = () => {
    particleSettingsPanel.classList.toggle('hidden');
};

// --- Background Logic ---
window.setBgMode = (mode) => {
    bgMode = mode;
    
    // UI Update
    btnBgTransparent.className = mode==='transparent' ? 'flex-1 py-1 text-[10px] rounded bg-slate-600 text-white font-bold transition' : 'flex-1 py-1 text-[10px] rounded text-slate-400 hover:text-white transition';
    btnBgColor.className = mode==='color' ? 'flex-1 py-1 text-[10px] rounded bg-slate-600 text-white font-bold transition' : 'flex-1 py-1 text-[10px] rounded text-slate-400 hover:text-white transition';
    btnBgImage.className = mode==='image' ? 'flex-1 py-1 text-[10px] rounded bg-slate-600 text-white font-bold transition' : 'flex-1 py-1 text-[10px] rounded text-slate-400 hover:text-white transition';

    // Panel Visibility
    if(mode === 'color') {
        bgColorControl.classList.remove('hidden');
        bgImageControl.classList.add('hidden');
    } else if (mode === 'image') {
        bgColorControl.classList.add('hidden');
        bgImageControl.classList.remove('hidden');
    } else {
        bgColorControl.classList.add('hidden');
        bgImageControl.classList.add('hidden');
    }
};

bgColorInput.addEventListener('input', (e) => {
    bgColor = e.target.value;
    bgColorHex.innerText = bgColor;
});

// --- Particle UI Logic ---
function initParticleUI() {
    // 1. Generate Type Options
    const options = Object.entries(PARTICLE_DEF).map(([key, def]) => `<option value="${key}">${def.label}</option>`).join('');
    particleTypeSelect.innerHTML = options;
    particleTypeSelect.value = 'snow';

    // 2. Render Initial Params
    renderParticleParams();

    // 3. Bind Events
    particleTypeSelect.addEventListener('change', (e) => {
        if(particleSystem) {
            particleSystem.setType(e.target.value);
            renderParticleParams();
        }
    });

    particleToggle.addEventListener('change', (e) => {
        // Just visual toggle, render loop checks the checkbox state directly usually, 
        // but we can also use it to pause updates if needed.
    });
}

function renderParticleParams() {
    if(!particleSystem) return;
    particleParamsContainer.innerHTML = '';
    
    particleSystem.paramsDef.forEach(p => {
        const val = particleSystem.config[p.key];
        const el = document.createElement('div');
        el.className = 'flex flex-col gap-0.5';
        el.innerHTML = `
            <div class="flex justify-between text-[9px] text-slate-500">
                <span>${p.label}</span>
                <span id="p_val_${p.key}">${val}</span>
            </div>
            <input type="range" 
                min="${p.min}" max="${p.max}" step="${p.step}" value="${val}"
                oninput="updateParticleParam('${p.key}', this.value)"
            >
        `;
        particleParamsContainer.appendChild(el);
    });
}

window.updateParticleParam = (key, val) => {
    if(particleSystem) {
        particleSystem.updateConfig(key, val);
        const label = document.getElementById(`p_val_${key}`);
        if(label) label.innerText = val;
    }
};

// --- Initialization & Event Listeners ---
function resizeCanvas() {
    console.log("resizeCanvas called");
    // Updated for Flex Layout
    const containerW = canvasContainer.clientWidth;
    const containerH = canvasContainer.clientHeight;
    // Reduce container size slightly to account for padding (p-8 = 32px * 2 = 64px) to prevent overflow loop
    const availableW = containerW - 64; 
    const availableH = containerH - 84; // Top padding 32 + Bottom bar 24 + safe buffer

    const ratioValue = aspectRatioSelect.value;
    let targetW = availableW, targetH = availableH;
    
    if (ratioValue !== 'auto') {
        const [rw, rh] = ratioValue.split(':').map(Number);
        if (availableW / availableH > rw / rh) { targetH = availableH; targetW = targetH * (rw/rh); } 
        else { targetW = availableW; targetH = targetW / (rw/rh); }
    } else {
        // Auto fill but keep some padding
        targetW = availableW;
        targetH = availableH;
    }
    
    // 1. Get Device Pixel Ratio (DPR) - Default to 1 if undefined
    const dpr = window.devicePixelRatio || 1;

    // 2. Set Internal Resolution (Physical Pixels)
    canvas.width = Math.floor(targetW * dpr);
    canvas.height = Math.floor(targetH * dpr);

    // 3. Set CSS Display Size (Logical Pixels)
    canvas.style.width = `${targetW}px`;
    canvas.style.height = `${targetH}px`;

    // 4. Normalize Coordinate System
    ctx.scale(dpr, dpr);

    // 5. Re-apply Smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    resolutionDisplay.innerText = `${canvas.width} x ${canvas.height} (DPR: ${dpr})`;
    
    if(particleSystem) particleSystem.resize(canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas);
aspectRatioSelect.addEventListener('change', resizeCanvas);

bgInput.addEventListener('change', (e) => {
    console.log("Background input changed");
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { 
        const img = new Image(); 
        img.onload = () => { 
            bgImage = img; 
            setBgMode('image'); // Auto switch to image mode
            checkOverlay(); 
            
            // --- Auto Aspect Ratio Logic ---
            // 1. Remove existing 'Original' option if exists
            const existingOption = Array.from(aspectRatioSelect.options).find(opt => opt.text.startsWith('Original'));
            if (existingOption) existingOption.remove();

            // 2. Add new Option with image dimensions
            const newOption = document.createElement('option');
            newOption.value = `${img.width}:${img.height}`;
            newOption.text = `Original (${img.width}x${img.height})`;
            aspectRatioSelect.add(newOption, 1); // Insert after Auto

            // 3. Select it and Resize
            aspectRatioSelect.value = newOption.value;
            resizeCanvas();
        }; 
        img.src = ev.target.result; 
    };
    reader.readAsDataURL(file);
});

titleInput.addEventListener('change', (e) => {
    console.log("Title input changed");
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
            if(!titleEntity) titleEntity = new TitleEntity(img);
            else titleEntity.image = img;
            titleEntity.setStyle(titleStyleSelect.value);
            renderTitleParams();
            checkOverlay();
            titleParamsContainer.classList.remove('hidden');
        };
        img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
});

const titleOptions = Object.entries(TITLE_STYLE_DEF).map(([k, d]) => `<option value="${k}">${d.label}</option>`).join('');
titleStyleSelect.innerHTML = titleOptions;

titleStyleSelect.addEventListener('change', (e) => {
    if(titleEntity) {
        titleEntity.setStyle(e.target.value);
        renderTitleParams();
    }
});

function renderTitleParams() {
    if(!titleEntity) return;
    const config = TITLE_STYLE_DEF[titleEntity.style];
    if(!config || !config.params) {
        titleParamsContainer.innerHTML = '';
        return;
    }
    titleParamsContainer.innerHTML = config.params.map(p => {
        const val = titleEntity.customParams[p.key] ?? p.def;
        return `
        <div class="mb-2">
            <div class="flex justify-between text-[10px] text-slate-400 mb-0.5"><span>${p.label}</span></div>
            <div class="flex gap-1">
                <input type="range" min="${p.min}" max="${p.max}" step="${(p.max-p.min)/20}" value="${val}" oninput="updateTitleParam('${p.key}', this.value, this)" class="flex-1">
                <input type="number" min="${p.min}" max="${p.max}" step="${(p.max-p.min)/20}" value="${val}" oninput="updateTitleParam('${p.key}', this.value, this)" class="w-10 bg-slate-900 border border-slate-600 rounded px-1 py-0 text-[10px] text-right text-white">
            </div>
        </div>`;
    }).join('');
}

window.updateTitleParam = (key, val, el) => {
    if(titleEntity) {
        titleEntity.customParams[key] = parseFloat(val);
        syncInputs(el, val);
    }
};

window.removeTitleEntity = () => {
    titleEntity = null;
    titleParamsContainer.innerHTML = '';
    titleInput.value = ''; // Reset file input
    checkOverlay();
};

function checkOverlay() {
    if(characters.length > 0 || titleEntity) overlay.style.opacity = '0';
}

charInput.addEventListener('change', (e) => {
    console.log("Character input changed");
    const files = Array.from(e.target.files);
    if(!files.length) return;
    files.forEach(file => {
        if(characters.length >= MAX_CHARS) return;
        const reader = new FileReader();
        reader.onload = (ev) => { 
            const img = new Image(); 
            img.onload = () => { 
                console.log("Character image loaded: " + file.name);
                characters.push(new Character('c_'+Date.now()+Math.random().toString(36).substr(2,5), img, file.name.split('.')[0].substr(0,8))); 
                renderCharacterList(); 
                checkOverlay(); 
            }; 
            img.src = ev.target.result; 
        };
        reader.readAsDataURL(file);
    });
    charInput.value = '';
});

// --- Decoration Logic ---
decorInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if(!files.length) return;
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (ev) => { 
            const img = new Image(); 
            img.onload = () => { 
                decorations.push(new Decoration('d_'+Date.now()+Math.random().toString(36).substr(2,5), img, file.name.split('.')[0].substr(0,8))); 
                renderDecorationList(); 
                checkOverlay(); 
            }; 
            img.src = ev.target.result; 
        };
        reader.readAsDataURL(file);
    });
    decorInput.value = '';
});

function renderDecorationList() {
    decorListContainer.innerHTML = '';
    decorCountLabel.innerText = decorations.length;
    if (decorations.length === 0) { emptyDecor.style.display = 'flex'; decorListContainer.appendChild(emptyDecor); return; }
    emptyDecor.style.display = 'none';

    decorations.forEach(decor => {
        const isSelected = selectedObjectId === decor.id;
        const el = document.createElement('div');
        el.className = `flex items-center gap-3 p-2 rounded cursor-pointer transition group ${isSelected ? 'bg-slate-800 ring-1 ring-blue-500' : 'hover:bg-slate-800/50 border border-transparent'}`;
        el.onclick = () => selectObject('decor', decor.id);
        
        el.innerHTML = `
            <div class="w-10 h-10 rounded bg-slate-900 overflow-hidden shrink-0 border border-slate-700"><img src="${decor.image.src}" class="w-full h-full object-contain"></div>
            <div class="flex-1 min-w-0">
                <div class="text-[11px] font-bold text-slate-200 truncate group-hover:text-white">${decor.name}</div>
                <div class="text-[9px] text-slate-500 truncate">소품</div>
            </div>
            ${isSelected ? '<div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>' : ''}
        `;
        decorListContainer.appendChild(el);
    });
}

function renderCharacterList() {
    charListContainer.innerHTML = '';
    charCountLabel.innerText = `${characters.length}/${MAX_CHARS}`;
    if (characters.length === 0) { emptyState.style.display = 'flex'; charListContainer.appendChild(emptyState); return; } 
    emptyState.style.display = 'none';
    
    characters.forEach((char) => {
        const isSelected = selectedObjectId === char.id;
        const el = document.createElement('div');
        el.className = `flex items-center gap-3 p-2 rounded cursor-pointer transition group ${isSelected ? 'bg-slate-800 ring-1 ring-blue-500' : 'hover:bg-slate-800/50 border border-transparent'}`;
        el.onclick = () => selectObject('char', char.id);

        el.innerHTML = `
            <div class="w-10 h-10 rounded bg-slate-900 overflow-hidden shrink-0 border border-slate-700"><img src="${char.image.src}" class="w-full h-full object-contain"></div>
            <div class="flex-1 min-w-0">
                <div class="text-[11px] font-bold text-slate-200 truncate group-hover:text-white">${char.name}</div>
                <div class="text-[9px] text-slate-500 truncate">ID: ${char.id.substr(2,4)}</div>
            </div>
            ${isSelected ? '<div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>' : ''}
        `;
        charListContainer.appendChild(el);
    });
}

window.removeCharacter = (id) => { 
    characters = characters.filter(c => c.id !== id); 
    if(selectedObjectId === id) deselectObject();
    renderCharacterList(); 
};

window.removeDecoration = (id) => { 
    decorations = decorations.filter(d => d.id !== id); 
    if(selectedObjectId === id) deselectObject();
    renderDecorationList(); 
};

// --- Update Logic (Restored) ---
window.updateCharStyle = (id, val) => { 
    const c = characters.find(x=>x.id===id); 
    if(c) { 
        c.setStyle(val); 
        // No need to re-render list, inspector handles it or user is already in inspector
    } 
};

function syncInputs(el, val) { 
    // Helper to sync multiple inputs if needed (legacy)
}

window.updateCharParam = (id, k, v) => { 
    const c = characters.find(x=>x.id===id); 
    if(c) { 
        c.customParams[k] = parseFloat(v); 
    } 
};

window.updateCharSpeed = (id, v) => { 
    const c = characters.find(x=>x.id===id); 
    if(c) { 
        c.speed = parseFloat(v); 
    } 
};

window.updateCharScale = (id, v) => { 
    const c = characters.find(x=>x.id===id); 
    if(c) { 
        c.scale = parseFloat(v); 
    } 
};

window.updateDecorParam = (id, key, val) => {
    const d = decorations.find(x => x.id === id);
    if(d) {
        if (key === 'style') {
            d.style = val;
        } else {
            d[key] = parseFloat(val);
        }
    }
};

window.updateCharSurface = (id, val) => {
    const c = characters.find(x => x.id === id);
    if (c) {
        c.surfaceMode = val;
    }
};

window.updateCharPos = (id, axis, val) => {
    const c = characters.find(x => x.id === id);
    if(c) {
        if(axis === 'x') c.x = parseFloat(val) * canvas.width;
        if(axis === 'y') c.y = parseFloat(val) * canvas.height;
    }
};

window.toggleCharClamp = (id) => {
    const c = characters.find(x => x.id === id);
    if (c) {
        c.isClamped = !c.isClamped;
        if(selectedObjectId === id) renderInspector('char', id);
    }
};

window.toggleCharFlip = (id) => {
    const c = characters.find(x => x.id === id);
    if (c) {
        c.isFlipped = !c.isFlipped;
    }
};

function syncInputs(el, val) {
    // Legacy helper, kept for compatibility if needed
}

// --- Gallery Logic (ONE STAGE Implementation) ---
window.openStyleGallery = () => {
    galleryPage.classList.remove('hidden');
    initGalleryStage();
};

window.closeStyleGallery = () => {
    galleryPage.classList.add('hidden');
    stopGalleryStage();
};

function initGalleryStage() {
    // 1. Render Style List
    styleListContainer.innerHTML = '';
    const firstStyle = Object.keys(STYLE_DEF)[0];
    
    Object.entries(STYLE_DEF).forEach(([key, def]) => {
        const el = document.createElement('div');
        el.className = `p-3 rounded-lg cursor-pointer transition flex items-center justify-between group ${key === firstStyle ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`;
        el.onclick = () => {
            applyStyleFromGallery(key, el);
        };
        el.onmouseenter = () => {
            updateGalleryPreview(key);
            // Don't change selection highlight on hover, just preview
        };
        
        el.innerHTML = `
            <span class="font-bold text-sm">${def.label.split('.')[1].trim()}</span>
            <span class="text-[10px] font-mono opacity-50 uppercase">${key}</span>
        `;
        styleListContainer.appendChild(el);
    });

    // 2. Initialize Canvas (Create once)
    if (!previewCanvas) {
        previewCanvas = document.createElement('canvas');
        previewCanvas.style.width = '100%';
        previewCanvas.style.height = '100%';
        galleryPreviewMount.innerHTML = ''; // Clear loading text
        galleryPreviewMount.appendChild(previewCanvas);
    }

    // 3. Load Image & Start Loop (Every time)
    const imgSrc = characters.length > 0 ? characters[0].image.src : 'assets/TRPG_Gilabel.png';
    const img = new Image();
    
    img.onload = () => {
        if (!previewChar) {
            previewChar = new Character('preview', img, 'Preview');
        } else {
            previewChar.image = img; // Update image
        }
        
        // Reset Params
        previewChar.scale = 2.0;
        previewChar.y = 0; 
        
        // Start
        updateGalleryPreview(firstStyle);
        startGalleryLoop();
    };

    img.onerror = () => {
        console.error("Gallery image failed to load, using fallback.");
        previewChar = new Character('preview', new Image(), 'Preview');
        previewChar.image.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjM2I4MmY2Ii8+PC9zdmc+'; // Blue box
        previewChar.image.onload = () => {
             updateGalleryPreview(firstStyle);
             startGalleryLoop();
        }
    };

    img.src = imgSrc;
}

function highlightListItem(activeEl) {
    Array.from(styleListContainer.children).forEach(el => {
        if (el === activeEl) {
            el.className = 'p-3 rounded-lg cursor-pointer transition flex items-center justify-between group bg-blue-600 text-white shadow-lg shadow-blue-500/20';
        } else {
            el.className = 'p-3 rounded-lg cursor-pointer transition flex items-center justify-between group hover:bg-slate-800 text-slate-400 hover:text-white';
        }
    });
}

function updateGalleryPreview(styleKey) {
    if (!previewChar) return;
    
    previewChar.setStyle(styleKey);
    previewStyleName.innerText = STYLE_DEF[styleKey].label.split('.')[1].trim();
    previewStyleKey.innerText = styleKey;

    // Smart Positioning
    const movingStyles = ['wall', 'roll', 'teleport'];
    
    if (movingStyles.includes(styleKey)) {
        previewChar.isClamped = false;
        previewChar.x = 0;
        previewChar.speed = 1.0;
    } else {
        previewChar.isClamped = true;
    }
}

function startGalleryLoop() {
    if (previewReqId) cancelAnimationFrame(previewReqId);
    previewLastTime = 0;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = galleryPreviewMount.getBoundingClientRect();
    previewCanvas.width = rect.width * dpr;
    previewCanvas.height = rect.height * dpr;
    
    const pCtx = previewCanvas.getContext('2d');
    pCtx.scale(dpr, dpr);
    pCtx.imageSmoothingEnabled = true;

    function loop(timestamp) {
        if (!previewLastTime) previewLastTime = timestamp;
        const delta = timestamp - previewLastTime;
        previewLastTime = timestamp;
        const dt = Math.min(delta, 100) / 16.666;

        const w = rect.width;
        const h = rect.height;

        pCtx.clearRect(0, 0, w, h);
        
        // Floor
        pCtx.fillStyle = 'rgba(255,255,255,0.05)';
        pCtx.fillRect(0, h * 0.85, w, h * 0.15);

        if (previewChar) {
            if (previewChar.isClamped) {
                // Center Logic
                const baseSize = h * 0.15; 
                const aspectRatio = previewChar.image.width / previewChar.image.height;
                const drawH = baseSize * previewChar.scale;
                const drawW = drawH * aspectRatio;
                
                previewChar.x = (w - drawW) / 2;
                previewChar.y = (h - drawH) / 2;
                
                if (previewChar.style === 'float' || previewChar.style === 'ghost') previewChar.y -= 20;
            }
            previewChar.updateAndDraw(pCtx, w, h, dt);
        }

        previewReqId = requestAnimationFrame(loop);
    }
    previewReqId = requestAnimationFrame(loop);
}

function stopGalleryStage() {
    if (previewReqId) {
        cancelAnimationFrame(previewReqId);
        previewReqId = null;
    }
}

function applyStyleFromGallery(styleKey, clickedEl) {
    if (selectedObjectId && characters.find(c => c.id === selectedObjectId)) {
        updateCharStyle(selectedObjectId, styleKey);
        // Update inspector if visible
        renderInspector('char', selectedObjectId);
    }
    
    // Visual Feedback: Highlight the selected item persistently
    Array.from(styleListContainer.children).forEach(el => {
        if (el === clickedEl) {
            el.className = 'p-3 rounded-lg cursor-pointer transition flex items-center justify-between group bg-blue-600 text-white shadow-lg shadow-blue-500/20';
        } else {
            el.className = 'p-3 rounded-lg cursor-pointer transition flex items-center justify-between group hover:bg-slate-800 text-slate-400 hover:text-white';
        }
    });
}


// --- Inspector Logic ---
window.selectObject = (type, id) => {
    selectedObjectId = id;
    renderCharacterList(); // Update highlight
    renderDecorationList();
    
    // Show Object Settings
    objectSettings.classList.remove('translate-x-full');
    sceneSettings.classList.add('opacity-50', 'pointer-events-none'); // Dim scene settings
    
    renderInspector(type, id);
};

window.deselectObject = () => {
    selectedObjectId = null;
    renderCharacterList();
    renderDecorationList();
    
    // Hide Object Settings
    objectSettings.classList.add('translate-x-full');
    sceneSettings.classList.remove('opacity-50', 'pointer-events-none');
};

canvas.addEventListener('mousedown', (e) => {
    // Simple deselect on canvas click
    if(selectedObjectId) deselectObject();
});

function renderInspector(type, id) {
    const target = type === 'char' ? characters.find(c => c.id === id) : decorations.find(d => d.id === id);
    if(!target) return;

    inspectorContent.innerHTML = '';
    
    // Common Header
    const header = document.createElement('div');
    header.className = 'mb-4';
    header.innerHTML = `
        <div class="flex items-center gap-3 mb-2">
            <div class="w-12 h-12 rounded bg-slate-800 border border-slate-700 overflow-hidden shrink-0"><img src="${target.image.src}" class="w-full h-full object-contain"></div>
            <div class="flex-1 min-w-0">
                <div class="text-sm font-bold text-white truncate">${target.name}</div>
                <div class="text-[10px] text-slate-500 font-mono">${id.substr(0,8)}</div>
            </div>
            <button onclick="remove${type === 'char' ? 'Character' : 'Decoration'}('${id}')" class="w-8 h-8 rounded bg-slate-800 hover:bg-red-900/50 text-slate-400 hover:text-red-400 transition"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <div class="h-px bg-white/5 my-2"></div>
    `;
    inspectorContent.appendChild(header);

    if (type === 'char') {
        // Character Settings
        const styleOptions = Object.entries(STYLE_DEF).map(([k, d]) => `<option value="${k}" ${target.style===k?'selected':''}>${d.label}</option>`).join('');
        
        // 1. Style (Reverted to Dropdown)
        const styleSection = document.createElement('div');
        styleSection.className = 'mb-4';
        styleSection.innerHTML = `
            <label class="text-[10px] font-bold text-slate-400 uppercase mb-1 block">동작 스타일</label>
            <select onchange="updateCharStyle('${id}', this.value); renderInspector('char', '${id}')" class="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-xs text-white outline-none focus:border-blue-500 mb-2">
                ${styleOptions}
            </select>
            <div class="space-y-2">
                <div class="flex items-center justify-between bg-slate-800/50 p-2 rounded border border-white/5">
                    <label class="text-[10px] text-slate-400 font-bold">이동 표면</label>
                    <select onchange="updateCharSurface('${id}', this.value)" class="bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-[10px] text-white outline-none">
                        <option value="floor" ${target.surfaceMode==='floor'?'selected':''}>바닥 (Floor)</option>
                        <option value="ceiling" ${target.surfaceMode==='ceiling'?'selected':''}>천장 (Ceiling)</option>
                        <option value="wall_left" ${target.surfaceMode==='wall_left'?'selected':''}>왼쪽 벽 (Left)</option>
                        <option value="wall_right" ${target.surfaceMode==='wall_right'?'selected':''}>오른쪽 벽 (Right)</option>
                        <option value="wall_all" ${target.surfaceMode==='wall_all'?'selected':''}>4면 벽타기 (All Walls)</option>
                    </select>
                </div>

                <div class="flex items-center gap-2 bg-slate-800/50 p-2 rounded border border-white/5">
                    <input type="checkbox" id="clamp_${id}" ${target.isClamped?'checked':''} onchange="toggleCharClamp('${id}')" class="w-3 h-3 accent-blue-500 rounded cursor-pointer">
                    <label for="clamp_${id}" class="text-[10px] text-slate-400 cursor-pointer select-none hover:text-white transition font-bold">위치 고정 (이동 멈춤)</label>
                </div>
                
                ${target.isClamped ? `
                <div class="bg-slate-800/50 p-2 rounded border border-slate-700 animate-fade-in-down">
                    <div class="flex justify-between text-[9px] text-slate-500 mb-1"><span>가로 위치 (X)</span><span id="cx_${id}">${Math.round((target.x / canvas.width)*100)}%</span></div>
                    <input type="range" min="0" max="1" step="0.01" value="${target.x / canvas.width}" class="w-full mb-2" 
                        oninput="updateCharPos('${id}', 'x', this.value); document.getElementById('cx_${id}').innerText=Math.round(this.value*100)+'%'">
                    
                    <div class="flex justify-between text-[9px] text-slate-500 mb-1"><span>세로 위치 (Y)</span><span id="cy_${id}">${Math.round((target.y / canvas.height)*100)}%</span></div>
                    <input type="range" min="0" max="1" step="0.01" value="${target.y / canvas.height}" class="w-full"
                        oninput="updateCharPos('${id}', 'y', this.value); document.getElementById('cy_${id}').innerText=Math.round(this.value*100)+'%'">
                </div>
                ` : ''}

                <div class="flex items-center gap-2 bg-slate-800/50 p-2 rounded border border-white/5">
                    <input type="checkbox" id="flip_${id}" ${target.isFlipped?'checked':''} onchange="toggleCharFlip('${id}')" class="w-3 h-3 accent-blue-500 rounded cursor-pointer">
                    <label for="flip_${id}" class="text-[10px] text-slate-400 cursor-pointer select-none hover:text-white transition font-bold text-blue-400">좌우 반전</label>
                </div>
            </div>
        `;
        inspectorContent.appendChild(styleSection);

        // 2. Transform
        const transformSection = document.createElement('div');
        transformSection.className = 'mb-4';
        transformSection.innerHTML = `
            <label class="text-[10px] font-bold text-slate-400 uppercase mb-1 block">기본 속성</label>
            <div class="grid grid-cols-2 gap-2">
                <div class="bg-slate-800/50 p-2 rounded border border-slate-700">
                    <span class="text-[9px] text-slate-500 block mb-1">이동 속도</span>
                    <input type="range" min="0.1" max="5.0" step="0.1" value="${target.speed}" oninput="updateCharSpeed('${id}', this.value); document.getElementById('spdVal').innerText=this.value" class="w-full mb-1">
                    <div class="text-right text-[10px] text-white font-mono" id="spdVal">${target.speed}</div>
                </div>
                <div class="bg-slate-800/50 p-2 rounded border border-slate-700">
                    <span class="text-[9px] text-slate-500 block mb-1">크기 (Scale)</span>
                    <input type="range" min="0.5" max="3.0" step="0.1" value="${target.scale}" oninput="updateCharScale('${id}', this.value); document.getElementById('sclVal').innerText=this.value" class="w-full mb-1">
                    <div class="text-right text-[10px] text-white font-mono" id="sclVal">${target.scale}</div>
                </div>
            </div>
        `;
        inspectorContent.appendChild(transformSection);

        // 3. Dynamic Params
        const config = STYLE_DEF[target.style];
        if (config && config.params) {
            const paramSection = document.createElement('div');
            paramSection.className = 'bg-slate-800/30 p-3 rounded border border-white/5';
            paramSection.innerHTML = `<label class="text-[10px] font-bold text-slate-400 uppercase mb-2 block">세부 조정 (${config.label.split('.')[1].trim()})</label>`;
            
            config.params.forEach(p => {
                const val = target.customParams[p.key] ?? p.def;
                const step = p.step || 0.1;
                const row = document.createElement('div');
                row.className = 'mb-2 last:mb-0';
                row.innerHTML = `
                    <div class="flex justify-between text-[10px] text-slate-500 mb-1"><span>${p.label}</span><span id="p_${p.key}">${val}</span></div>
                    <input type="range" min="${p.min}" max="${p.max}" step="${step}" value="${val}" class="w-full"
                        oninput="updateCharParam('${id}', '${p.key}', this.value); document.getElementById('p_${p.key}').innerText=this.value">
                `;
                paramSection.appendChild(row);
            });
            inspectorContent.appendChild(paramSection);
        }

    } else {
        // Decoration Settings
        const decorOptions = Object.entries(DECOR_STYLE_DEF).map(([k, d]) => `<option value="${k}" ${target.style===k?'selected':''}>${d.label}</option>`).join('');
        
        const styleSection = document.createElement('div');
        styleSection.className = 'mb-4';
        styleSection.innerHTML = `
            <label class="text-[10px] font-bold text-slate-400 uppercase mb-1 block">효과 스타일</label>
            <select onchange="updateDecorParam('${id}', 'style', this.value); renderInspector('decor', '${id}')" class="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-xs text-white outline-none focus:border-blue-500">
                ${decorOptions}
            </select>
        `;
        inspectorContent.appendChild(styleSection);

        const transformSection = document.createElement('div');
        transformSection.className = 'space-y-2';
        transformSection.innerHTML = `
            <div class="bg-slate-800/50 p-2 rounded border border-slate-700">
                <div class="flex justify-between text-[9px] text-slate-500 mb-1"><span>가로 위치 (X)</span><span id="dx_${id}">${Math.round(target.x*100)}%</span></div>
                <input type="range" min="0" max="1" step="0.01" value="${target.x}" class="w-full" oninput="updateDecorParam('${id}', 'x', this.value); document.getElementById('dx_${id}').innerText=Math.round(this.value*100)+'%'">
            </div>
            <div class="bg-slate-800/50 p-2 rounded border border-slate-700">
                <div class="flex justify-between text-[9px] text-slate-500 mb-1"><span>세로 위치 (Y)</span><span id="dy_${id}">${Math.round(target.y*100)}%</span></div>
                <input type="range" min="0" max="1" step="0.01" value="${target.y}" class="w-full" oninput="updateDecorParam('${id}', 'y', this.value); document.getElementById('dy_${id}').innerText=Math.round(this.value*100)+'%'">
            </div>
            <div class="grid grid-cols-2 gap-2">
                <div class="bg-slate-800/50 p-2 rounded border border-slate-700">
                    <div class="flex justify-between text-[9px] text-slate-500 mb-1"><span>크기</span><span id="ds_${id}">${target.scale}x</span></div>
                    <input type="range" min="0.1" max="5.0" step="0.1" value="${target.scale}" class="w-full" oninput="updateDecorParam('${id}', 'scale', this.value); document.getElementById('ds_${id}').innerText=this.value+'x'">
                </div>
                <div class="bg-slate-800/50 p-2 rounded border border-slate-700">
                    <div class="flex justify-between text-[9px] text-slate-500 mb-1"><span>회전</span><span id="dr_${id}">${target.rotation}°</span></div>
                    <input type="range" min="0" max="360" step="1" value="${target.rotation}" class="w-full" oninput="updateDecorParam('${id}', 'rotation', this.value); document.getElementById('dr_${id}').innerText=this.value+'°'">
                </div>
            </div>
        `;
        inspectorContent.appendChild(transformSection);
    }
}
window.downloadCanvas = () => { 
    const link = document.createElement('a'); 
    link.download = `snapshot_${Date.now()}.png`; 
    link.href = canvas.toDataURL(); 
    link.click(); 
};

// --- RECORDING LOGIC ---

window.updateRecordBtnLabel = () => {

    const fmt = recordFormat.value;

    if(!isRecording) {

        recordText.innerText = fmt === 'webm' ? "녹화 시작 (60초)" : "GIF 생성 (10초)";

    }

}



window.toggleRecording = () => {

    if(!isRecording) startRecording();

    else stopRecording();

}



function startRecording() {

    if (isRecording) return;

    const fmt = recordFormat.value;

    

    if (fmt === 'webm') {

        startWebMRecording();

    } else {

        startGIFRecording();

    }

    

    isRecording = true;

    recordingStartTime = Date.now();

    recordIcon.classList.remove('bg-white');

    recordIcon.classList.add('bg-red-500', 'animate-pulse'); // Pulse Red dot

    recordBtn.classList.replace('bg-red-600', 'bg-slate-700'); // Change btn bg to indicate 'Stop' state

    recordBtn.classList.replace('hover:bg-red-500', 'hover:bg-slate-600');

    recordingStatus.classList.remove('hidden');

    recordFormat.disabled = true;

}



function stopRecording() {

    if (!isRecording) return;

    

    const fmt = recordFormat.value;

    if (fmt === 'webm') {

        if(mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();

        clearInterval(recordingInterval);

    } else {

        finishGIFRecording();

    }



    isRecording = false;

    

    // UI Reset

    recordIcon.classList.remove('bg-red-500', 'animate-pulse');

    recordIcon.classList.add('bg-white');

    recordBtn.classList.replace('bg-slate-700', 'bg-red-600');

    recordBtn.classList.replace('hover:bg-slate-600', 'hover:bg-red-500');

    updateRecordBtnLabel();

    recordingStatus.classList.add('hidden');

    recordFormat.disabled = false;

}



// WebM Logic

function startWebMRecording() {

    const stream = canvas.captureStream(60); 

    let options = { mimeType: 'video/webm;codecs=vp9', videoBitsPerSecond: 5000000 };

    if (!MediaRecorder.isTypeSupported(options.mimeType)) options = { mimeType: 'video/webm', videoBitsPerSecond: 5000000 };



    try { mediaRecorder = new MediaRecorder(stream, options); } 

    catch (e) { alert('녹화를 시작할 수 없습니다. 브라우저 설정을 확인해주세요.'); isRecording=false; return; }



    recordedChunks = [];

    mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) recordedChunks.push(e.data); };

    mediaRecorder.onstop = saveWebM;

    mediaRecorder.start();



    recordingInterval = setInterval(() => {

        const elapsed = Date.now() - recordingStartTime;

        const remaining = Math.max(0, Math.ceil((MAX_TIME_WEBM - elapsed) / 1000));

        recordText.innerText = `중지 (${remaining}초)`;

        if (elapsed >= MAX_TIME_WEBM) stopRecording();

    }, 1000);

}



function saveWebM() {

    const blob = new Blob(recordedChunks, { type: 'video/webm' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.style.display = 'none'; a.href = url; a.download = `motion_studio_${Date.now()}.webm`;

    document.body.appendChild(a); a.click();

    setTimeout(() => { document.body.removeChild(a); window.URL.revokeObjectURL(url); }, 100);

}



// GIF Logic

async function startGIFRecording() {

    // Worker Blob Fetch workaround for CORS

    try {

        const response = await fetch('https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js');

        const blob = await response.blob();

        const workerUrl = URL.createObjectURL(blob);

        

                gifInstance = new GIF({

        

                    workers: 2,

        

                    quality: 10,

        

                    width: canvas.width,

        

                    height: canvas.height,

        

                    workerScript: workerUrl,

        

                    transparent: (bgMode === 'transparent') ? 0x00000000 : null

        

                });

    } catch(e) {

        console.error("GIF worker load failed", e);

        alert("GIF 라이브러리 로드에 실패했습니다. WebM 포맷을 사용해주세요.");

        stopRecording();

        return;

    }



    // Capture Loop

    gifIntervalId = setInterval(() => {

        // Check Time Limit

        const elapsed = Date.now() - recordingStartTime;

        const remaining = Math.max(0, Math.ceil((MAX_TIME_GIF - elapsed) / 1000));

        recordText.innerText = `중지 (${remaining}초)`;

        

        if (elapsed >= MAX_TIME_GIF) {

            stopRecording(); // Trigger finish

            return;

        }



        gifInstance.addFrame(canvas, {copy: true, delay: GIF_DELAY});



    }, GIF_DELAY);

}

function finishGIFRecording() {
    clearInterval(gifIntervalId);
    if (!gifInstance) return;

    processingOverlay.classList.remove('hidden');

    gifInstance.on('finished', function(blob) {
        processingOverlay.classList.add('hidden');
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none'; a.href = url; a.download = `motion_studio_${Date.now()}.gif`;
        document.body.appendChild(a); a.click();
        setTimeout(() => { document.body.removeChild(a); window.URL.revokeObjectURL(url); }, 100);
        gifInstance = null;
    });

    gifInstance.render();
}

function drawBgCover(ctx, img, cw, ch) { const ir = img.width/img.height, cr = cw/ch; let rw, rh, rx, ry; if(cr > ir) { rw = cw; rh = cw/ir; rx = 0; ry = (ch-rh)/2; } else { rh = ch; rw = ch*ir; ry = 0; rx = (cw-rw)/2; } ctx.drawImage(img, rx, ry, rw, rh); }

function animate(timestamp) {
    if (!lastTime) lastTime = timestamp;
    
    // Handle first frame case where timestamp might be undefined or very small
    if (!timestamp) timestamp = performance.now();

    const delta = timestamp - lastTime;
    lastTime = timestamp;

    // Normalize dt to 60fps (approx 16.66ms)
    // If running at 60fps, effectiveDt is 1.0
    const safeDelta = Math.min(delta, 100); // Clamp to prevent huge jumps
    const dt = safeDelta / 16.666;

    const dpr = window.devicePixelRatio || 1;
    const logicalW = canvas.width / dpr;
    const logicalH = canvas.height / dpr;

    ctx.clearRect(0, 0, logicalW, logicalH);
    
    ctx.imageSmoothingEnabled = true; 
    ctx.imageSmoothingQuality = 'high';
    
    // Background Drawing Logic
    if (bgMode === 'image' && bgImage) {
        drawBgCover(ctx, bgImage, logicalW, logicalH);
    } else if (bgMode === 'color') {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, logicalW, logicalH);
    }
    
    // Increment global tick by dt
    tick += dt;
    
    if(titleEntity) titleEntity.draw(ctx, logicalW, logicalH, dt);
    
    // Draw Decorations (Behind Characters)
    decorations.forEach(d => d.draw(ctx, logicalW, logicalH, dt));

    [...characters].sort((a,b)=>a.scale-b.scale).forEach(c => c.updateAndDraw(ctx, logicalW, logicalH, dt));
    
    if(particleToggle && particleToggle.checked && particleSystem) {
        particleSystem.draw(ctx, dt);
    }

    requestAnimationFrame(animate);
}

// Initial Trigger
particleSystem = new ParticleSystem();
initParticleUI();
resizeCanvas(); 
requestAnimationFrame(animate);

// ==========================================
// 5. Project Save & Load (Serialization) - RE-ADDED
// ==========================================

// Helper: Convert Image Object to Base64 String
function imageToBase64(img) {
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return c.toDataURL('image/png');
}

// Helper: Load Image from Base64
function loadImageFromBase64(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

window.exportProject = () => {
    try {
        const projectData = {
            version: '1.0',
            timestamp: Date.now(),
            settings: {
                aspectRatio: aspectRatioSelect.value,
                bgMode: bgMode,
                bgColor: bgColor,
                bgImage: (bgMode === 'image' && bgImage) ? imageToBase64(bgImage) : null
            },
            characters: characters.map(c => ({
                id: c.id,
                name: c.name,
                imgData: imageToBase64(c.image),
                x: c.x,
                y: c.y,
                speed: c.speed,
                scale: c.scale,
                direction: c.direction,
                isClamped: c.isClamped,
                isFlipped: c.isFlipped,
                surfaceMode: c.surfaceMode,
                style: c.style,
                customParams: c.customParams
            })),
            decorations: decorations.map(d => ({
                id: d.id,
                name: d.name,
                imgData: imageToBase64(d.image),
                x: d.x,
                y: d.y,
                scale: d.scale,
                rotation: d.rotation,
                style: d.style
            })),
            title: titleEntity ? {
                imgData: imageToBase64(titleEntity.image),
                style: titleEntity.style,
                customParams: titleEntity.customParams
            } : null,
            particles: (particleSystem && particleToggle.checked) ? {
                active: true,
                type: particleSystem.type,
                config: particleSystem.config
            } : { active: false }
        };

        const jsonStr = JSON.stringify(projectData);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `motion_project_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

    } catch (e) {
        console.error(e);
        alert('프로젝트 저장 중 오류가 발생했습니다. (이미지 용량이 너무 클 수 있습니다)');
    }
};

window.importProject = async (input) => {
    const file = input.files[0];
    if (!file) return;

    // Show Loading
    processingOverlay.classList.remove('hidden');
    processingOverlay.querySelector('div.animate-pulse').innerText = "프로젝트 불러오는 중...";

    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const data = JSON.parse(e.target.result);
            
            // 1. Reset Scene
            characters = [];
            decorations = [];
            titleEntity = null;
            selectedObjectId = null;
            
            // 2. Restore Settings
            if (data.settings) {
                aspectRatioSelect.value = data.settings.aspectRatio || 'auto';
                resizeCanvas();
                
                bgColor = data.settings.bgColor || '#0f172a';
                bgColorInput.value = bgColor;
                bgColorHex.innerText = bgColor;
                
                if (data.settings.bgImage) {
                    bgImage = await loadImageFromBase64(data.settings.bgImage);
                }
                setBgMode(data.settings.bgMode || 'transparent');
            }

            // 3. Restore Characters
            if (data.characters) {
                for (const cData of data.characters) {
                    const img = await loadImageFromBase64(cData.imgData);
                    const char = new Character(cData.id, img, cData.name);
                    // Restore Props
                    char.x = cData.x;
                    char.y = cData.y;
                    char.speed = cData.speed;
                    char.scale = cData.scale;
                    char.direction = cData.direction;
                    char.isClamped = cData.isClamped;
                    char.isFlipped = cData.isFlipped || false; 
                    char.surfaceMode = cData.surfaceMode || 'floor';
                    char.setStyle(cData.style);
                    char.customParams = cData.customParams || {};
                    characters.push(char);
                }
            }

            // 4. Restore Decorations
            if (data.decorations) {
                for (const dData of data.decorations) {
                    const img = await loadImageFromBase64(dData.imgData);
                    const decor = new Decoration(dData.id, img, dData.name);
                    decor.x = dData.x;
                    decor.y = dData.y;
                    decor.scale = dData.scale;
                    decor.rotation = dData.rotation;
                    decor.style = dData.style;
                    decorations.push(decor);
                }
            }

            // 5. Restore Title
            if (data.title) {
                const img = await loadImageFromBase64(data.title.imgData);
                titleEntity = new TitleEntity(img);
                titleEntity.setStyle(data.title.style);
                titleEntity.customParams = data.title.customParams || {};
                renderTitleParams();
                titleParamsContainer.classList.remove('hidden');
            } else {
                titleParamsContainer.classList.add('hidden');
            }

            // 6. Restore Particles
            if (data.particles) {
                particleToggle.checked = data.particles.active;
                if (data.particles.active) {
                    particleSettingsPanel.classList.remove('hidden');
                    particleTypeSelect.value = data.particles.type || 'snow';
                    if (particleSystem) {
                        particleSystem.setType(data.particles.type || 'snow');
                        // Restore config manually
                        if(data.particles.config) {
                            particleSystem.config = data.particles.config;
                            // Ensure particle count matches config
                            particleSystem.updateConfig('count', data.particles.config.count); 
                        }
                        renderParticleParams();
                    }
                } else {
                    particleSettingsPanel.classList.add('hidden');
                }
            }

            // Finalize
            renderCharacterList();
            renderDecorationList();
            checkOverlay();
            
            // Close Inspector
            deselectObject();

        } catch (err) {
            console.error(err);
            alert('프로젝트 파일이 손상되었거나 호환되지 않습니다.');
        } finally {
            processingOverlay.classList.add('hidden');
            input.value = ''; // Reset input
        }
    };
    reader.readAsText(file);
};

window.clearAllCharacters = () => {
    if(confirm('모든 캐릭터와 설정을 초기화하시겠습니까?')) {
        characters = [];
        decorations = [];
        titleEntity = null;
        selectedObjectId = null;
        renderCharacterList();
        renderDecorationList();
        checkOverlay();
        deselectObject();
    }
};
