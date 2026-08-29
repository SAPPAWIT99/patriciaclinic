const storageKey = "patriciaclinic-state-v1";
const storageMetaKey = "patriciaclinic-state-meta-v1";
const authKey = "patriciaclinic-auth-v1";
const validUsers = [
  { username: "patriciaclinic", password: "p5559" }
];
const supabaseConfig = {
  url: "https://kdprrzocyjhrgtjajcom.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkcHJyem9jeWpocmd0amFqY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0OTc5NDYsImV4cCI6MjA5NjA3Mzk0Nn0.cPvTYtehUmlOnYcC2uHT3UUL8GZ99_vgYMR69yZO82Q",
  table: "app_state",
  recordId: "patriciaclinic-main"
};

const icons = {
  dashboard: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 13h8V3H3v10Zm10 8h8V3h-8v18ZM3 21h8v-6H3v6Z"/></svg>',
  queue: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v15H3V6a2 2 0 0 1 2-2Z"/></svg>',
  users: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  notes: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6ZM14 2v6h6M8 13h8M8 17h8M8 9h2"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7H5a2 2 0 0 1 0-4h14v4ZM4 7v14h18V7H4Zm14 7h.01"/></svg>',
  chart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3v18h18M8 17V9M13 17V5M18 17v-7"/></svg>',
  course: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19.5V5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-1.5ZM8 7h6M8 11h8M8 15h5"/></svg>',
  box: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 16-9 5-9-5V8l9-5 9 5v8ZM3.3 8 12 13l8.7-5M12 21V13"/></svg>',
  staff: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM18 8h4M20 6v4"/></svg>',
  eye: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
  back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  deduct: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M7 5h10a2 2 0 0 1 2 2v14H5V7a2 2 0 0 1 2-2ZM9 5V3h6v2"/></svg>',
  edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M19 6l-1 16H6L5 6"/></svg>'
};

const menu = [
  ["dashboard", "Dashboard", "ภาพรวมระบบคลินิก"],
  ["ownerSummary", "ภาพรวมวันนี้", "บริการ คอร์ส และยอดเงินประจำวัน"],
  ["dailyReport", "รายงานประจำวัน", "ปิดยอดและพิมพ์เก็บแฟ้ม"],
  ["patients", "ลูกค้า (CRM)", "ศูนย์กลางข้อมูล ประวัติรักษา และคอร์ส"],
  ["appointments", "นัดหมาย", "ตารางนัดและการติดตาม"],
  ["billing", "แคชเชียร์ / ซื้อคอร์ส", "ใบเสร็จและยอดค้างชำระ"],
  ["outstanding", "รายการค้างชำระ", "รวมใบเสร็จที่ยังชำระไม่ครบ"],
  ["courses", "จัดการตัดคอร์ส", "ติดตามคอร์สลูกค้าและจำนวนครั้งคงเหลือ"],
  ["services", "จัดการบริการ/คอร์ส", "รายการสินค้า บริการ และแพ็กเกจคอร์ส"],
  ["salesAnalysis", "วิเคราะห์การขาย", "บริการขายดีและยอดขายตามเดือน"],
  ["records", "เวชระเบียน", "ข้อมูลประวัติคนไข้และสุขภาพ"],
  ["financeSummary", "รายงาน & ใบเสร็จ", "ยอดรายวัน รายเดือน และรายปี"],
  ["queue", "คิวตรวจ", "จัดลำดับผู้รับบริการ"],
  ["inventory", "คลังยา", "ยา เวชภัณฑ์ และแจ้งเตือนสต็อก"],
  ["staff", "บุคลากร", "แพทย์ พยาบาล และสิทธิ์ใช้งาน"]
];

const menuIcons = {
  dashboard: icons.dashboard,
  ownerSummary: icons.chart,
  dailyReport: icons.notes,
  queue: icons.queue,
  appointments: icons.calendar,
  patients: icons.users,
  records: icons.notes,
  billing: icons.wallet,
  outstanding: icons.wallet,
  financeSummary: icons.chart,
  courses: icons.course,
  services: icons.notes,
  salesAnalysis: icons.chart,
  inventory: icons.box,
  staff: icons.staff
};

const today = new Date();
const todayIso = today.toISOString().slice(0, 10);

const seedState = {
  deletedServiceCatalogIds: ["SV-001", "SV-002", "SV-003"],
  patients: [
    { id: "P-1001", name: "ปาริณา ศรีสุข", phone: "081-234-7788", age: 34, allergy: "ไม่มี", lastVisit: todayIso, tag: "ติดตามผล" },
    { id: "P-1002", name: "กิตติพงศ์ วัฒนา", phone: "089-777-2401", age: 46, allergy: "Penicillin", lastVisit: "2026-06-01", tag: "เรื้อรัง" },
    { id: "P-1003", name: "ณัฐชา แก้วใส", phone: "086-402-9912", age: 27, allergy: "ไม่มี", lastVisit: "2026-05-30", tag: "ใหม่" }
  ],
  queue: [
    { id: "Q-001", patient: "ปาริณา ศรีสุข", service: "ตรวจผิวหนัง", time: "09:00", room: "ห้อง 2", status: "รอตรวจ" },
    { id: "Q-002", patient: "กิตติพงศ์ วัฒนา", service: "พบแพทย์ทั่วไป", time: "09:30", room: "ห้อง 1", status: "กำลังตรวจ" },
    { id: "Q-003", patient: "ณัฐชา แก้วใส", service: "ทำแผล", time: "10:00", room: "หัตถการ", status: "ชำระเงิน" }
  ],
  appointments: [
    { id: "A-2101", patient: "ปาริณา ศรีสุข", doctor: "พญ. แพทริเซีย", date: todayIso, time: "11:00", service: "ติดตามผลเลเซอร์", status: "ยืนยันแล้ว" },
    { id: "A-2102", patient: "ธนา เมธากุล", doctor: "นพ. อาทิตย์", date: "2026-06-03", time: "14:30", service: "ตรวจสุขภาพ", status: "รอยืนยัน" }
  ],
  records: [
    { id: "R-3301", firstName: "ปาริณา", lastName: "ศรีสุข", nickname: "ปลา", phone: "081-234-7788", birthDate: "1992-03-18", citizenId: "1101700123456", drugAllergy: "ไม่มี", foodAllergy: "ไม่มี", chronicDisease: "ไม่มี", patient: "ปาริณา ศรีสุข", date: todayIso, diagnosis: "Acne follow-up", treatment: "ปรับยาเฉพาะที่และนัด 2 สัปดาห์", doctor: "พญ. แพทริเซีย" },
    { id: "R-3302", firstName: "กิตติพงศ์", lastName: "วัฒนา", nickname: "กิต", phone: "089-777-2401", birthDate: "1980-11-02", citizenId: "3101200456789", drugAllergy: "Penicillin", foodAllergy: "อาหารทะเล", chronicDisease: "ความดันโลหิตสูง", patient: "กิตติพงศ์ วัฒนา", date: "2026-06-01", diagnosis: "Hypertension", treatment: "วัดความดัน ติดตามยาเดิม", doctor: "นพ. อาทิตย์" }
  ],
  billing: [
    { id: "B-7781", patient: "ณัฐชา แก้วใส", date: todayIso, item: "ทำแผลและยา", amount: 850, status: "ชำระแล้ว" },
    { id: "B-7782", patient: "ปาริณา ศรีสุข", date: todayIso, item: "ตรวจและเลเซอร์", amount: 2400, status: "รอชำระ" }
  ],
  courses: [
    { id: "C-9001", patient: "ปาริณา ศรีสุข", course: "Facial Treatment 10 ครั้ง", service: "ทรีตเมนต์หน้า", total: 10, used: 4, startDate: "2026-05-12", nextDate: "2026-06-08", status: "ใช้งานอยู่" },
    { id: "C-9002", patient: "ณัฐชา แก้วใส", course: "Laser Bright 6 ครั้ง", service: "เลเซอร์ผิว", total: 6, used: 6, startDate: "2026-04-01", nextDate: "", status: "ใช้ครบแล้ว" },
    { id: "C-9003", patient: "ธนา เมธากุล", course: "Acne Clear 5 ครั้ง", service: "รักษาสิว", total: 5, used: 1, startDate: todayIso, nextDate: "2026-06-16", status: "ใช้งานอยู่" }
  ],
  serviceCatalog: [
    { id: "SV-004", name: "Aestox กราม70u + ลิฟท์กรอบ", category: "Botox", price: 7900, sessions: 1, status: "เปิดขาย" },
    { id: "SV-005", name: "Bellanium 3 cc + Nabota 50u + Chanel", category: "Filler", price: 25900, sessions: 1, status: "เปิดขาย" },
    { id: "SV-006", name: "เมโสหน้าใส", category: "เมโส", price: 1500, sessions: 1, status: "เปิดขาย" },
    { id: "SV-007", name: "คอร์ส Treatment หน้าใส 10 ครั้ง", category: "คอร์ส", price: 9900, sessions: 10, status: "เปิดขาย" },
    { id: "SV-008", name: "คอร์ส Laser Bright 6 ครั้ง", category: "คอร์ส", price: 12900, sessions: 6, status: "เปิดขาย" }
  ],
  inventory: [
    { id: "I-501", name: "Paracetamol 500mg", category: "ยา", qty: 140, unit: "เม็ด", reorder: 50, expire: "2027-02-10" },
    { id: "I-502", name: "Syringe 5ml", category: "เวชภัณฑ์", qty: 38, unit: "ชิ้น", reorder: 40, expire: "2028-01-01" },
    { id: "I-503", name: "Clindamycin Gel", category: "ยาเฉพาะทาง", qty: 18, unit: "หลอด", reorder: 20, expire: "2026-12-20" }
  ],
  staff: [
    { id: "S-01", name: "พญ. แพทริเซีย", role: "แพทย์ผิวหนัง", shift: "จันทร์-ศุกร์ 09:00-17:00", access: "ผู้ดูแล" },
    { id: "S-02", name: "นพ. อาทิตย์", role: "แพทย์ทั่วไป", shift: "อังคาร/พฤหัส 10:00-18:00", access: "แพทย์" },
    { id: "S-03", name: "มัทนา", role: "การเงิน", shift: "ทุกวัน 08:30-16:30", access: "เจ้าหน้าที่" }
  ]
};

let state = loadState();
let currentView = "dashboard";
let searchTerm = "";
let activeFilter = "ทั้งหมด";
let selectedPatientId = null;
let patientDetailTab = "records";
let dashboardPeriod = "day";
let dashboardPaymentMethod = "ทั้งหมด";
let weeklySalesDays = 7;
let outstandingPeriod = "all";
let salesAnalysisYear = todayIso.slice(0, 4);
let salesAnalysisMonths = [];
let dailyReportDate = todayIso;

const navEl = document.querySelector("#nav");
const contentEl = document.querySelector("#content");
const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modalTitle");
const modalFields = document.querySelector("#modalFields");
const modalSave = document.querySelector("#modalSave");
const loginScreen = document.querySelector("#loginScreen");
const loginForm = document.querySelector("#loginForm");
const loginError = document.querySelector("#loginError");
const logoutButton = document.querySelector("#logoutButton");

function normalizeState(data = {}) {
  const next = { ...structuredClone(seedState), ...data };
  const deletedIds = new Set([
    ...seedState.deletedServiceCatalogIds,
    ...(Array.isArray(next.deletedServiceCatalogIds) ? next.deletedServiceCatalogIds : [])
  ]);
  next.deletedServiceCatalogIds = [...deletedIds];
  next.serviceCatalog = Array.isArray(next.serviceCatalog)
    ? next.serviceCatalog.filter((item) => !deletedIds.has(item.id))
    : [];
  return next;
}

function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return normalizeState();
  try {
    return normalizeState(JSON.parse(saved));
  } catch {
    return normalizeState();
  }
}

function readLocalStateMeta() {
  try {
    return JSON.parse(localStorage.getItem(storageMetaKey) || "{}");
  } catch {
    return {};
  }
}

function localStateUpdatedAt() {
  return readLocalStateMeta().updatedAt || "";
}

function setLocalStateUpdatedAt(updatedAt) {
  localStorage.setItem(storageMetaKey, JSON.stringify({ updatedAt }));
}

function timestampValue(value) {
  const time = Date.parse(value || "");
  return Number.isFinite(time) ? time : 0;
}

function saveState(options = {}) {
  const updatedAt = options.updatedAt || new Date().toISOString();
  localStorage.setItem(storageKey, JSON.stringify(state));
  setLocalStateUpdatedAt(updatedAt);
  if (options.immediate) return saveStateToSupabase(updatedAt);
  queueSupabaseSave(updatedAt);
  return Promise.resolve();
}

function hasSupabaseConfig() {
  return Boolean(supabaseConfig.url && supabaseConfig.anonKey);
}

function supabaseHeaders() {
  return {
    apikey: supabaseConfig.anonKey,
    Authorization: `Bearer ${supabaseConfig.anonKey}`,
    "Content-Type": "application/json"
  };
}

async function loadStateFromSupabase() {
  if (!hasSupabaseConfig()) return null;
  const endpoint = `${supabaseConfig.url}/rest/v1/${supabaseConfig.table}?id=eq.${encodeURIComponent(supabaseConfig.recordId)}&select=data,updated_at`;
  const response = await fetch(endpoint, { headers: supabaseHeaders() });
  if (!response.ok) throw new Error(`Supabase load failed: ${response.status}`);
  const rows = await response.json();
  if (!rows[0]?.data) return null;
  return { data: rows[0].data, updatedAt: rows[0].updated_at };
}

async function saveStateToSupabase(updatedAt = new Date().toISOString()) {
  if (!hasSupabaseConfig()) return;
  const endpoint = `${supabaseConfig.url}/rest/v1/${supabaseConfig.table}?on_conflict=id`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { ...supabaseHeaders(), Prefer: "resolution=merge-duplicates" },
    body: JSON.stringify({
      id: supabaseConfig.recordId,
      data: state,
      updated_at: updatedAt
    })
  });
  if (!response.ok) throw new Error(`Supabase save failed: ${response.status}`);
}

let supabaseSaveTimer = null;

function queueSupabaseSave(updatedAt = new Date().toISOString()) {
  if (!hasSupabaseConfig()) return;
  clearTimeout(supabaseSaveTimer);
  supabaseSaveTimer = setTimeout(() => {
    saveStateToSupabase(updatedAt).catch((error) => console.warn(error.message));
  }, 450);
}

async function hydrateStateFromSupabase() {
  if (!hasSupabaseConfig()) return;
  try {
    const remote = await loadStateFromSupabase();
    if (remote?.data) {
      const localUpdatedAt = localStateUpdatedAt();
      if (timestampValue(localUpdatedAt) > timestampValue(remote.updatedAt)) {
        await saveStateToSupabase(localUpdatedAt);
        return;
      }
      state = normalizeState(remote.data);
      localStorage.setItem(storageKey, JSON.stringify(state));
      if (remote.updatedAt) setLocalStateUpdatedAt(remote.updatedAt);
      render();
      return;
    }
    await saveStateToSupabase();
  } catch (error) {
    console.warn(error.message);
  }
}

function isLoggedIn() {
  return localStorage.getItem(authKey) === "active";
}

function setAuthView() {
  document.body.classList.toggle("locked", !isLoggedIn());
  loginScreen.hidden = isLoggedIn();
  if (!isLoggedIn()) {
    setTimeout(() => document.querySelector("#username")?.focus(), 0);
  }
}

function money(value) {
  return new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", maximumFractionDigits: 0 }).format(value);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

function badge(text) {
  const type = ["ชำระแล้ว", "ยืนยันแล้ว", "พร้อมใช้", "ใช้งานอยู่"].includes(text) ? "ok"
    : ["รอชำระ", "รอยืนยัน", "ใกล้หมด", "รอตรวจ", "พักคอร์ส"].includes(text) ? "warn"
    : ["หมด", "ยกเลิก"].includes(text) ? "danger" : "info";
  return `<span class="badge ${type}">${escapeHtml(text)}</span>`;
}

function initials(name) {
  return name.split(" ").map((part) => part[0]).slice(0, 2).join("");
}

function setHeader() {
  const item = menu.find(([key]) => key === currentView);
  document.querySelector("#sectionTitle").textContent = item[1];
  document.querySelector("#sectionEyebrow").textContent = item[2];
}

function renderNav() {
  navEl.innerHTML = menu.map(([key, label]) => {
    const icon = menuIcons[key];
    return `<button class="${key === currentView ? "active" : ""}" data-view="${key}">${icon}<span>${label}</span></button>`;
  }).join("");
}

function setView(view) {
  currentView = view;
  activeFilter = "ทั้งหมด";
  if (view !== "patients") selectedPatientId = null;
  render();
}

function matchesSearch(row) {
  if (!searchTerm) return true;
  return Object.values(row).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
}

function emptyState() {
  return document.querySelector("#emptyState").content.cloneNode(true).firstElementChild.outerHTML;
}

function table(columns, rows, view) {
  if (!rows.length) return emptyState();
  const head = columns.map((col) => `<th>${col.label}</th>`).join("") + "<th></th>";
  const body = rows.map((row) => {
    const cells = columns.map((col) => `<td>${col.render ? col.render(row) : escapeHtml(row[col.key])}</td>`).join("");
    const deductButton = view === "courses"
      ? `<button class="deduct-button" title="ตัดคอร์ส" aria-label="ตัดคอร์ส" data-action="deduct" data-view="${view}" data-id="${row.id}" ${courseRemaining(row) <= 0 ? "disabled" : ""}>${icons.deduct}<span>ตัด</span></button>`
      : "";
    return `<tr>${cells}<td><div class="table-actions">
      ${deductButton}
      <button class="action-button edit-action" title="แก้ไข" aria-label="แก้ไข" data-action="edit" data-view="${view}" data-id="${row.id}">${icons.edit}<span>แก้</span></button>
      <button class="action-button danger delete-action" title="ลบ" aria-label="ลบ" data-action="delete" data-view="${view}" data-id="${row.id}">${icons.trash}<span>ลบ</span></button>
    </div></td></tr>`;
  }).join("");
  return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function periodLabel(period) {
  return period === "day" ? "รายวัน" : period === "week" ? "รายสัปดาห์" : period === "month" ? "รายเดือน" : "รายปี";
}

function billsForPeriod(period) {
  return state.billing.filter((item) => {
    if (!item.date) return false;
    if (period === "day") return item.date === todayIso;
    if (period === "week") {
      const bill = new Date(`${item.date}T00:00:00`);
      const start = new Date(today);
      start.setDate(today.getDate() - 6);
      start.setHours(0, 0, 0, 0);
      return bill >= start && bill <= today;
    }
    if (period === "month") return item.date.slice(0, 7) === todayIso.slice(0, 7);
    return item.date.slice(0, 4) === todayIso.slice(0, 4);
  });
}

function billsForLastDays(days) {
  const range = Number(days || 7);
  return state.billing.filter((item) => {
    if (!item.date) return false;
    const bill = new Date(`${item.date}T00:00:00`);
    const start = new Date(today);
    start.setDate(today.getDate() - (range - 1));
    start.setHours(0, 0, 0, 0);
    return bill >= start && bill <= today;
  });
}

function paymentMethods() {
  return ["ทั้งหมด", ...new Set(state.billing.map((item) => item.paymentMethod || "ไม่ระบุ"))];
}

function filterBillsByPaymentMethod(bills) {
  if (dashboardPaymentMethod === "ทั้งหมด") return bills;
  return bills.filter((item) => (item.paymentMethod || "ไม่ระบุ") === dashboardPaymentMethod);
}

function chartLabelsForPeriod(period) {
  if (period === "day") return [{ key: todayIso, label: "วันนี้" }];
  if (period === "week") {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - index));
      const key = date.toISOString().slice(0, 10);
      return { key, label: date.toLocaleDateString("th-TH", { weekday: "short" }) };
    });
  }
  if (period === "month") {
    return Array.from({ length: 4 }, (_, index) => {
      const week = index + 1;
      return { key: String(week), label: `สัปดาห์ ${week}` };
    });
  }
  return Array.from({ length: 12 }, (_, index) => {
    const month = String(index + 1).padStart(2, "0");
    return { key: `${todayIso.slice(0, 4)}-${month}`, label: new Date(`${todayIso.slice(0, 4)}-${month}-01T00:00:00`).toLocaleDateString("th-TH", { month: "short" }) };
  });
}

