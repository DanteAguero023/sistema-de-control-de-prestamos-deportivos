import { useEffect, useState } from "react";

const CSS = `
.sp{--p:#3B82F6;--bg:#111827;--card:#1F2937;--in:#0B1220;--bd:#334155;--mut:#94A3B8;--ok:#34D399;--wa:#FBBF24;--er:#F87171;
background:var(--bg);color:#F3F4F6;min-height:100vh;font-family:Inter,system-ui,sans-serif;font-size:14px;display:flex}
.sp *{box-sizing:border-box}
.sp aside{width:230px;background:#151E2E;border-right:1px solid var(--bd);padding:20px 16px;flex-shrink:0}
.sp main{flex:1;min-width:0;padding:32px;max-width:1100px}
.sp h1{font-size:20px;font-weight:600;margin:0}.sp h2{font-size:15px;font-weight:600;margin:0 0 14px}
.sp .sub{color:var(--mut);font-size:13px;margin:4px 0 22px}
.sp .brand{display:flex;gap:10px;align-items:center;margin-bottom:24px}
.sp .logo{width:34px;height:34px;border-radius:9px;background:var(--p);display:grid;place-items:center;font-weight:700}
.sp .nav{display:block;width:100%;text-align:left;background:none;border:1px solid transparent;color:#CBD5E1;padding:10px 12px;border-radius:8px;cursor:pointer;font:inherit;margin-bottom:4px}
.sp .nav.on{background:#1E3A6B55;border-color:#3B82F655;color:#60A5FA}.sp .nav:disabled{opacity:.4;cursor:not-allowed}
.sp .mon{margin-top:28px;background:var(--in);border-radius:10px;padding:12px;font-size:12px;color:var(--mut)}
.sp .mon b{display:block;color:#fff;font-size:14px;margin-top:4px}
.sp .card{background:var(--card);border:1px solid var(--bd);border-radius:12px;padding:22px}
.sp .grid{display:grid;grid-template-columns:1fr 300px;gap:20px;align-items:start}
.sp .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px}
.sp .kpi b{display:block;font-size:28px;margin:6px 0 2px}.sp .kpi span{font-size:12px;color:var(--mut)}
.sp label{display:block;color:var(--mut);font-size:12px;margin-bottom:6px}
.sp input,.sp select{width:100%;background:var(--in);border:1px solid var(--bd);border-radius:8px;color:#fff;padding:10px 12px;font:inherit}
.sp input:focus,.sp select:focus{outline:2px solid var(--p);border-color:transparent}
.sp .row2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}.sp .f{margin-bottom:16px}
.sp .btn{border:0;border-radius:8px;padding:10px 16px;font:inherit;font-weight:600;cursor:pointer;background:var(--p);color:#fff}
.sp .btn:hover{background:#60A5FA}.sp .btn.g{background:#2B3648;color:#E5E7EB}.sp .btn.g:hover{background:#374357}
.sp .btn:disabled{opacity:.5;cursor:not-allowed}
.sp .acts{display:flex;justify-content:flex-end;gap:10px;border-top:1px solid var(--bd);padding-top:16px;margin-top:8px}
.sp table{width:100%;border-collapse:collapse}
.sp th{text-align:left;color:var(--mut);font-size:11px;letter-spacing:.05em;text-transform:uppercase;padding:10px 12px;border-bottom:1px solid var(--bd)}
.sp td{padding:12px;border-bottom:1px solid #2a3547}
.sp .badge{display:inline-block;white-space:nowrap;font-size:11px;font-weight:600;padding:3px 10px;border-radius:99px}
.sp .Disponible{background:#064E3B88;color:var(--ok)}.sp .Prestado{background:#1E3A8A88;color:#60A5FA}
.sp .Bajo,.sp .Faltante{background:#78350F88;color:var(--wa)}.sp .Baja{background:#7F1D1D88;color:var(--er)}
.sp .kv{display:flex;justify-content:space-between;padding:7px 0;color:var(--mut)}.sp .kv b{color:#fff}
.sp .bar{height:6px;background:var(--in);border-radius:9px;overflow:hidden;margin:4px 0 12px}.sp .bar i{display:block;height:100%;background:var(--p)}
.sp .note{border-radius:8px;padding:12px;font-size:13px;margin:14px 0;background:var(--in)}
.sp .note.er{background:#7F1D1D44;border:1px solid #F8717155;color:#FCA5A5}
.sp .ico{width:52px;height:52px;border-radius:50%;display:grid;place-items:center;font-size:24px}
.sp .login{margin:auto;width:400px}.sp .chips{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
.sp .chip{background:var(--in);border:1px solid var(--bd);color:var(--mut);border-radius:99px;padding:5px 12px;font:inherit;font-size:12px;cursor:pointer}
.sp .chip.on{border-color:var(--p);color:#60A5FA}.sp .err{color:var(--er);font-size:12px;margin:-6px 0 12px}
.sp .ttl{display:flex;justify-content:space-between;align-items:flex-start}
.sp .card:has(table){overflow-x:auto}
.sp table{min-width:600px}
@media(max-width:820px){.sp{flex-direction:column}.sp aside{width:100%}.sp main{padding:20px}.sp .grid,.sp .kpis{grid-template-columns:1fr}.sp .row2{grid-template-columns:1fr;gap:0}.sp .ttl{display:block}.sp .ttl>div:last-child{margin-top:14px;flex-wrap:wrap}.sp .login{width:100%}}
`;

