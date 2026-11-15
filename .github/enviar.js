// Envía el aviso de coordenadas/aviso.json a los móviles de coordenadas/d.json
const fs=require("fs"), wp=require("web-push");
if(!process.env.VPRIV){ console.log("Falta la clave"); process.exit(1); }
wp.setVapidDetails("mailto:noreply@example.com",process.env.VPUB,process.env.VPRIV);
const a=JSON.parse(fs.readFileSync("coordenadas/aviso.json","utf8"));
const subs=JSON.parse(fs.readFileSync("coordenadas/d.json","utf8"));
const txt=Buffer.from(a.m,"base64").toString("utf8");
const [t,...resto]=txt.split("\n");
const payload=JSON.stringify({t:t||"Coordenadas",b:resto.join("\n")||"",tag:a.id||"c"});
(async()=>{ let ok=0;
  for(const s of subs){ try{ await wp.sendNotification(s,payload,{TTL:86400}); ok++; }catch(e){ console.log("fallo",e.statusCode); } }
  console.log("enviados",ok,"de",subs.length); if(subs.length&&!ok) process.exit(1);
})();