function chartLabelsForLastDays(days) {
  const range = Number(days || 7);
  return Array.from({ length: range }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (range - 1 - index));
    const key = date.toISOString().slice(0, 10);
    const label = range > 15
      ? date.toLocaleDateString("th-TH", { day: "numeric", month: "short" })
      : date.toLocaleDateString("th-TH", { weekday: "short" });
    return { key, label };
  });
}

function billChartKey(dateString, period) {
  if (period === "day" || period === "week") return dateString;
  if (period === "month") {
    const day = Number(dateString.slice(8, 10));
    return String(Math.min(Math.ceil(day / 7), 4));
  }
  return dateString.slice(0, 7);
}

function moneyCompact(value) {
  const amount = Number(value || 0);
  if (amount >= 1000000) return `฿${Math.round(amount / 100000) / 10}M`;
  if (amount >= 1000) return `฿${Math.round(amount / 1000)}k`;
  return `฿${amount}`;
}

function renderSalesBarChart(bills, period, customLabels = null) {
  const monthlyTarget = 600000;
  const labels = customLabels || chartLabelsForPeriod(period);
  const totals = labels.map((label) => {
    const amount = bills
      .filter((item) => billChartKey(item.date, period) === label.key)
      .reduce((sum, item) => sum + Number(item.paidAmount || item.amount || 0), 0);
    return { ...label, amount };
  });
  const target = period === "month" ? monthlyTarget : 0;
  const max = Math.max(...totals.map((item) => item.amount), target, 1);
  const axisLabels = [1, 0.75, 0.5, 0.25, 0].map((ratio) => moneyCompact(max * ratio));
  const targetLine = target
    ? `<div class="chart-target-line" style="bottom:${Math.min((target / max) * 100, 100)}%"><span>เป้าหมายยอดขายรายเดือน ${moneyCompact(target)}</span></div>`
    : "";
  return `<div class="sales-chart">
    <div class="chart-axis">${axisLabels.map((label) => `<span>${label}</span>`).join("")}</div>
    <div class="chart-bars" style="--weekly-chart-width:${Math.max(labels.length * 62, 720)}px">
      ${targetLine}
      ${totals.map((item) => `<div class="chart-bar"><b>${moneyCompact(item.amount)}</b><i style="height:${Math.max((item.amount / max) * 100, item.amount ? 4 : 0)}%"></i><span>${escapeHtml(item.label)}</span></div>`).join("")}
    </div>
  </div>`;
}

function renderSalesDaysChart(bills, days) {
  return renderSalesBarChart(bills, "week", chartLabelsForLastDays(days));
}

