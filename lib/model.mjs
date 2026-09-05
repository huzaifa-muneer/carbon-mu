export const initialDetectors = [{x:-2.5,z:0.5},{x:0,z:2},{x:2.6,z:-1.4}];
export function predict({depth,area,exposure,sensors,detectors}) {
 const rate = 12 * area * Math.exp(-depth/270);
 const coverage = detectors.reduce((a,d)=>a+Math.exp(-(d.x*d.x+d.z*d.z)/12),0)/detectors.length;
 const evidence = (sensors.seismic?1.8:0)+(sensors.well?0.8:0)+(sensors.sar?0.25:0)+(sensors.muon?Math.log1p(rate*exposure)*coverage*0.65:0);
 const uncertainty=70/Math.sqrt(1+evidence);
 return {rate,coverage,uncertainty,information:Math.log2(1+evidence),events:Math.round(rate*exposure)};
}
export function optimize(){return [{x:-1.2,z:0},{x:0.6,z:0.9},{x:0.6,z:-0.9}]}
