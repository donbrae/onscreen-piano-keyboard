import { Howl, Howler } from 'howler';
import Tone from 'tone';
import * as Midi from '@tonejs/midi';

/**
 * @name KEYS_DEMO
 * @author Jamie Smith, jamieonkeys.dev, JazzKeys.fyi
 */

const KEYS_DEMO = (function () {
  const cfg = {
    audioFolder: '../audio',
    logging: true,
    fadeRate: 120, // ms
    // https://commons.wikimedia.org/wiki/File:PianoKeyboard.svg; Copyright(c) 2005 Lauri Kaila; GNU Free Documentation License
    keyboard88:
      '<svg class="piano-keys" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1197.8 140.7"><defs><linearGradient id="GradientBlack" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#494949"/><stop offset="70%" stop-color="#222" stop-opacity="1"/><stop offset="100%" stop-color="#000"/></linearGradient><linearGradient id="GradientWhite" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#dfdfdf"/><stop offset="50%" stop-color="#f2f2f2" stop-opacity="1"/><stop offset="100%" stop-color="#fff"/></linearGradient></defs><rect rx="1.5" y="20" x="0.5" class="note note-white keyA0"/><rect rx="1.5" y="20" x="23.5" class="note note-white keyB0"/><rect rx="1.5" y="20" x="20.2" class="note note-black keyA#0"/><rect rx="1.5" y="20" x="46.5" class="note note-white keyC1"/><rect rx="1.5" y="20" x="69.5" class="note note-white keyD1"/><rect rx="1.5" y="20" x="92.5" class="note note-white keyE1"/><rect rx="1.5" y="20" x="115.5" class="note note-white keyF1"/><rect rx="1.5" y="20" x="138.5" class="note note-white keyG1"/><rect rx="1.5" y="20" x="161.5" class="note note-white keyA1"/><rect rx="1.5" y="20" x="184.5" class="note note-white keyB1"/><rect rx="1.5" y="20" x="60.8" class="note note-black keyC#1"/><rect rx="1.5" y="20" x="88.2" class="note note-black keyD#1"/><rect rx="1.5" y="20" x="128.8" class="note note-black keyF#1"/><rect rx="1.5" y="20" x="154.8" class="note note-black keyG#1"/><rect rx="1.5" y="20" x="181.2" class="note note-black keyA#1"/><rect rx="1.5" y="20" x="207.5" class="note note-white keyC2"/><rect rx="1.5" y="20" x="230.5" class="note note-white keyD2"/><rect rx="1.5" y="20" x="253.5" class="note note-white keyE2"/><rect rx="1.5" y="20" x="276.5" class="note note-white keyF2"/><rect rx="1.5" y="20" x="299.5" class="note note-white keyG2"/><rect rx="1.5" y="20" x="322.5" class="note note-white keyA2"/><rect rx="1.5" y="20" x="345.5" class="note note-white keyB2"/><rect rx="1.5" y="20" x="221.8" class="note note-black keyC#2"/><rect rx="1.5" y="20" x="249.2" class="note note-black keyD#2"/><rect rx="1.5" y="20" x="289.8" class="note note-black keyF#2"/><rect rx="1.5" y="20" x="315.8" class="note note-black keyG#2"/><rect rx="1.5" y="20" x="342.2" class="note note-black keyA#2"/><rect rx="1.5" y="20" x="368.5" class="note note-white keyC3"/><rect rx="1.5" y="20" x="391.5" class="note note-white keyD3"/><rect rx="1.5" y="20" x="414.5" class="note note-white keyE3"/><rect rx="1.5" y="20" x="437.5" class="note note-white keyF3"/><rect rx="1.5" y="20" x="460.5" class="note note-white keyG3"/><rect rx="1.5" y="20" x="483.5" class="note note-white keyA3"/><rect rx="1.5" y="20" x="506.5" class="note note-white keyB3"/><rect rx="1.5" y="20" x="382.8" class="note note-black keyC#3"/><rect rx="1.5" y="20" x="410.2" class="note note-black keyD#3"/><rect rx="1.5" y="20" x="450.8" class="note note-black keyF#3"/><rect rx="1.5" y="20" x="476.8" class="note note-black keyG#3"/><rect rx="1.5" y="20" x="503.2" class="note note-black keyA#3"/><rect rx="1.5" y="20" x="529.5" class="note note-white keyC4"/><rect rx="1.5" y="20" x="552.5" class="note note-white keyD4"/><rect rx="1.5" y="20" x="575.5" class="note note-white keyE4"/><rect rx="1.5" y="20" x="598.5" class="note note-white keyF4"/><rect rx="1.5" y="20" x="621.5" class="note note-white keyG4"/><rect rx="1.5" y="20" x="644.5" class="note note-white keyA4"/><rect rx="1.5" y="20" x="667.5" class="note note-white keyB4"/><rect rx="1.5" y="20" x="543.8" class="note note-black keyC#4"/><rect rx="1.5" y="20" x="571.2" class="note note-black keyD#4"/><rect rx="1.5" y="20" x="611.8" class="note note-black keyF#4"/><rect rx="1.5" y="20" x="637.8" class="note note-black keyG#4"/><rect rx="1.5" y="20" x="664.2" class="note note-black keyA#4"/><rect rx="1.5" y="20" x="690.52" class="note note-white keyC5"/><rect rx="1.5" y="20" x="713.52" class="note note-white keyD5"/><rect rx="1.5" y="20" x="736.52" class="note note-white keyE5"/><rect rx="1.5" y="20" x="759.52" class="note note-white keyF5"/><rect rx="1.5" y="20" x="782.52" class="note note-white keyG5"/><rect rx="1.5" y="20" x="805.52" class="note note-white keyA5"/><rect rx="1.5" y="20" x="828.52" class="note note-white keyB5"/><rect rx="1.5" y="20" x="704.82" class="note note-black keyC#5"/><rect rx="1.5" y="20" x="732.12" class="note note-black keyD#5"/><rect rx="1.5" y="20" x="772.72" class="note note-black keyF#5"/><rect rx="1.5" y="20" x="798.72" class="note note-black keyG#5"/><rect rx="1.5" y="20" x="825.22" class="note note-black keyA#5"/><rect rx="1.5" y="20" x="851.52" class="note note-white keyC6"/><rect rx="1.5" y="20" x="874.52" class="note note-white keyD6"/><rect rx="1.5" y="20" x="897.52" class="note note-white keyE6"/><rect rx="1.5" y="20" x="920.52" class="note note-white keyF6"/><rect rx="1.5" y="20" x="943.52" class="note note-white keyG6"/><rect rx="1.5" y="20" x="966.52" class="note note-white keyA6"/><rect rx="1.5" y="20" x="989.52" class="note note-white keyB6"/><rect rx="1.5" y="20" x="865.82" class="note note-black keyC#6"/><rect rx="1.5" y="20" x="893.12" class="note note-black keyD#6"/><rect rx="1.5" y="20" x="933.72" class="note note-black keyF#6"/><rect rx="1.5" y="20" x="959.72" class="note note-black keyG#6"/><rect rx="1.5" y="20" x="986.22" class="note note-black keyA#6"/><rect rx="1.5" y="20" x="1012.52" class="note note-white keyC7"/><rect rx="1.5" y="20" x="1035.52" class="note note-white keyD7"/><rect rx="1.5" y="20" x="1058.52" class="note note-white keyE7"/><rect rx="1.5" y="20" x="1081.52" class="note note-white keyF7"/><rect rx="1.5" y="20" x="1104.52" class="note note-white keyG7"/><rect rx="1.5" y="20" x="1127.52" class="note note-white keyA7"/><rect rx="1.5" y="20" x="1150.52" class="note note-white keyB7"/><rect rx="1.5" y="20" x="1026.82" class="note note-black keyC#7"/><rect rx="1.5" y="20" x="1054.12" class="note note-black keyD#7"/><rect rx="1.5" y="20" x="1094.72" class="note note-black keyF#7"/><rect rx="1.5" y="20" x="1120.72" class="note note-black keyG#7"/><rect rx="1.5" y="20" x="1147.22" class="note note-black keyA#7"/><rect rx="1.5" y="20" x="1173.52" class="note note-white keyC8"/><circle r="5.7" class="middle-c" cx="541.1" cy="125"></circle><circle cx="13.6" cy="9" r="5.7" class="note indicator keyA0"/><circle cx="26.7" cy="9" r="5.7" class="note indicator keyA#0"/><circle cx="39.8" cy="9" r="5.7" class="note indicator keyB0"/><circle cx="53.4" cy="9" r="5.7" class="note indicator keyC1"/><circle cx="67" cy="9" r="5.7" class="note indicator keyC#1"/><circle cx="80.7" cy="9" r="5.7" class="note indicator keyD1"/><circle cx="94.4" cy="9" r="5.7" class="note indicator keyD#1"/><circle cx="108.1" cy="9" r="5.7" class="note indicator keyE1"/><circle cx="121.9" cy="9" r="5.7" class="note indicator keyF1"/><circle cx="135" cy="9" r="5.7" class="note indicator keyF#1"/><circle cx="148" cy="9" r="5.7" class="note indicator keyG1"/><circle cx="161.1" cy="9" r="5.7" class="note indicator keyG#1"/><circle cx="174.5" cy="9" r="5.7" class="note indicator keyA1"/><circle cx="187.7" cy="9" r="5.7" class="note indicator keyA#1"/><circle cx="200.9" cy="9" r="5.7" class="note indicator keyB1"/><circle cx="214.6" cy="9" r="5.7" class="note indicator keyC2"/><circle cx="228.3" cy="9" r="5.7" class="note indicator keyC#2"/><circle cx="242" cy="9" r="5.7" class="note indicator keyD2"/><circle cx="255.6" cy="9" r="5.7" class="note indicator keyD#2"/><circle cx="269.4" cy="9" r="5.7" class="note indicator keyE2"/><circle cx="283.1" cy="9" r="5.7" class="note indicator keyF2"/><circle cx="296.3" cy="9" r="5.7" class="note indicator keyF#2"/><circle cx="309.3" cy="9" r="5.7" class="note indicator keyG2"/><circle cx="322.4" cy="9" r="5.7" class="note indicator keyG#2"/><circle cx="335.5" cy="9" r="5.7" class="note indicator keyA2"/><circle cx="348.7" cy="9" r="5.7" class="note indicator keyA#2"/><circle cx="361.9" cy="9" r="5.7" class="note indicator keyB2"/><circle cx="375.4" cy="9" r="5.7" class="note indicator keyC3"/><circle cx="389" cy="9" r="5.7" class="note indicator keyC#3"/><circle cx="402.8" cy="9" r="5.7" class="note indicator keyD3"/><circle cx="416.4" cy="9" r="5.7" class="note indicator keyD#3"/><circle cx="430.1" cy="9" r="5.7" class="note indicator keyE3"/><circle cx="443.9" cy="9" r="5.7" class="note indicator keyF3"/><circle cx="457" cy="9" r="5.7" class="note indicator keyF#3"/><circle cx="470" cy="9" r="5.7" class="note indicator keyG3"/><circle cx="483.1" cy="9" r="5.7" class="note indicator keyG#3"/><circle cx="496.2" cy="9" r="5.7" class="note indicator keyA3"/><circle cx="509.5" cy="9" r="5.7" class="note indicator keyA#3"/><circle cx="522.6" cy="9" r="5.7" class="note indicator keyB3"/><circle cx="536.5" cy="9" r="5.7" class="note indicator keyC4"/><circle cx="550.2" cy="9" r="5.7" class="note indicator keyC#4"/><circle cx="563.9" cy="9" r="5.7" class="note indicator keyD4"/><circle cx="577.5" cy="9" r="5.7" class="note indicator keyD#4"/><circle cx="591.2" cy="9" r="5.7" class="note indicator keyE4"/><circle cx="605" cy="9" r="5.7" class="note indicator keyF4"/><circle cx="618.2" cy="9" r="5.7" class="note indicator keyF#4"/><circle cx="631.2" cy="9" r="5.7" class="note indicator keyG4"/><circle cx="644.3" cy="9" r="5.7" class="note indicator keyG#4"/><circle cx="657.4" cy="9" r="5.7" class="note indicator keyA4"/><circle cx="670.6" cy="9" r="5.7" class="note indicator keyA#4"/><circle cx="683.7" cy="9" r="5.7" class="note indicator keyB4"/><circle cx="697.3" cy="9" r="5.7" class="note indicator keyC5"/><circle cx="710.9" cy="9" r="5.7" class="note indicator keyC#5"/><circle cx="724.6" cy="9" r="5.7" class="note indicator keyD5"/><circle cx="738.3" cy="9" r="5.7" class="note indicator keyD#5"/><circle cx="752" cy="9" r="5.7" class="note indicator keyE5"/><circle cx="765.8" cy="9" r="5.7" class="note indicator keyF5"/><circle cx="778.9" cy="9" r="5.7" class="note indicator keyF#5"/><circle cx="791.9" cy="9" r="5.7" class="note indicator keyG5"/><circle cx="805" cy="9" r="5.7" class="note indicator keyG#5"/><circle cx="818.1" cy="9" r="5.7" class="note indicator keyA5"/><circle cx="831.3" cy="9" r="5.7" class="note indicator keyA#5"/><circle cx="844.5" cy="9" r="5.7" class="note indicator keyB5"/><circle cx="858.5" cy="9" r="5.7" class="note indicator keyC6"/><circle cx="872.2" cy="9" r="5.7" class="note indicator keyC#6"/><circle cx="885.9" cy="9" r="5.7" class="note indicator keyD6"/><circle cx="899.5" cy="9" r="5.7" class="note indicator keyD#6"/><circle cx="913.2" cy="9" r="5.7" class="note indicator keyE6"/><circle cx="927" cy="9" r="5.7" class="note indicator keyF6"/><circle cx="940.2" cy="9" r="5.7" class="note indicator keyF#6"/><circle cx="953.2" cy="9" r="5.7" class="note indicator keyG6"/><circle cx="966.3" cy="9" r="5.7" class="note indicator keyG#6"/><circle cx="979.4" cy="9" r="5.7" class="note indicator keyA6"/><circle cx="992.6" cy="9" r="5.7" class="note indicator keyA#6"/><circle cx="1005.7" cy="9" r="5.7" class="note indicator keyB6"/><circle cx="1019.3" cy="9" r="5.7" class="note indicator keyC7"/><circle cx="1032.9" cy="9" r="5.7" class="note indicator keyC#7"/><circle cx="1046.6" cy="9" r="5.7" class="note indicator keyD7"/><circle cx="1060.3" cy="9" r="5.7" class="note indicator keyD#7"/><circle cx="1074" cy="9" r="5.7" class="note indicator keyE7"/><circle cx="1087.8" cy="9" r="5.7" class="note indicator keyF7"/><circle cx="1100.9" cy="9" r="5.7" class="note indicator keyF#7"/><circle cx="1113.9" cy="9" r="5.7" class="note indicator keyG7"/><circle cx="1127" cy="9" r="5.7" class="note indicator keyG#7"/><circle cx="1140.1" cy="9" r="5.7" class="note indicator keyA7"/><circle cx="1153.3" cy="9" r="5.7" class="note indicator keyA#7"/><circle cx="1166.5" cy="9" r="5.7" class="note indicator keyB7"/><circle cx="1180.5" cy="9" r="5.7" class="note indicator keyC8"/><line class="top-line" x2="1197" x1="0" y2="20" y1="20"/></svg>',
    keyboard49:
      '<svg class="piano-keys" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="207 0 668.3 141"><defs><linearGradient id="GradientBlack" x1="0" x2="0" y1="0" y2="1"> <stop offset="0%" stop-color="#494949"/><stop offset="70%" stop-color="#222" stop-opacity="1"/><stop offset="100%" stop-color="#000"/></linearGradient><linearGradient id="GradientWhite" x1="0" x2="0" y1="0" y2="1"> <stop offset="0%" stop-color="#dfdfdf"/><stop offset="50%" stop-color="#f2f2f2" stop-opacity="1"/><stop offset="100%" stop-color="#fff"/></linearGradient></defs> <rect rx="1.5" y="20" x="0.5"/><rect rx="1.5" y="20" x="92.5"/><rect rx="1.5" y="20" x="207.5" class="note note-white keyC2"/><rect rx="1.5" y="20" x="230.5" class="note note-white keyD2"/><rect rx="1.5" y="20" x="253.5" class="note note-white keyE2"/><rect rx="1.5" y="20" x="276.5" class="note note-white keyF2"/><rect rx="1.5" y="20" x="299.5" class="note note-white keyG2"/><rect rx="1.5" y="20" x="322.5" class="note note-white keyA2"/><rect rx="1.5" y="20" x="345.5" class="note note-white keyB2"/><rect rx="1.5" y="20" x="221.8" class="note note-black keyC#2"/><rect rx="1.5" y="20" x="249.2" class="note note-black keyD#2"/><rect rx="1.5" y="20" x="289.8" class="note note-black keyF#2"/><rect rx="1.5" y="20" x="315.8" class="note note-black keyG#2"/><rect rx="1.5" y="20" x="342.2" class="note note-black keyA#2"/><rect rx="1.5" y="20" x="368.5" class="note note-white keyC3"/><rect rx="1.5" y="20" x="391.5" class="note note-white keyD3"/><rect rx="1.5" y="20" x="414.5" class="note note-white keyE3"/><rect rx="1.5" y="20" x="437.5" class="note note-white keyF3"/><rect rx="1.5" y="20" x="460.5" class="note note-white keyG3"/><rect rx="1.5" y="20" x="483.5" class="note note-white keyA3"/><rect rx="1.5" y="20" x="506.5" class="note note-white keyB3"/><rect rx="1.5" y="20" x="382.8" class="note note-black keyC#3"/><rect rx="1.5" y="20" x="410.2" class="note note-black keyD#3"/><rect rx="1.5" y="20" x="450.8" class="note note-black keyF#3"/><rect rx="1.5" y="20" x="476.8" class="note note-black keyG#3"/><rect rx="1.5" y="20" x="503.2" class="note note-black keyA#3"/><rect rx="1.5" y="20" x="529.5" class="note note-white keyC4"/><rect rx="1.5" y="20" x="552.5" class="note note-white keyD4"/><rect rx="1.5" y="20" x="575.5" class="note note-white keyE4"/><rect rx="1.5" y="20" x="598.5" class="note note-white keyF4"/><rect rx="1.5" y="20" x="621.5" class="note note-white keyG4"/><rect rx="1.5" y="20" x="644.5" class="note note-white keyA4"/><rect rx="1.5" y="20" x="667.5" class="note note-white keyB4"/><rect rx="1.5" y="20" x="543.8" class="note note-black keyC#4"/><rect rx="1.5" y="20" x="571.2" class="note note-black keyD#4"/><rect rx="1.5" y="20" x="611.8" class="note note-black keyF#4"/><rect rx="1.5" y="20" x="637.8" class="note note-black keyG#4"/><rect rx="1.5" y="20" x="664.2" class="note note-black keyA#4"/><rect rx="1.5" y="20" x="690.52" class="note note-white keyC5"/><rect rx="1.5" y="20" x="713.52" class="note note-white keyD5"/><rect rx="1.5" y="20" x="736.52" class="note note-white keyE5"/><rect rx="1.5" y="20" x="759.52" class="note note-white keyF5"/><rect rx="1.5" y="20" x="782.52" class="note note-white keyG5"/><rect rx="1.5" y="20" x="805.52" class="note note-white keyA5"/><rect rx="1.5" y="20" x="828.52" class="note note-white keyB5"/><rect rx="1.5" y="20" x="704.82" class="note note-black keyC#5"/><rect rx="1.5" y="20" x="732.12" class="note note-black keyD#5"/><rect rx="1.5" y="20" x="772.72" class="note note-black keyF#5"/><rect rx="1.5" y="20" x="798.72" class="note note-black keyG#5"/><rect rx="1.5" y="20" x="825.22" class="note note-black keyA#5"/><rect rx="1.5" y="20" x="851.52" class="note note-white keyC6"/><rect rx="1.5" y="20" x="874.52"/><circle r="5.7" class="middle-c" cx="541.1" cy="125"/><circle cx="214.6" cy="9" r="5.7" class="note indicator keyC2"/><circle cx="228.3" cy="9" r="5.7" class="note indicator keyC#2"/><circle cx="242" cy="9" r="5.7" class="note indicator keyD2"/><circle cx="255.6" cy="9" r="5.7" class="note indicator keyD#2"/><circle cx="269.4" cy="9" r="5.7" class="note indicator keyE2"/><circle cx="283.1" cy="9" r="5.7" class="note indicator keyF2"/><circle cx="296.3" cy="9" r="5.7" class="note indicator keyF#2"/><circle cx="309.3" cy="9" r="5.7" class="note indicator keyG2"/><circle cx="322.4" cy="9" r="5.7" class="note indicator keyG#2"/><circle cx="335.5" cy="9" r="5.7" class="note indicator keyA2"/><circle cx="348.7" cy="9" r="5.7" class="note indicator keyA#2"/><circle cx="361.9" cy="9" r="5.7" class="note indicator keyB2"/><circle cx="375.4" cy="9" r="5.7" class="note indicator keyC3"/><circle cx="389" cy="9" r="5.7" class="note indicator keyC#3"/><circle cx="402.8" cy="9" r="5.7" class="note indicator keyD3"/><circle cx="416.4" cy="9" r="5.7" class="note indicator keyD#3"/><circle cx="430.1" cy="9" r="5.7" class="note indicator keyE3"/><circle cx="443.9" cy="9" r="5.7" class="note indicator keyF3"/><circle cx="457" cy="9" r="5.7" class="note indicator keyF#3"/><circle cx="470" cy="9" r="5.7" class="note indicator keyG3"/><circle cx="483.1" cy="9" r="5.7" class="note indicator keyG#3"/><circle cx="496.2" cy="9" r="5.7" class="note indicator keyA3"/><circle cx="509.5" cy="9" r="5.7" class="note indicator keyA#3"/><circle cx="522.6" cy="9" r="5.7" class="note indicator keyB3"/><circle cx="536.5" cy="9" r="5.7" class="note indicator keyC4"/><circle cx="550.2" cy="9" r="5.7" class="note indicator keyC#4"/><circle cx="563.9" cy="9" r="5.7" class="note indicator keyD4"/><circle cx="577.5" cy="9" r="5.7" class="note indicator keyD#4"/><circle cx="591.2" cy="9" r="5.7" class="note indicator keyE4"/><circle cx="605" cy="9" r="5.7" class="note indicator keyF4"/><circle cx="618.2" cy="9" r="5.7" class="note indicator keyF#4"/><circle cx="631.2" cy="9" r="5.7" class="note indicator keyG4"/><circle cx="644.3" cy="9" r="5.7" class="note indicator keyG#4"/><circle cx="657.4" cy="9" r="5.7" class="note indicator keyA4"/><circle cx="670.6" cy="9" r="5.7" class="note indicator keyA#4"/><circle cx="683.7" cy="9" r="5.7" class="note indicator keyB4"/><circle cx="697.3" cy="9" r="5.7" class="note indicator keyC5"/><circle cx="710.9" cy="9" r="5.7" class="note indicator keyC#5"/><circle cx="724.6" cy="9" r="5.7" class="note indicator keyD5"/><circle cx="738.3" cy="9" r="5.7" class="note indicator keyD#5"/><circle cx="752" cy="9" r="5.7" class="note indicator keyE5"/><circle cx="765.8" cy="9" r="5.7" class="note indicator keyF5"/><circle cx="778.9" cy="9" r="5.7" class="note indicator keyF#5"/><circle cx="791.9" cy="9" r="5.7" class="note indicator keyG5"/><circle cx="805" cy="9" r="5.7" class="note indicator keyG#5"/><circle cx="818.1" cy="9" r="5.7" class="note indicator keyA5"/><circle cx="831.3" cy="9" r="5.7" class="note indicator keyA#5"/><circle cx="844.5" cy="9" r="5.7" class="note indicator keyB5"/><circle cx="858.5" cy="9" r="5.7" class="note indicator keyC6"/><line class="top-line" y2="20" y1="20" x1="0" x2="875"/></svg>'
  };

  const state = {
    init: false,
    itemsState: {}, // Instantiated `ItemAudioState` objects
    activeItemState: undefined, // Reference to active item's object in `itemsState`. Active item == currently playing item (set on Play button click)
    audio: undefined, // Main howler object
    playing: false,
    loading: false,
    playingItemObjectName: undefined, // Name of the item currently being played
    playCount: 0, // Incremented after end of each play of main audio file
    updateAudio: false, // Was a relevant parameter (e.g. tempo or rhythm) changed during playing that requires the main audio file playing to be updated?
    isiOS: undefined, // true/false
    htmlAudio: undefined, // For iOS
    htmlAudioSetup: false, // Flag. Background HTML5 element created
    htmlAudioPlaying: false, // Flag. Background HTML5 has started playing
    hasOutputLatency:
      window.AudioContext && 'outputLatency' in window.AudioContext.prototype
        ? true
        : false,
    tonejs: {
      itemsMidi: {}, // MIDI files as JS objects
      visuals: []
    },
    timeouts: {
      // Store timeouts in state object so they can be cleared (and we can prevent multiple instances thereof being fired). All timeouts in this object are cleared by playStopHowl()
      loading: undefined // If audio taking more than a brief moment to load, show 'loading' indicator
    }
  };

  // Constructor function
  class ItemAudioState {
    constructor(name, buttonPlay, loop, tempo, filePath, midi, numberOfKeys) {
      this.name = name; // e.g. lick-blues-1. Taken from `data-name` on .button-play
      this.buttonPlay = buttonPlay;
      this.loop = loop; // true/false
      this.tempo = tempo; // integer/undefined
      this.filePath = filePath; // e.g. /audio/lick-blues-1/lick-blues-1-straight-120 (file extensions added later)
      this.midi = midi; // Path to MIDI file
      this.numberOfKeys = numberOfKeys; // Number of keys on keyboard
    }
  }

  function init() {
    if (!document.querySelector('.button-play')) return; // At least one .button-playing needs to be present

    const userAgent = navigator.userAgent.toLowerCase();

    state.isiOS =
      userAgent.indexOf('iphone') > -1 ||
      userAgent.indexOf('ipod') > -1 ||
      userAgent.indexOf('ipad') > -1 ||
      (navigator.maxTouchPoints && /Mac/.test(navigator.platform)); // iPad running 'desktop' Safari

    document.querySelectorAll('.button-play').forEach((element) => {
      let data = element.dataset;
      let name = replaceHyphens(data.name);
      let tempo =
        data.tempo && document.querySelector(data.tempo)
          ? parseInt(document.querySelector(data.tempo).value)
          : undefined;
      let tempoFormatted = '';
      if (tempo) tempoFormatted = `-${tempo}`;

      let midi =
        data.midi !== undefined
          ? encodeURI(`${cfg.audioFolder}/${data.name}/${data.name}.mid`)
          : undefined;
      let numberOfKeys =
        data.midi !== undefined && data.midi.length ? data.midi : undefined;

      state.itemsState[name] = new ItemAudioState(
        name,
        element, // buttonPlay
        data.loop &&
        document.querySelector(data.loop) &&
        document.querySelector(data.loop).checked
          ? true
          : false, // loop
        tempo,
        encodeURI(
          `${cfg.audioFolder}/${data.name}/${data.name}${tempoFormatted}`
        ), // filePath
        midi,
        numberOfKeys
      );

      // Add JS object data representation of MIDI file if there is one associated with this example
      if (midi !== undefined) {
        Midi.Midi.fromUrl(midi).then((midiJS) => {
          let keyboardSVG;
          let keys;

          if (numberOfKeys !== undefined) {
            let numberOfKeysDefault = numberOfKeys.split('|')[0];
            let numberOfKeysMobile = numberOfKeys.split('|')[1];
            keys =
              window.innerWidth < 600 && numberOfKeysMobile !== undefined
                ? numberOfKeysMobile
                : numberOfKeysDefault;
            let keyboardName = `keyboard${keys}`;
            if (cfg[keyboardName] === undefined) {
              throw `A keyboard with ${keys} keys has not been defined in JAZZTOOLKIT.cfg`;
            }
            keyboardSVG = parseHTML(cfg[keyboardName]);
          } else {
            keyboardSVG = parseHTML(cfg.keyboard88); // 88 keys if none specified in HTML data attribute
          }

          keyboardSVG.classList.add(name);

          if (cfg.logging) console.debug('Midi file loaded');

          // Add keyboard
          element.parentNode.insertAdjacentHTML(
            'beforebegin',
            `<div class="container-keyboard keys-${keys}">${keyboardSVG.outerHTML}</div>`
          );

          document.body.style.transition = 'opacity 0.5s';
          document.body.style.opacity = 1;

          state.tonejs.itemsMidi[name] = midiJS;
        });
      }

      element.insertAdjacentHTML(
        'afterend',
        `<div class="count-in ${replaceHyphens(name)}"></div>`
      );
    });

    if (state.isiOS) setupHTML5Audio();
    addHandlers();

    Tone.context.lookAhead = 0; // https://github.com/Tonejs/Tone.js/issues/306#issuecomment-365989984
    if (cfg.logging) console.debug(state);
    state.init = true;
  }

  // Set up silent HTML5 audio for iOS
  function setupHTML5Audio() {
    // https://github.com/swevans/unmute/blob/master/unmute.js#L235-L254
    // In iOS we need to play an HTML track in the background
    const div = document.createElement('div');
    div.innerHTML = '<audio x-webkit-airplay="deny"></audio>';
    state.htmlAudio = div.children.item(0);
    state.htmlAudio.controls = false;
    state.htmlAudio.disableRemotePlayback = true; // Airplay like controls on other devices, prevents casting of the tag
    state.htmlAudio.preload = 'auto';
    // Set the src to a short bit of url encoded as a silent mp3
    // NOTE: the silence MP3 must be high quality, when web audio sounds are played in parallel the web audio sound is mixed to match the bitrate of the html sound
    // 0.01 seconds of silence VBR220-260 Joint Stereo 859B
    state.htmlAudio.src =
      'data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA//////////////////////////////////////////////////////////////////8AAABhTEFNRTMuMTAwA8MAAAAAAAAAABQgJAUHQQAB9AAAAnGMHkkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADgnABGiAAQBCqgCRMAAgEAH///////////////7+n/9FTuQsQH//////2NG0jWUGlio5gLQTOtIoeR2WX////X4s9Atb/JRVCbBUpeRUq//////////////////9RUi0f2jn/+xDECgPCjAEQAABN4AAANIAAAAQVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==';
    state.htmlAudio.loop = true;
    state.htmlAudioSetup = true;

    if (cfg.logging) console.debug('HTML5 audio set up');
  }

  function updateState(e) {
    const name = e.target.dataset.name;
    const itemState = state.itemsState[replaceHyphens(name)];

    const rhythm = itemState.rhythm ? `-${itemState.rhythm}` : '';
    const tempo = itemState.tempo ? `-${itemState.tempo}` : '';

    itemState.filePath = `${cfg.audioFolder}/${name}/${name}${rhythm}${tempo}`;

    // Should audio file be updated so that, if looped, the user-selected audio is played?
    if (
      state.playing &&
      (e.target.classList.contains('tempo') ||
        e.target.classList.contains('rhythm')) &&
      state.activeItemState.name === replaceHyphens(name)
    )
      state.updateAudio = true;

    if (cfg.logging) console.debug(state);
  }

  function disableUI() {
    const tempoButton = document.querySelector(
      state.activeItemState.buttonPlay.dataset.tempo
    );
    if (tempoButton) tempoButton.disabled = true;
  }

  function enableUI() {
    const tempoButton = document.querySelector(
      state.activeItemState.buttonPlay.dataset.tempo
    );
    if (tempoButton) tempoButton.disabled = false;
  }

  // Audio has just started playing
  function started() {
    state.activeItemState.buttonPlay.classList.add('button-playing');
    state.activeItemState.buttonPlay.innerText = 'Stop';
    state.loading = false;
    state.playing = true;
  }

  // Audio has finished playing
  function finished() {
    state.activeItemState.buttonPlay.classList.remove('button-playing');
    state.activeItemState.buttonPlay.innerText = 'Play';
    state.playing = false;
    state.loading = false;
    state.updateAudio = false;
    state.audio = undefined;
    state.playCount = 0;
    if (cfg.logging) console.debug('Finished');
  }

  // Stop currently playing audio
  function finish() {
    if (cfg.logging) console.debug('finish()');
    if (state.playing) {
      toneStop();
      state.audio.fade(1, 0, cfg.fadeRate);
    }
    if (state.htmlAudio !== undefined) {
      state.htmlAudio.pause(); // HTML audio iOS workaround (HTML5 audio doesn't have a stop() function)
      state.htmlAudioPlaying = false;
    }

    enableUI();
    finished();
  }

  function playStopHowl(e) {
    if (cfg.logging) console.debug('playStopHowl()');

    const itemState = state.activeItemState;

    // Function to play main audio file and start visuals
    function play() {
      if (state.audio !== undefined) {
        state.audio.play();
        Tone.Transport.start();
      }
    }

    for (const t in state.timeouts) {
      clearTimeout(state.timeouts[t]); // Includes state.timeouts.loading
    }

    if ((state.playing || state.loading) && e && e.target !== undefined) {
      // User clicks Stop
      finish();
    } else {
      // Main audio file (e.g. lick)
      if (cfg.logging) console.debug('*** Set up new `state.audio`');

      state.loading = true;
      disableUI();

      state.timeouts.loading = setTimeout(function () {
        state.activeItemState.buttonPlay.classList.add('button-playing');
        state.activeItemState.buttonPlay.innerHTML = `<div class="loading-dots blink"></div>`; // https://iconmonstr.com/loading-5-svg
      }, 500);

      state.audio = new Howl({
        src: [`${itemState.filePath}.m4a`],
        onload: function () {
          clearTimeout(state.timeouts.loading);
          started(e);

          if (e) {
            state.playingItemObjectName = replaceHyphens(e.target.dataset.name);
          }

          toneSchedule();
          play();
          enableUI();
        },
        onend: function () {
          // Called regardless of whether on loop
          if (cfg.logging) console.debug('`state.audio` onend');
          state.playCount++;

          if (itemState.loop && !state.updateAudio) {
            setTimeout(() => {
              // Can't get Tone to re-trigger without a timeout
              toneSchedule();
              play();
            }, 1);
          } else if (itemState.loop && state.updateAudio) {
            state.updateAudio = false;
            playStopHowl();
          } else {
            finished(this);
          }

          toneStop();
        },
        onfade: function () {
          this.stop();
        }
      });
    }
  }

  // Schedules Tone.js Draw events. Gets data from state.tonejs.itemsMidi[state.playingItemObjectName]
  function toneSchedule() {
    state.tonejs.visuals.length = 0;

    const midiObj = state.tonejs.itemsMidi[state.playingItemObjectName];
    const outputLatency = state.hasOutputLatency ? Howler.ctx.outputLatency : 0;

    if (cfg.logging) {
      const outputLatencyMessage = state.hasOutputLatency
        ? `${outputLatency}s`
        : '(unsuppored)';

      console.debug(`outputLatency: ${outputLatencyMessage}`);
    }

    if (midiObj) {
      midiObj.header.tempos[0].bpm = state.activeItemState.tempo; // Set BPM

      // API: https://tonejs.github.io/docs/14.7.77/Transport
      Tone.Transport.schedule(() => {
        const now = Tone.now();
        midiObj.tracks.forEach((track, i) => {
          track.notes.forEach((note) => {
            // Schedule all of the UI amendments
            // Draw.schedule takes a callback and a time to invoke the callback
            // https://github.com/Tonejs/Tone.js/blob/cd7bcdbe4d04ad74afb5af9da6a9cff0d30f027e/examples/animationSync.html#L66-L76
            state.tonejs.visuals[i] = Tone.Draw.schedule(() => {
              // Callback synced to the animation frame at the given time
              const velocityUI = Math.min(
                Math.max(Math.round(note.velocity * 10), 1),
                10
              );
              const key = document
                .querySelector(`.piano-keys.${state.playingItemObjectName}`)
                .getElementsByClassName(`key${note.name}`);

              const hand = midiObj.tracks.length === 1 || i ? 'rh' : 'lh'; // If only one track, assume right hand. Conditional based on logic Piano 1/2 staff style for two-hand track (track 0 == lh; track 1 == rh));

              [].forEach.call(key, (el) => {
                el.classList.add(
                  `note-on-${hand}`,
                  `note-on-${hand}-velocity-${velocityUI}`
                );
              });
              Tone.Draw.schedule(() => {
                // Remove note-on class name
                [].forEach.call(key, (el) => {
                  clearClassesFromSVG(el, `note-on-${hand}`);
                });
              }, note.time + now + note.duration + 0.06); // + n.nn just to help visibility with faster music
            }, note.time + now);
          });
        });
      }, outputLatency);
    }
  }

  function toneStop() {
    if (cfg.logging) console.debug('toneStop()');

    // Tone.Transport methods don't affect aleady scheduled sounds; only the timeline
    Tone.Transport.stop(); // Returns timeline to position 0:0:0
    Tone.Transport.cancel(); // Cancels remaining scheduled events https://tonejs.github.io/docs/14.7.77/Transport#cancel

    const stateToneJS = state.tonejs;
    const visuals = stateToneJS.visuals;

    // Stop visuals
    if (visuals[0]) visuals[0].cancel();
    if (visuals[1]) visuals[1].cancel();
    document
      .querySelectorAll(`.piano-keys.${state.playingItemObjectName} .note`)
      .forEach((el) => {
        clearClassesFromSVG(el, `note-on-`);
      });
  }

  function addHandlers() {
    document.querySelectorAll('.button-play').forEach((element) => {
      element.addEventListener('click', (e) => {
        const name = replaceHyphens(e.currentTarget.dataset.name);
        const osc = new Tone.Oscillator().toMaster(); // This is required or Safari won't run Tone.Transport.schedule(). Just setting up an oscillator should activate the AudioContext.

        // Play silent HTML5 audio
        if (
          state.isiOS &&
          state.htmlAudio !== undefined &&
          !state.htmlAudioPlaying
        ) {
          const playPromise = state.htmlAudio.play(); // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted#fix

          playPromise
            .then((_) => {
              state.htmlAudioPlaying = true;
              if (cfg.logging) console.debug('Playing HTML5 audio');
            })
            .catch((error) => {
              console.error(error);
            });
        }

        if (
          (state.playing || state.loading) &&
          state.activeItemState.name !== name
        ) {
          // User has already initiated the playing of an audio file, then has clicked on a play button which isn't the one currently playing/loading
          finish();
        }

        state.activeItemState = state.itemsState[name]; // Update state
        playStopHowl(e);
      });
    });

    document.querySelectorAll('select.tempo').forEach((element) => {
      element.addEventListener('change', (e) => {
        const dataset = e.target.dataset;
        let tempo = e.target.value;
        state.itemsState[replaceHyphens(dataset.name)].tempo = tempo;
        e.preventDefault();
      });
    });

    document
      .querySelectorAll('input[type=checkbox].loop')
      .forEach((element) => {
        element.addEventListener('change', (e) => {
          state.itemsState[replaceHyphens(e.target.dataset.name)].loop = e
            .target.checked
            ? true
            : false;
          e.preventDefault();
        });
      });

    // Change made somewhere in UI ('change' event bubbles to <body>). For elements added dynamically
    document.body.addEventListener('change', updateState);
  }

  document.querySelectorAll('select.tempo').forEach((element) => {
    element.addEventListener('change', (e) => {
      const dataset = e.target.dataset;
      let tempo = e.target.value;
      state.itemsState[replaceHyphens(dataset.name)].tempo = tempo;
      console.log(state.itemsState[replaceHyphens(dataset.name)].tempo);
      e.preventDefault();
    });
  });

  function replaceHyphens(str) {
    return str.replace(/-/g, '_');
  }

  function parseHTML(str) {
    const tmp = document.implementation.createHTMLDocument('');
    tmp.body.innerHTML = str;
    return tmp.body.children[0];
  }

  function clearClassesFromSVG(el, str) {
    const classes = el.className.baseVal
      .split(' ')
      .filter((c) => !c.startsWith(str));
    el.className.baseVal = classes.join(' ').trim();
  }

  return {
    init: init
  };
})();

KEYS_DEMO.init();