function renderMonthlyTrendChart(months) {
  const max = Math.max(...months.map((item) => item.amount), 1);
  const width = 920;
  const height = 300;
  const padX = 44;
  const padTop = 38;
  const padBottom = 46;
  const plotHeight = height - padTop - padBottom;
  const step = (width - padX * 2) / Math.max(months.length - 1, 1);
  const points = months.map((item, index) => {
    const x = padX + step * index;
    const y = padTop + plotHeight - (item.amount / max) * plotHeight;
    return { ...item, x, y };
  });
  const path = points.map((point, index) => `${index ? "L" : "M"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const area = `${path} L ${points.at(-1).x.toFixed(1)} ${height - padBottom} L ${points[0].x.toFixed(1)} ${height - padBottom} Z`;
  const grid = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
    const y = padTop + plotHeight - ratio * plotHeight;
    return `<line x1="${padX}" y1="${y}" x2="${width - padX}" y2="${y}"></line>`;
  }).join("");
  return `<div class="trend-chart" role="img" aria-label="เส้นเทรนด์ยอดขายรายเดือน">
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
      <defs>
        <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.24"></stop>
          <stop offset="100%" stop-color="#2563eb" stop-opacity="0.02"></stop>
        </linearGradient>
      </defs>
      <g class="trend-grid">${grid}</g>
      <path class="trend-area" d="${area}"></path>
      <path class="trend-line" d="${path}"></path>
      ${points.map((point) => `
        <g class="trend-point">
          <text x="${point.x}" y="${Math.max(point.y - 17, 14)}">${moneyCompact(point.amount)}</text>
          <circle cx="${point.x}" cy="${point.y}" r="5"></circle>
          <text class="trend-label" x="${point.x}" y="${height - 16}">${escapeHtml(point.label)}</text>
        </g>
      `).join("")}
    </svg>
  </div>`;
}

function paymentBreakdown(bills) {
  const paid = bills.filter((item) => item.status === "ชำระแล้ว" || Number(item.paidAmount || 0) > 0);
  const totals = paid.reduce((acc, item) => {
    const method = item.paymentMethod || "ไม่ระบุ";
    acc[method] = (acc[method] || 0) + Number(item.paidAmount || item.amount || 0);
    return acc;
  }, {});
  const total = Object.values(totals).reduce((sum, value) => sum + value, 0);
  return { total, rows: Object.entries(totals).map(([method, amount]) => ({ method, amount, percent: total ? Math.round((amount / total) * 100) : 0 })) };
}

function renderPaymentDonut(bills) {
  const breakdown = paymentBreakdown(bills);
  const colors = ["#2563eb", "#38bdf8", "#0ea5e9", "#60a5fa", "#93c5fd"];
  let offset = 25;
  const segments = breakdown.rows.map((row, index) => {
    const dash = `${row.percent} ${100 - row.percent}`;
    const segment = `<circle r="15.915" cx="18" cy="18" fill="transparent" stroke="${colors[index % colors.length]}" stroke-width="6" stroke-dasharray="${dash}" stroke-dashoffset="${offset}"></circle>`;
    offset -= row.percent;
    return segment;
  }).join("");
  return `
    <div class="donut-wrap">
      <svg class="donut" viewBox="0 0 36 36" role="img" aria-label="ช่องทางการชำระเงิน">
        <circle r="15.915" cx="18" cy="18" fill="transparent" stroke="#eff6ff" stroke-width="6"></circle>
        ${segments}
      </svg>
      <div class="donut-center"><strong>${breakdown.total ? "100%" : "0%"}</strong><span>${money(breakdown.total)}</span></div>
    </div>
    <div class="payment-legend">
      ${breakdown.rows.length ? breakdown.rows.map((row, index) => `<div><i style="background:${colors[index % colors.length]}"></i><span>${escapeHtml(row.method)}</span><strong>${row.percent}%</strong><small>${money(row.amount)}</small></div>`).join("") : "<p class='muted'>ยังไม่มีข้อมูลการชำระเงินในช่วงนี้</p>"}
    </div>`;
}

function courseUsageRowsForDate(dateString) {
  return state.courses.flatMap((course) => {
    const usageLog = Array.isArray(course.usageLog) ? course.usageLog : [];
    const rows = usageLog
      .filter((log) => log.date === dateString)
      .map((log) => ({
        patient: course.patient,
        course: course.course,
        service: course.service,
        count: Number(log.count || 0)
      }));
    if (!rows.length && course.lastUsedDate === dateString && Number(course.lastUsedCount || 0) > 0) {
      rows.push({
        patient: course.patient,
        course: course.course,
        service: course.service,
        count: Number(course.lastUsedCount || 0)
      });
    }
    return rows;
  });
}

function renderTodayOwnerSummary() {
  const todayBills = state.billing.filter((item) => item.date === todayIso);
  const paidBills = todayBills.filter((item) => item.status === "ชำระแล้ว" || Number(item.paidAmount || 0) > 0);
  const todayIncome = paidBills.reduce((sum, item) => sum + Number(item.paidAmount || item.amount || 0), 0);
  const todayPending = todayBills.reduce((sum, item) => sum + Math.max(Number(item.amount || 0) - Number(item.paidAmount || 0), 0), 0);
  const todayRecords = state.records.filter((item) => item.date === todayIso);
  const serviceCount = new Set([
    ...todayRecords.map((item) => item.patient || recordFullName(item)),
    ...todayBills.map((item) => item.patient)
  ].filter(Boolean)).size;
  const courseUsage = courseUsageRowsForDate(todayIso);
  const courseUseCount = courseUsage.reduce((sum, item) => sum + item.count, 0);
  const soldCourses = todayBills.flatMap((bill) => String(bill.item || "").split(",").map((item) => item.trim()).filter(Boolean));
  const payment = paymentBreakdown(todayBills);
  const topPayment = payment.rows.sort((a, b) => b.amount - a.amount)[0];
  const latestBills = todayBills.slice(0, 4);
  const latestUsage = courseUsage.slice(0, 4);

  return `
    <section class="owner-summary">
      <div class="owner-summary-head">
        <div>
          <h2>ภาพรวมวันนี้</h2>
          <span class="muted">${new Date(`${todayIso}T00:00:00`).toLocaleDateString("th-TH", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
        </div>
        <button data-view="financeSummary" class="secondary">${icons.chart}ดูรายงานเต็ม</button>
      </div>
      <div class="owner-kpi-grid">
        <article class="owner-kpi service">
          <span>การให้บริการวันนี้</span>
          <strong>${serviceCount}</strong>
          <small>${todayRecords.length} เวชระเบียน · ${todayBills.length} ใบเสร็จ</small>
        </article>
        <article class="owner-kpi course">
          <span>ตัดคอร์สวันนี้</span>
          <strong>${courseUseCount}</strong>
          <small>${courseUsage.length} รายการใช้งานคอร์ส</small>
        </article>
        <article class="owner-kpi money">
          <span>ยอดเงินวันนี้</span>
          <strong>${money(todayIncome)}</strong>
          <small>${todayPending ? `ค้างชำระ ${money(todayPending)}` : "ชำระครบ"}</small>
        </article>
        <article class="owner-kpi pay">
          <span>ช่องทางหลัก</span>
          <strong>${topPayment ? escapeHtml(topPayment.method) : "-"}</strong>
          <small>${topPayment ? `${topPayment.percent}% · ${money(topPayment.amount)}` : "ยังไม่มีการชำระเงิน"}</small>
        </article>
      </div>
      <div class="owner-detail-grid">
        <article>
          <div class="mini-head"><h3>สรุปการให้บริการ</h3><span>${serviceCount} ลูกค้า</span></div>
          ${todayRecords.length ? todayRecords.slice(0, 4).map((record) => `<p><strong>${escapeHtml(record.patient || recordFullName(record))}</strong><span>${escapeHtml(record.doctor || "-")}</span></p>`).join("") : "<p class='muted'>ยังไม่มีเวชระเบียนวันนี้</p>"}
        </article>
        <article>
          <div class="mini-head"><h3>สรุปคอร์สวันนี้</h3><span>${courseUseCount} ครั้ง</span></div>
          ${latestUsage.length ? latestUsage.map((item) => `<p><strong>${escapeHtml(item.course)}</strong><span>${escapeHtml(item.patient)} · ตัด ${item.count} ครั้ง</span></p>`).join("") : "<p class='muted'>ยังไม่มีการตัดคอร์สวันนี้</p>"}
        </article>
        <article>
          <div class="mini-head"><h3>สรุปยอดขายคอร์ส</h3><span>${soldCourses.length} รายการ</span></div>
          ${soldCourses.length ? soldCourses.slice(0, 4).map((item) => `<p><strong>${escapeHtml(item)}</strong><span>ขายวันนี้</span></p>`).join("") : "<p class='muted'>ยังไม่มีการขายคอร์สวันนี้</p>"}
        </article>
        <article>
          <div class="mini-head"><h3>สรุปยอดเงิน</h3><span>${todayBills.length} ใบเสร็จ</span></div>
          ${latestBills.length ? latestBills.map((bill) => `<p><strong>${escapeHtml(bill.patient)}</strong><span>${money(Number(bill.paidAmount || bill.amount || 0))} · ${escapeHtml(bill.paymentMethod || "ไม่ระบุ")}</span></p>`).join("") : "<p class='muted'>ยังไม่มีรายการเงินวันนี้</p>"}
        </article>
      </div>
    </section>`;
}

function thaiDateLabel(dateString, options = {}) {
  if (!dateString) return "-";
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options
  });
}

function dailyBillRows(dateString) {
  return state.billing
    .filter((bill) => bill.date === dateString)
    .sort((a, b) => String(a.id || "").localeCompare(String(b.id || ""), "th"));
}

function dailyServiceRows(bills) {
  const rows = bills.flatMap((bill) => salesLineItemsForBill(bill).map((item) => ({
    ...item,
    patient: bill.patient || "-",
    billId: bill.id || "-"
  })));
  return rows.length ? rows : bills.map((bill) => ({
    name: bill.item || "ไม่ระบุรายการ",
    quantity: 1,
    amount: Number(bill.amount || 0),
    patient: bill.patient || "-",
    billId: bill.id || "-"
  })).filter((row) => !isNonServiceSalesItem(row.name));
}

function reportTable(headers, rows, emptyText) {
  if (!rows.length) return `<p class="daily-report-empty">${escapeHtml(emptyText)}</p>`;
  return `
    <table class="daily-report-table">
      <thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
      <tbody>${rows.join("")}</tbody>
    </table>
  `;
}

function printDailyReport() {
  document.body.classList.add("daily-report-printing");
  const cleanup = () => document.body.classList.remove("daily-report-printing");
  window.addEventListener("afterprint", cleanup, { once: true });
  window.print();
  setTimeout(cleanup, 1200);
}

function renderDailyReport() {
  const reportDate = dailyReportDate || todayIso;
  const bills = dailyBillRows(reportDate);
  const records = state.records.filter((record) => record.date === reportDate);
  const appointments = state.appointments.filter((appointment) => appointment.date === reportDate);
  const usages = courseUsageRowsForDate(reportDate);
  const paidTotal = bills.reduce((sum, bill) => sum + Number(bill.paidAmount || (bill.status === "ชำระแล้ว" ? bill.amount : 0) || 0), 0);
  const grossTotal = bills.reduce((sum, bill) => sum + Number(bill.subtotal || bill.amount || 0), 0);
  const discountTotal = bills.reduce((sum, bill) => sum + Number(bill.discount || 0), 0);
  const netTotal = bills.reduce((sum, bill) => sum + Number(bill.amount || 0), 0);
  const pendingTotal = bills.reduce((sum, bill) => sum + Math.max(Number(bill.amount || 0) - Number(bill.paidAmount || (bill.status === "ชำระแล้ว" ? bill.amount : 0) || 0), 0), 0);
  const serviceRows = dailyServiceRows(bills);
  const customerCount = new Set([
    ...bills.map((bill) => bill.patient),
    ...records.map((record) => record.patient || recordFullName(record))
  ].filter(Boolean)).size;
  const soldCount = serviceRows.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const usageCount = usages.reduce((sum, usage) => sum + Number(usage.count || 0), 0);
  const payment = paymentBreakdown(bills);
  const sellerRows = [...bills.reduce((map, bill) => {
    const seller = bill.seller || "ไม่ระบุ";
    const current = map.get(seller) || { seller, count: 0, amount: 0 };
    current.count += 1;
    current.amount += Number(bill.paidAmount || (bill.status === "ชำระแล้ว" ? bill.amount : 0) || 0);
    map.set(seller, current);
    return map;
  }, new Map()).values()].sort((a, b) => b.amount - a.amount);

  const billRows = bills.map((bill, index) => {
    const paid = Number(bill.paidAmount || (bill.status === "ชำระแล้ว" ? bill.amount : 0) || 0);
    const due = Math.max(Number(bill.amount || 0) - paid, 0);
    return `<tr>
      <td>${index + 1}</td>
      <td><strong>${escapeHtml(bill.id || "-")}</strong><span>${escapeHtml(bill.patient || "-")}</span></td>
      <td>${escapeHtml(bill.item || "-")}</td>
      <td>${money(bill.amount || 0)}</td>
      <td>${money(paid)}</td>
      <td>${due ? `<b class="report-danger">${money(due)}</b>` : "-"}</td>
      <td>${escapeHtml(bill.paymentMethod || "ไม่ระบุ")}</td>
      <td>${escapeHtml(bill.status || "-")}</td>
    </tr>`;
  });
  const usageRows = usages.map((usage, index) => `<tr>
    <td>${index + 1}</td>
    <td><strong>${escapeHtml(usage.patient)}</strong></td>
    <td>${escapeHtml(usage.course)}</td>
    <td>${escapeHtml(usage.service || "-")}</td>
    <td>${Number(usage.count || 0).toLocaleString("th-TH")} ครั้ง</td>
  </tr>`);
  const serviceSummaryRows = serviceRows.slice(0, 10).map((item, index) => `<tr>
    <td>${index + 1}</td>
    <td><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.patient || "-")}</span></td>
    <td>${Number(item.quantity || 0).toLocaleString("th-TH")}</td>
    <td>${money(item.amount || 0)}</td>
  </tr>`);

  return `
    <section class="daily-report-page">
      <div class="daily-report-toolbar">
        <label>วันที่รายงาน
          <input type="date" data-action="dailyReportDate" value="${escapeHtml(reportDate)}">
        </label>
        <button type="button" data-action="printDailyReport">${icons.wallet}พิมพ์รายงาน</button>
      </div>
      <article class="daily-report-sheet" id="dailyReportSheet">
        <header class="daily-report-head">
          <div class="daily-report-brand">
            <img src="assets/logo.jpg" alt="แพทริเซียคลินิก">
            <div>
              <h2>รายงานประจำวัน</h2>
              <strong>แพทริเซียคลินิกเวชกรรมเพชรบุรี-บ้านแหลม</strong>
              <span>วันที่ ${thaiDateLabel(reportDate, { weekday: "long" })}</span>
            </div>
          </div>
          <div class="daily-report-stamp">
            <strong>DAILY REPORT</strong>
            <span>${escapeHtml(reportDate)}</span>
          </div>
        </header>

        <section class="daily-report-kpis">
          <article><span>ยอดรับเงินจริง</span><strong>${money(paidTotal)}</strong><small>${bills.length} ใบเสร็จ</small></article>
          <article class="${pendingTotal ? "danger" : ""}"><span>ยอดค้างชำระ</span><strong>${money(pendingTotal)}</strong><small>${pendingTotal ? "ต้องติดตาม" : "ชำระครบ"}</small></article>
          <article><span>ลูกค้าที่รับบริการ</span><strong>${customerCount}</strong><small>${records.length} เวชระเบียน</small></article>
          <article><span>ตัดคอร์ส</span><strong>${usageCount}</strong><small>${usages.length} รายการ</small></article>
        </section>

        <section class="daily-report-grid">
          <div class="daily-report-box">
            <h3>สรุปยอดเงิน</h3>
            <div class="daily-report-lines">
              <p><span>ยอดรวมก่อนส่วนลด</span><strong>${money(grossTotal)}</strong></p>
              <p><span>ส่วนลดรวม</span><strong>${money(discountTotal)}</strong></p>
              <p><span>ยอดสุทธิ</span><strong>${money(netTotal)}</strong></p>
              <p><span>ยอดรับเงินจริง</span><strong>${money(paidTotal)}</strong></p>
              <p class="net"><span>ยอดค้างชำระ</span><strong>${money(pendingTotal)}</strong></p>
            </div>
          </div>
          <div class="daily-report-box">
            <h3>ช่องทางการชำระเงิน</h3>
            <div class="daily-payment-list">
              ${payment.rows.length ? payment.rows.map((row) => `<p><span>${escapeHtml(row.method)}</span><strong>${money(row.amount)}</strong><small>${row.percent}%</small></p>`).join("") : "<p class='daily-report-empty'>ยังไม่มีการรับเงินวันนี้</p>"}
            </div>
          </div>
          <div class="daily-report-box">
            <h3>ผู้ขาย / ผู้รับเงิน</h3>
            <div class="daily-payment-list">
              ${sellerRows.length ? sellerRows.map((row) => `<p><span>${escapeHtml(row.seller)}</span><strong>${money(row.amount)}</strong><small>${row.count} ใบ</small></p>`).join("") : "<p class='daily-report-empty'>ยังไม่มีข้อมูลผู้ขาย</p>"}
            </div>
          </div>
          <div class="daily-report-box">
            <h3>ภาพรวมงานบริการ</h3>
            <div class="daily-report-lines">
              <p><span>นัดหมายของวัน</span><strong>${appointments.length}</strong></p>
              <p><span>รายการขายบริการ/คอร์ส</span><strong>${soldCount}</strong></p>
              <p><span>รายการตัดคอร์ส</span><strong>${usages.length}</strong></p>
            </div>
          </div>
        </section>

        <section class="daily-report-section">
          <h3>รายการใบเสร็จประจำวัน</h3>
          ${reportTable(["#", "ใบเสร็จ / ลูกค้า", "รายการ", "ยอดสุทธิ", "รับเงิน", "ค้าง", "ช่องทาง", "สถานะ"], billRows, "ยังไม่มีใบเสร็จในวันที่เลือก")}
        </section>
        <section class="daily-report-section two">
          <div>
            <h3>บริการ/คอร์สที่ขายวันนี้</h3>
            ${reportTable(["#", "รายการ / ลูกค้า", "จำนวน", "ยอดเงิน"], serviceSummaryRows, "ยังไม่มีรายการขายบริการ/คอร์ส")}
          </div>
          <div>
            <h3>รายการตัดคอร์สวันนี้</h3>
            ${reportTable(["#", "ลูกค้า", "คอร์ส", "บริการ", "จำนวน"], usageRows, "ยังไม่มีการตัดคอร์ส")}
          </div>
        </section>
        <footer class="daily-report-signatures">
          <div><span></span><strong>ผู้สรุปรายงาน</strong></div>
          <div><span></span><strong>ผู้ตรวจสอบ</strong></div>
          <div><span></span><strong>เจ้าของคลินิก</strong></div>
        </footer>
      </article>
    </section>
  `;
}

function renderClinicShowcase() {
  const photos = [
    { src: "assets/clinic-front.jpg", title: "หน้าคลินิก", note: "แพทริเซียคลินิกเวชกรรมเพชรบุรี-บ้านแหลม" },
    { src: "assets/reception-close.jpg", title: "เคาน์เตอร์ต้อนรับ", note: "พื้นที่บริการลูกค้าและลงทะเบียน" },
    { src: "assets/lobby-wide.jpg", title: "โถงรับรอง", note: "สะอาด โปร่ง โล่ง และเป็นส่วนตัว" },
    { src: "assets/lobby-deep.jpg", title: "มุมพักคอย", note: "บรรยากาศอบอุ่นก่อนเข้ารับบริการ" }
  ];
  return `
    <section class="clinic-showcase">
      <div class="showcase-copy">
        <div class="premium-logo-frame">
          <img src="assets/logo.jpg" alt="แพทริเซียคลินิก">
        </div>
        <span>แพทริเซียคลินิก</span>
        <h2>แพทริเซียคลินิกเวชกรรมเพชรบุรี-บ้านแหลม</h2>
        <p>พื้นที่ต้อนรับและให้บริการที่สะอาด สบายตา พร้อมระบบจัดการข้อมูลสำหรับการดูแลลูกค้าอย่างเป็นระเบียบ</p>
      </div>
      <div class="showcase-grid">
        ${photos.map((photo, index) => `
          <figure class="showcase-card ${index === 0 ? "wide" : ""}">
            <img src="${photo.src}" alt="${photo.title}">
            <figcaption>
              <strong>${photo.title}</strong>
              <span>${photo.note}</span>
            </figcaption>
          </figure>
        `).join("")}
      </div>
    </section>`;
}

function renderDashboard() {
  const waiting = state.queue.filter((item) => item.status !== "ชำระเงิน").length;
  const todayApps = state.appointments.filter((item) => item.date === todayIso).length;
  const periodBills = filterBillsByPaymentMethod(billsForPeriod(dashboardPeriod));
  const weeklyBills = filterBillsByPaymentMethod(billsForLastDays(weeklySalesDays));
  const paidPeriodBills = periodBills.filter((item) => item.status === "ชำระแล้ว" || Number(item.paidAmount || 0) > 0);
  const income = paidPeriodBills.reduce((sum, item) => sum + Number(item.paidAmount || item.amount || 0), 0);
  const pending = periodBills.reduce((sum, item) => sum + Math.max(Number(item.amount || 0) - Number(item.paidAmount || 0), 0), 0);
  const pendingCount = periodBills.filter((item) => Math.max(Number(item.amount || 0) - Number(item.paidAmount || 0), 0) > 0).length;
  const lowStock = state.inventory.filter((item) => Number(item.qty) <= Number(item.reorder)).length;
  return `
    <section class="dashboard-live-hero">
      <div>
        <span class="dashboard-welcome">สวัสดีตอนนี้</span>
        <h2>Dashboard <b>LIVE</b></h2>
        <p>ภาพรวมคลินิกและระบบขายในหน้าจอเดียว</p>
      </div>
      <div class="dashboard-live-actions">
        <span>${thaiDateLabel(todayIso, { weekday: "short" })}</span>
        <button data-view="queue">${icons.queue}จัดการคิว</button>
      </div>
    </section>
    <section class="grid stats">
      ${stat("ลูกค้าทั้งหมด", state.patients.length, "+3 รายในสัปดาห์นี้")}
      ${stat("คิวที่ต้องดูแล", waiting, "อัปเดตแบบเรียลไทม์")}
      ${stat("นัดหมายวันนี้", todayApps, "พร้อมเข้าห้องตรวจ")}
      ${stat(`รายรับ${periodLabel(dashboardPeriod)}`, money(income), pending ? `ค้างชำระ ${money(pending)}` : "ชำระครบ")}
      ${stat("ยอดค้างชำระ", money(pending), pendingCount ? `${pendingCount} ใบเสร็จต้องติดตาม` : "ไม่มีค้างชำระ", "danger")}
    </section>
    <section class="dashboard-controls panel">
      <div>
        <h2>สรุปการเงิน ${periodLabel(dashboardPeriod)}</h2>
        <span class="muted">อ้างอิงจากใบเสร็จและข้อมูลการชำระเงิน</span>
      </div>
      <div class="dashboard-selects">
        <label>ช่วงรายงาน
          <select data-action="dashboardPeriodSelect">
            <option value="day" ${dashboardPeriod === "day" ? "selected" : ""}>รายวัน</option>
            <option value="week" ${dashboardPeriod === "week" ? "selected" : ""}>รายสัปดาห์</option>
            <option value="month" ${dashboardPeriod === "month" ? "selected" : ""}>รายเดือน</option>
            <option value="year" ${dashboardPeriod === "year" ? "selected" : ""}>รายปี</option>
          </select>
        </label>
        <label>ช่องทางชำระเงิน
          <select data-action="dashboardPaymentSelect">
            ${paymentMethods().map((method) => `<option value="${escapeHtml(method)}" ${dashboardPaymentMethod === method ? "selected" : ""}>${escapeHtml(method)}</option>`).join("")}
          </select>
        </label>
      </div>
    </section>
    <section class="panel sales-panel weekly-sales-panel" style="margin-top:16px">
      <div class="panel-head">
        <div>
          <h2>ยอดขายรายสัปดาห์</h2>
          <span class="muted">Cash Flow - ${weeklySalesDays} วันล่าสุด</span>
        </div>
        <label class="chart-range-select">ช่วง
          <select data-action="weeklySalesDaysSelect">
            ${[7, 15, 30].map((days) => `<option value="${days}" ${weeklySalesDays === days ? "selected" : ""}>${days} วัน</option>`).join("")}
          </select>
        </label>
      </div>
      ${renderSalesDaysChart(weeklyBills, weeklySalesDays)}
    </section>
    <section class="grid two-col" style="margin-top:16px">
      <div class="panel sales-panel">
        <div class="panel-head"><div><h2>ยอดขาย${periodLabel(dashboardPeriod)}</h2><span class="muted">Cash Flow · ${periodLabel(dashboardPeriod)}</span></div><span class="period-pill">${periodLabel(dashboardPeriod)}</span></div>
        ${renderSalesBarChart(periodBills, dashboardPeriod)}
      </div>
      <div class="panel">
        <div class="panel-head"><div><h2>ช่องทางชำระเงิน</h2><span class="muted">สัดส่วนตามจำนวนรายการ</span></div><span class="muted">${periodBills.length} ใบเสร็จ</span></div>
        <div class="payment-donut-panel">${renderPaymentDonut(periodBills)}</div>
      </div>
    </section>
    <section class="grid two-col" style="margin-top:16px">
      <div class="panel">
        <div class="panel-head"><h2>สถานะช่วงนี้</h2><button data-view="outstanding" class="secondary">ดูรายการค้างชำระ</button></div>
        <div class="summary-stack">
          <article><span>ยอดรับชำระ</span><strong>${money(income)}</strong></article>
          <article class="${pending ? "summary-danger" : ""}"><span>ยอดค้างชำระ</span><strong>${money(pending)}</strong></article>
          <article><span>สต็อกใกล้หมด</span><strong>${lowStock}</strong></article>
        </div>
      </div>
    </section>
    <section class="grid two-col" style="margin-top:16px">
      <div class="panel">
        <div class="panel-head"><h2>คิวล่าสุด</h2><button data-view="queue" class="secondary">ดูทั้งหมด</button></div>
        <div class="queue-list">${state.queue.slice(0, 4).map(queueCard).join("")}</div>
      </div>
      <div class="panel">
        <div class="panel-head"><h2>แจ้งเตือนคลังยา</h2><button data-view="inventory" class="secondary">ตรวจสต็อก</button></div>
        <div class="inventory-list">${state.inventory.filter((item) => item.qty <= item.reorder).map(inventoryCard).join("") || "<p class='muted'>ยังไม่มีรายการต่ำกว่า reorder point</p>"}</div>
      </div>
    </section>`;
}

function paidBills() {
  return state.billing.filter((item) => item.status === "ชำระแล้ว");
}

function unpaidBills() {
  return state.billing.filter((item) => item.status !== "ชำระแล้ว");
}

function sumBills(rows) {
  return rows.reduce((sum, item) => sum + Number(item.amount || 0), 0);
}

function billDate(item) {
  return new Date(`${item.date}T00:00:00`);
}

function renderFinanceSummary() {
  const paid = paidBills();
  const unpaid = unpaidBills();
  const thisMonth = todayIso.slice(0, 7);
  const thisYear = todayIso.slice(0, 4);
  const daily = paid.filter((item) => item.date === todayIso);
  const monthly = paid.filter((item) => item.date?.slice(0, 7) === thisMonth);
  const yearly = paid.filter((item) => item.date?.slice(0, 4) === thisYear);
  const monthNames = Array.from({ length: 12 }, (_, index) => {
    const month = String(index + 1).padStart(2, "0");
    const key = `${thisYear}-${month}`;
    const amount = sumBills(paid.filter((item) => item.date?.slice(0, 7) === key));
    return { key, label: new Date(`${key}-01T00:00:00`).toLocaleDateString("th-TH", { month: "short" }), amount };
  });
  const latest = [...state.billing].sort((a, b) => billDate(b) - billDate(a)).slice(0, 8);

  return `
    <section class="grid stats">
      ${stat("ยอดวันนี้", money(sumBills(daily)), `${daily.length} ใบเสร็จที่ชำระแล้ว`)}
      ${stat("ยอดเดือนนี้", money(sumBills(monthly)), `${monthly.length} รายการในเดือนนี้`)}
      ${stat("ยอดปีนี้", money(sumBills(yearly)), `${yearly.length} รายการในปีนี้`)}
      ${stat("ยอดรอชำระ", money(sumBills(unpaid)), `${unpaid.length} รายการต้องติดตาม`)}
    </section>
    <section class="grid two-col" style="margin-top:16px">
      <div class="panel">
        <div class="panel-head">
          <h2>สรุปยอดรายเดือน ${Number(thisYear) + 543}</h2>
          <button data-view="billing" class="secondary">${icons.wallet}ดูใบเสร็จ</button>
        </div>
        ${renderMonthlyTrendChart(monthNames)}
      </div>
      <div class="panel">
        <div class="panel-head"><h2>ภาพรวมการเก็บเงิน</h2></div>
        <div class="summary-stack">
          <article><span>รับชำระแล้วทั้งหมด</span><strong>${money(sumBills(paid))}</strong></article>
          <article><span>จำนวนใบเสร็จทั้งหมด</span><strong>${state.billing.length}</strong></article>
          <article><span>อัตราชำระสำเร็จ</span><strong>${state.billing.length ? Math.round((paid.length / state.billing.length) * 100) : 0}%</strong></article>
        </div>
      </div>
    </section>
    <section class="panel" style="margin-top:16px">
      <div class="panel-head"><h2>รายการการเงินล่าสุด</h2></div>
      ${table(viewConfig.billing.columns, latest, "billing")}
    </section>`;
}

function salesAnalysisYears() {
  const years = [...new Set(state.billing.map((bill) => String(bill.date || "").slice(0, 4)).filter(Boolean))].sort();
  return years.length ? years : [todayIso.slice(0, 4)];
}

function salesAnalysisMonthKeys() {
  const keys = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, "0"));
  return salesAnalysisMonths.length ? salesAnalysisMonths : keys;
}

function monthLabel(month) {
  return new Date(`${salesAnalysisYear}-${month}-01T00:00:00`).toLocaleDateString("th-TH", { month: "short" });
}

function isNonServiceSalesItem(name) {
  const text = String(name || "").trim().toLowerCase();
  if (!text) return true;
  return /bill\s*discount|discount|ส่วนลด|ส่วนลดท้ายบิล|หักส่วนลด|รับชำระ|ยอดค้าง|ค้างชำระ|adjustment|ปรับยอด|rounding|ปัดเศษ|ค่ามัดจำ|deposit/.test(text);
}

function billIsSalesSource(bill) {
  const itemText = String(bill.item || "");
  if (bill.importedFrom === "course-balance-excel") return false;
  return !isNonServiceSalesItem(itemText);
}

function salesLineItemsForBill(bill) {
  if (!billIsSalesSource(bill)) return [];
  const billAmount = Number(bill.amount || bill.paidAmount || 0);
  const items = Array.isArray(bill.items) ? bill.items : [];
  if (items.length) {
    return items
      .map((item) => {
        const name = String(item.name || item.service || item.title || "").trim();
        const quantity = Math.max(Number(item.quantity || item.qty || 1), 1);
        const price = Number(item.price || item.amount || item.total || 0);
        return { name, quantity, amount: price ? price * quantity : billAmount };
      })
      .filter((item) => !isNonServiceSalesItem(item.name));
  }
  const name = String(bill.item || "ไม่ระบุบริการ").replace(/\s+x\d+$/i, "").trim();
  return isNonServiceSalesItem(name) ? [] : [{ name, quantity: 1, amount: billAmount }];
}

function salesAnalysisBills() {
  const months = new Set(salesAnalysisMonthKeys());
  return state.billing.filter((bill) => {
    const date = String(bill.date || "");
    return billIsSalesSource(bill) && date.slice(0, 4) === salesAnalysisYear && months.has(date.slice(5, 7));
  });
}

function salesServiceRows(bills) {
  const grouped = new Map();
  for (const bill of bills) {
    for (const item of salesLineItemsForBill(bill)) {
      const current = grouped.get(item.name) || { service: item.name, count: 0, revenue: 0 };
      current.count += item.quantity;
      current.revenue += item.amount;
      grouped.set(item.name, current);
    }
  }
  return [...grouped.values()].sort((a, b) => b.count - a.count || b.revenue - a.revenue || a.service.localeCompare(b.service, "th"));
}

function salesCustomerRows(bills) {
  const grouped = new Map();
  for (const bill of bills) {
    const patient = String(bill.patient || "ไม่ระบุลูกค้า").trim();
    const lineItems = salesLineItemsForBill(bill);
    const count = lineItems.reduce((sum, item) => sum + item.quantity, 0) || 1;
    const current = grouped.get(patient) || { patient, visits: 0, revenue: 0 };
    current.visits += count;
    current.revenue += Number(bill.paidAmount || bill.amount || 0);
    grouped.set(patient, current);
  }
  return [...grouped.values()].filter((row) => row.visits > 1).sort((a, b) => b.visits - a.visits || b.revenue - a.revenue).slice(0, 12);
}

function monthlyServiceSummary(bills) {
  return salesAnalysisMonthKeys().map((month) => {
    const rows = salesServiceRows(bills.filter((bill) => String(bill.date || "").slice(5, 7) === month));
    const totalCount = rows.reduce((sum, row) => sum + row.count, 0);
    const totalRevenue = rows.reduce((sum, row) => sum + row.revenue, 0);
    return { month, rows, top: rows[0], totalCount, totalRevenue };
  });
}

function renderAnalysisBarChart(rows, valueKey, labelKey, emptyText, totalValue = 0) {
  if (!rows.length) return `<p class="muted">${emptyText}</p>`;
  const max = Math.max(...rows.map((row) => Number(row[valueKey] || 0)), 1);
  const total = Number(totalValue || rows.reduce((sum, row) => sum + Number(row[valueKey] || 0), 0) || 0);
  return `<div class="analysis-bars">
    ${rows.map((row, index) => {
      const value = Number(row[valueKey] || 0);
      const percent = total ? Math.round((value / total) * 100) : 0;
      return `<article>
        <div class="analysis-rank">${index + 1}</div>
        <div class="analysis-bar-copy">
          <strong>${escapeHtml(row[labelKey])}</strong>
          <span>${value.toLocaleString("th-TH")} ครั้ง · ${percent}% · ${money(row.revenue || 0)}</span>
        </div>
        <div class="analysis-bar-track"><i style="width:${Math.max((value / max) * 100, value ? 5 : 0)}%"></i></div>
        <b>${percent}%</b>
      </article>`;
    }).join("")}
  </div>`;
}

function renderSalesAnalysis() {
  const years = salesAnalysisYears();
  if (!years.includes(salesAnalysisYear)) salesAnalysisYear = years.at(-1);
  const monthKeys = salesAnalysisMonthKeys();
  const bills = salesAnalysisBills();
  const serviceRows = salesServiceRows(bills);
  const repeatCustomers = salesCustomerRows(bills);
  const monthlyRows = monthlyServiceSummary(bills);
  const totalSold = serviceRows.reduce((sum, row) => sum + row.count, 0);
  const totalRevenue = serviceRows.reduce((sum, row) => sum + row.revenue, 0);
  const monthButtons = Array.from({ length: 12 }, (_, index) => {
    const month = String(index + 1).padStart(2, "0");
    const active = !salesAnalysisMonths.length || salesAnalysisMonths.includes(month);
    return `<button class="${active ? "active" : ""}" data-action="salesMonthToggle" data-month="${month}">${monthLabel(month)}</button>`;
  }).join("");

  return `
    <section class="analysis-hero">
      <div>
        <span>SALES ANALYTICS</span>
        <h2>วิเคราะห์การขาย</h2>
        <p>ดูบริการขายดี ช่วงเดือนที่ขายได้มาก และลูกค้าที่กลับมารับบริการซ้ำ</p>
      </div>
      <div class="analysis-filters">
        <label>ปี
          <select data-action="salesYearSelect">
            ${years.map((year) => `<option value="${year}" ${salesAnalysisYear === year ? "selected" : ""}>${Number(year) + 543}</option>`).join("")}
          </select>
        </label>
        <button type="button" class="secondary" data-action="salesAllMonths">ทั้งปี</button>
      </div>
    </section>
    <section class="analysis-month-picker">
      ${monthButtons}
    </section>
    <section class="grid stats">
      ${stat("จำนวนบริการที่ขาย", totalSold.toLocaleString("th-TH"), `${bills.length} ใบเสร็จในช่วงที่เลือก`)}
      ${stat("ยอดขายรวม", money(totalRevenue), `${monthKeys.length} เดือนที่เลือก`)}
      ${stat("บริการขายดีที่สุด", serviceRows[0]?.service ? escapeHtml(serviceRows[0].service) : "-", serviceRows[0] ? `${serviceRows[0].count} ครั้ง` : "ยังไม่มีข้อมูล")}
      ${stat("ลูกค้ากลับมาซ้ำ", repeatCustomers.length, "นับลูกค้าที่มีมากกว่า 1 ครั้ง")}
    </section>
    <section class="grid two-col analysis-grid" style="margin-top:16px">
      <div class="panel analysis-panel">
        <div class="panel-head"><div><h2>บริการขายดีที่สุด</h2><span class="muted">เรียงตามจำนวนครั้งที่ขายได้</span></div></div>
        ${renderAnalysisBarChart(serviceRows.slice(0, 12), "count", "service", "ยังไม่มีข้อมูลบริการในช่วงที่เลือก", totalSold)}
      </div>
      <div class="panel analysis-panel">
        <div class="panel-head"><div><h2>ลูกค้ากลับมารับบริการซ้ำ</h2><span class="muted">เรียงตามจำนวนครั้งในช่วงที่เลือก</span></div></div>
        ${renderAnalysisBarChart(repeatCustomers, "visits", "patient", "ยังไม่มีลูกค้าที่กลับมาซ้ำในช่วงที่เลือก")}
      </div>
    </section>
    <section class="panel analysis-panel" style="margin-top:16px">
      <div class="panel-head"><div><h2>บริการขายดีรายเดือน</h2><span class="muted">ดูว่าเดือนไหนขายบริการไหนได้กี่ครั้ง</span></div></div>
      <div class="monthly-service-grid">
        ${monthlyRows.map((month) => `<article>
          <div>
            <strong>${monthLabel(month.month)}</strong>
            <span>${month.totalCount.toLocaleString("th-TH")} ครั้ง · ${money(month.totalRevenue)}</span>
          </div>
          ${month.top ? `<b>${escapeHtml(month.top.service)}</b><small>${month.top.count.toLocaleString("th-TH")} ครั้ง · ${month.totalCount ? Math.round((month.top.count / month.totalCount) * 100) : 0}%</small>` : `<b>-</b><small>ไม่มีรายการ</small>`}
        </article>`).join("")}
      </div>
    </section>`;
}

function statIcon(label, tone = "") {
  if (tone === "danger" || label.includes("ค้าง") || label.includes("รอชำระ")) return icons.wallet;
  if (label.includes("ลูกค้า")) return icons.users;
  if (label.includes("คิว")) return icons.queue;
  if (label.includes("นัด")) return icons.calendar;
  if (label.includes("รายรับ") || label.includes("ยอด") || label.includes("ขาย")) return icons.wallet;
  if (label.includes("บริการ")) return icons.notes;
  if (label.includes("คอร์ส") || label.includes("ครั้ง")) return icons.course;
  return icons.chart;
}

function stat(label, value, note, tone = "") {
  return `<article class="card stat${tone ? ` stat-${tone}` : ""}"><i class="stat-icon" aria-hidden="true">${statIcon(label, tone)}</i><span>${label}</span><strong>${value}</strong><b>${note}</b></article>`;
}

function queueCard(item, index = 0) {
  return `<article class="queue-item">
    <div class="queue-no">${String(index + 1).padStart(2, "0")}</div>
    <div><strong>${escapeHtml(item.patient)}</strong><div class="muted">${escapeHtml(item.service)} · ${escapeHtml(item.time)} · ${escapeHtml(item.room)}</div></div>
    ${badge(item.status)}
  </article>`;
}

function inventoryCard(item) {
  const status = item.qty <= 0 ? "หมด" : item.qty <= item.reorder ? "ใกล้หมด" : "พร้อมใช้";
  return `<article class="inventory-item">
    <strong>${escapeHtml(item.name)}</strong>
    <span class="muted">${escapeHtml(item.category)} · เหลือ ${item.qty} ${escapeHtml(item.unit)} · สั่งเพิ่มเมื่อ <= ${item.reorder}</span>
    <span>${badge(status)}</span>
  </article>`;
}

function courseRemaining(row) {
  return Math.max(Number(row.total || 0) - Number(row.used || 0), 0);
}

function courseStatus(row) {
  const remaining = courseRemaining(row);
  if (remaining <= 0) return "ใช้ครบแล้ว";
  if (remaining <= 2) return "ใกล้หมด";
  return row.status || "ใช้งานอยู่";
}

function courseProgress(row) {
  const total = Math.max(Number(row.total || 0), 1);
  const used = Math.min(Number(row.used || 0), total);
  const percent = Math.round((used / total) * 100);
  return `<div class="course-progress">
    <div class="bar-track"><i style="width:${percent}%"></i></div>
    <span>ใช้แล้ว ${used}/${total} ครั้ง · เหลือ ${courseRemaining(row)} ครั้ง</span>
  </div>`;
}

function recordFullName(row) {
  const fullName = `${row.firstName || ""} ${row.lastName || ""}`.trim();
  return fullName || row.patient || "-";
}

function recordHealthSummary(row) {
  return `
    <div class="record-summary">
      <span>แพ้ยา: ${escapeHtml(row.drugAllergy || "-")}</span>
      <span>แพ้อาหาร: ${escapeHtml(row.foodAllergy || "-")}</span>
      <span>โรคประจำตัว: ${escapeHtml(row.chronicDisease || "-")}</span>
    </div>`;
}

function renderListView(view) {
  const setup = viewConfig[view];
  let rows = state[view].filter(matchesSearch);
  if (activeFilter !== "ทั้งหมด") {
    rows = rows.filter((row) => view === "courses" ? courseStatus(row) === activeFilter : Object.values(row).includes(activeFilter));
  }
  return `
    <section class="panel">
      <div class="toolbar">
        <div class="filters">${["ทั้งหมด", ...setup.filters].map((filter) => `<button class="${filter === activeFilter ? "active" : ""}" data-filter="${filter}">${filter}</button>`).join("")}</div>
        <button data-action="add" data-view="${view}">${icons.plus}${setup.addLabel}</button>
      </div>
      ${table(setup.columns, rows, view)}
    </section>`;
}

function patientCourses(patientName) {
  return state.courses.filter((item) => item.patient === patientName);
}

function patientRecords(patientName) {
  return state.records.filter((item) => recordFullName(item) === patientName || item.patient === patientName);
}

function patientAppointments(patientName) {
  return state.appointments.filter((item) => item.patient === patientName);
}

function totalCourseRemaining(patientName) {
  return patientCourses(patientName).reduce((sum, item) => sum + courseRemaining(item), 0);
}

function billOutstandingAmount(bill) {
  const amount = Number(bill.amount || 0);
  const paid = bill.status === "ชำระแล้ว" && bill.paidAmount == null ? amount : Number(bill.paidAmount || 0);
  return Math.max(amount - paid, 0);
}

function pendingBillsForPatient(patientName) {
  return state.billing.filter((bill) => bill.patient === patientName && billOutstandingAmount(bill) > 0);
}

function pendingBillsForCourse(course) {
  const courseName = String(course.course || "").toLowerCase();
  return pendingBillsForPatient(course.patient).filter((bill) => String(bill.item || "").toLowerCase().includes(courseName));
}

function pendingPaymentSummary(patientName) {
  const bills = pendingBillsForPatient(patientName);
  const amount = bills.reduce((sum, bill) => sum + billOutstandingAmount(bill), 0);
  return { bills, amount };
}

function patientByName(patientName) {
  return state.patients.find((patient) => patient.name === patientName) || { id: "-", name: patientName };
}

function outstandingPeriodLabel(period = outstandingPeriod) {
  if (period === "week") return "รายสัปดาห์";
  if (period === "month") return "รายเดือน";
  return "ทั้งหมด";
}

function outstandingPeriodNote(period = outstandingPeriod) {
  if (period === "week") return "7 วันล่าสุด";
  if (period === "month") return thaiDateLabel(`${todayIso.slice(0, 7)}-01`, { month: "long", year: "numeric" });
  return "ทุกช่วงเวลา";
}

function filterOutstandingBillsByPeriod(bills) {
  if (outstandingPeriod === "week") {
    const weeklyIds = new Set(billsForLastDays(7).map((bill) => bill.id));
    return bills.filter((bill) => weeklyIds.has(bill.id));
  }
  if (outstandingPeriod === "month") {
    const monthKey = todayIso.slice(0, 7);
    return bills.filter((bill) => bill.date?.slice(0, 7) === monthKey);
  }
  return bills;
}

function renderOutstandingPayments() {
  const pendingRows = state.billing.filter((bill) => billOutstandingAmount(bill) > 0);
  const rows = filterOutstandingBillsByPeriod(pendingRows)
    .filter(matchesSearch)
    .sort((a, b) => billDate(b) - billDate(a));
  const totalDue = rows.reduce((sum, bill) => sum + billOutstandingAmount(bill), 0);
  const totalPaid = rows.reduce((sum, bill) => sum + Number(bill.paidAmount || 0), 0);
  const patientCount = new Set(rows.map((bill) => bill.patient).filter(Boolean)).size;
  const oldest = rows.length ? rows.reduce((old, bill) => billDate(bill) < billDate(old) ? bill : old, rows[0]) : null;
  const periodOptions = [
    ["all", "ทั้งหมด"],
    ["week", "รายสัปดาห์"],
    ["month", "รายเดือน"]
  ];

  return `
    <section class="outstanding-hero">
      <div>
        <span class="section-kicker">ติดตามยอดค้างชำระ</span>
        <h2>รายการค้างชำระทั้งหมด</h2>
        <p>รวมใบเสร็จที่ยังชำระไม่ครบ สามารถเปิดดูใบเสร็จและอัปเดตรับชำระได้จากหน้านี้</p>
      </div>
      <div class="outstanding-total">
        <span>ยอดค้างรวม</span>
        <strong>${money(totalDue)}</strong>
        <small>${outstandingPeriodLabel()} · ${outstandingPeriodNote()}</small>
      </div>
    </section>
    <section class="panel outstanding-filter-panel">
      <div class="filter-line">
        <div>
          <strong>ช่วงเวลาที่แสดง</strong>
          <span class="muted">${outstandingPeriodNote()}</span>
        </div>
        <div class="segmented-filter" role="group" aria-label="เลือกช่วงเวลารายการค้างชำระ">
          ${periodOptions.map(([value, label]) => `<button class="${outstandingPeriod === value ? "active" : ""}" data-action="outstandingPeriod" data-period="${value}">${label}</button>`).join("")}
        </div>
      </div>
    </section>
    <section class="grid stats">
      ${stat("ยอดค้างชำระทั้งหมด", money(totalDue), `${rows.length} ใบเสร็จต้องติดตาม`, "danger")}
      ${stat("ลูกค้าที่ค้างชำระ", patientCount.toLocaleString("th-TH"), "รวมจากรายการที่ค้นหา")}
      ${stat("ยอดรับแล้วบางส่วน", money(totalPaid), "เฉพาะบิลที่ยังค้าง")}
      ${stat("รายการเก่าสุด", oldest ? thaiDateLabel(oldest.date, { day: "2-digit", month: "short" }) : "-", "ควรติดตามก่อน")}
    </section>
    <section class="panel outstanding-panel">
      <div class="panel-head">
        <h2>บิลที่ยังค้างชำระ</h2>
        <span class="muted">${rows.length.toLocaleString("th-TH")} รายการ</span>
      </div>
      ${renderOutstandingPaymentsTable(rows)}
    </section>`;
}

function renderOutstandingPaymentsTable(rows) {
  if (!rows.length) return emptyState();
  const body = rows.map((bill) => {
    const patient = patientByName(bill.patient);
    const amount = Number(bill.amount || 0);
    const paid = Number(bill.paidAmount || 0);
    const due = billOutstandingAmount(bill);
    return `
      <tr>
        <td><strong>${thaiDateLabel(bill.date, { day: "2-digit", month: "short" })}</strong><div class="muted">${escapeHtml(bill.id || "-")}</div></td>
        <td>
          <div class="name-cell">
            <span class="avatar">${initials(bill.patient || "-")}</span>
            <div><strong>${escapeHtml(bill.patient || "-")}</strong><div class="muted">${escapeHtml(patient.id || "-")}</div></div>
          </div>
        </td>
        <td><strong>${escapeHtml(bill.item || "-")}</strong><div class="muted">${escapeHtml(bill.paymentMethod || "ยังไม่ระบุช่องทาง")}</div></td>
        <td>${money(amount)}</td>
        <td>${money(paid)}</td>
        <td><strong class="outstanding-due">${money(due)}</strong></td>
        <td>${badge(bill.status || "รอชำระ")}</td>
        <td>
          <div class="outstanding-actions">
            <button class="action-button view-action receipt-view-button" title="ดูใบเสร็จ" aria-label="ดูใบเสร็จ" data-action="viewReceipt" data-id="${escapeHtml(bill.id)}">${icons.notes}<span>ดูใบเสร็จ</span></button>
            <button class="pay-due-button" title="อัปเดตรับชำระ" aria-label="อัปเดตรับชำระ" data-action="payOutstandingBill" data-id="${escapeHtml(bill.id)}">${icons.wallet}<span>ชำระค้าง</span></button>
          </div>
        </td>
      </tr>`;
  }).join("");
  return `
    <div class="table-wrap outstanding-table">
      <table>
        <thead>
          <tr>
            <th>วันที่ / ใบเสร็จ</th>
            <th>ลูกค้า</th>
            <th>รายการ</th>
            <th>ยอดสุทธิ</th>
            <th>รับแล้ว</th>
            <th>ค้างชำระ</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>${body}</tbody>
      </table>
    </div>`;
}

function renderPatientsCenter() {
  const query = searchTerm.toLowerCase();
  const rows = state.patients.filter((patient) => {
    const haystack = `${patient.id} ${patient.name} ${patient.phone} ${patient.tag}`.toLowerCase();
    return !query || haystack.includes(query);
  });
  const selected = selectedPatientId ? state.patients.find((patient) => patient.id === selectedPatientId) : null;
  if (selected) return renderPatientDetail(selected);
  return `
    <section class="patient-hero">
      <div class="patient-hero-icon">${icons.users}</div>
      <div>
        <div class="hero-title-line">
          <h2>ทะเบียนลูกค้า</h2>
          <span>CRM SYSTEM</span>
        </div>
        <p>ศูนย์กลางจัดการข้อมูล ประวัติการรักษา และการบริหารจัดการคอร์สแบบครบวงจร</p>
      </div>
      <button data-action="add" data-view="patients">${icons.plus}เพิ่มลูกค้าใหม่</button>
    </section>
    <section class="patient-center panel">
      <div class="patient-search-head">
        <span class="search-badge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.35-4.35M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"/></svg></span>
        <strong>ค้นหาลูกค้า:</strong>
      </div>
      <label class="patient-search">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.35-4.35M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"/></svg>
        <input data-action="patientSearch" value="${escapeHtml(searchTerm)}" placeholder="ค้นหาชื่อ, เบอร์โทร, HN...">
      </label>
      ${searchTerm ? `<p class="muted result-count">พบ ${rows.length} รายการ สำหรับ "${escapeHtml(searchTerm)}"</p>` : ""}
      ${renderPatientsTable(rows)}
    </section>`;
}

function renderPatientsTable(rows) {
  if (!rows.length) return emptyState();
  const body = rows.map((patient) => `
    <tr class="clickable-row" data-action="viewPatient" data-id="${patient.id}" title="เปิดรายละเอียดลูกค้า">
      <td><strong>${escapeHtml(patient.id)}</strong></td>
      <td>
        <div class="name-cell">
          <span class="avatar">${initials(patient.name)}</span>
          <div><strong>${escapeHtml(patient.name)}</strong><div class="muted">${escapeHtml(patient.tag || "-")}</div></div>
        </div>
      </td>
      <td>${escapeHtml(patient.phone || "-")}</td>
      <td>${badge(`${totalCourseRemaining(patient.name)} ครั้งคงเหลือ`)}</td>
      <td>
        <div class="table-actions">
          <button class="action-button view-action" title="ดูรายละเอียด" aria-label="ดูรายละเอียด" data-action="viewPatient" data-id="${patient.id}">${icons.eye}<span>ดู</span></button>
          <button class="action-button edit-action" title="แก้ไข" aria-label="แก้ไข" data-action="edit" data-view="patients" data-id="${patient.id}">${icons.edit}<span>แก้</span></button>
          <button class="action-button danger delete-action" title="ลบ" aria-label="ลบ" data-action="delete" data-view="patients" data-id="${patient.id}">${icons.trash}<span>ลบ</span></button>
        </div>
      </td>
    </tr>`).join("");
  return `<div class="table-wrap patient-table"><table><thead><tr><th>HN</th><th>ชื่อ-นามสกุล</th><th>เบอร์โทร</th><th>คอร์สคงเหลือ</th><th>จัดการ</th></tr></thead><tbody>${body}</tbody></table></div>`;
}

function renderPatientDetail(patient) {
  const records = patientRecords(patient.name);
  const courses = patientCourses(patient.name);
  const appointments = patientAppointments(patient.name);
  const activeTab = {
    records: renderPatientRecords(records),
    courses: renderPatientCourses(courses, patient.name),
    history: renderPatientHistory(patient, records, courses),
    appointments: renderPatientAppointments(appointments)
  }[patientDetailTab] || "";
  return `
    <section class="patient-detail-head">
      <button class="secondary icon-button" data-action="backPatients" aria-label="กลับ">${icons.back}</button>
      <div>
        <h2>${escapeHtml(patient.name)}</h2>
        <span>${escapeHtml(patient.id)}</span>
      </div>
      <div class="detail-actions">
        <button data-action="buyCourse" data-patient-id="${patient.id}">${icons.course}ซื้อคอร์ส</button>
        <button class="secondary icon-button" data-action="edit" data-view="patients" data-id="${patient.id}" aria-label="แก้ไข">${icons.edit}</button>
      </div>
    </section>
    <section class="patient-detail-grid">
      <aside class="patient-profile panel">
        <span class="avatar big">${initials(patient.name)}</span>
        <h3>${escapeHtml(patient.name)}</h3>
        <strong>${escapeHtml(patient.phone || "-")}</strong>
        <div class="profile-section">
          <span>ข้อมูลส่วนตัว</span>
          <p>อายุ ${escapeHtml(patient.age || "-")} ปี</p>
          <p>เข้ารับบริการล่าสุด ${escapeHtml(patient.lastVisit || "-")}</p>
        </div>
        <div class="profile-alert">
          <span>แพ้ยา / Allergies</span>
          <strong>${escapeHtml(patient.allergy || "-")}</strong>
        </div>
        <div class="profile-section">
          <span>คอร์สคงเหลือ</span>
          <strong class="money">${totalCourseRemaining(patient.name)} ครั้ง</strong>
        </div>
      </aside>
      <div class="panel patient-workspace">
        <div class="patient-tabs">
          ${patientTabButton("records", "ประวัติการรักษา", icons.notes)}
          ${patientTabButton("courses", "คอร์สของฉัน", icons.course)}
          ${patientTabButton("history", "ประวัติการซื้อ", icons.wallet)}
          ${patientTabButton("appointments", "การนัดหมาย", icons.calendar)}
        </div>
        ${activeTab}
      </div>
    </section>`;
}

function patientTabButton(tab, label, icon) {
  return `<button class="${patientDetailTab === tab ? "active" : ""}" data-action="patientTab" data-tab="${tab}">${icon}${label}</button>`;
}

function renderPatientRecords(records) {
  if (!records.length) return emptyState();
  return `<div class="timeline">${records.map((record) => `<article class="timeline-item"><strong>${escapeHtml(record.date || "-")}</strong>${recordHealthSummary(record)}<span class="muted">แพทย์: ${escapeHtml(record.doctor || "-")}</span></article>`).join("")}</div>`;
}

function renderPendingPaymentNotice(patientName) {
  const pending = pendingPaymentSummary(patientName);
  if (!pending.bills.length) return "";
  return `<div class="payment-alert">
    <div>
      <strong>มีรายการค้างชำระ</strong>
      <span>${pending.bills.length} ใบเสร็จ · ยอดค้างรวม ${money(pending.amount)}</span>
    </div>
    <button class="secondary" data-view="outstanding">${icons.wallet}ดูรายการค้างชำระ</button>
  </div>`;
}

function renderPatientCourses(courses, patientName) {
  const pendingNotice = renderPendingPaymentNotice(patientName);
  if (!courses.length) return `${pendingNotice}${emptyState()}`;
  return `${pendingNotice}<div class="inventory-list">${courses.map((course) => {
    const pendingCourseBills = pendingBillsForCourse(course);
    const pendingCourseAmount = pendingCourseBills.reduce((sum, bill) => sum + billOutstandingAmount(bill), 0);
    const pendingClass = pendingCourseAmount > 0 ? " pending-payment" : "";
    const pendingBadge = pendingCourseAmount > 0 ? `<span class="payment-due-badge">ค้างชำระ ${money(pendingCourseAmount)}</span>` : "";
    const payPendingButton = pendingCourseAmount > 0
      ? `<button class="pay-due-button" title="ชำระเงินที่ค้างอยู่" aria-label="ชำระเงินที่ค้างอยู่" data-action="payOutstandingCourse" data-id="${course.id}">${icons.wallet}<span>ชำระค้าง</span></button>`
      : "";
    return `<article class="inventory-item course-detail-item${pendingClass}">
    <div class="course-info">
      <strong>${escapeHtml(course.course)}</strong>
      ${pendingBadge}
      <span class="muted">${escapeHtml(course.service)}</span>
    </div>
    <div class="course-usage">
      ${courseProgress(course)}
    </div>
    <div class="course-item-actions">
      ${badge(courseStatus(course))}
      ${payPendingButton}
      <button class="deduct-button course-deduct-action" title="ตัดคอร์ส / ใช้บริการ" aria-label="ตัดคอร์ส / ใช้บริการ" data-action="deduct" data-id="${course.id}" ${courseRemaining(course) <= 0 ? "disabled" : ""}>${icons.deduct}<span>ตัดคอร์ส / ใช้บริการ</span></button>
      <button class="action-button danger delete-action" title="ลบคอร์ส" aria-label="ลบคอร์ส" data-action="delete" data-view="courses" data-id="${course.id}">${icons.trash}<span>ลบ</span></button>
    </div>
  </article>`;
  }).join("")}</div>`;
}

function renderPatientHistory(patient, records, courses) {
  const bills = state.billing.filter((item) => item.patient === patient.name);
  const rows = [
    ...bills.map((item) => ({ date: item.date, text: `${item.item} · ${money(item.amount)}`, type: item.status, billId: item.id })),
    ...courses.map((item) => ({ date: item.startDate, text: `ซื้อคอร์ส ${item.course}`, type: courseStatus(item) })),
    ...records.map((item) => ({ date: item.date, text: `บันทึกเวชระเบียน`, type: "ข้อมูล" }))
  ].sort((a, b) => String(b.date).localeCompare(String(a.date)));
  if (!rows.length) return emptyState();
  return `<div class="timeline">${rows.map((row) => `<article class="timeline-item transaction-item">
    <div>
      <strong>${escapeHtml(row.date || "-")}</strong>
      <span>${escapeHtml(row.text)}</span>
      ${badge(row.type)}
    </div>
    ${row.billId ? `<button class="action-button view-action receipt-view-button" title="ดูใบเสร็จ" aria-label="ดูใบเสร็จ" data-action="viewReceipt" data-id="${escapeHtml(row.billId)}">${icons.notes}<span>ดูใบเสร็จ</span></button>` : ""}
  </article>`).join("")}</div>`;
}

function renderPatientAppointments(appointments) {
  if (!appointments.length) return emptyState();
  return `<div class="timeline">${appointments.map((item) => `<article class="timeline-item"><strong>${escapeHtml(item.date)} · ${escapeHtml(item.time)}</strong><span>${escapeHtml(item.service)} · ${escapeHtml(item.doctor)}</span>${badge(item.status)}</article>`).join("")}</div>`;
}

function receiptItemsFromBill(bill) {
  const items = Array.isArray(bill.items) ? bill.items : [];
  if (items.length) {
    return items.map((item) => {
      const qty = Math.max(Number(item.quantity || item.qty || 1), 1);
      const lineAmount = Number(item.price || item.amount || item.total || 0);
      return {
        selected: {
          name: String(item.name || item.service || bill.item || "รายการ"),
          price: lineAmount || Number(bill.amount || 0) / qty,
          sessions: Number(item.sessions || item.total_units || 1)
        },
        qty
      };
    });
  }
  return [{
    selected: {
      name: String(bill.item || "รายการ"),
      price: Number(bill.subtotal || bill.amount || 0),
      sessions: 1
    },
    qty: 1
  }];
}

function openReceiptFromBill(id) {
  const bill = state.billing.find((item) => item.id === id);
  if (!bill) return;
  const patient = patientByName(bill.patient);
  modalTitle.textContent = "ใบเสร็จรับเงิน";
  modalFields.onclick = null;
  modalFields.oninput = null;
  modalFields.innerHTML = renderReceipt(patient, receiptItemsFromBill(bill), bill);
  modalFields.onclick = (receiptEvent) => {
    if (receiptEvent.target.closest('[data-action="printReceipt"]')) window.print();
    if (receiptEvent.target.closest('[data-action="saveReceiptImage"]')) saveReceiptAsImage();
  };
  modalSave.textContent = "ปิด";
  modalSave.onclick = (closeEvent) => {
    closeEvent.preventDefault();
    modal.close();
  };
  modal.showModal();
}

function nextPatientId() {
  const highest = state.patients.reduce((max, patient) => {
    const match = String(patient.id || "").match(/(\d+)$/);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 260000);
  return `HN-${String(highest + 1).padStart(6, "0")}`;
}

function syncPatientFromRecord(record) {
  const name = recordFullName(record);
  if (!name || name === "-") return;
  const existing = state.patients.find((patient) => patient.name === name || (record.phone && patient.phone === record.phone));
  const patientData = {
    id: existing?.id || nextPatientId(),
    name,
    phone: record.phone || existing?.phone || "",
    age: existing?.age || "",
    allergy: record.drugAllergy || existing?.allergy || "ไม่มี",
    lastVisit: record.date || todayIso,
    tag: existing?.tag || "ใหม่"
  };
  if (existing) {
    state.patients = state.patients.map((patient) => patient.id === existing.id ? { ...patient, ...patientData } : patient);
  } else {
    state.patients = [patientData, ...state.patients];
  }
}

function catalogRows() {
  state = normalizeState(state);
  return state.serviceCatalog;
}

function buyCourseOptionTemplate(item) {
  const searchText = `${item.name} ${item.category} ${item.type || ""} ${item.description || ""} ${item.price || ""} ${item.sessions || ""}`.toLowerCase();
  return `
    <label class="buy-course-option" data-search="${escapeHtml(searchText)}">
      <input type="checkbox" name="catalogId" value="${escapeHtml(item.id)}">
      <span class="service-icon">${icons.course}</span>
      <span class="buy-course-info">
        <strong>${escapeHtml(item.name)}</strong>
        <small>${escapeHtml(item.category)} · ${Number(item.sessions || 1)} ครั้ง</small>
      </span>
      <input class="qty-input" name="qty-${escapeHtml(item.id)}" type="number" min="1" value="1" aria-label="จำนวน">
      <b>${money(item.price)}</b>
    </label>
  `;
}

function renderServiceCatalogManager() {
  const categories = ["ทั้งหมด", ...new Set(catalogRows().map((item) => item.category))];
  const query = searchTerm.toLowerCase();
  const rows = catalogRows().filter((item) => {
    const matchFilter = activeFilter === "ทั้งหมด" || item.category === activeFilter;
    const matchSearch = !query || `${item.name} ${item.category} ${item.price}`.toLowerCase().includes(query);
    return matchFilter && matchSearch;
  });
  return `
    <section class="service-hero">
      <div class="patient-hero-icon">${icons.course}</div>
      <div>
        <h2>จัดการบริการ/คอร์ส</h2>
        <p>${catalogRows().length} รายการทั้งหมด</p>
      </div>
      <button data-action="add" data-view="serviceCatalog">${icons.plus}เพิ่มรายการ</button>
    </section>
    <section class="service-catalog">
      <label class="catalog-search">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.35-4.35M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"/></svg>
        <input data-action="catalogSearch" value="${escapeHtml(searchTerm)}" placeholder="ค้นหาชื่อบริการ...">
      </label>
      <div class="catalog-filters">
        ${categories.map((category) => `<button class="${activeFilter === category ? "active" : ""}" data-action="catalogFilter" data-filter="${category}">${escapeHtml(category)} <span>${category === "ทั้งหมด" ? catalogRows().length : catalogRows().filter((item) => item.category === category).length}</span></button>`).join("")}
      </div>
      <div class="service-grid">${rows.map(renderServiceCard).join("") || emptyState()}</div>
    </section>`;
}

function renderCourseDeductionManager() {
  const filters = ["ทั้งหมด", "วันนี้", "เดือนนี้", "ปีนี้"];
  const query = searchTerm.toLowerCase();
  const rows = state.courses.filter((course) => {
    const patient = patientByName(course.patient);
    const matchFilter = courseMatchesPeriod(course, activeFilter);
    const matchSearch = !query || `${course.patient} ${patient.id} ${course.course} ${course.service} ${course.id}`.toLowerCase().includes(query);
    return matchFilter && matchSearch;
  });
  const active = state.courses.filter((course) => courseStatus(course) === "ใช้งานอยู่").length;
  const nearEnd = state.courses.filter((course) => courseStatus(course) === "ใกล้หมด").length;
  const depleted = state.courses.filter((course) => courseStatus(course) === "ใช้ครบแล้ว").length;
  const totalRemaining = state.courses.reduce((sum, course) => sum + courseRemaining(course), 0);
  return `
    <section class="course-balance-head">
      <div class="course-balance-top">
        <div class="course-balance-title">
          <div class="patient-hero-icon">${icons.course}</div>
          <div>
            <h2>คอร์สคงเหลือ</h2>
            <p>${rows.length} รายการ · เลือก 0</p>
          </div>
          <span class="balance-live-dot">ACTIVE</span>
        </div>
        <div class="course-balance-controls">
          <label class="df-control">
            <span>% DF</span>
            <input type="number" value="10" min="0" max="100" aria-label="DF percentage">
            <b>%</b>
          </label>
          <button class="secondary">${icons.notes}Export</button>
          <button data-action="add" data-view="courses">${icons.plus}เพิ่มคอร์สลูกค้า</button>
        </div>
      </div>
      <div class="course-balance-actions">
        <label class="catalog-search course-balance-search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.35-4.35M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"/></svg>
          <input data-action="courseSearch" value="${escapeHtml(searchTerm)}" placeholder="ค้นหาลูกค้า, HN, คอร์ส...">
        </label>
        <div class="course-balance-tabs">${filters.map((filter) => `<button class="${filter === activeFilter ? "active" : ""}" data-filter="${filter}">${filter}</button>`).join("")}</div>
        <button class="select-all-button" type="button">เลือกทั้งหมด</button>
      </div>
    </section>
    <section class="grid stats course-manager-stats">
      ${stat("คอร์สใช้งานอยู่", active, "พร้อมตัดคอร์ส")}
      ${stat("คอร์สใกล้หมด", nearEnd, "ควรแจ้งลูกค้า")}
      ${stat("ใช้ครบแล้ว", depleted, "ปิดการใช้งาน")}
      ${stat("จำนวนครั้งคงเหลือ", totalRemaining, "รวมทุกคอร์ส")}
    </section>
    <section class="course-manager-panel">
      <div class="course-balance-grid">
        ${rows.map(renderCourseManagerCard).join("") || emptyState()}
      </div>
    </section>`;
}

function courseMatchesPeriod(course, filter) {
  if (filter === "ทั้งหมด") return true;
  const dates = [
    course.startDate,
    course.lastUsedDate,
    ...(Array.isArray(course.usageLog) ? course.usageLog.map((item) => item.date) : [])
  ].filter(Boolean);
  if (filter === "วันนี้") return dates.some((date) => date === todayIso);
  if (filter === "เดือนนี้") return dates.some((date) => String(date).slice(0, 7) === todayIso.slice(0, 7));
  if (filter === "ปีนี้") return dates.some((date) => String(date).slice(0, 4) === todayIso.slice(0, 4));
  return true;
}

function renderCourseManagerCard(course) {
  const remaining = courseRemaining(course);
  const total = Math.max(Number(course.total || 0), 1);
  const used = Math.min(Number(course.used || 0), total);
  const percent = Math.round((remaining / total) * 100);
  const unit = course.unitType || "ครั้ง";
  const patient = patientByName(course.patient);
  const pendingCourseAmount = pendingBillsForCourse(course).reduce((sum, bill) => sum + billOutstandingAmount(bill), 0);
  return `<article class="course-manager-card ${pendingCourseAmount ? "pending-payment" : ""}">
    <button class="course-card-select" type="button" aria-label="เลือกคอร์ส"></button>
    <div class="course-card-head">
      <span class="avatar">${initials(course.patient)}</span>
      <div>
        <strong title="${escapeHtml(course.patient)}">${escapeHtml(course.patient)}</strong>
        <small title="${escapeHtml(patient.id || course.id)}">${escapeHtml(patient.id || course.id)}</small>
      </div>
    </div>
    <h3 title="${escapeHtml(course.course)}">${escapeHtml(course.course)}</h3>
    <div class="course-card-meter">
      <div>
        <strong>${remaining}</strong>
        <span>/ ${total} ${escapeHtml(unit)}</span>
      </div>
      <b>${percent}%</b>
      <div class="bar-track"><i style="width:${percent}%"></i></div>
    </div>
    <div class="course-card-meta">
      <span>${escapeHtml(course.service || "-")}</span>
      <span>ใช้แล้ว ${used}/${total} · เหลือ ${remaining} ${escapeHtml(unit)}</span>
      ${pendingCourseAmount ? `<mark>ค้างชำระ ${money(pendingCourseAmount)}</mark>` : ""}
      ${badge(courseStatus(course))}
    </div>
    <div class="course-item-actions">
      <button class="deduct-button course-deduct-action" data-action="deduct" data-id="${course.id}" ${remaining <= 0 ? "disabled" : ""}>${icons.deduct}<span>ตัดคอร์ส</span></button>
      <button class="course-card-profile" data-action="viewCoursePatient" data-patient="${escapeHtml(course.patient)}" aria-label="เปิดข้อมูลลูกค้า">${icons.users}</button>
    </div>
  </article>`;
}

function renderServiceCard(item) {
  return `<article class="service-card">
    <div class="service-icon">${icons.course}</div>
    <button class="service-select" title="เลือกรายการ" aria-label="เลือกรายการ"></button>
    <h3>${escapeHtml(item.name)}</h3>
    <span class="service-chip">${escapeHtml(item.category)}</span>
    <div class="service-price">${money(item.price)}</div>
    <p>${Number(item.sessions || 1)} ครั้ง</p>
    <div class="table-actions service-actions">
      <button class="action-button edit-action" title="แก้ไข" aria-label="แก้ไข" data-action="edit" data-view="serviceCatalog" data-id="${item.id}">${icons.edit}<span>แก้</span></button>
      <button class="action-button danger delete-action" title="ลบ" aria-label="ลบ" data-action="delete" data-view="serviceCatalog" data-id="${item.id}">${icons.trash}<span>ลบ</span></button>
    </div>
  </article>`;
}

const viewConfig = {
  patients: {
    addLabel: "เพิ่มคนไข้",
    filters: ["ใหม่", "ติดตามผล", "เรื้อรัง"],
    fields: [
      ["id", "เลข HN"], ["name", "ชื่อ-นามสกุล"], ["phone", "เบอร์โทร"], ["age", "อายุ", "number"],
      ["allergy", "แพ้ยา"], ["lastVisit", "เข้ารับบริการล่าสุด", "date"], ["tag", "ประเภท"]
    ],
    columns: [
      { label: "คนไข้", key: "name", render: (row) => `<div class="name-cell"><span class="avatar">${initials(row.name)}</span><div><strong>${escapeHtml(row.name)}</strong><div class="muted">${row.id}</div></div></div>` },
      { label: "โทรศัพท์", key: "phone" }, { label: "อายุ", key: "age" }, { label: "แพ้ยา", key: "allergy" },
      { label: "ล่าสุด", key: "lastVisit" }, { label: "ประเภท", key: "tag", render: (row) => badge(row.tag) }
    ]
  },
  queue: {
    addLabel: "เพิ่มคิว",
    filters: ["รอตรวจ", "กำลังตรวจ", "ชำระเงิน"],
    fields: [["id", "เลขคิว"], ["patient", "คนไข้"], ["service", "บริการ"], ["time", "เวลา", "time"], ["room", "ห้องตรวจ"], ["status", "สถานะ"]],
    columns: [
      { label: "เลขคิว", key: "id" }, { label: "คนไข้", key: "patient" }, { label: "บริการ", key: "service" },
      { label: "เวลา", key: "time" }, { label: "ห้อง", key: "room" }, { label: "สถานะ", key: "status", render: (row) => badge(row.status) }
    ]
  },
  appointments: {
    addLabel: "เพิ่มนัดหมาย",
    filters: ["ยืนยันแล้ว", "รอยืนยัน", "ยกเลิก"],
    fields: [["id", "รหัสนัด"], ["patient", "คนไข้"], ["doctor", "แพทย์"], ["date", "วันที่", "date"], ["time", "เวลา", "time"], ["service", "บริการ"], ["status", "สถานะ"]],
    columns: [
      { label: "วันที่", key: "date" }, { label: "เวลา", key: "time" }, { label: "คนไข้", key: "patient" },
      { label: "แพทย์", key: "doctor" }, { label: "บริการ", key: "service" }, { label: "สถานะ", key: "status", render: (row) => badge(row.status) }
    ]
  },
  records: {
    addLabel: "เพิ่มเวชระเบียน",
    filters: [],
    fields: [
      ["id", "เลขระเบียน"],
      ["firstName", "ชื่อ"],
      ["lastName", "นามสกุล"],
      ["nickname", "ชื่อเล่น"],
      ["phone", "เบอร์โทร"],
      ["birthDate", "วันเดือนปีเกิด", "date"],
      ["citizenId", "เลขบัตรประชาชน"],
      ["drugAllergy", "ประวัติการแพ้ยา"],
      ["foodAllergy", "แพ้อาหาร"],
      ["chronicDisease", "โรคประจำตัว"],
      ["date", "วันที่บันทึก", "date"],
      ["doctor", "แพทย์"]
    ],
    columns: [
      { label: "คนไข้", key: "firstName", render: (row) => `<div class="name-cell"><span class="avatar">${initials(recordFullName(row))}</span><div><strong>${escapeHtml(recordFullName(row))}</strong><div class="muted">ชื่อเล่น: ${escapeHtml(row.nickname || "-")} · โทร ${escapeHtml(row.phone || "-")}</div></div></div>` },
      { label: "วันเกิด / บัตรประชาชน", key: "birthDate", render: (row) => `<strong>${escapeHtml(row.birthDate || "-")}</strong><div class="muted">${escapeHtml(row.citizenId || "-")}</div>` },
      { label: "ประวัติสุขภาพ", key: "drugAllergy", render: (row) => recordHealthSummary(row) },
      { label: "วันที่บันทึก", key: "date" },
      { label: "แพทย์", key: "doctor" }
    ]
  },
  billing: {
    addLabel: "ออกใบเสร็จ",
    filters: ["ชำระแล้ว", "รอชำระ"],
    fields: [["id", "เลขใบเสร็จ"], ["patient", "คนไข้"], ["date", "วันที่", "date"], ["item", "รายการ"], ["amount", "ยอดเงิน", "number"], ["discount", "ส่วนลด", "number"], ["paidAmount", "ยอดชำระแล้ว", "number"], ["paymentMethod", "ช่องทางชำระเงิน"], ["seller", "ผู้ขาย"], ["status", "สถานะ"]],
    columns: [
      { label: "เลขใบเสร็จ", key: "id" }, { label: "วันที่", key: "date" }, { label: "คนไข้", key: "patient" },
      { label: "รายการ", key: "item" }, { label: "ยอดเงิน", key: "amount", render: (row) => `<span class="money">${money(row.amount)}</span>` },
      { label: "ส่วนลด", key: "discount", render: (row) => money(row.discount || 0) },
      { label: "ชำระแล้ว", key: "paidAmount", render: (row) => money(row.paidAmount || (row.status === "ชำระแล้ว" ? row.amount : 0)) },
      { label: "ช่องทาง", key: "paymentMethod", render: (row) => escapeHtml(row.paymentMethod || "-") },
      { label: "สถานะ", key: "status", render: (row) => badge(row.status) }
    ]
  },
  courses: {
    addLabel: "เพิ่มคอร์สลูกค้า",
    filters: ["ใช้งานอยู่", "ใกล้หมด", "ใช้ครบแล้ว", "พักคอร์ส"],
    fields: [["id", "รหัสคอร์ส"], ["patient", "ลูกค้า"], ["course", "ชื่อคอร์ส"], ["service", "บริการ"], ["total", "จำนวนครั้งทั้งหมด", "number"], ["used", "ใช้แล้ว", "number"], ["startDate", "วันเริ่มคอร์ส", "date"], ["nextDate", "นัดครั้งถัดไป", "date"], ["status", "สถานะ"]],
    columns: [
      { label: "ลูกค้า", key: "patient", render: (row) => `<div class="name-cell"><span class="avatar">${initials(row.patient)}</span><div><strong>${escapeHtml(row.patient)}</strong><div class="muted">${escapeHtml(row.id)}</div></div></div>` },
      { label: "คอร์ส / บริการ", key: "course", render: (row) => `<strong>${escapeHtml(row.course)}</strong><div class="muted">${escapeHtml(row.service)}</div>` },
      { label: "การใช้คอร์ส", key: "used", render: (row) => courseProgress(row) },
      { label: "เหลือ", key: "remaining", render: (row) => `<strong>${courseRemaining(row)} ครั้ง</strong>` },
      { label: "ใช้ล่าสุด", key: "lastUsedDate", render: (row) => row.lastUsedDate ? escapeHtml(row.lastUsedDate) : "<span class='muted'>-</span>" },
      { label: "นัดถัดไป", key: "nextDate", render: (row) => row.nextDate ? escapeHtml(row.nextDate) : "<span class='muted'>-</span>" },
      { label: "สถานะ", key: "status", render: (row) => badge(courseStatus(row)) }
    ]
  },
  serviceCatalog: {
    addLabel: "เพิ่มรายการบริการ",
    filters: [],
    fields: [
      ["id", "รหัสรายการ"],
      ["name", "ชื่อสินค้า / บริการ"],
      ["category", "หมวดหมู่"],
      ["type", "ประเภท"],
      ["price", "ราคา", "number"],
      ["sessions", "จำนวนครั้ง / หน่วย", "number"],
      ["unitType", "หน่วยนับ"],
      ["status", "สถานะ"],
      ["description", "รายละเอียด", "textarea"]
    ],
    columns: [
      { label: "รายการ", key: "name" }, { label: "หมวด", key: "category" }, { label: "ราคา", key: "price", render: (row) => money(row.price) },
      { label: "จำนวนครั้ง", key: "sessions" }, { label: "สถานะ", key: "status", render: (row) => badge(row.status) }
    ]
  },
  inventory: {
    addLabel: "เพิ่มสินค้า",
    filters: ["ยา", "เวชภัณฑ์", "ยาเฉพาะทาง"],
    fields: [["id", "รหัสสินค้า"], ["name", "ชื่อรายการ"], ["category", "หมวด"], ["qty", "จำนวน", "number"], ["unit", "หน่วย"], ["reorder", "จุดสั่งเพิ่ม", "number"], ["expire", "วันหมดอายุ", "date"]],
    columns: [
      { label: "รายการ", key: "name" }, { label: "หมวด", key: "category" }, { label: "คงเหลือ", key: "qty" },
      { label: "หน่วย", key: "unit" }, { label: "สั่งเพิ่ม", key: "reorder" }, { label: "สถานะ", key: "status", render: (row) => badge(row.qty <= row.reorder ? "ใกล้หมด" : "พร้อมใช้") }
    ]
  },
  staff: {
    addLabel: "เพิ่มบุคลากร",
    filters: ["ผู้ดูแล", "แพทย์", "เจ้าหน้าที่"],
    fields: [["id", "รหัส"], ["name", "ชื่อ"], ["role", "ตำแหน่ง"], ["shift", "เวลาทำงาน"], ["access", "สิทธิ์ใช้งาน"]],
    columns: [
      { label: "ชื่อ", key: "name", render: (row) => `<div class="name-cell"><span class="avatar">${initials(row.name)}</span><strong>${escapeHtml(row.name)}</strong></div>` },
      { label: "ตำแหน่ง", key: "role" }, { label: "เวลาทำงาน", key: "shift" }, { label: "สิทธิ์", key: "access", render: (row) => badge(row.access) }
    ]
  }
};

function openForm(view, id) {
  const setup = viewConfig[view];
  const existing = id ? state[view].find((item) => item.id === id) : null;
  const generatedId = view === "serviceCatalog" ? `SV-${String(Date.now()).slice(-6)}` : view === "courses" ? `C-${String(Date.now()).slice(-6)}` : "";
  const patientOptions = state.patients.map((patient) => (
    `<option value="${escapeHtml(patient.name)}" label="${escapeHtml(`${patient.id || "-"} · ${patient.phone || "-"}`)}"></option>`
  )).join("");
  const serviceCategoryOptions = ["เมโส", "Botox", "Filler", "ทรีทเม้นท์/เครื่อง", "FAT", "คอ", "ยา", "อื่นๆ", "ร้อยไหม"]
    .map((category) => `<option value="${escapeHtml(category)}"></option>`).join("");
  const serviceStatusOptions = ["เปิดขาย", "พักขาย", "หมด", "ซ่อน"]
    .map((status) => `<option value="${escapeHtml(status)}"></option>`).join("");
  const courseOptions = catalogRows().map((item) => (
    `<option value="${escapeHtml(item.name)}" label="${escapeHtml(`${item.category || "-"} · ${money(item.price)} · ${Number(item.sessions || 1)} ครั้ง`)}"></option>`
  )).join("");
  modalFields.onclick = null;
  modalFields.oninput = null;
  modalSave.textContent = "บันทึก";
  modalTitle.textContent = existing ? `แก้ไข${setup.addLabel.replace("เพิ่ม", "")}` : setup.addLabel;
  modalFields.innerHTML = setup.fields.map(([key, label, type = "text"]) => {
    const defaultValue = !existing && view === "patients" && key === "id" ? nextPatientId()
      : !existing && key === "id" && generatedId ? generatedId
      : !existing && view === "serviceCatalog" && key === "sessions" ? 1
      : !existing && view === "serviceCatalog" && key === "status" ? "เปิดขาย"
      : !existing && view === "serviceCatalog" && key === "unitType" ? "ครั้ง"
      : !existing && view === "serviceCatalog" && key === "category" ? "อื่นๆ"
      : !existing && view === "courses" && key === "used" ? 0
      : !existing && view === "courses" && key === "total" ? 1
      : !existing && view === "courses" && key === "status" ? "ใช้งานอยู่"
      : key === "date" || key === "lastVisit" || key === "startDate" ? todayIso
      : "";
    const value = existing?.[key] ?? defaultValue;
    const full = type === "textarea" ? " full" : "";
    const required = key === "nextDate" ? "" : " required";
    const listAttr = view === "appointments" && key === "patient"
      ? ' list="appointmentPatientOptions" autocomplete="off"'
      : view === "courses" && key === "patient"
        ? ' list="coursePatientOptions" autocomplete="off"'
        : view === "courses" && key === "course"
          ? ' list="courseCatalogOptions" autocomplete="off"'
      : view === "serviceCatalog" && key === "category"
        ? ' list="serviceCategoryOptions" autocomplete="off"'
        : view === "serviceCatalog" && key === "status"
          ? ' list="serviceStatusOptions" autocomplete="off"'
          : "";
    const readonlyAttr = !existing && key === "id" && (view === "patients" || view === "serviceCatalog" || view === "courses") ? " readonly" : "";
    const control = type === "textarea"
      ? `<textarea name="${key}"${required}>${escapeHtml(value)}</textarea>`
      : `<input name="${key}" type="${type}" value="${escapeHtml(value)}"${listAttr}${readonlyAttr}${required}>`;
    return `<div class="field${full}"><label>${label}</label>${control}</div>`;
  }).join("")
    + (view === "appointments" ? `<datalist id="appointmentPatientOptions">${patientOptions}</datalist>` : "")
    + (view === "courses" ? `<datalist id="coursePatientOptions">${patientOptions}</datalist><datalist id="courseCatalogOptions">${courseOptions}</datalist>` : "")
    + (view === "serviceCatalog" ? `<datalist id="serviceCategoryOptions">${serviceCategoryOptions}</datalist><datalist id="serviceStatusOptions">${serviceStatusOptions}</datalist>` : "");
  if (view === "courses") {
    modalFields.oninput = (event) => {
      if (event.target.name !== "course") return;
      const picked = catalogRows().find((item) => item.name === event.target.value);
      if (!picked) return;
      const serviceInput = modalFields.querySelector('[name="service"]');
      const totalInput = modalFields.querySelector('[name="total"]');
      if (serviceInput) serviceInput.value = picked.category || picked.type || "";
      if (totalInput) totalInput.value = Number(picked.sessions || 1);
    };
  }
  modalSave.onclick = (event) => {
    event.preventDefault();
    const form = new FormData(modal.querySelector("form"));
    const item = Object.fromEntries(form.entries());
    setup.fields.forEach(([key, , type]) => {
      if (type === "number") item[key] = Number(item[key]);
    });
    if (view === "records") {
      item.patient = `${item.firstName || ""} ${item.lastName || ""}`.trim();
      syncPatientFromRecord(item);
    }
    if (existing) {
      state[view] = state[view].map((row) => row.id === id ? item : row);
    } else {
      state[view] = [item, ...state[view]];
    }
    saveState();
    modal.close();
    if (view === "serviceCatalog") currentView = "services";
    render();
  };
  modal.showModal();
}

function openDeductCourse(id) {
  const course = state.courses.find((item) => item.id === id);
  if (!course) return;
  modalFields.onclick = null;
  modalFields.oninput = null;
  modalSave.textContent = "บันทึก";
  const remaining = courseRemaining(course);
  if (remaining <= 0) {
    alert("คอร์สนี้ใช้ครบแล้ว");
    return;
  }
  modalTitle.textContent = "ตัดคอร์สลูกค้า";
  modalFields.innerHTML = `
    <div class="field full">
      <label>ลูกค้า / คอร์ส</label>
      <input value="${escapeHtml(course.patient)} - ${escapeHtml(course.course)}" disabled>
    </div>
    <div class="field">
      <label>ใช้ไปแล้ว</label>
      <input value="${Number(course.used || 0)} / ${Number(course.total || 0)} ครั้ง" disabled>
    </div>
    <div class="field">
      <label>คงเหลือ</label>
      <input value="${remaining} ครั้ง" disabled>
    </div>
    <div class="field">
      <label>จำนวนครั้งที่ต้องการตัด</label>
      <input name="deductCount" type="number" min="1" max="${remaining}" value="1" required>
    </div>
    <div class="field">
      <label>วันที่มาใช้คอร์ส</label>
      <input name="usedDate" type="date" value="${todayIso}" required>
    </div>
  `;
  modalSave.onclick = (event) => {
    event.preventDefault();
    const form = new FormData(modal.querySelector("form"));
    const deductCount = Math.max(1, Number(form.get("deductCount") || 1));
    const safeCount = Math.min(deductCount, remaining);
    state.courses = state.courses.map((row) => {
      if (row.id !== id) return row;
      const nextUsed = Math.min(Number(row.used || 0) + safeCount, Number(row.total || 0));
      const usedDate = String(form.get("usedDate") || todayIso);
      const usageLog = Array.isArray(row.usageLog) ? row.usageLog : [];
      return {
        ...row,
        used: nextUsed,
        lastUsedDate: usedDate,
        lastUsedCount: safeCount,
        usageLog: [...usageLog, { date: usedDate, count: safeCount }],
        status: nextUsed >= Number(row.total || 0) ? "ใช้ครบแล้ว" : row.status === "พักคอร์ส" ? "พักคอร์ส" : "ใช้งานอยู่"
      };
    });
    saveState();
    modal.close();
    render();
  };
  modal.showModal();
}

function openBuyCourse(patientId) {
  const patient = state.patients.find((item) => item.id === patientId);
  if (!patient) return;
  let catalog = catalogRows();
  const nextId = `C-${String(Date.now()).slice(-6)}`;
  let paymentStep = false;
  modalTitle.textContent = "ซื้อคอร์ส";
  modalSave.textContent = "ชำระเงิน";
  modalFields.innerHTML = `
    <div class="buy-course-layout">
      <div class="buy-course-picker">
        <div class="field full">
          <label>ลูกค้า</label>
          <input name="patient" value="${escapeHtml(patient.name)}" disabled>
        </div>
        <label class="catalog-search buy-search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.35-4.35M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"/></svg>
          <input type="search" data-action="buyCourseSearch" placeholder="ค้นหาบริการ/คอร์ส...">
        </label>
        <div class="buy-search-result muted" id="buySearchResult"></div>
        <details class="buy-inline-add">
          <summary>${icons.plus}<span>ไม่มีในรายการ? เพิ่มบริการ/คอร์สใหม่</span></summary>
          <div class="buy-inline-add-grid">
            <label>
              <span>ชื่อบริการ/คอร์ส</span>
              <input name="newCourseName" placeholder="เช่น Botox Nabota 50u">
            </label>
            <label>
              <span>หมวดหมู่</span>
              <input name="newCourseCategory" value="อื่นๆ" list="inlineServiceCategories">
            </label>
            <label>
              <span>ราคา</span>
              <input name="newCoursePrice" type="number" min="0" placeholder="0">
            </label>
            <label>
              <span>จำนวนครั้ง</span>
              <input name="newCourseSessions" type="number" min="1" value="1">
            </label>
            <button type="button" data-action="addInlineService">${icons.plus}เพิ่มเข้าในรายการ</button>
          </div>
        </details>
        <datalist id="inlineServiceCategories">
          ${[...new Set(catalog.map((item) => item.category).filter(Boolean))].map((category) => `<option value="${escapeHtml(category)}"></option>`).join("")}
        </datalist>
        <div class="buy-course-menu">
        ${catalog.map(buyCourseOptionTemplate).join("")}
        </div>
      </div>
      <aside class="buy-summary">
        <h3>สรุปยอดการซื้อคอร์ส</h3>
        <div class="selected-items" id="selectedCourseItems"></div>
        <div class="summary-line"><span>ยอดรวมก่อนส่วนลด</span><strong id="buySubtotal">฿0</strong></div>
        <label class="summary-line editable"><span>ส่วนลดท้ายบิล</span><input name="discount" type="number" min="0" value="0"></label>
        <div class="summary-line net"><span>ยอดสุทธิ</span><strong id="buyNetTotal">฿0</strong></div>
        <button type="button" class="pay-now-button" id="proceedPayment">ชำระเงิน →</button>
        <div class="payment-box" hidden>
          <h3>ยืนยันการขาย</h3>
          <div class="payment-total" id="paymentNetTotal">฿0</div>
          <div class="field full">
            <label>ช่องทางชำระเงิน</label>
            <div class="payment-methods">
              <label><input type="radio" name="paymentMethod" value="เงินสด" checked><span>เงินสด</span></label>
              <label><input type="radio" name="paymentMethod" value="โอนเงิน"><span>โอนเงิน</span></label>
              <label><input type="radio" name="paymentMethod" value="บัตรเครดิต"><span>บัตรเครดิต</span></label>
              <label><input type="radio" name="paymentMethod" value="ค้างชำระ"><span>ค้างชำระ</span></label>
            </div>
          </div>
          <div class="field full">
            <label>ยอดรับเงิน</label>
            <input name="paidAmount" type="number" min="0" value="0">
            <div class="payment-note"><span id="amountDue">ค้างชำระ: ฿0</span><span id="changeDue">เงินทอน: ฿0</span></div>
          </div>
          <div class="field full">
            <label>ผู้ขาย</label>
            <input name="seller" value="แพทริเซียคลินิกเวชกรรมเพชรบุรี-บ้านแหลม">
          </div>
          <div class="field full">
            <label>วันที่ซื้อ/เริ่มคอร์ส</label>
            <input name="startDate" type="date" value="${todayIso}" required>
          </div>
          <div class="field full">
            <label>นัดครั้งถัดไป</label>
            <input name="nextDate" type="date">
          </div>
        </div>
      </aside>
    </div>
  `;
  const updateBuySummary = () => {
    const form = modal.querySelector("form");
    const selectedIds = [...form.querySelectorAll('input[name="catalogId"]:checked')].map((input) => input.value);
    const rows = selectedIds.map((id) => {
      const item = catalog.find((entry) => entry.id === id);
      const qtyInput = [...form.querySelectorAll(".qty-input")].find((input) => input.name === `qty-${id}`);
      const qty = Math.max(1, Number(qtyInput?.value || 1));
      return { item, qty, total: Number(item?.price || 0) * qty };
    }).filter((row) => row.item);
    const subtotal = rows.reduce((sum, row) => sum + row.total, 0);
    const discount = Math.min(Math.max(0, Number(form.discount?.value || 0)), subtotal);
    const net = subtotal - discount;
    form.paidAmount.max = String(net);
    if (!form.paidAmount.dataset.touched) form.paidAmount.value = String(net);
    const paidAmount = Math.max(0, Number(form.paidAmount?.value || 0));
    const change = Math.max(paidAmount - net, 0);
    const due = Math.max(net - paidAmount, 0);
    modal.querySelector("#selectedCourseItems").innerHTML = rows.length ? rows.map((row) => `<div><span>${escapeHtml(row.item.name)} x${row.qty}</span><strong>${money(row.total)}</strong></div>`).join("") : "<p class='muted'>ยังไม่ได้เลือกรายการ</p>";
    modal.querySelector("#buySubtotal").textContent = money(subtotal);
    modal.querySelector("#buyNetTotal").textContent = money(net);
    modal.querySelector("#paymentNetTotal").textContent = money(net);
    modal.querySelector("#amountDue").textContent = `ค้างชำระ: ${money(due)}`;
    modal.querySelector("#changeDue").textContent = `เงินทอน: ${money(change)}`;
  };
  const showPaymentStep = () => {
    const form = modal.querySelector("form");
    if (!form.querySelectorAll('input[name="catalogId"]:checked').length) {
      alert("กรุณาเลือกรายการบริการ/คอร์สอย่างน้อย 1 รายการ");
      return;
    }
    paymentStep = true;
    modalTitle.textContent = "ชำระเงิน (Payment)";
    modalFields.querySelector(".payment-box").hidden = false;
    modalFields.querySelector("#proceedPayment").hidden = true;
    modalSave.textContent = "ยืนยันการขาย";
    updateBuySummary();
  };
  modalFields.onclick = async (event) => {
    if (event.target.closest('[data-action="addInlineService"]')) {
      const formElement = modal.querySelector("form");
      const name = String(formElement.newCourseName?.value || "").trim();
      const category = String(formElement.newCourseCategory?.value || "อื่นๆ").trim() || "อื่นๆ";
      const rawPrice = String(formElement.newCoursePrice?.value || "").trim();
      const price = Math.max(0, Number(rawPrice || 0));
      const sessions = Math.max(1, Number(formElement.newCourseSessions?.value || 1));
      if (!name) {
        alert("กรุณากรอกชื่อบริการ/คอร์ส");
        formElement.newCourseName?.focus();
        return;
      }
      if (!rawPrice || !Number.isFinite(price)) {
        alert("กรุณากรอกราคา");
        formElement.newCoursePrice?.focus();
        return;
      }
      const duplicate = catalog.find((item) => String(item.name || "").trim().toLowerCase() === name.toLowerCase());
      if (duplicate) {
        alert("มีรายการนี้อยู่แล้ว สามารถค้นหาและเลือกจากรายการได้เลย");
        return;
      }
      const newItem = {
        id: `SV-${String(Date.now()).slice(-6)}`,
        name,
        category,
        price,
        sessions,
        unitType: "ครั้ง",
        type: "service",
        status: "เปิดขาย",
        description: "เพิ่มจากหน้าซื้อคอร์ส"
      };
      state.serviceCatalog = [newItem, ...catalog];
      state = normalizeState(state);
      catalog = catalogRows();
      const courseMenu = modalFields.querySelector(".buy-course-menu");
      courseMenu.insertAdjacentHTML("afterbegin", buyCourseOptionTemplate(newItem));
      const checkbox = [...courseMenu.querySelectorAll('input[name="catalogId"]')].find((input) => input.value === newItem.id);
      if (checkbox) checkbox.checked = true;
      formElement.newCourseName.value = "";
      formElement.newCourseCategory.value = "อื่นๆ";
      formElement.newCoursePrice.value = "";
      formElement.newCourseSessions.value = "1";
      const searchInput = modalFields.querySelector('[data-action="buyCourseSearch"]');
      if (searchInput) searchInput.value = "";
      modalFields.querySelectorAll(".buy-course-option").forEach((option) => {
        option.hidden = false;
      });
      const result = modalFields.querySelector("#buySearchResult");
      if (result) result.textContent = "เพิ่มรายการใหม่แล้ว และเลือกให้อัตโนมัติ";
      updateBuySummary();
      await saveState({ immediate: true });
      return;
    }
    if (event.target.closest("#proceedPayment")) showPaymentStep();
  };
  modalFields.oninput = (event) => {
    if (!modalFields.querySelector(".buy-course-layout")) return;
    if (event.target.name === "paidAmount") event.target.dataset.touched = "true";
    if (event.target.dataset.action === "buyCourseSearch") {
      const query = event.target.value.trim().toLowerCase();
      let visibleCount = 0;
      modalFields.querySelectorAll(".buy-course-option").forEach((option) => {
        const matched = !query || String(option.dataset.search || "").includes(query);
        option.hidden = !matched;
        if (matched) visibleCount += 1;
      });
      const result = modalFields.querySelector("#buySearchResult");
      if (result) result.textContent = query ? `พบ ${visibleCount} รายการ` : "";
      return;
    }
    updateBuySummary();
  };
  updateBuySummary();
  modalSave.onclick = (event) => {
    event.preventDefault();
    if (!paymentStep) {
      showPaymentStep();
      return;
    }
    const form = new FormData(modal.querySelector("form"));
    const selectedIds = form.getAll("catalogId");
    if (!selectedIds.length) {
      alert("กรุณาเลือกรายการบริการ/คอร์สอย่างน้อย 1 รายการ");
      return;
    }
    const purchased = selectedIds.map((id, index) => {
      const selected = catalog.find((item) => item.id === id);
      const qty = Math.max(1, Number(form.get(`qty-${id}`) || 1));
      return selected ? { selected, qty, index } : null;
    }).filter(Boolean);
    const subtotal = purchased.reduce((sum, row) => sum + Number(row.selected.price || 0) * row.qty, 0);
    const discount = Math.min(Math.max(0, Number(form.get("discount") || 0)), subtotal);
    const net = subtotal - discount;
    const paidAmount = Math.min(Math.max(0, Number(form.get("paidAmount") || 0)), net);
    state.courses = [...purchased.map(({ selected, qty, index }) => ({
      id: `${nextId}-${index + 1}`,
      patient: patient.name,
      course: selected.name,
      service: selected.category,
      total: Number(selected.sessions || 1) * qty,
      used: 0,
      startDate: String(form.get("startDate") || todayIso),
      nextDate: String(form.get("nextDate") || ""),
      status: "ใช้งานอยู่",
      price: Number(selected.price || 0) * qty,
      catalogId: selected.id
    })), ...state.courses];
    const bill = {
      id: `B-${String(Date.now()).slice(-6)}`,
      patient: patient.name,
      date: String(form.get("startDate") || todayIso),
      item: purchased.map(({ selected, qty }) => `${selected.name} x${qty}`).join(", "),
      amount: net,
      subtotal,
      discount,
      paidAmount,
      paymentMethod: String(form.get("paymentMethod") || "เงินสด"),
      seller: String(form.get("seller") || ""),
      status: paidAmount >= net ? "ชำระแล้ว" : "รอชำระ"
    };
    state.billing = [bill, ...state.billing];
    patientDetailTab = "courses";
    saveState();
    render();
    modalTitle.textContent = "ใบเสร็จรับเงิน";
    modalFields.onclick = null;
    modalFields.oninput = null;
    modalFields.innerHTML = renderReceipt(patient, purchased, bill);
    modalFields.onclick = (receiptEvent) => {
      if (receiptEvent.target.closest('[data-action="printReceipt"]')) window.print();
      if (receiptEvent.target.closest('[data-action="saveReceiptImage"]')) saveReceiptAsImage();
    };
    modalSave.textContent = "ปิด";
    modalSave.onclick = (closeEvent) => {
      closeEvent.preventDefault();
      modal.close();
      render();
    };
  };
  modal.showModal();
}

function openPayOutstandingCourse(courseId) {
  const course = state.courses.find((item) => item.id === courseId);
  if (!course) return;
  const bills = pendingBillsForCourse(course);
  const totalDue = bills.reduce((sum, bill) => sum + billOutstandingAmount(bill), 0);
  if (!bills.length || totalDue <= 0) {
    alert("คอร์สนี้ไม่มีรายการค้างชำระ");
    return;
  }
  const patient = patientByName(course.patient);
  modalTitle.textContent = "ชำระเงินค้าง";
  modalSave.textContent = "ยืนยันรับชำระ";
  modalFields.onclick = null;
  modalFields.oninput = null;
  modalFields.innerHTML = `
    <div class="payment-settle">
      <div class="settle-summary">
        <span>ลูกค้า</span>
        <strong>${escapeHtml(course.patient)}</strong>
        <span>คอร์ส</span>
        <strong>${escapeHtml(course.course)}</strong>
        <span>ยอดค้างทั้งหมด</span>
        <b>${money(totalDue)}</b>
      </div>
      <div class="pending-bill-list">
        ${bills.map((bill) => `<div><span>${escapeHtml(bill.id)} · ${escapeHtml(bill.item)}</span><strong>${money(billOutstandingAmount(bill))}</strong></div>`).join("")}
      </div>
      <div class="field full">
        <label>ช่องทางชำระเงิน</label>
        <div class="payment-methods">
          <label><input type="radio" name="paymentMethod" value="เงินสด" checked><span>เงินสด</span></label>
          <label><input type="radio" name="paymentMethod" value="โอนเงิน"><span>โอนเงิน</span></label>
          <label><input type="radio" name="paymentMethod" value="บัตรเครดิต"><span>บัตรเครดิต</span></label>
        </div>
      </div>
      <div class="field">
        <label>ยอดรับเงิน</label>
        <input name="paidAmount" type="number" min="0" max="${totalDue}" value="${totalDue}" required>
      </div>
      <div class="field">
        <label>วันที่รับชำระ</label>
        <input name="paymentDate" type="date" value="${todayIso}" required>
      </div>
      <div class="field full">
        <label>ผู้ขาย / ผู้รับเงิน</label>
        <input name="seller" value="แพทริเซียคลินิกเวชกรรมเพชรบุรี-บ้านแหลม">
      </div>
    </div>
  `;
  modalFields.oninput = (event) => {
    if (event.target.name !== "paidAmount") return;
    const value = Math.max(0, Math.min(Number(event.target.value || 0), totalDue));
    event.target.value = String(value);
  };
  modalSave.onclick = (event) => {
    event.preventDefault();
    const form = new FormData(modal.querySelector("form"));
    let remainingPayment = Math.max(0, Math.min(Number(form.get("paidAmount") || 0), totalDue));
    if (remainingPayment <= 0) {
      alert("กรุณาใส่ยอดรับเงิน");
      return;
    }
    const paymentDate = String(form.get("paymentDate") || todayIso);
    const paymentMethod = String(form.get("paymentMethod") || "เงินสด");
    const seller = String(form.get("seller") || "");
    const paidBillIds = new Set(bills.map((bill) => bill.id));
    const paidLines = [];
    state.billing = state.billing.map((bill) => {
      if (!paidBillIds.has(bill.id) || remainingPayment <= 0) return bill;
      const due = billOutstandingAmount(bill);
      const payNow = Math.min(due, remainingPayment);
      remainingPayment -= payNow;
      paidLines.push({ bill, payNow });
      const nextPaid = Number(bill.paidAmount || 0) + payNow;
      return {
        ...bill,
        paidAmount: nextPaid,
        paymentMethod,
        seller,
        paidDate: paymentDate,
        status: nextPaid >= Number(bill.amount || 0) ? "ชำระแล้ว" : "รอชำระ"
      };
    });
    const received = paidLines.reduce((sum, line) => sum + line.payNow, 0);
    const receiptBill = {
      id: `B-PAY-${String(Date.now()).slice(-6)}`,
      patient: course.patient,
      date: paymentDate,
      item: `รับชำระยอดค้าง ${course.course}`,
      amount: totalDue,
      subtotal: totalDue,
      discount: 0,
      paidAmount: received,
      paymentMethod,
      seller,
      status: received >= totalDue ? "ชำระแล้ว" : "รอชำระ"
    };
    const receiptItems = paidLines.map(({ bill, payNow }) => ({
      selected: { name: bill.item || course.course, price: payNow, sessions: 1 },
      qty: 1
    }));
    saveState();
    patientDetailTab = "courses";
    render();
    modalTitle.textContent = "ใบเสร็จรับเงิน";
    modalFields.onclick = null;
    modalFields.oninput = null;
    modalFields.innerHTML = renderReceipt(patient, receiptItems, receiptBill);
    modalFields.onclick = (receiptEvent) => {
      if (receiptEvent.target.closest('[data-action="printReceipt"]')) window.print();
      if (receiptEvent.target.closest('[data-action="saveReceiptImage"]')) saveReceiptAsImage();
    };
    modalSave.textContent = "ปิด";
    modalSave.onclick = (closeEvent) => {
      closeEvent.preventDefault();
      modal.close();
      render();
    };
  };
  modal.showModal();
}

function openPayOutstandingBill(billId) {
  const bill = state.billing.find((item) => item.id === billId);
  if (!bill) return;
  const totalDue = billOutstandingAmount(bill);
  if (totalDue <= 0) {
    alert("ใบเสร็จนี้ไม่มีรายการค้างชำระ");
    return;
  }
  const patient = patientByName(bill.patient);
  const paidBefore = Number(bill.paidAmount || 0);
  modalTitle.textContent = "อัปเดตยอดค้างชำระ";
  modalSave.textContent = "ยืนยันรับชำระ";
  modalFields.onclick = null;
  modalFields.oninput = null;
  modalFields.innerHTML = `
    <div class="payment-settle">
      <div class="settle-summary">
        <span>ลูกค้า</span>
        <strong>${escapeHtml(bill.patient || "-")}</strong>
        <span>ใบเสร็จ</span>
        <strong>${escapeHtml(bill.id || "-")}</strong>
        <span>ยอดค้าง</span>
        <b>${money(totalDue)}</b>
      </div>
      <div class="pending-bill-list">
        <div><span>รายการ</span><strong>${escapeHtml(bill.item || "-")}</strong></div>
        <div><span>ยอดสุทธิ</span><strong>${money(bill.amount || 0)}</strong></div>
        <div><span>รับแล้ว</span><strong>${money(paidBefore)}</strong></div>
      </div>
      <div class="field full">
        <label>ช่องทางชำระเงิน</label>
        <div class="payment-methods">
          <label><input type="radio" name="paymentMethod" value="เงินสด" ${bill.paymentMethod === "เงินสด" || !bill.paymentMethod ? "checked" : ""}><span>เงินสด</span></label>
          <label><input type="radio" name="paymentMethod" value="โอนเงิน" ${bill.paymentMethod === "โอนเงิน" ? "checked" : ""}><span>โอนเงิน</span></label>
          <label><input type="radio" name="paymentMethod" value="บัตรเครดิต" ${bill.paymentMethod === "บัตรเครดิต" ? "checked" : ""}><span>บัตรเครดิต</span></label>
        </div>
      </div>
      <div class="field">
        <label>ยอดรับเงินครั้งนี้</label>
        <input name="paidAmount" type="number" min="0" max="${totalDue}" value="${totalDue}" required>
      </div>
      <div class="field">
        <label>วันที่รับชำระ</label>
        <input name="paymentDate" type="date" value="${todayIso}" required>
      </div>
      <div class="field full">
        <label>ผู้ขาย / ผู้รับเงิน</label>
        <input name="seller" value="${escapeHtml(bill.seller || "แพทริเซียคลินิกเวชกรรมเพชรบุรี-บ้านแหลม")}">
      </div>
    </div>
  `;
  modalFields.oninput = (event) => {
    if (event.target.name !== "paidAmount") return;
    const value = Math.max(0, Math.min(Number(event.target.value || 0), totalDue));
    event.target.value = String(value);
  };
  modalSave.onclick = (event) => {
    event.preventDefault();
    const form = new FormData(modal.querySelector("form"));
    const payNow = Math.max(0, Math.min(Number(form.get("paidAmount") || 0), totalDue));
    if (payNow <= 0) {
      alert("กรุณาใส่ยอดรับเงิน");
      return;
    }
    const paymentDate = String(form.get("paymentDate") || todayIso);
    const paymentMethod = String(form.get("paymentMethod") || "เงินสด");
    const seller = String(form.get("seller") || "");
    const nextPaid = paidBefore + payNow;
    state.billing = state.billing.map((item) => item.id === bill.id ? {
      ...item,
      paidAmount: nextPaid,
      paymentMethod,
      seller,
      paidDate: paymentDate,
      status: nextPaid >= Number(item.amount || 0) ? "ชำระแล้ว" : "รอชำระ"
    } : item);
    const receiptBill = {
      id: `B-PAY-${String(Date.now()).slice(-6)}`,
      patient: bill.patient,
      date: paymentDate,
      item: `รับชำระยอดค้าง ${bill.item || bill.id}`,
      amount: payNow,
      subtotal: payNow,
      discount: 0,
      paidAmount: payNow,
      paymentMethod,
      seller,
      status: "ชำระแล้ว"
    };
    const receiptItems = [{
      selected: { name: bill.item || "รับชำระยอดค้าง", price: payNow, sessions: 1 },
      qty: 1
    }];
    saveState();
    render();
    modalTitle.textContent = "ใบเสร็จรับเงิน";
    modalFields.onclick = null;
    modalFields.oninput = null;
    modalFields.innerHTML = renderReceipt(patient, receiptItems, receiptBill);
    modalFields.onclick = (receiptEvent) => {
      if (receiptEvent.target.closest('[data-action="printReceipt"]')) window.print();
      if (receiptEvent.target.closest('[data-action="saveReceiptImage"]')) saveReceiptAsImage();
    };
    modalSave.textContent = "ปิด";
    modalSave.onclick = (closeEvent) => {
      closeEvent.preventDefault();
      modal.close();
      render();
    };
  };
  modal.showModal();
}

function renderReceipt(patient, purchased, bill) {
  const dateLabel = new Date(`${bill.date}T00:00:00`).toLocaleDateString("th-TH", { day: "2-digit", month: "2-digit", year: "numeric" });
  const change = Math.max(Number(bill.paidAmount || 0) - Number(bill.amount || 0), 0);
  const due = Math.max(Number(bill.amount || 0) - Number(bill.paidAmount || 0), 0);
  return `
    <div class="receipt-actions">
      <button type="button" class="secondary" data-action="printReceipt">${icons.wallet}พิมพ์</button>
      <button type="button" data-action="saveReceiptImage">${icons.notes}บันทึกเป็นรูป</button>
    </div>
    <section class="receipt">
      <div class="receipt-top">
        <div>
          <img class="receipt-logo-image" src="assets/logo.jpg" alt="แพทริเซียคลินิก">
          <h2>แพทริเซียคลินิกเวชกรรมเพชรบุรี-บ้านแหลม</h2>
          <p>300/8 หมู่ 9 ต.บ้านแหลม<br>อ.บ้านแหลม จ.เพชรบุรี 76110<br><strong>มือถือ: 092-8355559</strong></p>
        </div>
        <div class="receipt-box">
          <strong>ใบเสร็จรับเงิน</strong>
          <span>ต้นฉบับ</span>
          <small>${escapeHtml(bill.id)}</small>
        </div>
      </div>
      <div class="receipt-meta">
        <div><span>ชื่อ:</span><strong>${escapeHtml(patient.name)}</strong></div>
        <div><span>HN:</span><strong>${escapeHtml(patient.id)}</strong></div>
        <div><span>วันที่:</span><strong>${dateLabel}</strong></div>
        <div><span>ชำระโดย:</span><strong>${escapeHtml(bill.paymentMethod || "-")}</strong></div>
      </div>
      <table class="receipt-table">
        <thead><tr><th>รายการ</th><th>จำนวน</th><th>ราคา/หน่วย</th><th>ส่วนลด</th><th>ราคาสุทธิ</th></tr></thead>
        <tbody>
          ${purchased.map(({ selected, qty }) => {
            const lineTotal = Number(selected.price || 0) * qty;
            return `<tr><td><strong>${escapeHtml(selected.name)}</strong><br><span>${Number(selected.sessions || 1) * qty} ครั้ง</span></td><td>${qty}</td><td>${money(selected.price)}</td><td>-</td><td>${money(lineTotal)}</td></tr>`;
          }).join("")}
        </tbody>
      </table>
      <div class="receipt-summary">
        <div><span>รวมมูลค่าสินค้า/บริการ:</span><strong>${money(bill.subtotal || bill.amount)}</strong></div>
        <div><span>ส่วนลดท้ายบิล:</span><strong>${money(bill.discount || 0)}</strong></div>
        <div class="net"><span>ยอดชำระสุทธิ:</span><strong>${money(bill.amount)}</strong></div>
        <div><span>ยอดรับเงิน:</span><strong>${money(bill.paidAmount || 0)}</strong></div>
        <div><span>เงินทอน:</span><strong>${money(change)}</strong></div>
        <div><span>ค้างชำระ:</span><strong>${money(due)}</strong></div>
      </div>
      <div class="receipt-footer">
        <span>ผู้ขาย: ${escapeHtml(bill.seller || "-")}</span>
        <span>สถานะ: ${escapeHtml(bill.status)}</span>
      </div>
      <div class="receipt-signatures">
        <div>
          <span></span>
          <strong>ลายมือชื่อผู้ขาย</strong>
        </div>
        <div>
          <span></span>
          <strong>ลายมือชื่อผู้รับบริการ</strong>
        </div>
      </div>
    </section>`;
}

function inlineReceiptStyles(source, target) {
  const computed = getComputedStyle(source);
  const properties = [
    "align-items", "background", "border", "border-bottom", "border-radius", "box-sizing", "color",
    "display", "font-family", "font-size", "font-weight", "gap", "grid-template-columns", "height",
    "justify-content", "line-height", "margin", "margin-bottom", "margin-left", "margin-top",
    "object-fit", "padding", "padding-bottom", "padding-top", "text-align", "width"
  ];
  target.setAttribute("style", properties.map((name) => `${name}:${computed.getPropertyValue(name)}`).join(";"));
  [...source.children].forEach((child, index) => {
    if (target.children[index]) inlineReceiptStyles(child, target.children[index]);
  });
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function inlineReceiptImages(node) {
  const images = [...node.querySelectorAll("img")];
  await Promise.all(images.map(async (image) => {
    if (!image.src || image.src.startsWith("data:")) return;
    try {
      const response = await fetch(image.src, { cache: "force-cache" });
      if (!response.ok) throw new Error("Image load failed");
      image.src = await blobToDataUrl(await response.blob());
    } catch (error) {
      console.warn(error.message);
    }
  }));
}

function canvasToBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

function downloadReceiptImage(blob) {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = `patriciaclinic-receipt-${Date.now()}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  alert("บันทึกรูปใบเสร็จสำเร็จแล้ว");
}

function loadHtml2Canvas() {
  if (window.html2canvas) return Promise.resolve(window.html2canvas);
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
    script.async = true;
    script.onload = () => window.html2canvas ? resolve(window.html2canvas) : reject(new Error("html2canvas unavailable"));
    script.onerror = () => reject(new Error("html2canvas load failed"));
    document.head.appendChild(script);
  });
}

