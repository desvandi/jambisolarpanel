/**
 * ================================================================
 *   JMSE PRICING API — Google Apps Script Backend
 *   PT. Jaya Mandiri Smart Energy
 *
 *   SETUP INSTRUCTIONS:
 *   1. Buat Google Sheet baru di Google Drive
 *   2. Klik Extensions → Apps Script
 *   3. Hapus semua kode di Code.gs, paste kode ini
 *   4. Ganti API_KEY di bawah dengan key rahasia Anda
 *   5. Klik Run → authorize saat diminta
 *   6. Klik Deploy → New deployment:
 *      - Type: Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 *      - Klik Deploy
 *   7. Copy URL deployment (format: https://script.google.com/macros/s/.../exec)
 *   8. Tambahkan ke Vercel Environment Variables:
 *      GOOGLE_SCRIPT_URL = (URL dari langkah 7)
 *      GOOGLE_SCRIPT_API_KEY = (API_KEY yang Anda buat)
 *
 *   Setelah deploy, buka sheet dan jalankan initializeSheet()
 *   dari Apps Script editor (klik Run > initializeSheet) untuk
 *   mengisi sheet dengan data default.
 * ================================================================
 */

// ==================== CONFIG ====================

// GANTI dengan key rahasia Anda sendiri!
// Key ini harus sama dengan GOOGLE_SCRIPT_API_KEY di Vercel
const API_KEY = 'jmse-2026-solar-change-this-key';

// Default pricing data (digunakan saat pertama kali inisialisasi sheet)
const DEFAULT_PRICING = {
  // ---- Komponen ----
  panelWattage: 650,
  panelPerUnit: 2500000,
  mountingPerPanel: 400000,
  carportPerKwp: 5000000,
  bosPerPanel: 500000,
  spdGroundingPerSystem: 1500000,
  laborPerPanel: 600000,
  laborInverterPerUnit: 1500000,
  laborBatteryPerKwh: 250000,
  batteryPerKwh: 2000000,
  bosBatteryPerKwh: 350000,
  surveyDesignFee: 1500000,
  commissioningFee: 1000000,
  logisticsPerPanel: 200000,
  monitoringBasic: 3000000,
  monitoringStandard: 8000000,
  monitoringIndustrial: 25000000,
  // ---- Inverter ----
  deye3k6: 7000000,
  deye6k: 12000000,
  deye8k: 16000000,
  growatt10k: 18000000,
  deye10k3p: 26000000,
  deye15k3p: 38000000,
  deye20k3p: 52000000,
  // ---- Pengaturan ----
  marginPct: 35,
  ppnPct: 11,
  pshHours: 3.75,
  efficiency: 0.80,
};

// Label Indonesia untuk setiap parameter (ditampilkan di kolom C)
const LABELS = {
  panelWattage: 'Wattase Panel (Wp)',
  panelPerUnit: 'Harga Panel per Unit (Rp)',
  mountingPerPanel: 'Mounting per Panel (Rp)',
  carportPerKwp: 'Carport per kWp (Rp)',
  bosPerPanel: 'BOS per Panel (Rp)',
  spdGroundingPerSystem: 'SPD + Grounding per Sistem (Rp)',
  laborPerPanel: 'Labor Pasang Panel (Rp)',
  laborInverterPerUnit: 'Labor Pasang Inverter (Rp)',
  laborBatteryPerKwh: 'Labor Baterai per kWh (Rp)',
  batteryPerKwh: 'Harga Baterai per kWh (Rp)',
  bosBatteryPerKwh: 'BOS Baterai per kWh (Rp)',
  surveyDesignFee: 'Biaya Survei & Desain (Rp)',
  commissioningFee: 'Biaya Commissioning (Rp)',
  logisticsPerPanel: 'Logistik per Panel (Rp)',
  monitoringBasic: 'Monitoring Basic (Rp)',
  monitoringStandard: 'Monitoring Standard (Rp)',
  monitoringIndustrial: 'Monitoring Industrial (Rp)',
  deye3k6: 'Inverter Deye 3.600W (Rp)',
  deye6k: 'Inverter Deye 6.000W (Rp)',
  deye8k: 'Inverter Deye 8.000W (Rp)',
  growatt10k: 'Inverter Growatt 10.000W (Rp)',
  deye10k3p: 'Inverter Deye 10kW 3-Phase (Rp)',
  deye15k3p: 'Inverter Deye 15kW 3-Phase (Rp)',
  deye20k3p: 'Inverter Deye 20kW 3-Phase (Rp)',
  marginPct: 'Margin (%)',
  ppnPct: 'PPN (%)',
  pshHours: 'PSH Jambi (jam)',
  efficiency: 'Efisiensi Sistem',
};

// Kategori untuk setiap parameter (ditampilkan di kolom D)
const CATEGORIES = {
  panelWattage: 'Komponen', panelPerUnit: 'Komponen', mountingPerPanel: 'Komponen',
  carportPerKwp: 'Komponen', bosPerPanel: 'Komponen', spdGroundingPerSystem: 'Komponen',
  laborPerPanel: 'Komponen', laborInverterPerUnit: 'Komponen', laborBatteryPerKwh: 'Komponen',
  batteryPerKwh: 'Komponen', bosBatteryPerKwh: 'Komponen', surveyDesignFee: 'Komponen',
  commissioningFee: 'Komponen', logisticsPerPanel: 'Komponen', monitoringBasic: 'Komponen',
  monitoringStandard: 'Komponen', monitoringIndustrial: 'Komponen',
  deye3k6: 'Inverter', deye6k: 'Inverter', deye8k: 'Inverter',
  growatt10k: 'Inverter', deye10k3p: 'Inverter', deye15k3p: 'Inverter', deye20k3p: 'Inverter',
  marginPct: 'Pengaturan', ppnPct: 'Pengaturan', pshHours: 'Pengaturan', efficiency: 'Pengaturan',
};

