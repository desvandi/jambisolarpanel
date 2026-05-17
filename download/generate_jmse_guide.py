#!/usr/bin/env python3
"""
Generate JMSE v2.0 Panduan Kompilasi (Compilation Guide) PDF
Panduan Kompilasi Landing Page — PT. Jaya Mandiri Smart Energy
Versi 2.0 — Setelah Audit Komprehensif
"""

import sys
import os

# ── PDF Skill setup ──
PDF_SKILL_DIR = "/home/z/my-project/skills/pdf"
_scripts = os.path.join(PDF_SKILL_DIR, "scripts")
if _scripts not in sys.path:
    sys.path.insert(0, _scripts)

from pdf import install_font_fallback

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib.units import inch, cm
from reportlab.platypus import (
    Paragraph, Spacer, Table, TableStyle, PageBreak,
    CondPageBreak, KeepTogether, NextPageTemplate,
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ── Font Registration ──
pdfmetrics.registerFont(TTFont('Microsoft YaHei', '/usr/share/fonts/truetype/chinese/SarasaMonoSC-SemiBold.ttf'))
pdfmetrics.registerFont(TTFont('SimHei', '/usr/share/fonts/truetype/chinese/SarasaMonoSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('SimHeiBold', '/usr/share/fonts/truetype/chinese/SarasaMonoSC-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSansBold', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf'))
pdfmetrics.registerFont(TTFont('SarasaMonoSC', '/usr/share/fonts/truetype/chinese/SarasaMonoSC-Regular.ttf'))

registerFontFamily('Microsoft YaHei', normal='Microsoft YaHei', bold='Microsoft YaHei')
registerFontFamily('SimHei', normal='SimHei', bold='SimHeiBold')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSansBold')

install_font_fallback()

# ── Color Palette ──
ACCENT = colors.HexColor('#5935c3')
TEXT_PRIMARY = colors.HexColor('#22211f')
TEXT_MUTED = colors.HexColor('#868279')
BG_SURFACE = colors.HexColor('#e4e2dc')
BG_PAGE = colors.HexColor('#f5f4f3')
TABLE_HEADER_COLOR = ACCENT
TABLE_HEADER_TEXT = colors.white
TABLE_ROW_EVEN = colors.white
TABLE_ROW_ODD = BG_SURFACE

# ── Page Setup ──
PAGE_W, PAGE_H = A4
MARGIN = 1 * inch

# ── Styles ──
styles = getSampleStyleSheet()

s_title = ParagraphStyle(
    'DocTitle', fontName='Microsoft YaHei', fontSize=22, leading=28,
    textColor=TEXT_PRIMARY, alignment=TA_CENTER, spaceAfter=6, wordWrap='CJK',
)
s_subtitle = ParagraphStyle(
    'DocSubtitle', fontName='SimHei', fontSize=12, leading=16,
    textColor=TEXT_MUTED, alignment=TA_CENTER, spaceAfter=20, wordWrap='CJK',
)
s_h1 = ParagraphStyle(
    'H1', fontName='Microsoft YaHei', fontSize=18, leading=24,
    textColor=ACCENT, spaceBefore=16, spaceAfter=10, wordWrap='CJK',
    borderWidth=0, borderColor=ACCENT, borderPadding=4,
)
s_h2 = ParagraphStyle(
    'H2', fontName='Microsoft YaHei', fontSize=14, leading=19,
    textColor=TEXT_PRIMARY, spaceBefore=12, spaceAfter=6, wordWrap='CJK',
)
s_h3 = ParagraphStyle(
    'H3', fontName='SimHei', fontSize=12, leading=16,
    textColor=TEXT_PRIMARY, spaceBefore=8, spaceAfter=4, wordWrap='CJK',
)
s_body = ParagraphStyle(
    'Body', fontName='SimHei', fontSize=10, leading=16,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, spaceAfter=6,
    firstLineIndent=20, wordWrap='CJK',
)
s_body_no_indent = ParagraphStyle(
    'BodyNoIndent', parent=s_body, firstLineIndent=0,
)
s_bullet = ParagraphStyle(
    'Bullet', fontName='SimHei', fontSize=10, leading=16,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, spaceAfter=3,
    leftIndent=20, bulletIndent=8, wordWrap='CJK',
)
s_code = ParagraphStyle(
    'Code', fontName='DejaVuSans', fontSize=8, leading=11,
    textColor=TEXT_PRIMARY, backColor=BG_SURFACE, spaceAfter=4,
    leftIndent=12, borderPadding=4, wordWrap='CJK',
)
s_table_header = ParagraphStyle(
    'TableHeader', fontName='Microsoft YaHei', fontSize=9, leading=12,
    textColor=TABLE_HEADER_TEXT, alignment=TA_CENTER, wordWrap='CJK',
)
s_table_cell = ParagraphStyle(
    'TableCell', fontName='SimHei', fontSize=9, leading=12,
    textColor=TEXT_PRIMARY, alignment=TA_CENTER, wordWrap='CJK',
)
s_table_cell_left = ParagraphStyle(
    'TableCellLeft', fontName='SimHei', fontSize=9, leading=12,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, wordWrap='CJK',
)
s_toc_h1 = ParagraphStyle(
    'TOC1', fontName='Microsoft YaHei', fontSize=12, leading=18,
    leftIndent=20, textColor=TEXT_PRIMARY, wordWrap='CJK',
)
s_toc_h2 = ParagraphStyle(
    'TOC2', fontName='SimHei', fontSize=10, leading=16,
    leftIndent=40, textColor=TEXT_MUTED, wordWrap='CJK',
)
s_footer = ParagraphStyle(
    'Footer', fontName='SimHei', fontSize=8, leading=10,
    textColor=TEXT_MUTED, alignment=TA_CENTER, wordWrap='CJK',
)


# ── Helper: safe_keep_together ──
def safe_keep_together(elements, max_height=None):
    """Wrap elements in KeepTogether with a reasonable max height."""
    if not elements:
        return []
    return [KeepTogether(elements)]


# ── Helper: build styled table ──
def make_table(headers, data, col_widths=None, has_row_numbers=False):
    """Create a consistently styled table with wrapped Paragraph cells."""
    avail = PAGE_W - 2 * MARGIN
    if col_widths is None:
        col_widths = [avail / len(headers)] * len(headers)

    # Build header row
    header_row = [Paragraph(h, s_table_header) for h in headers]
    if has_row_numbers:
        header_row.insert(0, Paragraph('#', s_table_header))
        col_widths = [0.4 * inch] + [w * (avail - 0.4 * inch) / sum(col_widths) for w in col_widths]

    # Build data rows
    table_data = [header_row]
    for row in data:
        cells = [Paragraph(str(c), s_table_cell_left) if i == 0 else Paragraph(str(c), s_table_cell) for i, c in enumerate(row)]
        if has_row_numbers:
            cells.insert(0, Paragraph(str(len(table_data)), s_table_cell))
        table_data.append(cells)

    t = Table(table_data, colWidths=col_widths, repeatRows=1)
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), TABLE_HEADER_TEXT),
        ('FONTNAME', (0, 0), (-1, 0), 'Microsoft YaHei'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
        ('TOPPADDING', (0, 0), (-1, 0), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cccccc')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 1), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 5),
    ]
    # Alternating row colors
    for i in range(1, len(table_data)):
        bg = TABLE_ROW_EVEN if i % 2 == 1 else TABLE_ROW_ODD
        style_cmds.append(('BACKGROUND', (0, i), (-1, i), bg))

    t.setStyle(TableStyle(style_cmds))
    return t


# ── TOC Document Template ──
class TocDocTemplate(BaseDocTemplate):
    """Custom template with TOC notification support and page numbers."""

    def __init__(self, filename, **kwargs):
        super().__init__(filename, **kwargs)
        self.page_count = 0

    def afterFlowable(self, flowable):
        """Notify TOC of headings."""
        if isinstance(flowable, Paragraph):
            style = flowable.style.name
            text = flowable.getPlainText()
            if style == 'H1':
                key = f'h1_{text}'
                self.canv.bookmarkPage(key)
                self.notify('TOCEntry', (0, text, self.page, key))
            elif style == 'H2':
                key = f'h2_{text}'
                self.canv.bookmarkPage(key)
                self.notify('TOCEntry', (1, text, self.page, key))


def _footer_and_page(canvas, doc):
    """Draw footer with page number on every page."""
    canvas.saveState()
    canvas.setFont('SimHei', 8)
    canvas.setFillColor(TEXT_MUTED)
    page_num = doc.page
    canvas.drawCentredString(PAGE_W / 2, 0.5 * inch, f"- {page_num} -")
    # Thin accent line at top
    canvas.setStrokeColor(ACCENT)
    canvas.setLineWidth(1.5)
    canvas.line(MARGIN, PAGE_H - MARGIN + 10, PAGE_W - MARGIN, PAGE_H - MARGIN + 10)
    canvas.restoreState()


def build_story():
    """Build the full PDF story (no cover page)."""
    story = []

    # ──────────────────────────────────────────────────
    # TITLE PAGE (internal, not a cover)
    # ──────────────────────────────────────────────────
    story.append(Spacer(1, 1.5 * inch))
    story.append(Paragraph("Panduan Kompilasi", s_title))
    story.append(Paragraph("Landing Page JMSE", s_title))
    story.append(Spacer(1, 0.3 * inch))
    story.append(Paragraph("PT. Jaya Mandiri Smart Energy", s_subtitle))
    story.append(Paragraph("Versi 2.0 — Setelah Audit Komprehensif", s_subtitle))
    story.append(Spacer(1, 0.5 * inch))

    meta_data = [
        ['Proyek', 'Landing Page Facebook Ads — PLTS / Panel Surya'],
        ['Domain', 'jayamandiri.co.id'],
        ['Tech Stack', 'Next.js 16, Tailwind CSS 4, Framer Motion, TypeScript'],
        ['Versi Dokumen', '2.0'],
        ['Tanggal', 'Juni 2025'],
    ]
    meta_t = Table(meta_data, colWidths=[1.8 * inch, 4 * inch])
    meta_t.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'Microsoft YaHei'),
        ('FONTNAME', (1, 0), (1, -1), 'SimHei'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('TEXTCOLOR', (0, 0), (0, -1), ACCENT),
        ('TEXTCOLOR', (1, 0), (1, -1), TEXT_PRIMARY),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('LINEBELOW', (0, 0), (-1, -2), 0.5, BG_SURFACE),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(meta_t)

    story.append(PageBreak())

    # ──────────────────────────────────────────────────
    # TABLE OF CONTENTS
    # ──────────────────────────────────────────────────
    story.append(Paragraph("Daftar Isi", s_h1))
    story.append(Spacer(1, 0.2 * inch))

    toc = TableOfContents()
    toc.levelStyles = [s_toc_h1, s_toc_h2]
    story.append(toc)

    story.append(PageBreak())

    # ══════════════════════════════════════════════════
    # BAB 1: Ringkasan Proyek
    # ══════════════════════════════════════════════════
    story.append(Paragraph("Bab 1: Ringkasan Proyek", s_h1))
    story.append(CondPageBreak(2.5 * inch))

    story.append(Paragraph("Tentang PT. Jaya Mandiri Smart Energy", s_h2))
    story.append(Paragraph(
        "PT. Jaya Mandiri Smart Energy (JMSE) adalah perusahaan EPC (Engineering, Procurement, Construction) "
        "yang bergerak di bidang pemasangan sistem pembangkit listrik tenaga surya (PLTS) di wilayah Jambi "
        "dan sekitarnya. Sebagai penyedia solusi energi terbarukan, JMSE menawarkan layanan menyeluruh mulai "
        "dari survei lokasi, desain sistem, pengadaan komponen, instalasi, hingga commissioning dan pemeliharaan. "
        "Perusahaan berkomitmen untuk membantu pelanggan rumah tangga dan komersial beralih ke energi surya "
        "guna mengurangi ketergantungan pada energi fosil dan menurunkan biaya listrik jangka panjang.",
        s_body
    ))

    story.append(Paragraph("Tujuan Landing Page", s_h2))
    story.append(Paragraph(
        "Landing page ini dirancang khusus sebagai sarana konversi untuk kampanye iklan Facebook Ads. "
        "Target utamanya adalah mengarahkan pengguna dari iklan yang ditampilkan di platform Facebook "
        "menuju halaman yang memberikan informasi komprehensif tentang layanan PLTS JMSE, kalkulasi "
        "penghematan, paket produk yang tersedia, serta formulir pengumpulan lead (LeadForm) yang "
        "terintegrasi langsung dengan WhatsApp. Desain mengutamakan kecepatan loading, responsivitas "
        "di berbagai perangkat, dan alur pengguna yang intuitif untuk memaksimalkan tingkat konversi.",
        s_body
    ))

    story.append(Paragraph("Tech Stack", s_h2))
    story.append(Paragraph(
        "Proyek ini dibangun menggunakan teknologi web modern yang dipilih berdasarkan pertimbangan "
        "performa, skalabilitas, dan kemudahan pengembangan. Berikut adalah tech stack utama yang digunakan:",
        s_body
    ))
    tech_items = [
        "<b>Next.js 16</b> — Framework React dengan fitur server-side rendering (SSR) dan static site generation (SSG) untuk performa optimal.",
        "<b>Tailwind CSS 4</b> — Utility-first CSS framework untuk styling yang cepat dan konsisten.",
        "<b>Framer Motion</b> — Library animasi untuk interaksi yang smooth dan engaging.",
        "<b>TypeScript</b> — Bahasa pemrograman bertipe statis untuk meningkatkan kualitas kode dan mengurangi bug.",
    ]
    for item in tech_items:
        story.append(Paragraph(f"\u2022 {item}", s_bullet))

    story.append(Paragraph("Domain dan Deployment", s_h2))
    story.append(Paragraph(
        "Landing page ini dihosting pada domain <b>jayamandiri.co.id</b> dan di-deploy sebagai static export "
        "agar dapat dihosting di berbagai platform (Vercel, Netlify, atau shared hosting) tanpa memerlukan "
        "server Node.js. Pendekatan ini menjamin waktu loading yang minimal dan biaya hosting yang rendah.",
        s_body
    ))

    # ══════════════════════════════════════════════════
    # BAB 2: Arsitektur Sistem
    # ══════════════════════════════════════════════════
    story.append(PageBreak())
    story.append(Paragraph("Bab 2: Arsitektur Sistem", s_h1))
    story.append(CondPageBreak(2.5 * inch))

    story.append(Paragraph("Alur Halaman (Page Flow)", s_h2))
    story.append(Paragraph(
        "Landing page mengikuti struktur linear yang dirancang berdasarkan prinsip copywriting AIDA "
        "(Attention, Interest, Desire, Action). Setiap section memiliki peran spesifik dalam memandu "
        "pengunjung menuju tindakan konversi. Berikut adalah urutan section dari atas ke bawah:",
        s_body
    ))

    flow_headers = ['No.', 'Section', 'Fungsi']
    flow_data = [
        ['1', 'HeroSection', 'Menarik perhatian dengan headline dan CTA utama'],
        ['2', 'TrustSection', 'Membangun kredibilitas (sertifikasi, statistik perusahaan)'],
        ['3', 'ProductSection', 'Menampilkan paket produk dengan harga dan ROI'],
        ['4', 'ProblemSolutionSection', 'Mengangkat masalah pelanggan dan solusi PLTS'],
        ['5', 'SavingsCalculator', 'Kalkulator interaktif estimasi penghematan'],
        ['6', 'ComparisonSection', 'Perbandingan biaya PLN vs PLTS'],
        ['7', 'SocialProofSection', 'Testimoni dan portofolio proyek'],
        ['8', 'FAQSection', 'Jawaban pertanyaan umum'],
        ['9', 'UrgencySection', 'Menciptakan urgensi (slot terbatas, promo)'],
        ['10', 'LeadForm', 'Formulir pengumpulan lead dengan integrasi WhatsApp'],
        ['11', 'Footer', 'Informasi kontak dan navigasi tambahan'],
    ]
    story.append(make_table(flow_headers, flow_data, [0.4*inch, 2*inch, 3.4*inch]))

    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph("Komponen", s_h2))
    story.append(Paragraph(
        "Secara keseluruhan, landing page terdiri dari <b>12 komponen utama</b> yang masing-masing "
        "bertanggung jawab atas satu section. Selain itu, terdapat halaman <b>kalibrasi harga</b> "
        "(/kalibrasi-harga) yang berfungsi sebagai admin panel untuk mengatur parameter harga dan "
        "konfigurasi produk secara real-time. Setiap komponen dibangun sebagai React component "
        "dengan TypeScript untuk memastikan type safety dan kemudahan maintenance.",
        s_body
    ))

    story.append(Paragraph("Real-time Price Sync", s_h2))
    story.append(Paragraph(
        "Sistem pricing menggunakan mekanisme sinkronisasi real-time antara halaman kalibrasi dan "
        "landing page melalui <b>localStorage</b> yang dikombinasikan dengan <b>custom events</b>. "
        "Ketika admin menyimpan perubahan harga di halaman kalibrasi, data disimpan ke localStorage "
        "dan sebuah custom event <font name='DejaVuSans'>\"jmse-pricing-updated\"</font> di-dispatch. "
        "Landing page mendengarkan event ini dan memperbarui seluruh kalkulasi harga tanpa perlu reload halaman.",
        s_body
    ))

    story.append(Paragraph("Static Export", s_h2))
    story.append(Paragraph(
        "Proyek dikonfigurasi untuk static export menggunakan <font name='DejaVuSans'>output: 'export'</font> "
        "di file <font name='DejaVuSans'>next.config.js</font>. Pendekatan ini menghasilkan file HTML, CSS, "
        "dan JS statis yang dapat dihosting di mana saja tanpa memerlukan server-side rendering. "
        "Seluruh logika interaktif (kalkulator, form, pricing) berjalan di sisi klien (client-side), "
        "sehingga kompatibel dengan CDN dan shared hosting biasa.",
        s_body
    ))

    # ══════════════════════════════════════════════════
    # BAB 3: Modul Pricing Engine
    # ══════════════════════════════════════════════════
    story.append(PageBreak())
    story.append(Paragraph("Bab 3: Modul Pricing Engine", s_h1))
    story.append(CondPageBreak(2.5 * inch))

    story.append(Paragraph("File dan Struktur", s_h2))
    story.append(Paragraph(
        "Modul pricing engine berada di file <font name='DejaVuSans'>src/lib/pricing.ts</font> "
        "dan menjadi inti dari seluruh logika kalkulasi harga pada landing page. Modul ini "
        "menentukan harga paket, kalkulasi ROI, dan rekomendasi paket berdasarkan kebutuhan pelanggan. "
        "Struktur types yang digunakan meliputi:",
        s_body
    ))
    types_items = [
        "<b>ComponentPrices</b> — Harga komponen individual (panel, mounting, BOS, dsb.).",
        "<b>InverterPrices</b> — Daftar harga inverter Powmr per kapasitas.",
        "<b>PricingSettings</b> — Parameter teknis (PSH, efficiency, tariff, self-consumption, dsb.).",
        "<b>PackageSpec</b> — Spesifikasi paket (jumlah panel, inverter, kapasitas).",
        "<b>CalculatedPackage</b> — Hasil kalkulasi paket (harga final, ROI, estimasi penghematan).",
    ]
    for item in types_items:
        story.append(Paragraph(f"\u2022 {item}", s_bullet))

    story.append(Paragraph("Fungsi Utama", s_h2))
    story.append(Paragraph(
        "Modul ini menyediakan empat fungsi utama yang digunakan di seluruh aplikasi:",
        s_body
    ))
    func_items = [
        "<b>calculatePackages()</b> — Menghitung harga seluruh paket berdasarkan ComponentPrices dan PricingSettings.",
        "<b>calculatePackageWithBattery()</b> — Menghitung harga paket dengan penambahan opsi baterai (Shoto LiFePO4).",
        "<b>calculateROI()</b> — Menghitung Return on Investment berdasarkan estimasi produksi energi, penghematan PLN, dan biaya investasi.",
        "<b>recommendPackage()</b> — Memberikan rekomendasi paket optimal berdasarkan kebutuhan daya pelanggan.",
    ]
    for item in func_items:
        story.append(Paragraph(f"\u2022 {item}", s_bullet))

    story.append(Paragraph("Parameter Teknis", s_h2))
    story.append(Paragraph(
        "Berikut adalah parameter teknis yang digunakan dalam kalkulasi pricing, disesuaikan "
        "dengan kondisi radiasi matahari di wilayah Jambi:",
        s_body
    ))

    param_headers = ['Parameter', 'Nilai', 'Keterangan']
    param_data = [
        ['Peak Sun Hours (PSH)', '3,75 jam/hari', 'Rata-rata irradiance Jambi'],
        ['Efficiency (System)', '0,80 (80%)', 'Rangkaian derajat kehilangan sistem'],
        ['Tarif PLN', 'Rp 1.500/kWh', 'Tarif residensial pelanggan 1.300-2.200 VA'],
        ['Self-Consumption', '70%', 'Proporsi produksi yang dikonsumsi langsung'],
        ['Kenaikan Tarif PLN', '6% / tahun', 'Asumsi kenaikan tarif tahunan PLN'],
        ['Margin', '35%', 'Margin keuntungan perusahaan'],
        ['PPN', '11%', 'Pajak Pertambahan Nilai'],
    ]
    story.append(make_table(param_headers, param_data, [2.2*inch, 1.5*inch, 2.9*inch]))

    story.append(Spacer(1, 0.3 * inch))
    story.append(Paragraph("Default Material Prices", s_h2))
    story.append(Paragraph(
        "Tabel berikut menampilkan daftar harga default untuk seluruh komponen material "
        "yang digunakan dalam kalkulasi paket:",
        s_body
    ))

    price_headers = ['Komponen', 'Harga Default']
    price_data = [
        ['Panel LONGi 650Wp', 'Rp 2.000.000 / unit'],
        ['Powmr 3.6KW Hybrid Inverter', 'Rp 6.500.000'],
        ['Powmr 5.5KW Hybrid Inverter', 'Rp 10.000.000'],
        ['Powmr 8KW Hybrid Inverter', 'Rp 14.000.000'],
        ['Powmr 10.2KW Hybrid Inverter', 'Rp 18.000.000'],
        ['Powmr 12KW Hybrid Inverter', 'Rp 22.000.000'],
        ['Powmr 15KW Hybrid Inverter', 'Rp 28.000.000'],
        ['Powmr 20KW Hybrid Inverter', 'Rp 38.000.000'],
        ['Shoto LiFePO4 Battery', 'Rp 1.300.000 / kWh'],
        ['BOS per Panel', 'Rp 275.000'],
        ['Mounting per Panel', 'Rp 400.000'],
        ['SPD + Grounding per System', 'Rp 1.500.000'],
        ['Logistik per Panel', 'Rp 200.000'],
        ['Labor Pasang Panel', 'Rp 350.000'],
        ['Survey + Desain', 'Rp 2.000.000'],
        ['Commissioning', 'Rp 1.000.000'],
    ]
    story.append(make_table(price_headers, price_data, [3.5*inch, 2.9*inch]))

    # ══════════════════════════════════════════════════
    # BAB 4: Paket Produk
    # ══════════════════════════════════════════════════
    story.append(PageBreak())
    story.append(Paragraph("Bab 4: Paket Produk", s_h1))
    story.append(CondPageBreak(2.5 * inch))

    story.append(Paragraph("Klasifikasi Tier", s_h2))
    story.append(Paragraph(
        "JMSE menawarkan 8 paket PLTS yang diklasifikasikan ke dalam 3 tier berdasarkan kapasitas "
        "dan target pasar. Setiap tier memiliki karakteristik dan opsi baterai yang berbeda:",
        s_body
    ))

    tier_items = [
        "<b>Silver (1, 2, 3, 5 kWp)</b> — Paket hemat untuk kebutuhan rumah tangga kecil hingga menengah. "
        "Opsi baterai: [0, 3, 5, 7] kWh. Cocok untuk rumah dengan daya 450-1.300 VA.",
        "<b>Gold (7, 10 kWp)</b> — Paket premium untuk rumah tangga besar dan usaha kecil. "
        "Opsi baterai: [0, 5, 10, 15] kWh. Ideal untuk daya 2.200-5.500 VA.",
        "<b>Platinum (13, 20 kWp)</b> — Paket flagship untuk properti komersial dan industrial. "
        "Opsi baterai: [0, 10, 15, 20, 30, 48] kWh. Dirancang untuk kebutuhan 5.500+ VA.",
    ]
    for item in tier_items:
        story.append(Paragraph(f"\u2022 {item}", s_bullet))

    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph("Spesifikasi Paket", s_h2))
    story.append(Paragraph(
        "Berikut adalah tabel lengkap spesifikasi untuk setiap paket yang ditawarkan:",
        s_body
    ))

    pkg_headers = ['Paket', 'Panel', 'Inverter', 'Tier']
    pkg_data = [
        ['Silver 1 kWp', '2x 650Wp', 'Powmr 3.6KW', 'Silver'],
        ['Silver 2 kWp', '4x 650Wp', 'Powmr 3.6KW', 'Silver'],
        ['Silver 3 kWp', '5x 650Wp', 'Powmr 3.6KW', 'Silver'],
        ['Silver 5 kWp', '8x 650Wp', 'Powmr 5.5KW', 'Silver'],
        ['Gold 7 kWp', '11x 650Wp', 'Powmr 8KW', 'Gold'],
        ['Gold 10 kWp', '16x 650Wp', 'Powmr 10.2KW', 'Gold'],
        ['Platinum 13 kWp', '20x 650Wp', 'Powmr 12KW', 'Platinum'],
        ['Platinum 20 kWp', '32x 650Wp', 'Powmr 20KW', 'Platinum'],
    ]
    story.append(make_table(pkg_headers, pkg_data, [2*inch, 1.5*inch, 1.8*inch, 1.3*inch]))

    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph("Opsi Baterai per Tier", s_h2))

    bat_headers = ['Tier', 'Kapasitas Tersedia (kWh)']
    bat_data = [
        ['Silver', '0, 3, 5, 7'],
        ['Gold', '0, 5, 10, 15'],
        ['Platinum', '0, 10, 15, 20, 30, 48'],
    ]
    story.append(make_table(bat_headers, bat_data, [2*inch, 4.4*inch]))

    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph("Add-on System", s_h2))
    story.append(Paragraph(
        "Selain paket standar, JMSE juga menyediakan beberapa add-on yang dapat ditambahkan "
        "ke setiap paket untuk meningkatkan fungsionalitas sistem:",
        s_body
    ))
    addon_items = [
        "<b>Carport</b> — Kanopi parkir sekaligus mounting panel surya. Ideal untuk properti dengan lahan terbatas.",
        "<b>Smart Monitoring — Basic</b> — Monitoring produksi energi dasar via aplikasi mobile.",
        "<b>Smart Monitoring — Standard</b> — Monitoring lengkap dengan notifikasi dan analisis historis.",
        "<b>Smart Monitoring — Industrial</b> — Monitoring multi-sistem dengan dashboard dan laporan periodik untuk properti komersial.",
    ]
    for item in addon_items:
        story.append(Paragraph(f"\u2022 {item}", s_bullet))

    story.append(Spacer(1, 0.1 * inch))
    story.append(Paragraph("Diskon", s_h3))
    story.append(Paragraph(
        "Saat ini setiap paket menampilkan badge diskon 5%. Namun, perlu diperhatikan bahwa "
        "harga asli (sebelum diskon) belum ditampilkan dengan coret (strikethrough). Hal ini "
        "merupakan salah satu temuan audit yang perlu diperbaiki untuk meningkatkan efektivitas "
        "taktik pricing.",
        s_body
    ))

    # ══════════════════════════════════════════════════
    # BAB 5: Halaman Kalibrasi Harga
    # ══════════════════════════════════════════════════
    story.append(PageBreak())
    story.append(Paragraph("Bab 5: Halaman Kalibrasi Harga", s_h1))
    story.append(CondPageBreak(2.5 * inch))

    story.append(Paragraph("URL dan Akses", s_h2))
    story.append(Paragraph(
        "Halaman kalibrasi harga dapat diakses melalui URL <font name='DejaVuSans'>/kalibrasi-harga</font> "
        "pada domain yang sama dengan landing page. Halaman ini tidak terpublikasi (tidak tercantum dalam "
        "navigasi utama) dan diperuntukkan bagi admin JMSE untuk mengatur konfigurasi harga dan parameter "
        "teknis secara real-time tanpa perlu mengubah kode sumber.",
        s_body
    ))

    story.append(Paragraph("Struktur Tab Input", s_h2))
    story.append(Paragraph(
        "Antarmuka kalibrasi menggunakan 8 tab yang mengorganisir input berdasarkan kategori komponen. "
        "Setiap tab berisi formulir input yang langsung menyimpan perubahan ke localStorage:",
        s_body
    ))

    tab_headers = ['No.', 'Tab', 'Komponen yang Diatur']
    tab_data = [
        ['1', 'Panel', 'Harga panel surya per unit, merek, kapasitas'],
        ['2', 'Mounting', 'Biaya mounting/racking per panel'],
        ['3', 'Inverter', 'Daftar harga inverter per kapasitas'],
        ['4', 'Baterai', 'Harga baterai LiFePO4 per kWh, merek'],
        ['5', 'BOS', 'Biaya Balance of System per panel (kabel, connector, dsb.)'],
        ['6', 'Jasa', 'Biaya logistik, labor, survey, desain, commissioning'],
        ['7', 'Monitoring', 'Paket monitoring dan harganya'],
        ['8', 'Setting', 'Parameter teknis: PSH, efficiency, tariff, margin, PPN'],
    ]
    story.append(make_table(tab_headers, tab_data, [0.4*inch, 1.3*inch, 4.7*inch]))

    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph("Agregasi dan Preview", s_h2))
    story.append(Paragraph(
        "Data input dari setiap tab diagregasi menjadi satu objek <b>ComponentPrices</b> melalui "
        "fungsi <font name='DejaVuSans'>computeAggregated()</font>. Fungsi ini menghitung turunan harga "
        "yang ditampilkan di panel preview real-time, termasuk:",
        s_body
    ))
    agg_items = [
        "<b>computedBOSPerPanel</b> — Total BOS per panel (kabel + connector + AC breaker per unit).",
        "<b>mountingPerPanel</b> — Biaya mounting per panel dari tab Mounting.",
        "<b>protectionPerSystem</b> — Biaya SPD + grounding per sistem dari tab BOS.",
    ]
    for item in agg_items:
        story.append(Paragraph(f"\u2022 {item}", s_bullet))

    story.append(Paragraph("Export", s_h2))
    story.append(Paragraph(
        "Halaman kalibrasi menyediakan dua fitur export: <b>Export JSON</b> untuk mengunduh seluruh "
        "konfigurasi dalam format JSON yang dapat diimport kembali, dan <b>Export Daftar Harga</b> "
        "untuk menghasilkan daftar harga terformat yang dapat dibagikan ke tim penjualan atau pelanggan.",
        s_body
    ))

    story.append(Paragraph("Sinkronisasi ke Landing Page", s_h2))
    story.append(Paragraph(
        "Perubahan harga yang disimpan di localStorage otomatis disinkronkan ke landing page melalui "
        "custom event <font name='DejaVuSans'>\"jmse-pricing-updated\"</font>. Ketika pengguna membuka "
        "landing page, halaman tersebut membaca data pricing terbaru dari localStorage dan menghitung "
        "ulang seluruh paket, ROI, dan estimasi penghematan. Jika admin sedang mengedit di tab kalibrasi, "
        "perubahan akan langsung tercermin di landing page tanpa reload.",
        s_body
    ))

    # ══════════════════════════════════════════════════
    # BAB 6: Hasil Audit v2.0
    # ══════════════════════════════════════════════════
    story.append(PageBreak())
    story.append(Paragraph("Bab 6: Hasil Audit v2.0 — Temuan & Status", s_h1))
    story.append(CondPageBreak(2.5 * inch))

    story.append(Paragraph("Ringkasan Audit", s_h2))
    story.append(Paragraph(
        "Audit komprehensif versi 2.0 dilakukan terhadap seluruh landing page JMSE untuk mengidentifikasi "
        "masalah teknis, ketidakakuratan konten, dan potensi perbaikan. Total ditemukan <b>18 temuan</b> "
        "yang diklasifikasikan berdasarkan tingkat severity: <b>Kritis</b> (5 temuan), "
        "<b>Sedang</b> (6 temuan), dan <b>Ringan</b> (7 temuan). Dari 18 temuan tersebut, hanya "
        "<b>2 yang sudah diperbaiki</b> (temuan #4 dan #14), sedangkan 16 lainnya masih belum ditangani.",
        s_body
    ))

    story.append(Paragraph("Tabel Temuan Audit", s_h2))
    story.append(Paragraph(
        "Berikut adalah tabel lengkap seluruh temuan audit beserta kategori, severity, dan status perbaikan:",
        s_body
    ))

    audit_headers = ['#', 'Kategori', 'Temuan', 'Severity', 'Status']
    audit_data = [
        ['1', 'Pricing', 'BOS per panel mismatch (default 275k vs computed 225k — acBreakerPerUnit missing dari display)', 'Kritis', 'Belum diperbaiki'],
        ['2', 'Pricing', '13kWp+48kWh = ~Rp260jt vs anchor Rp230jt — margin flat 35% terlalu tinggi', 'Kritis', 'Belum diperbaiki'],
        ['3', 'ProductSection', 'ROI tidak update saat battery add-on dipilih', 'Kritis', 'Belum diperbaiki'],
        ['4', 'ProductSection', 'Label Platinum "3 Fase" tapi semua inverter 1-Fase', 'Kritis', 'Sudah diperbaiki'],
        ['5', 'LeadForm', 'WA link double query parameter bug', 'Kritis', 'Belum diperbaiki'],
        ['6', 'HeroSection', 'Klaim "Hemat Hingga 90%" — unrealistik untuk hybrid, seharusnya 50-70%', 'Sedang', 'Belum diperbaiki'],
        ['7', 'HeroSection', 'Klaim "34+ Provinsi" — sulit dijustifikasi dengan <50 proyek', 'Sedang', 'Belum diperbaiki'],
        ['8', 'FAQSection', 'Overclaim "4-6x lipat investasi" — hanya valid untuk paket besar', 'Sedang', 'Belum diperbaiki'],
        ['9', 'ComparisonSection', '"Hampir Rp 0 setelah ROI" misleading untuk hybrid', 'Sedang', 'Belum diperbaiki'],
        ['10', 'SavingsCalculator', 'selfConsumption 70% vs pricing.ts 50%/75% — inkonsisten', 'Sedang', 'Belum diperbaiki'],
        ['11', 'ProductSection', 'Diskon 5% badge ada tapi tidak ada coret harga asli', 'Sedang', 'Belum diperbaiki'],
        ['12', 'TestimonialSection', 'Sebagian besar testimoni dari luar Jambi', 'Ringan', 'Belum diperbaiki'],
        ['13', 'TrustSection', 'Sertifikasi "BPK PENGGUNA" non-standar dan mencurigakan', 'Ringan', 'Belum diperbaiki'],
        ['14', 'ProductSection', 'Key inverter masih "deye/growatt" (display sudah Powmr)', 'Ringan', 'Sudah diperbaiki'],
        ['15', 'SavingsCalculator', '"Profit 25thn" ambigu — net profit atau total return', 'Ringan', 'Belum diperbaiki'],
        ['16', 'UrgencySection', '"Kuota 5 slot" tanpa mekanisme backend', 'Ringan', 'Belum diperbaiki'],
        ['17', 'Kalibrasi', 'computedBOSPerPanel display tidak include acBreakerPerUnit', 'Ringan', 'Belum diperbaiki'],
        ['18', 'PortfolioSection', 'Referensi gambar mungkin tidak ada di /public/', 'Ringan', 'Belum diperbaiki'],
    ]
    story.append(make_table(audit_headers, audit_data, [0.35*inch, 1.2*inch, 3.1*inch, 0.7*inch, 1.1*inch]))

    story.append(Spacer(1, 0.3 * inch))
    story.append(Paragraph("Analisis Severity", s_h2))

    story.append(Paragraph("Kritis (5 Temuan)", s_h3))
    story.append(Paragraph(
        "Temuan kritis berkaitan dengan masalah yang berdampak langsung pada akurasi harga, "
        "fungsionalitas utama, dan kredibilitas bisnis. Temuan #1 (BOS mismatch) dan #2 (margin "
        "terlalu tinggi untuk paket besar) dapat menyebabkan kehilangan pelanggan karena harga "
        "tidak kompetitif. Temuan #3 (ROI tidak dinamis dengan baterai) mengurangi akurasi informasi "
        "yang ditampilkan. Temuan #5 (bug WA link) berdampak langsung pada konversi lead.",
        s_body
    ))

    story.append(Paragraph("Sedang (6 Temuan)", s_h3))
    story.append(Paragraph(
        "Temuan sedang terkait dengan klaim-klaim marketing yang perlu disesuaikan agar lebih "
        'realistis dan akurat. Klaim "Hemat 90%" (#6), "34+ Provinsi" (#7), dan "4-6x lipat '
        'investasi" (#8) berpotensi menurunkan kepercayaan pelanggan jika dianggap berlebihan. '
        "Inkonsistensi selfConsumption (#10) antara komponen kalkulator dan pricing engine juga "
        "perlu diselaraskan untuk menghindari perbedaan kalkulasi.",
        s_body
    ))

    story.append(Paragraph("Ringan (7 Temuan)", s_h3))
    story.append(Paragraph(
        "Temuan ringan bersifat kosmetik atau berkaitan dengan detail minor yang tidak berdampak "
        "langsung pada fungsionalitas utama. Meskipun demikian, perbaikan pada temuan ringan tetap "
        "penting untuk menjaga profesionalisme dan konsistensi keseluruhan landing page.",
        s_body
    ))

    # ══════════════════════════════════════════════════
    # BAB 7: Roadmap Perbaikan
    # ══════════════════════════════════════════════════
    story.append(PageBreak())
    story.append(Paragraph("Bab 7: Roadmap Perbaikan Prioritas", s_h1))
    story.append(CondPageBreak(2.5 * inch))

    story.append(Paragraph("Pendekatan Bertahap", s_h2))
    story.append(Paragraph(
        "Perbaikan dilakukan dalam 4 fase berdasarkan prioritas dan kompleksitas. Setiap fase "
        "berdurasi satu minggu dan mencakup perbaikan yang saling terkait untuk meminimalkan "
        "risiko regresi dan memaksimalkan dampak perbaikan.",
        s_body
    ))

    story.append(Paragraph("Phase 1 — Minggu 1: Pricing dan ROI (Kritis)", s_h2))
    story.append(Paragraph(
        "Fase pertama berfokus pada perbaikan masalah kritis terkait pricing engine dan kalkulasi ROI. "
        "Tindakan yang dilakukan meliputi:",
        s_body
    ))
    phase1_items = [
        "Memperbaiki BOS per panel mismatch: memastikan nilai default 275k konsisten dengan hasil computed.",
        "Menambahkan acBreakerPerUnit ke dalam display computedBOSPerPanel.",
        "Merekalibrasi margin untuk paket besar (13kWp+) agar sesuai dengan anchor harga Rp230jt.",
        "Membuat ROI dinamis yang memperhitungkan penambahan baterai (ROI battery-inclusive).",
    ]
    for item in phase1_items:
        story.append(Paragraph(f"\u2022 {item}", s_bullet))

    story.append(Paragraph("Phase 2 — Minggu 2: Bug dan Label (Kritis)", s_h2))
    story.append(Paragraph(
        "Fase kedua menangani bug fungsional dan ketidaksesuaian label yang berdampak pada kredibilitas:",
        s_body
    ))
    phase2_items = [
        "Memperbaiki bug double query parameter pada WhatsApp link di LeadForm.",
        "Memverifikasi dan menyesuaikan label inverter (sudah Powmr, bukan Deye/Growatt).",
        "Menghapus atau mengganti label '3 Fase' pada paket Platinum jika semua inverter 1-Fase.",
    ]
    for item in phase2_items:
        story.append(Paragraph(f"\u2022 {item}", s_bullet))

    story.append(Paragraph("Phase 3 — Minggu 3: Konten dan Konsistensi (Sedang)", s_h2))
    story.append(Paragraph(
        "Fase ketiga berfokus pada penyesuaian konten marketing dan konsistensi parameter:",
        s_body
    ))
    phase3_items = [
        "Menyesuaikan klaim HeroSection: mengubah 'Hemat Hingga 90%' menjadi 'Hemat 50-70%'.",
        "Menyesuaikan klaim '34+ Provinsi' menjadi pernyataan yang dapat dijustifikasi.",
        "Memperbaiki FAQ overclaim '4-6x lipat investasi' dengan keterangan lebih akurat.",
        "Menyelaraskan nilai selfConsumption antara SavingsCalculator dan pricing.ts.",
        "Menambahkan coret harga asli (strikethrough) pada badge diskon 5%.",
    ]
    for item in phase3_items:
        story.append(Paragraph(f"\u2022 {item}", s_bullet))

    story.append(Paragraph("Phase 4 — Minggu 4: Finishing dan Polish (Ringan)", s_h2))
    story.append(Paragraph(
        "Fase terakhir menangani perbaikan kosmetik dan pembersihan konten:",
        s_body
    ))
    phase4_items = [
        "Mengganti testimoni dari luar Jambi dengan testimoni lokal atau menambahkan keterangan lokasi.",
        "Menghapus atau mengganti sertifikasi 'BPK PENGGUNA' yang non-standar.",
        "Memperbaiki label 'Profit 25thn' agar lebih jelas (net profit vs total return).",
        "Mengimplementasi mekanisme backend untuk urgency slot atau menghapus fitur 'Kuota 5 slot'.",
        "Memverifikasi keberadaan semua referensi gambar di folder /public/.",
    ]
    for item in phase4_items:
        story.append(Paragraph(f"\u2022 {item}", s_bullet))

    # ══════════════════════════════════════════════════
    # BAB 8: Panduan Deployment
    # ══════════════════════════════════════════════════
    story.append(PageBreak())
    story.append(Paragraph("Bab 8: Panduan Deployment", s_h1))
    story.append(CondPageBreak(2.5 * inch))

    story.append(Paragraph("Build dan Export", s_h2))
    story.append(Paragraph(
        "Proses build dan export menghasilkan file-file statis yang siap untuk di-deploy. "
        "Jalankan perintah berikut di root direktori proyek:",
        s_body
    ))
    story.append(Paragraph(
        "<font name='DejaVuSans'>npm run build &amp;&amp; npm run export</font>",
        s_code
    ))
    story.append(Paragraph(
        "Atau jika menggunakan Next.js versi terbaru (13+), gunakan output standalone atau "
        "konfigurasi <font name='DejaVuSans'>output: 'export'</font> di "
        "<font name='DejaVuSans'>next.config.js</font>. File hasil export akan berada di folder "
        "<font name='DejaVuSans'>out/</font>.",
        s_body
    ))

    story.append(Paragraph("Hosting", s_h2))
    story.append(Paragraph(
        "Karena menggunakan static export, landing page dapat dihosting di berbagai platform "
        "tanpa memerlukan server Node.js. Berikut adalah opsi hosting yang direkomendasikan:",
        s_body
    ))
    host_items = [
        "<b>Vercel</b> — Platform pilihan utama, integrasi langsung dengan Next.js. Deploy otomatis melalui Git push.",
        "<b>Netlify</b> — Alternatif Vercel dengan fitur serupa. Upload folder out/ atau hubungkan repository Git.",
        "<b>Shared Hosting</b> — Upload seluruh isi folder out/ ke direktori public_html via FTP/cPanel.",
    ]
    for item in host_items:
        story.append(Paragraph(f"\u2022 {item}", s_bullet))

    story.append(Paragraph("SEO dan Meta Tags", s_h2))
    story.append(Paragraph(
        "Landing page telah dikonfigurasi dengan meta tags untuk optimasi mesin pencari. "
        "Konfigurasi SEO meliputi:",
        s_body
    ))
    seo_items = [
        "<b>Meta Tags</b> — Title, description, dan keyword yang dioptimalkan untuk kata kunci 'PLTS Jambi', 'panel surya Jambi', dan 'EPC surya'.",
        "<b>Open Graph</b> — Tag OG untuk preview saat landing page dibagikan di Facebook dan media sosial lainnya.",
        "<b>Schema Markup</b> — Implementasi JSON-LD untuk tipe <font name='DejaVuSans'>LocalBusiness</font> (informasi bisnis JMSE) dan <font name='DejaVuSans'>FAQPage</font> (pertanyaan di section FAQ).",
    ]
    for item in seo_items:
        story.append(Paragraph(f"\u2022 {item}", s_bullet))

    story.append(Paragraph("Analytics", s_h2))
    story.append(Paragraph(
        "Untuk pelacakan performa kampanye dan konversi, terdapat dua sistem analytics yang terintegrasi:",
        s_body
    ))
    analytics_items = [
        "<b>Facebook Pixel</b> — Melacak event dari iklan Facebook (PageView, ViewContent, Lead, Purchase). "
        "Pixel ID: <font name='DejaVuSans'>YOUR_PIXEL_ID</font> (perlu diganti dengan ID aktif).",
        "<b>Google Analytics</b> — Melacak traffic organik dan perilaku pengguna. Measurement ID: "
        "<font name='DejaVuSans'>G-YOUR_GA_ID</font> (perlu diganti dengan ID aktif).",
    ]
    for item in analytics_items:
        story.append(Paragraph(f"\u2022 {item}", s_bullet))

    story.append(Paragraph("Integrasi WhatsApp", s_h2))
    story.append(Paragraph(
        "Seluruh form lead dan tombol CTA diarahkan ke WhatsApp bisnis JMSE. Nomor WhatsApp "
        "yang digunakan adalah <b>0813-2819-0707</b>. Format pesan otomatis yang dikirim "
        "menggunakan WhatsApp API URL dengan parameter nomor telepon dan pesan ter-encode. "
        "Pastikan tidak ada double query parameter pada URL WhatsApp (temuan audit #5).",
        s_body
    ))

    # ── Final note ──
    story.append(Spacer(1, 0.5 * inch))
    story.append(Paragraph("--- Akhir Dokumen ---", ParagraphStyle(
        'EndMark', fontName='SimHei', fontSize=10, leading=14,
        textColor=TEXT_MUTED, alignment=TA_CENTER, wordWrap='CJK',
    )))

    return story


# ── Main ──
def main():
    output_path = "/home/z/my-project/download/jmse_guide_body.pdf"

    # Build frame
    content_width = PAGE_W - 2 * MARGIN
    content_height = PAGE_H - 2 * MARGIN
    frame = Frame(
        MARGIN, MARGIN, content_width, content_height,
        id='normal'
    )

    # Page template
    page_template = PageTemplate(
        id='body',
        frames=[frame],
        onPage=_footer_and_page,
    )

    # Document
    doc = TocDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN,
        bottomMargin=MARGIN,
        title="Panduan Kompilasi Landing Page JMSE v2.0",
        author="PT. Jaya Mandiri Smart Energy",
        subject="Panduan Kompilasi Landing Page — Audit v2.0",
        creator="ReportLab",
    )
    doc.addPageTemplates([page_template])

    story = build_story()
    doc.multiBuild(story)

    print(f"PDF generated successfully: {output_path}")

    # Get page count
    from reportlab.lib.utils import ImageReader
    import fitz
    pdf_doc = fitz.open(output_path)
    page_count = len(pdf_doc)
    pdf_doc.close()
    print(f"Total pages: {page_count}")


if __name__ == '__main__':
    main()