async function saveReceiptAsImage() {
  const receipt = modalFields.querySelector(".receipt");
  if (!receipt) return;
  let exportSource = null;
  const saveButton = modalFields.querySelector('[data-action="saveReceiptImage"]');
  try {
    if (saveButton) {
      saveButton.disabled = true;
      saveButton.dataset.originalHtml = saveButton.innerHTML;
      saveButton.textContent = "กำลังบันทึก...";
    }
    const renderToCanvas = await loadHtml2Canvas();
    exportSource = receipt.cloneNode(true);
    exportSource.classList.add("receipt-mobile-export");
    exportSource.style.position = "fixed";
    exportSource.style.left = "-9999px";
    exportSource.style.top = "0";
    exportSource.style.zIndex = "9999";
    document.body.appendChild(exportSource);
    await inlineReceiptImages(exportSource);
    const canvas = await renderToCanvas(exportSource, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      width: exportSource.scrollWidth,
      height: exportSource.scrollHeight,
      windowWidth: 420
    });
    const blob = await canvasToBlob(canvas);
    if (!blob) throw new Error("ไม่สามารถบันทึกไฟล์รูปได้");
    downloadReceiptImage(blob);
  } catch (error) {
    console.warn(error.message);
    alert("บันทึกรูปใบเสร็จไม่สำเร็จ กรุณาตรวจอินเทอร์เน็ตแล้วลองใหม่อีกครั้ง");
  } finally {
    if (exportSource) exportSource.remove();
    if (saveButton) {
      saveButton.disabled = false;
      saveButton.innerHTML = saveButton.dataset.originalHtml || "บันทึกเป็นรูป";
      delete saveButton.dataset.originalHtml;
    }
  }
}

