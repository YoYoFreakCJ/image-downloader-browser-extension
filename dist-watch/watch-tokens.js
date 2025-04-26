"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar_1 = __importDefault(require("chokidar"));
const node_fs_1 = __importDefault(require("node:fs"));
const path_1 = __importDefault(require("path"));
const tokensPath = path_1.default.resolve('src/tokens.ts');
const outputScssPath = path_1.default.resolve('src/style-tokens.generated.scss');
// Funktion zum Parsen von tokens.ts
async function generateScssFromTokens() {
    const { tokens } = await Promise.resolve(`${tokensPath + `?t=${Date.now()}`}`).then(s => __importStar(require(s))); // cache busting
    if (!tokens || typeof tokens !== 'object') {
        console.error('tokens.ts must export an object called "tokens".');
        return;
    }
    const lines = Object.entries(tokens).map(([key, value]) => {
        return `$${key}: ${value};`;
    });
    const content = `// Generated from tokens.ts – don't edit!\n${lines.join('\n')}\n`;
    await node_fs_1.default.writeFile(outputScssPath, content);
    console.log(`[style-tokens] Generated: ${outputScssPath}`);
}
// Watch starten
chokidar_1.default.watch(tokensPath).on('change', generateScssFromTokens);
// Initiale Generierung
generateScssFromTokens();