const INIT = [
  { id: 1, n: "Balón de Básquetbol Molten", t: "Taller de Básquetbol", s: 18 },
  { id: 2, n: "Balón de Fútbol N°5 Adidas", t: "Selección Fútbol Varones", s: 8 },
  { id: 3, n: "Set de Conos de Entrenamiento", t: "General Sede", s: 45 },
  { id: 4, n: "Colchoneta de Yoga Pro", t: "Pilates & Flexibilidad", s: 3 },
  { id: 5, n: "Malla de Vóleibol Oficial", t: "Taller Vóleibol Damas", s: 1, baja: true },
  { id: 6, n: "Pesas Rusas (Kettlebell) 12kg", t: "Acondicionamiento Físico", s: 12 },
  { id: 7, n: "Petos de Entrenamiento", t: "Selección Fútbol Varones", s: 30 },
];
const TALLERES = ["Selección Fútbol Varones", "Taller de Básquetbol", "Taller Vóleibol Damas", "Pilates & Flexibilidad", "Acondicionamiento Físico"];
const MAX_INTENTOS = 3;
const BLOQUEO_MS = 30000;
const ROLES = ["Encargado de Bodega", "Monitor", "Coordinador"];
const status = (i) => (i.baja ? "Baja" : i.s === 0 ? "Faltante" : i.s <= 3 ? "Bajo" : "Disponible");
const Badge = ({ v }) => <span className={`badge ${v}`}>{v}</span>;
const Kv = ({ k, v }) => (<div className="kv"><span>{k}</span><b>{v}</b></div>);
const fmt = (d) => new Date(d + "T12:00:00").toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
const readStored = (key, fallback, validate) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return validate(value) ? value : fallback;
  } catch {
    return fallback;
  }
};