async function removeItem(view, id) {
  if (!confirm("ต้องการลบรายการนี้ใช่ไหม")) return;
  state[view] = state[view].filter((row) => row.id !== id);
  if (view === "serviceCatalog") {
    state.deletedServiceCatalogIds = [...new Set([...(state.deletedServiceCatalogIds || []), id])];
    state = normalizeState(state);
  }
  try {
    await saveState({ immediate: true });
  } catch (error) {
    console.warn(error.message);
    alert("บันทึกการลบขึ้น Supabase ไม่สำเร็จ กรุณาตรวจอินเทอร์เน็ตแล้วลองอีกครั้ง");
  }
  if (view === "serviceCatalog") currentView = "services";
  render();
}

function render() {
  setHeader();
  renderNav();
  if (currentView === "dashboard") contentEl.innerHTML = renderDashboard();
  else if (currentView === "ownerSummary") contentEl.innerHTML = renderTodayOwnerSummary();
  else if (currentView === "dailyReport") contentEl.innerHTML = renderDailyReport();
  else if (currentView === "patients") contentEl.innerHTML = renderPatientsCenter();
  else if (currentView === "financeSummary") contentEl.innerHTML = renderFinanceSummary();
  else if (currentView === "outstanding") contentEl.innerHTML = renderOutstandingPayments();
  else if (currentView === "courses") contentEl.innerHTML = renderCourseDeductionManager();
  else if (currentView === "services") contentEl.innerHTML = renderServiceCatalogManager();
  else if (currentView === "salesAnalysis") contentEl.innerHTML = renderSalesAnalysis();
  else contentEl.innerHTML = renderListView(currentView);
}

