'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Line, Html, Stars } from '@react-three/drei';
import { Component, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
type Props={mode:string;layer:boolean;opacity:number;slice:number;particles:boolean;playing:boolean;field:string;uncertainty:number;depth:number;detectors:{x:number;z:number}[];selected:number;onSelect:(n:number)=>void;onParticle:(n:number)=>void;cameraKey:number};
function Muons({playing,onParticle}:{playing:boolean;onParticle:(n:number)=>void}){
 const group=useRef<THREE.Group>(null); const t=useRef(0);
 useFrame((_,delta)=>{if(playing)t.current+=delta;group.current?.children.forEach((c,i)=>{c.position.y=5-((t.current*(1.6+(i%3)*.3)+i*.73)%9)})});
 return <group ref={group}>{Array.from({length:64},(_,i)=><mesh key={i} position={[Math.sin(i*127.1)*4.5,0,Math.cos(i*73.7)*3]} onClick={e=>{e.stopPropagation();onParticle(i)}}><cylinderGeometry args={[.014,.014,.55,5]}/><meshBasicMaterial color={i%5===0?'#eaffab':'#64d9e4'} transparent opacity={.55}/></mesh>)}</group>
}
function Reservoir(p:Props){
 const plume=useMemo(()=>Array.from({length:42},(_,i)=>({x:Math.sin(i*2.4)*(.4+i/23),z:Math.cos(i*2.4)*(.3+i/35),y:-.3+(i%4)*.13,scale:.42+(i%5)*.08})),[]);
 const color=p.field==='Pressure'?'#ffb96b':p.field==='Uncertainty'?'#b5a0ff':'#bbf879';
 return <group>
 <gridHelper args={[13,26,'#334348','#1d2b31']} position={[0,-2.65,0]}/>
 {p.layer&&[0,1,2,3,4].filter(i=>i>=p.slice).map(i=><group key={i} position={[0,1.45-i*.76,0]}><mesh><boxGeometry args={[8.5,.55,5.8]}/><meshStandardMaterial color={['#658f9c','#54757d','#777c6c','#586c60','#3b5355'][i]} transparent opacity={p.opacity/100} depthWrite={false}/></mesh><lineSegments><edgesGeometry args={[new THREE.BoxGeometry(8.5,.55,5.8)]}/><lineBasicMaterial color="#7b9995" transparent opacity={.25}/></lineSegments></group>)}
 <group>{plume.map((s,i)=><mesh key={i} position={[s.x,s.y,s.z]} scale={[s.scale*1.5,s.scale*.32,s.scale]}><sphereGeometry args={[1,20,12]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={.6} transparent opacity={.62} depthWrite={false}/></mesh>)}</group>
 {(p.field==='Uncertainty'||p.mode==='AI Twin')&&<mesh position={[0,-.1,0]} scale={[2.2+p.uncertainty/50,.55,1.5+p.uncertainty/70]}><sphereGeometry args={[1,28,16]}/><meshBasicMaterial color="#bd9cff" wireframe transparent opacity={.13}/></mesh>}
 <Line points={[[.4,3,0],[.4,.5,0],[.6,-.4,0]]} color="#dbdbcc" lineWidth={2}/><Html position={[.4,3.1,0]} center><span className="scene-tag">INJECTION WELL</span></Html>
 {p.detectors.map((d,i)=><group key={i} position={[d.x,1.7-p.depth/240,d.z]} onClick={e=>{e.stopPropagation();p.onSelect(i)}}><mesh><boxGeometry args={[.3,.14,.3]}/><meshStandardMaterial color={p.selected===i?'#efffb2':'#64dce3'} emissive="#64dce3" emissiveIntensity={1}/></mesh><Line points={[[0,0,0],[0,-.7,0]]} color="#66b5ba" dashed dashSize={.08} gapSize={.06}/><Html position={[0,-.85,0]} center><button className={'scene-tag detector '+(p.selected===i?'selected':'')} onClick={()=>p.onSelect(i)}>D{i+1}</button></Html></group>)}
 <Html position={[-4.4,1.65,0]}><span className="depth-tag">SEABED</span></Html><Html position={[-4.4,-.35,0]}><span className="depth-tag">RESERVOIR</span></Html>
 {p.particles&&<Muons playing={p.playing} onParticle={p.onParticle}/>}
 </group>
}
function Earth({playing}:{playing:boolean}){const ref=useRef<THREE.Group>(null);useFrame((_,d)=>{if(ref.current&&playing)ref.current.rotation.y+=d*.06});return <group ref={ref}><mesh><sphereGeometry args={[2.7,48,32]}/><meshStandardMaterial color="#183e4b" roughness={.9}/></mesh><mesh scale={1.004}><sphereGeometry args={[2.7,24,18]}/><meshBasicMaterial wireframe color="#4c9d9b" transparent opacity={.25}/></mesh><mesh position={[.65,2.3,1.3]}><sphereGeometry args={[.065,12,12]}/><meshBasicMaterial color="#c7ff86"/></mesh><Html position={[.65,2.65,1.3]} center><span className="scene-tag">SLEIPNER · CONCEPTUAL GLOBE</span></Html><Stars radius={70} depth={30} count={1000} factor={2}/></group>}
function CameraReset({version}:{version:string}){const {camera}=useThree();useEffect(()=>{camera.position.set(10,7,11);camera.lookAt(0,0,0);camera.updateProjectionMatrix()},[camera,version]);return null}
class Boundary extends Component<{children:React.ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true}}render(){return this.state.failed?<div className="fallback">3D rendering is unavailable on this device. All experiment controls and results remain available. Try a browser with WebGL enabled.</div>:this.props.children}}
export default function Scene(p:Props){return <Boundary><Canvas camera={{position:[10,7,11],fov:43}} dpr={[1,1.7]} gl={{antialias:true}} aria-label="Interactive conceptual underground carbon reservoir"><CameraReset version={p.cameraKey+p.mode}/><ambientLight intensity={1.7}/><directionalLight position={[3,9,5]} intensity={2.5}/>{p.mode==='Earth'?<Earth playing={p.playing}/>:<Reservoir {...p}/>}<OrbitControls key={p.cameraKey+p.mode} makeDefault minDistance={5} maxDistance={23} enablePan={false} autoRotate={p.mode==='Earth'&&p.playing} maxPolarAngle={Math.PI*.78}/></Canvas></Boundary>}
