'use client';

import { Html, OrbitControls, RoundedBox } from '@react-three/drei';
import { useMemo, useState } from 'react';
import { useSnapshot } from 'valtio';
import { setupViewerState } from './store';
import type { GripType, ViewerLabels } from './types';

type Inspector = { title: string; rows: Array<[string, string]> } | null;
interface Props { labels: ViewerLabels; gripType: GripType; palmContactRatio: number; movementAmplitude: number; }
const keyboardRows: Record<string, number[]> = { '60%': [14,14,14,13], '65%': [14,14,14,13], '75%': [15,15,15,14], TKL: [15,15,15,14,4], full: [16,16,16,15,4] };

function Desk() {
  return <group>
    <RoundedBox args={[11,0.45,5.5]} radius={0.14} smoothness={4} position={[0,-0.25,0]}><meshStandardMaterial color="#111827" roughness={0.62} metalness={0.18}/></RoundedBox>
    {[[-4.8,-1.8,-2.1],[4.8,-1.8,-2.1],[-4.8,-1.8,2.1],[4.8,-1.8,2.1]].map((p,i)=><mesh key={i} position={p as [number,number,number]}><boxGeometry args={[0.35,3.1,0.35]}/><meshStandardMaterial color="#0b1220"/></mesh>)}
  </group>;
}

function Monitor({ aspect, refresh, labels, onInspect }: { aspect:number; refresh:number; labels:ViewerLabels; onInspect:(x:Inspector)=>void }) {
  const width=3.1, height=width/aspect;
  return <group position={[0,1.35,-1.75]} onClick={(e)=>{e.stopPropagation();onInspect({title:labels.monitor,rows:[[labels.refreshRate,`${refresh} Hz`],[labels.aspectRatio,`${aspect.toFixed(2)}:1`]]})}}>
    <RoundedBox args={[width,height,0.12]} radius={0.08} smoothness={3}><meshStandardMaterial color="#05070b" roughness={0.2} metalness={0.75}/></RoundedBox>
    <mesh position={[0,0,0.07]}><planeGeometry args={[width-0.16,height-0.16]}/><meshStandardMaterial color="#0f172a" emissive="#071a2e" emissiveIntensity={0.35}/></mesh>
    <mesh position={[0,-height/2-0.55,0]}><boxGeometry args={[0.16,1.05,0.16]}/><meshStandardMaterial color="#111827" metalness={0.6}/></mesh>
    <mesh position={[0,-height-0.08,0]}><boxGeometry args={[1.55,0.08,0.72]}/><meshStandardMaterial color="#111827" metalness={0.55}/></mesh>
    <Html position={[width/2-0.25,height/2-0.2,0.15]} center><span style={{color:'#a7f3d0',font:'600 11px ui-monospace',whiteSpace:'nowrap'}}>{refresh} Hz</span></Html>
  </group>;
}

function Keyboard({ layout, labels, onInspect }: { layout:keyof typeof keyboardRows; labels:ViewerLabels; onInspect:(x:Inspector)=>void }) {
  const rows=keyboardRows[layout], keyW=layout==='full'?0.18:0.2;
  return <group position={[-2.25,0.15,0.75]} rotation={[-0.035,0,0]} onClick={(e)=>{e.stopPropagation();onInspect({title:labels.keyboard,rows:[[labels.keyboard,layout],[labels.actuation,'0.1–4.0 mm']]})}}>
    <RoundedBox args={[3.65,0.18,1.45]} radius={0.08} smoothness={3}><meshStandardMaterial color="#090d15" roughness={0.5} metalness={0.35}/></RoundedBox>
    {rows.map((count,row)=>{const total=count*keyW+(count-1)*0.035;return Array.from({length:count},(_,col)=><mesh key={`${row}-${col}`} position={[-total/2+col*(keyW+0.035)+keyW/2,0.12,-0.5+row*0.25]}><boxGeometry args={[keyW,0.055,0.18]}/><meshStandardMaterial color="#1f2937" roughness={0.48}/></mesh>)})}
  </group>;
}