navEl.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-view]");
  if (button) setView(button.dataset.view);
});

contentEl.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) {
    const row = event.target.closest("tr[data-action='viewPatient']");
    if (row) {
      selectedPatientId = row.dataset.id;
      patientDetailTab = "records";
      render();
    }
    return;
  }
  if (button.dataset.view && !button.dataset.action) setView(button.dataset.view);
  if (button.dataset.filter) {
    activeFilter = button.dataset.filter;
    render();
  }
  if (button.dataset.action === "catalogFilter") {
    activeFilter = button.dataset.filter;
    render();
  }
  if (button.dataset.action === "dashboardPeriod") {
    dashboardPeriod = button.dataset.period;
    render();
  }
  if (button.dataset.action === "outstandingPeriod") {
    outstandingPeriod = button.dataset.period || "all";
    render();
  }
  if (button.dataset.action === "salesAllMonths") {
    salesAnalysisMonths = [];
    render();
  }
  if (button.dataset.action === "salesMonthToggle") {
    const month = button.dataset.month;
    const current = salesAnalysisMonths.length ? [...salesAnalysisMonths] : Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, "0"));
    salesAnalysisMonths = current.includes(month)
      ? current.filter((item) => item !== month)
      : [...current, month].sort();
    if (salesAnalysisMonths.length === 12) salesAnalysisMonths = [];
    render();
  }
  if (button.dataset.action === "printDailyReport") printDailyReport();
  if (button.dataset.action === "add") openForm(button.dataset.view);
  if (button.dataset.action === "viewPatient") {
    selectedPatientId = button.dataset.id;
    patientDetailTab = "records";
    render();
  }
  if (button.dataset.action === "backPatients") {
    selectedPatientId = null;
    render();
  }
  if (button.dataset.action === "patientTab") {
    patientDetailTab = button.dataset.tab;
    render();
  }
  if (button.dataset.action === "buyCourse") openBuyCourse(button.dataset.patientId);
  if (button.dataset.action === "viewCoursePatient") {
    const patient = patientByName(button.dataset.patient || "");
    selectedPatientId = patient.id;
    patientDetailTab = "courses";
    currentView = "patients";
    render();
  }
  if (button.dataset.action === "payOutstandingCourse") openPayOutstandingCourse(button.dataset.id);
  if (button.dataset.action === "payOutstandingBill") openPayOutstandingBill(button.dataset.id);
  if (button.dataset.action === "viewReceipt") openReceiptFromBill(button.dataset.id);
  if (button.dataset.action === "deduct") openDeductCourse(button.dataset.id);
  if (button.dataset.action === "edit") openForm(button.dataset.view, button.dataset.id);
  if (button.dataset.action === "delete") removeItem(button.dataset.view, button.dataset.id);
});

