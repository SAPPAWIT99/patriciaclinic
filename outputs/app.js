const storageKey = "patriciaclinic-state-v1";
const authKey = "patriciaclinic-auth-v1";
const validUser = { username: "Patricia", password: "p5559" };
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
  ["dashboard", "แดชบอร์ด", "ภาพรวมการให้บริการ"],
  ["ownerSummary", "ภาพรวมวันนี้", "สรุปบริการ คอร์ส และยอดเงินประจำวัน"],
  ["queue", "คิวตรวจ", "จัดลำดับผู้รับบริการ"],
  ["appointments", "นัดหมาย", "ตารางแพทย์และห้องตรวจ"],
  ["patients", "ลูกค้า", "ศูนย์กลางข้อมูล ประวัติรักษา และคอร์ส"],
  ["records", "เวชระเบียน", "ข้อมูลประวัติคนไข้และสุขภาพ"],
  ["billing", "การเงิน", "ใบเสร็จและยอดค้างชำระ"],
  ["financeSummary", "สรุปการเงิน", "ยอดรายวัน รายเดือน และรายปี"],
  ["courses", "บริการ & คอร์ส", "ติดตามคอร์สลูกค้าและจำนวนครั้งคงเหลือ"],
  ["inventory", "คลังยา", "ยา เวชภัณฑ์ และแจ้งเตือนสต็อก"],
  ["staff", "บุคลากร", "แพทย์ พยาบาล และสิทธิ์ใช้งาน"]
];

const menuIcons = {
  dashboard: icons.dashboard,
  ownerSummary: icons.chart,
  queue: icons.queue,
  appointments: icons.calendar,
  patients: icons.users,
  records: icons.notes,
  billing: icons.wallet,
  financeSummary: icons.chart,
  courses: icons.course,
  inventory: icons.box,
  staff: icons.staff
};

const today = new Date();
const todayIso = today.toISOString().slice(0, 10);

const seedState = {
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
    { id: "SV-001", name: "จี้กระ", category: "ทรีทเม้นท์/เครื่อง", price: 1999, sessions: 1, status: "เปิดขาย" },
    { id: "SV-002", name: "จี้แมงมุม (เหมา)", category: "ทรีทเม้นท์/เครื่อง", price: 1599, sessions: 1, status: "เปิดขาย" },
    { id: "SV-003", name: "จี้แมงมุม", category: "ทรีทเม้นท์/เครื่อง", price: 200, sessions: 1, status: "เปิดขาย" },
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

function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return structuredClone(seedState);
  try {
    return { ...structuredClone(seedState), ...JSON.parse(saved) };
  } catch {
    return structuredClone(seedState);
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
  queueSupabaseSave();
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
  const endpoint = `${supabaseConfig.url}/rest/v1/${supabaseConfig.table}?id=eq.${encodeURIComponent(supabaseConfig.recordId)}&select=data`;
  const response = await fetch(endpoint, { headers: supabaseHeaders() });
  if (!response.ok) throw new Error(`Supabase load failed: ${response.status}`);
  const rows = await response.json();
  return rows[0]?.data || null;
}

async function saveStateToSupabase() {
  if (!hasSupabaseConfig()) return;
  const endpoint = `${supabaseConfig.url}/rest/v1/${supabaseConfig.table}?on_conflict=id`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { ...supabaseHeaders(), Prefer: "resolution=merge-duplicates" },
    body: JSON.stringify({
      id: supabaseConfig.recordId,
      data: state,
      updated_at: new Date().toISOString()
    })
  });
  if (!response.ok) throw new Error(`Supabase save failed: ${response.status}`);
}

let supabaseSaveTimer = null;

function queueSupabaseSave() {
  if (!hasSupabaseConfig()) return;
  clearTimeout(supabaseSaveTimer);
  supabaseSaveTimer = setTimeout(() => {
    saveStateToSupabase().catch((error) => console.warn(error.message));
  }, 450);
}