export default function SistemaControlPrestamos() {
  const [view, setView] = useState("login");
  const [role, setRole] = useState(ROLES[0]);
  const [login, setLogin] = useState({ u: "", p: "" });
  const [loginErr, setLoginErr] = useState("");
  const [intentos, setIntentos] = useState(0);
  const [bloqueadoHasta, setBloqueadoHasta] = useState(null);
  const [restanteSeg, setRestanteSeg] = useState(0);
  const [inv, setInv] = useState(() => readStored("scp-inventory", INIT, Array.isArray));
  const [q, setQ] = useState("");
  const [d, setD] = useState({ taller: TALLERES[0], monitor: "Felipe Torres", fecha: "2026-10-12", rut: "" });
  const [items, setItems] = useState([]);
  const [sel, setSel] = useState({ id: 7, qty: 1 });
  const [nro, setNro] = useState(() => readStored("scp-next-loan-number", 248, Number.isInteger));
  const [done, setDone] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("scp-inventory", JSON.stringify(inv));
      localStorage.setItem("scp-next-loan-number", JSON.stringify(nro));
    } catch {
      // La aplicación sigue funcionando aunque el navegador no permita guardar.
    }
  }, [inv, nro]);

  useEffect(() => {
    if (!bloqueadoHasta) return;
    const tick = () => {
      const ms = bloqueadoHasta - Date.now();
      if (ms <= 0) { setBloqueadoHasta(null); setIntentos(0); setLoginErr(""); setRestanteSeg(0); return; }
      setRestanteSeg(Math.ceil(ms / 1000));
    };
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [bloqueadoHasta]);

  const bloqueado = bloqueadoHasta !== null && restanteSeg > 0;
  const canLoan = role === ROLES[0];
  const get = (id) => inv.find((i) => i.id === id);
  const total = items.reduce((a, b) => a + b.qty, 0);
  const short = items.filter((it) => it.qty > get(it.id).s);
  const go = (v) => setView(v);
  const reset = () => { setItems([]); setD({ ...d, rut: "" }); go("reg"); };

  const doLogin = () => {
    if (bloqueado) return;
    if (login.u.trim() !== "bodega" || login.p !== "demo123") {
      const n = intentos + 1;
      setIntentos(n);
      if (n >= MAX_INTENTOS) {
        setBloqueadoHasta(Date.now() + BLOQUEO_MS);
        setLoginErr(`Demasiados intentos fallidos. Cuenta bloqueada por ${BLOQUEO_MS / 1000} segundos.`);
      } else {
        setLoginErr(`Credenciales incorrectas. Usa la cuenta de demostración indicada abajo. Intentos restantes: ${MAX_INTENTOS - n}.`);
      }
      return;
    }
    setIntentos(0); setBloqueadoHasta(null); setLoginErr(""); go("inv");
  };
  const addItem = () => {
    const qty = Number(sel.qty);
    if (!qty || qty < 1) return;
    setItems((prev) => prev.some((x) => x.id === sel.id)
      ? prev.map((x) => (x.id === sel.id ? { ...x, qty: x.qty + qty } : x))
      : [...prev, { id: sel.id, qty }]);
  };
  const confirm = () => {
    if (short.length) return go("nostock");
    setInv(inv.map((i) => { const it = items.find((x) => x.id === i.id); return it ? { ...i, s: i.s - it.qty } : i; }));
    setDone({ nro: `PR-${String(nro).padStart(4, "0")}`, rows: items.map((it) => ({ ...it, antes: get(it.id).s, name: get(it.id).n })) });
    setNro(nro + 1); go("ok");
  };

  const Impact = ({ rows, title }) => (
    <div className="card">
      <h2>{title}</h2>
      {rows.map((r) => (
        <div key={r.id}>
          <Kv k={r.name} v={`${r.antes} → ${r.antes - r.qty}`} />
          <div className="bar"><i style={{ width: `${((r.antes - r.qty) / r.antes) * 100}%` }} /></div>
        </div>
      ))}
    </div>
  );
  const rowsNow = items.map((it) => ({ ...it, antes: get(it.id).s, name: get(it.id).n }));
  const Datos = () => (
    <>
      <div className="row2"><Kv k="Monitor responsable" v={d.monitor} /><Kv k="Taller" v={d.taller} /></div>
      <div className="row2"><Kv k="Entrega registrada por" v="Encargado de Bodega" /><Kv k="Devolución estimada" v={fmt(d.fecha)} /></div>
    </>
  );

  if (view === "login")
    return (
      <div className="sp"><style>{CSS}</style>
        <div className="login card" style={{ margin: "auto" }}>
          <div className="brand" style={{ justifyContent: "center" }}>
            <div className="logo">B</div><div><b>Bodega Sede</b><div className="sub" style={{ margin: 0 }}>Deportes & Recreación</div></div>
          </div>
          <h1 style={{ textAlign: "center" }}>Iniciar Sesión</h1>
          <p className="sub" style={{ textAlign: "center" }}>Ingresa tus credenciales para acceder al sistema</p>
          <div className="f"><label htmlFor="login-user">Usuario</label><input id="login-user" autoComplete="username" placeholder="bodega" value={login.u} disabled={bloqueado} onChange={(e) => setLogin({ ...login, u: e.target.value })} /></div>
          <div className="f"><label htmlFor="login-password">Contraseña</label><input id="login-password" autoComplete="current-password" type="password" placeholder="Contraseña" value={login.p} disabled={bloqueado} onChange={(e) => setLogin({ ...login, p: e.target.value })} onKeyDown={(e) => e.key === "Enter" && doLogin()} /></div>
          {loginErr && <div className="err">{loginErr}</div>}
          <button className="btn" style={{ width: "100%" }} onClick={doLogin} disabled={bloqueado}>{bloqueado ? `Bloqueado (${restanteSeg}s)` : "Iniciar Sesión"}</button>
          <div className="note" style={{ textAlign: "center" }}>Acceso de demostración: <b>bodega</b> / <b>demo123</b></div>
          <p className="sub" style={{ textAlign: "center", margin: "18px 0 8px", fontSize: 11 }}>ACCESO SEGÚN ROL</p>
          <div className="chips">{ROLES.map((r) => (<button key={r} type="button" className={`chip ${role === r ? "on" : ""}`} aria-pressed={role === r} onClick={() => setRole(r)}>{r}</button>))}</div>
        </div>
      </div>
    );

  const active = view === "inv" ? "inv" : "reg";
  const filtered = inv.filter((i) => i.n.toLowerCase().includes(q.toLowerCase()));
  const sm = get(sel.id);

  return (
    <div className="sp"><style>{CSS}</style>
      <aside>
        <div className="brand"><div className="logo">🏆</div><div><b>Bodega Sede</b><div style={{ fontSize: 12, color: "#94A3B8" }}>Deportes & Recreación</div></div></div>
        <button className={`nav ${active === "inv" ? "on" : ""}`} onClick={() => go("inv")}>Inventario</button>
        <button className={`nav ${active === "reg" ? "on" : ""}`} disabled={!canLoan} title={canLoan ? "" : "Solo el Encargado de Bodega"} onClick={reset}>Registrar Préstamo</button>
        <button className="nav" disabled>Estadísticas</button>
        <button className="nav" disabled>Configuración</button>
        <div className="mon">MONITOR ACTIVO<b>Felipe Torres</b>ID: 8847-B · {role}</div>
        <button className="nav" style={{ marginTop: 16 }} onClick={() => go("login")}>Cerrar sesión</button>
      </aside>

      <main>
        {view === "inv" && (
          <>
            <div className="ttl">
              <div><h1>Consulta de Inventario Deportivo</h1><p className="sub">Visualización en tiempo real del estado de todos los implementos deportivos.</p></div>
              <div style={{ display: "flex", gap: 10 }}>
                <input placeholder="Buscar implemento..." value={q} onChange={(e) => setQ(e.target.value)} style={{ width: 220 }} />
                {canLoan && <button className="btn" onClick={reset}>+ Nuevo</button>}
              </div>
            </div>
            <div className="kpis">
              <div className="card kpi"><span>Unidades disponibles</span><b>{inv.reduce((sum, item) => sum + item.s, 0)}</b><span>Stock actual en bodega</span></div>
              <div className="card kpi"><span>Tipos de implemento</span><b>{inv.length}</b><span>Artículos registrados</span></div>
              <div className="card kpi"><span>Stock bajo</span><b>{inv.filter((item) => !item.baja && item.s > 0 && item.s <= 3).length}</b><span>Requieren seguimiento</span></div>
              <div className="card kpi"><span>Dados de baja</span><b>{inv.filter((item) => item.baja).length}</b><span>No disponibles para préstamo</span></div>
            </div>
            <div className="card" style={{ padding: 0 }}>
              <table>
                <thead><tr><th>Implemento</th><th>Taller asignado</th><th>Cantidad</th><th>Estado</th></tr></thead>
                <tbody>{filtered.map((i) => (<tr key={i.id}><td>{i.n}</td><td>{i.t}</td><td>{i.s} unds</td><td><Badge v={status(i)} /></td></tr>))}</tbody>
              </table>
              {filtered.length === 0 && <div style={{ padding: 14, color: "#94A3B8", fontSize: 13 }}>No hay implementos que coincidan con la búsqueda.</div>}
              <div style={{ padding: 14, color: "#94A3B8", fontSize: 13 }}>Mostrando {filtered.length} de {inv.length} implementos registrados</div>
            </div>
          </>
        )}

        {view === "reg" && (
          <>
            <h1>Registrar Préstamo Deportivo</h1><p className="sub">Asigna el préstamo a un monitor responsable y a un taller deportivo vigente de la sede.</p>
            <div className="grid">
              <div className="card">
                <h2>Formulario de Entrega</h2>
                <div className="row2">
                  <div><label>Taller</label><select value={d.taller} onChange={(e) => setD({ ...d, taller: e.target.value })}>{TALLERES.map((t) => <option key={t}>{t}</option>)}</select></div>
                  <div><label>Monitor Responsable (Entrega)</label><input value={d.monitor} onChange={(e) => setD({ ...d, monitor: e.target.value })} /></div>
                </div>
                <div className="row2">
                  <div><label>RUT o ID del Alumno (opcional)</label><input placeholder="12.345.678-9" value={d.rut} onChange={(e) => setD({ ...d, rut: e.target.value })} /></div>
                  <div><label>Fecha Estimada de Devolución</label><input type="date" value={d.fecha} onChange={(e) => setD({ ...d, fecha: e.target.value })} /></div>
                </div>
                <div className="acts"><button className="btn g" onClick={() => go("inv")}>Cancelar</button><button className="btn" disabled={!d.monitor.trim()} onClick={() => go("add")}>Continuar</button></div>
              </div>
              <div className="card">
                <h2>Estado de la Bodega Hoy</h2><Kv k="Capacidad Ocupada" v="64%" /><div className="bar"><i style={{ width: "64%" }} /></div>
                <p className="sub" style={{ margin: "12px 0 6px", fontSize: 11 }}>ALERTAS URGENTES</p>
                <div style={{ fontSize: 13, color: "#FBBF24", marginBottom: 8 }}>⚠ Taller de Básquetbol tiene 2 balones reportados como Faltantes.</div>
                <div style={{ fontSize: 13, color: "#F87171" }}>⛔ 4 colchonetas de yoga dadas de Baja por deterioro extremo.</div>
              </div>
            </div>
          </>
        )}

        {view === "add" && (
          <>
            <h1>Agregar Implementos al Préstamo</h1><p className="sub">Selecciona implementos y cantidades. El sistema valida el stock antes de agregarlos.</p>
            <div className="grid">
              <div className="card">
                <h2>Implementos del Préstamo</h2>
                <div className="row2">
                  <div><label>Implemento Deportivo</label><select value={sel.id} onChange={(e) => setSel({ ...sel, id: Number(e.target.value) })}>{inv.filter((i) => !i.baja).map((i) => <option key={i.id} value={i.id}>{i.n}</option>)}</select></div>
                  <div><label>Cantidad Solicitada</label><input type="number" min="1" value={sel.qty} onChange={(e) => setSel({ ...sel, qty: e.target.value })} /></div>
                </div>
                <div className="note" style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Unidades en almacén listas para préstamo: {sm.s}</span><Badge v={status(sm)} />
                </div>
                <div style={{ textAlign: "right" }}><button className="btn g" onClick={addItem}>Agregar al préstamo</button></div>
                <h2 style={{ marginTop: 20 }}>Implementos agregados ({items.length})</h2>
                {items.length > 0 && (
                  <table>
                    <thead><tr><th>Implemento</th><th>Cantidad</th><th>Stock</th><th>Estado</th><th /></tr></thead>
                    <tbody>{items.map((it) => { const g = get(it.id); const bad = it.qty > g.s; return (
                      <tr key={it.id}><td>{g.n}</td><td>{it.qty}</td><td>{g.s}</td><td><Badge v={bad ? "Faltante" : "Disponible"} /></td>
                        <td><button className="btn g" style={{ padding: "4px 10px" }} onClick={() => setItems(items.filter((x) => x.id !== it.id))}>🗑</button></td></tr>); })}</tbody>
                  </table>
                )}
                <div className="acts"><button className="btn g" onClick={() => go("reg")}>Volver</button><button className="btn" disabled={!items.length} onClick={() => go("sum")}>Continuar al resumen</button></div>
              </div>
              <div className="card">
                <h2>Resumen Parcial</h2>
                <Kv k="Taller" v={d.taller} /><Kv k="Monitor responsable" v={d.monitor} /><Kv k="Devolución estimada" v={fmt(d.fecha)} />
                <hr style={{ borderColor: "#334155" }} /><Kv k="Tipos de implemento" v={items.length} /><Kv k="Total de unidades" v={total} />
                {items.length > 0 && <div className="note" style={{ color: short.length ? "#FCA5A5" : "#34D399" }}>{short.length ? `✕ Stock insuficiente en ${short.length} implemento(s).` : `✓ Stock verificado para los ${items.length} implementos.`}</div>}
              </div>
            </div>
          </>
        )}

        {view === "sum" && (
          <>
            <h1>Resumen del Préstamo</h1><p className="sub">Revisa los datos antes de confirmar. El inventario se actualizará al confirmar.</p>
            <div className="grid">
              <div className="card">
                <h2>Datos del Préstamo</h2><Datos />
                <h2>Implementos del Préstamo</h2>
                <table><thead><tr><th>Implemento</th><th>Cantidad</th><th>Stock actual</th><th>Stock final</th></tr></thead>
                  <tbody>{rowsNow.map((r) => (<tr key={r.id}><td>{r.name}</td><td>{r.qty}</td><td>{r.antes}</td><td style={{ color: r.antes - r.qty < 0 ? "#F87171" : undefined }}>{r.antes - r.qty}</td></tr>))}</tbody></table>
                <Kv k="Total" v={`${items.length} tipos · ${total} unidades`} />
                <div className="acts"><button className="btn g" onClick={() => go("add")}>Volver a editar</button><button className="btn" onClick={confirm}>Confirmar préstamo</button></div>
              </div>
              <div>
                <Impact rows={rowsNow.map((r) => ({ ...r, antes: Math.max(r.antes, 1) }))} title="Impacto en Inventario" />
                <div className="note">ⓘ Los cambios se aplican solo al confirmar el préstamo.</div>
              </div>
            </div>
          </>
        )}

        {view === "ok" && done && (
          <>
            <h1>Préstamo Registrado</h1><p className="sub">El préstamo se guardó correctamente y el inventario fue actualizado.</p>
            <div className="grid">
              <div className="card">
                <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 18 }}>
                  <div className="ico" style={{ background: "#064E3B88", color: "#34D399" }}>✓</div>
                  <div><h2 style={{ margin: 0 }}>Préstamo registrado correctamente</h2><span className="sub">N° {done.nro}</span></div>
                </div>
                <Datos />
                <h2>Implementos entregados</h2>
                <table><thead><tr><th>Implemento</th><th>Cantidad</th><th>Stock restante</th></tr></thead>
                  <tbody>{done.rows.map((r) => (<tr key={r.id}><td>{r.name}</td><td>{r.qty}</td><td>{r.antes - r.qty}</td></tr>))}</tbody></table>
                <div className="acts"><button className="btn g" onClick={() => go("inv")}>Ver inventario</button><button className="btn" onClick={reset}>Nuevo préstamo</button></div>
              </div>
              <div><Impact rows={done.rows} title="Inventario Actualizado" /><div className="note" style={{ color: "#34D399" }}>✓ El stock se descontó automáticamente.</div></div>
            </div>
          </>
        )}

        {view === "nostock" && (
          <>
            <h1>Préstamo No Registrado</h1><p className="sub">No se pudo completar el registro porque no hay stock suficiente.</p>
            <div className="grid">
              <div className="card">
                <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 18 }}>
                  <div className="ico" style={{ background: "#7F1D1D66", color: "#F87171" }}>⚠</div>
                  <div><h2 style={{ margin: 0 }}>No se puede registrar el préstamo</h2><span className="sub">Stock insuficiente para uno o más implementos</span></div>
                </div>
                <h2>Verificación de stock</h2>
                <table><thead><tr><th>Implemento</th><th>Solicitados</th><th>Disponibles</th><th>Estado</th></tr></thead>
                  <tbody>{items.map((it) => { const g = get(it.id); return (<tr key={it.id}><td>{g.n}</td><td>{it.qty}</td><td>{g.s}</td><td><Badge v={it.qty > g.s ? "Faltante" : "Disponible"} /></td></tr>); })}</tbody></table>
                {short.map((it) => (<div key={it.id} className="note er">Reduce {get(it.id).n} a {get(it.id).s} unidades o menos para continuar. No se descontó nada del inventario.</div>))}
                <div className="acts"><button className="btn g" onClick={() => go("inv")}>Cancelar</button><button className="btn" onClick={() => go("add")}>Volver a editar</button></div>
              </div>
              <div className="card">
                <h2>Detalle del Bloqueo</h2>
                {short.map((it) => (<div key={it.id}><Kv k="Implemento" v={get(it.id).n} /><Kv k="Solicitados" v={it.qty} /><Kv k="Disponibles" v={get(it.id).s} /><Kv k="Faltan" v={<span style={{ color: "#F87171" }}>{it.qty - get(it.id).s}</span>} /></div>))}
                <div className="note">ⓘ El inventario no tuvo cambios. Ajusta la cantidad y vuelve a intentar.</div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