// ==================== HELPERS ====================

function jsonResponse(data, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Pricing');
  if (!sheet) {
    sheet = ss.insertSheet('Pricing');
  }
  return sheet;
}

// ==================== INITIALIZATION ====================

/**
 * Jalankan fungsi ini SEKALI dari Apps Script editor (klik Run > initializeSheet)
 * untuk mengisi sheet dengan data default. Hanya perlu dijalankan sekali.
 */
function initializeSheet() {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();

  // Check if already initialized
  if (data.length > 2 && data[0][0] === 'key') {
    Logger.log('Sheet sudah terinisialisasi. Skip.');
    return;
  }

  // Clear and initialize
  sheet.clear();

  // Headers
  sheet.getRange(1, 1).setValue('key');
  sheet.getRange(1, 2).setValue('value');
  sheet.getRange(1, 3).setValue('label');
  sheet.getRange(1, 4).setValue('category');

  // Header styling
  var headerRange = sheet.getRange(1, 1, 1, 4);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('#ffffff');

  // Data rows
  var row = 2;
  var keys = Object.keys(DEFAULT_PRICING);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    sheet.getRange(row, 1).setValue(k);
    sheet.getRange(row, 2).setValue(DEFAULT_PRICING[k]);
    sheet.getRange(row, 3).setValue(LABELS[k] || k);
    sheet.getRange(row, 4).setValue(CATEGORIES[k] || 'Lainnya');

    // Format angka untuk kolom value
    if (typeof DEFAULT_PRICING[k] === 'number' && DEFAULT_PRICING[k] >= 1000) {
      sheet.getRange(row, 2).setNumberFormat('#,##0');
    }

    row++;
  }

  // Auto-resize columns
  for (var c = 1; c <= 4; c++) {
    sheet.autoResizeColumn(c);
  }

  // Freeze header row
  sheet.setFrozenRows(1);

  Logger.log('Sheet berhasil diinisialisasi dengan ' + keys.length + ' parameter.');
}

// ==================== API HANDLERS ====================

/**
 * GET handler — Membaca semua data harga dari sheet.
 * Digunakan oleh landing page untuk menampilkan harga terbaru.
 *
 * Query params: ?key=YOUR_API_KEY
 *
 * Response:
 * {
 *   "success": true,
 *   "data": { "panelWattage": 650, ... },
 *   "updatedAt": "2026-05-19T10:00:00.000Z"
 * }
 */
function doGet(e) {
  try {
    // Verify API key
    var key = e.parameter.key;
    if (key !== API_KEY) {
      return jsonResponse({ error: 'API key tidak valid' }, 401);
    }

    var sheet = getSheet();
    var data = sheet.getDataRange().getValues();
    var pricing = {};

    // Row 1 is headers, data starts from row 2
    for (var i = 1; i < data.length; i++) {
      var k = String(data[i][0]).trim();
      if (k && !k.startsWith('_')) {
        var v = data[i][1];
        pricing[k] = (typeof v === 'number') ? v : (Number(v) || 0);
      }
    }

    return jsonResponse({
      success: true,
      data: pricing,
      updatedAt: new Date().toISOString()
    }, 200);

  } catch (err) {
    return jsonResponse({ error: err.toString() }, 500);
  }
}

/**
 * POST handler — Menyimpan data harga ke sheet.
 * Digunakan oleh halaman /kalibrasi-harga saat klik "Simpan".
 *
 * Query params: ?key=YOUR_API_KEY
 * Body: { "data": { "panelWattage": 650, "panelPerUnit": 2500000, ... } }
 *
 * Response:
 * {
 *   "success": true,
 *   "updatedAt": "2026-05-19T10:00:00.000Z"
 * }
 */
function doPost(e) {
  try {
    // Verify API key
    var key = e.parameter.key;
    if (key !== API_KEY) {
      return jsonResponse({ error: 'API key tidak valid' }, 401);
    }

    var body = JSON.parse(e.postData.contents);
    var pricingData = body.data || body;

    var sheet = getSheet();
    var existing = sheet.getDataRange().getValues();

    // Build key → row mapping
    var keyToRow = {};
    for (var i = 1; i < existing.length; i++) {
      var k = String(existing[i][0]).trim();
      if (k) keyToRow[k] = i + 1; // 1-indexed row number
    }

    // Update existing keys or add new ones
    var keys = Object.keys(pricingData);
    for (var j = 0; j < keys.length; j++) {
      var k2 = keys[j];
      if (k2.startsWith('_')) continue; // skip metadata

      var val = pricingData[k2];
      if (keyToRow[k2]) {
        sheet.getRange(keyToRow[k2], 2).setValue(val);
      } else {
        var nextRow = existing.length + 1;
        sheet.getRange(nextRow, 1).setValue(k2);
        sheet.getRange(nextRow, 2).setValue(val);
        sheet.getRange(nextRow, 3).setValue(LABELS[k2] || k2);
        sheet.getRange(nextRow, 4).setValue(CATEGORIES[k2] || 'Lainnya');
        existing.push([k2, val]); // track for subsequent rows
      }
    }

    return jsonResponse({
      success: true,
      updatedAt: new Date().toISOString()
    }, 200);

  } catch (err) {
    return jsonResponse({ error: err.toString() }, 500);
  }
}

/**
 * Fungsi utilitas untuk test manual dari Apps Script editor.
 * Jalankan testGet() untuk memverifikasi GET handler.
 */
function testGet() {
  var result = doGet({ parameter: { key: API_KEY } });
  Logger.log('GET response: ' + result.getContent());
}