async function hydrateStateFromSupabase() {
  if (!hasSupabaseConfig()) return;
  try {
    const remoteState = await loadStateFromSupabase();
    if (remoteState) {
      state = { ...structuredClone(seedState), ...remoteState };
      localStorage.setItem(storageKey, JSON.stringify(state));
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
      <button title="แก้ไข" aria-label="แก้ไข" data-action="edit" data-view="${view}" data-id="${row.id}">${icons.edit}</button>
      <button class="danger" title="ลบ" aria-label="ลบ" data-action="delete" data-view="${view}" data-id="${row.id}">${icons.trash}</button>
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

function billChartKey(dateString, period) {
  if (period === "day" || period === "week") return dateString;
  if (period === "month") {
    const day = Number(dateString.slice(8, 10));
    return String(Math.min(Math.ceil(day / 7), 4));
  }
  return dateString.slice(0, 7);
}

function renderSalesBarChart(bills, period) {
  const labels = chartLabelsForPeriod(period);
  const totals = labels.map((label) => {
    const amount = bills
      .filter((item) => billChartKey(item.date, period) === label.key)
      .reduce((sum, item) => sum + Number(item.paidAmount || item.amount || 0), 0);
    return { ...label, amount };
  });
  const max = Math.max(...totals.map((item) => item.amount), 1);
  return `<div class="sales-chart">
    <div class="chart-axis"><span>฿100k</span><span>฿75k</span><span>฿50k</span><span>฿25k</span><span>฿0k</span></div>
    <div class="chart-bars">
      ${totals.map((item) => `<div class="chart-bar"><i style="height:${Math.max((item.amount / max) * 100, item.amount ? 4 : 0)}%"></i><span>${escapeHtml(item.label)}</span></div>`).join("")}
    </div>
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
  const paidPeriodBills = periodBills.filter((item) => item.status === "ชำระแล้ว" || Number(item.paidAmount || 0) > 0);
  const income = paidPeriodBills.reduce((sum, item) => sum + Number(item.paidAmount || item.amount || 0), 0);
  const pending = periodBills.reduce((sum, item) => sum + Math.max(Number(item.amount || 0) - Number(item.paidAmount || 0), 0), 0);
  const lowStock = state.inventory.filter((item) => Number(item.qty) <= Number(item.reorder)).length;
  return `
    <section class="hero-strip">
      <div>
        <h2>แพทริเซียคลินิกเวชกรรมเพชรบุรี-บ้านแหลม</h2>
        <p>ติดตามคิว นัดหมาย เวชระเบียน รายรับ และสต็อก ในหน้าจอเดียว</p>
      </div>
      <button data-view="queue">${icons.queue}จัดการคิว</button>
    </section>
    ${renderClinicShowcase()}
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
    <section class="grid stats">
      ${stat("ลูกค้าทั้งหมด", state.patients.length, "+3 รายในสัปดาห์นี้")}
      ${stat("คิวที่ต้องดูแล", waiting, "อัปเดตแบบเรียลไทม์")}
      ${stat("นัดหมายวันนี้", todayApps, "พร้อมเข้าห้องตรวจ")}
      ${stat(`รายรับ${periodLabel(dashboardPeriod)}`, money(income), pending ? `ค้างชำระ ${money(pending)}` : "ชำระครบ")}
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
        <div class="panel-head"><h2>สถานะช่วงนี้</h2><button data-view="billing" class="secondary">ดูการเงิน</button></div>
        <div class="summary-stack">
          <article><span>ยอดรับชำระ</span><strong>${money(income)}</strong></article>
          <article><span>ยอดค้างชำระ</span><strong>${money(pending)}</strong></article>
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
  const maxMonth = Math.max(...monthNames.map((item) => item.amount), 1);
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
        <div class="finance-chart">
          ${monthNames.map((item) => `
            <div class="bar-row">
              <span>${item.label}</span>
              <div class="bar-track"><i style="width:${Math.max((item.amount / maxMonth) * 100, item.amount ? 8 : 0)}%"></i></div>
              <strong>${money(item.amount)}</strong>
            </div>
          `).join("")}
        </div>
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

function stat(label, value, note) {
  return `<article class="card stat"><span>${label}</span><strong>${value}</strong><b>${note}</b></article>`;
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
    <tr>
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
          <button title="ดูรายละเอียด" aria-label="ดูรายละเอียด" data-action="viewPatient" data-id="${patient.id}">${icons.eye}</button>
          <button title="แก้ไข" aria-label="แก้ไข" data-action="edit" data-view="patients" data-id="${patient.id}">${icons.edit}</button>
          <button class="danger" title="ลบ" aria-label="ลบ" data-action="delete" data-view="patients" data-id="${patient.id}">${icons.trash}</button>
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
    courses: renderPatientCourses(courses),
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

function renderPatientCourses(courses) {
  if (!courses.length) return emptyState();
  return `<div class="inventory-list">${courses.map((course) => `<article class="inventory-item course-detail-item">
    <div>
      <strong>${escapeHtml(course.course)}</strong>
      <span class="muted">${escapeHtml(course.service)} · ใช้แล้ว ${course.used}/${course.total} · เหลือ ${courseRemaining(course)} ครั้ง</span>
    </div>
    ${courseProgress(course)}
    <div class="course-item-actions">
      ${badge(courseStatus(course))}
      <button class="deduct-button course-deduct-action" title="ตัดคอร์ส / ใช้บริการ" aria-label="ตัดคอร์ส / ใช้บริการ" data-action="deduct" data-id="${course.id}" ${courseRemaining(course) <= 0 ? "disabled" : ""}>${icons.deduct}<span>ตัดคอร์ส / ใช้บริการ</span></button>
      <button class="danger icon-button" title="ลบคอร์ส" aria-label="ลบคอร์ส" data-action="delete" data-view="courses" data-id="${course.id}">${icons.trash}</button>
    </div>
  </article>`).join("")}</div>`;
}

function renderPatientHistory(patient, records, courses) {
  const bills = state.billing.filter((item) => item.patient === patient.name);
  const rows = [
    ...bills.map((item) => ({ date: item.date, text: `${item.item} · ${money(item.amount)}`, type: item.status })),
    ...courses.map((item) => ({ date: item.startDate, text: `ซื้อคอร์ส ${item.course}`, type: courseStatus(item) })),
    ...records.map((item) => ({ date: item.date, text: `บันทึกเวชระเบียน`, type: "ข้อมูล" }))
  ].sort((a, b) => String(b.date).localeCompare(String(a.date)));
  if (!rows.length) return emptyState();
  return `<div class="timeline">${rows.map((row) => `<article class="timeline-item"><strong>${escapeHtml(row.date || "-")}</strong><span>${escapeHtml(row.text)}</span>${badge(row.type)}</article>`).join("")}</div>`;
}

function renderPatientAppointments(appointments) {
  if (!appointments.length) return emptyState();
  return `<div class="timeline">${appointments.map((item) => `<article class="timeline-item"><strong>${escapeHtml(item.date)} · ${escapeHtml(item.time)}</strong><span>${escapeHtml(item.service)} · ${escapeHtml(item.doctor)}</span>${badge(item.status)}</article>`).join("")}</div>`;
}

function syncPatientFromRecord(record) {
  const name = recordFullName(record);
  if (!name || name === "-") return;
  const existing = state.patients.find((patient) => patient.name === name || (record.phone && patient.phone === record.phone));
  const patientData = {
    id: existing?.id || `HN-${String(Date.now()).slice(-6)}`,
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
  if (!state.serviceCatalog) state.serviceCatalog = structuredClone(seedState.serviceCatalog);
  return state.serviceCatalog;
}

function renderServicesAndCourses() {
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
        <h2>บริการ & คอร์ส</h2>
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
    </section>
    <section class="panel" style="margin-top:18px">
      <div class="panel-head">
        <h2>คอร์สที่ลูกค้าซื้อแล้ว</h2>
        <button data-action="add" data-view="courses">${icons.plus}เพิ่มคอร์สลูกค้า</button>
      </div>
      ${table(viewConfig.courses.columns, state.courses.filter(matchesSearch), "courses")}
    </section>`;
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
      <button title="แก้ไข" aria-label="แก้ไข" data-action="edit" data-view="serviceCatalog" data-id="${item.id}">${icons.edit}</button>
      <button class="danger" title="ลบ" aria-label="ลบ" data-action="delete" data-view="serviceCatalog" data-id="${item.id}">${icons.trash}</button>
    </div>
  </article>`;
}

const viewConfig = {
  patients: {
    addLabel: "เพิ่มคนไข้",
    filters: ["ใหม่", "ติดตามผล", "เรื้อรัง"],
    fields: [
      ["id", "รหัสคนไข้"], ["name", "ชื่อ-นามสกุล"], ["phone", "เบอร์โทร"], ["age", "อายุ", "number"],
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
    fields: [["id", "รหัสรายการ"], ["name", "ชื่อบริการ/คอร์ส"], ["category", "หมวดหมู่"], ["price", "ราคา", "number"], ["sessions", "จำนวนครั้ง", "number"], ["status", "สถานะ"]],
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
  modalFields.onclick = null;
  modalFields.oninput = null;
  modalSave.textContent = "บันทึก";
  modalTitle.textContent = existing ? `แก้ไข${setup.addLabel.replace("เพิ่ม", "")}` : setup.addLabel;
  modalFields.innerHTML = setup.fields.map(([key, label, type = "text"]) => {
    const value = existing?.[key] ?? (key === "date" || key === "lastVisit" ? todayIso : "");
    const full = type === "textarea" ? " full" : "";
    const required = key === "nextDate" ? "" : " required";
    const control = type === "textarea"
      ? `<textarea name="${key}"${required}>${escapeHtml(value)}</textarea>`
      : `<input name="${key}" type="${type}" value="${escapeHtml(value)}"${required}>`;
    return `<div class="field${full}"><label>${label}</label>${control}</div>`;
  }).join("");
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
    if (view === "serviceCatalog") currentView = "courses";
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
  const catalog = catalogRows();
  if (!catalog.length) {
    alert("ยังไม่มีรายการบริการ/คอร์ส กรุณาเพิ่มรายการก่อน");
    return;
  }
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
        <div class="buy-course-menu">
        ${catalog.map((item, index) => `
          <label class="buy-course-option" data-course-name="${escapeHtml(item.name.toLowerCase())}" data-course-category="${escapeHtml(item.category.toLowerCase())}">
            <input type="checkbox" name="catalogId" value="${escapeHtml(item.id)}" ${index === 0 ? "checked" : ""}>
            <span class="service-icon">${icons.course}</span>
            <span class="buy-course-info">
              <strong>${escapeHtml(item.name)}</strong>
              <small>${escapeHtml(item.category)} · ${Number(item.sessions || 1)} ครั้ง</small>
            </span>
            <input class="qty-input" name="qty-${escapeHtml(item.id)}" type="number" min="1" value="1" aria-label="จำนวน">
            <b>${money(item.price)}</b>
          </label>
        `).join("")}
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
  modalFields.onclick = (event) => {
    if (event.target.closest("#proceedPayment")) showPaymentStep();
  };
  modalFields.oninput = (event) => {
    if (!modalFields.querySelector(".buy-course-layout")) return;
    if (event.target.name === "paidAmount") event.target.dataset.touched = "true";
    if (event.target.dataset.action === "buyCourseSearch") {
      const query = event.target.value.trim().toLowerCase();
      modalFields.querySelectorAll(".buy-course-option").forEach((option) => {
        option.hidden = query && !`${option.dataset.courseName} ${option.dataset.courseCategory}`.includes(query);
      });
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
          <div class="receipt-logo">แพทริเซียคลินิก</div>
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
    "padding", "padding-bottom", "padding-top", "text-align", "width"
  ];
  target.setAttribute("style", properties.map((name) => `${name}:${computed.getPropertyValue(name)}`).join(";"));
  [...source.children].forEach((child, index) => inlineReceiptStyles(child, target.children[index]));
}

function saveReceiptAsImage() {
  const receipt = modalFields.querySelector(".receipt");
  if (!receipt) return;
  const clone = receipt.cloneNode(true);
  inlineReceiptStyles(receipt, clone);
  const width = Math.ceil(receipt.scrollWidth);
  const height = Math.ceil(receipt.scrollHeight);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <foreignObject width="100%" height="100%">${new XMLSerializer().serializeToString(clone)}</foreignObject>
  </svg>`;
  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0);
    URL.revokeObjectURL(image.src);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `patriciaclinic-receipt-${Date.now()}.png`;
      link.click();
      URL.revokeObjectURL(link.href);
    }, "image/png");
  };
  image.src = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
}

function removeItem(view, id) {
  if (!confirm("ต้องการลบรายการนี้ใช่ไหม")) return;
  state[view] = state[view].filter((row) => row.id !== id);
  saveState();
  if (view === "serviceCatalog") currentView = "courses";
  render();
}

function render() {
  setHeader();
  renderNav();
  if (currentView === "dashboard") contentEl.innerHTML = renderDashboard();
  else if (currentView === "ownerSummary") contentEl.innerHTML = renderTodayOwnerSummary();
  else if (currentView === "patients") contentEl.innerHTML = renderPatientsCenter();
  else if (currentView === "financeSummary") contentEl.innerHTML = renderFinanceSummary();
  else if (currentView === "courses") contentEl.innerHTML = renderServicesAndCourses();
  else contentEl.innerHTML = renderListView(currentView);
}

navEl.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-view]");
  if (button) setView(button.dataset.view);
});

contentEl.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
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
});

document.querySelector("#globalSearch").addEventListener("input", (event) => {
  searchTerm = event.target.value.trim();
  if (currentView === "dashboard" || currentView === "ownerSummary" || currentView === "financeSummary") currentView = "patients";
  render();
});

document.querySelector("#seedButton").addEventListener("click", () => {
  if (!confirm("คืนค่าข้อมูลตัวอย่างและล้างข้อมูลที่แก้ไขไว้ใช่ไหม")) return;
  state = structuredClone(seedState);
  saveState();
  render();
});

document.querySelector("#todayLabel").textContent = today.toLocaleDateString("th-TH", {
  weekday: "long", year: "numeric", month: "long", day: "numeric"
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(loginForm);
  const username = String(form.get("username") || "").trim();
  const password = String(form.get("password") || "");
  if (username === validUser.username && password === validUser.password) {
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