contentEl.addEventListener("input", (event) => {
  if (event.target.dataset.action === "catalogSearch") {
    searchTerm = event.target.value.trim();
    render();
    setTimeout(() => {
      const input = contentEl.querySelector('[data-action="catalogSearch"]');
      if (!input) return;
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }, 0);
    return;
  }
  if (event.target.dataset.action === "courseSearch") {
    searchTerm = event.target.value.trim();
    render();
    setTimeout(() => {
      const input = contentEl.querySelector('[data-action="courseSearch"]');
      if (!input) return;
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }, 0);
    return;
  }
  if (event.target.dataset.action !== "patientSearch") return;
  searchTerm = event.target.value.trim();
  selectedPatientId = null;
  render();
  setTimeout(() => {
    const input = contentEl.querySelector('[data-action="patientSearch"]');
    if (!input) return;
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }, 0);
});

contentEl.addEventListener("change", (event) => {
  if (event.target.dataset.action === "dashboardPeriodSelect") {
    dashboardPeriod = event.target.value;
    render();
  }
  if (event.target.dataset.action === "dashboardPaymentSelect") {
    dashboardPaymentMethod = event.target.value;
    render();
  }
  if (event.target.dataset.action === "weeklySalesDaysSelect") {
    weeklySalesDays = Number(event.target.value || 7);
    render();
  }
  if (event.target.dataset.action === "salesYearSelect") {
    salesAnalysisYear = event.target.value;
    render();
  }
  if (event.target.dataset.action === "dailyReportDate") {
    dailyReportDate = event.target.value || todayIso;
    render();
  }
});

document.querySelector("#globalSearch").addEventListener("input", (event) => {
  searchTerm = event.target.value.trim();
  if (currentView === "dashboard" || currentView === "ownerSummary" || currentView === "dailyReport" || currentView === "financeSummary" || currentView === "salesAnalysis") currentView = "patients";
  render();
});

const todayLabel = document.querySelector("#todayLabel");
if (todayLabel) {
  todayLabel.textContent = today.toLocaleDateString("th-TH", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(loginForm);
  const username = String(form.get("username") || "").trim();
  const password = String(form.get("password") || "");
  if (validUsers.some((user) => username === user.username && password === user.password)) {
    localStorage.setItem(authKey, "active");
    loginError.textContent = "";
    loginForm.reset();
    setAuthView();
    render();
    return;
  }
  loginError.textContent = "ยูสเซอร์หรือพาสเวิร์ดไม่ถูกต้อง";
});

logoutButton.addEventListener("click", () => {
  localStorage.removeItem(authKey);
  setAuthView();
});

setAuthView();
render();
hydrateStateFromSupabase();