function Mousepad({ surface, movementAmplitude, labels, onInspect }: { surface:'speed'|'control'; movementAmplitude:number; labels:ViewerLabels; onInspect:(x:Inspector)=>void }) {
  const opacity=surface==='speed'?0.82:0.92, range=Math.max(0.7,Math.min(2.4,movementAmplitude/100));
  return <group position={[2.15,0.05,0.78]} onClick={(e)=>{e.stopPropagation();onInspect({title:labels.mousepad,rows:[[labels.mousepad,surface==='speed'?labels.speed:labels.control],[labels.movementRange,`${movementAmplitude.toFixed(0)}%`]]})}}>
    <RoundedBox args={[4.2,0.06,2.25]} radius={0.1} smoothness={3}><meshStandardMaterial color={surface==='speed'?'#18202d':'#151a24'} roughness={surface==='speed'?0.3:0.72} transparent opacity={opacity}/></RoundedBox>
    <mesh position={[0,0.05,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[0.2*range,0.23*range,48]}/><meshBasicMaterial color="#34d399" transparent opacity={0.8}/></mesh>
    <mesh position={[0,0.055,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[0.85*range,0.87*range,64]}/><meshBasicMaterial color="#34d399" transparent opacity={0.24}/></mesh>
  </group>;
}

function Mouse({ gripType, palmContactRatio, labels, onInspect }: { gripType:GripType; palmContactRatio:number; labels:ViewerLabels; onInspect:(x:Inspector)=>void }) {
  const heat=Math.max(0,Math.min(1,palmContactRatio));
  const points=useMemo(()=>[[-0.24,0.18,0.08],[0,0.23,0.1],[0.24,0.18,0.08],[0,-0.1,0.11]] as [number,number,number][],[]);
  return <group position={[2.1,0.22,0.78]} rotation={[0,-0.18,0]} onClick={(e)=>{e.stopPropagation();onInspect({title:labels.mouse,rows:[[labels.gripHeatmap,gripType],[labels.mouse,`${Math.round(heat*100)}%`],[labels.dpi,'800'],[labels.latency,'< 1 ms']]})}}>
    <RoundedBox args={[1.05,0.38,1.7]} radius={0.28} smoothness={6}><meshStandardMaterial color="#202938" roughness={0.28} metalness={0.3}/></RoundedBox>
    <mesh position={[0,0.2,0.22]}><boxGeometry args={[0.025,0.035,0.58]}/><meshStandardMaterial color="#334155"/></mesh>
    {points.map(([x,y,z],i)=><mesh key={i} position={[x,y,z]}><sphereGeometry args={[0.14+heat*0.05,20,12]}/><meshBasicMaterial color="#ef4444" transparent opacity={0.18+heat*0.3} depthWrite={false}/></mesh>)}
  </group>;
}

export function SetupScene({ labels, gripType, palmContactRatio, movementAmplitude }: Props) {
  const state=useSnapshot(setupViewerState);
  const [inspector,setInspector]=useState<Inspector>(null);
  return <>
    <color attach="background" args={['#070b12']}/><ambientLight intensity={1.5}/><directionalLight position={[4,7,3]} intensity={3.2} castShadow/><pointLight position={[-4,3,-2]} intensity={18} distance={12} color="#22c55e"/>
    <Desk/>
    <Monitor aspect={Number(state.monitorAspectRatio)} refresh={Number(state.monitorRefreshRate)} labels={labels} onInspect={setInspector}/>
    <Keyboard layout={state.keyboardLayout as keyof typeof keyboardRows} labels={labels} onInspect={setInspector}/>
    <Mousepad surface={state.mousepadSurface} movementAmplitude={movementAmplitude} labels={labels} onInspect={setInspector}/>
    <Mouse gripType={gripType} palmContactRatio={palmContactRatio} labels={labels} onInspect={setInspector}/>
    <OrbitControls makeDefault enableDamping dampingFactor={0.08} minDistance={5.5} maxDistance={15} target={[0,0.25,0]}/>
    <Html position={[0,4,0]} center><div style={{color:'#94a3b8',font:'600 12px ui-monospace',letterSpacing:'0.12em',textTransform:'uppercase',pointerEvents:'none'}}>{labels.title}</div></Html>
    {inspector && <Html position={[0,1.5,2.7]} center distanceFactor={7}><div style={{width:220,padding:14,borderRadius:12,border:'1px solid rgba(148,163,184,.18)',background:'rgba(2,6,23,.94)',boxShadow:'0 20px 60px rgba(0,0,0,.45)',color:'#e2e8f0',fontFamily:'ui-sans-serif'}}><div style={{display:'flex',justifyContent:'space-between',gap:12,marginBottom:10}}><strong>{inspector.title}</strong><button type="button" aria-label={labels.close} onClick={()=>setInspector(null)} style={{color:'#94a3b8',background:'none',border:0,cursor:'pointer'}}>×</button></div>{inspector.rows.map(([key,value])=><div key={key} style={{display:'flex',justifyContent:'space-between',gap:10,padding:'5px 0',fontSize:12}}><span style={{color:'#64748b'}}>{key}</span><span>{value}</span></div>)}</div></Html>}
  </>;
}
