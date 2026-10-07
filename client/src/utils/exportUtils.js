import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Export to CSV / Excel format
export const exportToCSV = (title, headers, rows) => {
  const sanitize = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const csvRows = [
    [`"Report Title: ${title}"`],
    [`"Generated: ${new Date().toLocaleString()}"`],
    [`"Institution: Apex International Institute of Technology - Smart Hostel Complex"`],
    [],
    headers.map(sanitize).join(','),
    ...rows.map(row => row.map(sanitize).join(','))
  ];

  const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(csvRows.join('\n'));
  const link = document.createElement("a");
  link.setAttribute("href", csvContent);
  link.setAttribute("download", `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export to formatted printable PDF
export const exportToPDF = (report) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Header Banner
  doc.setFillColor(30, 41, 59); // Slate-800
  doc.rect(0, 0, 210, 28, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text("SMART HOSTEL UTILITY OPTIMIZATION & RESOURCE MANAGEMENT", 14, 12);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text("Apex International Institute of Technology • High-Density Institutional Dashboard", 14, 20);

  // Subheader
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(report.title || "Institutional Audit Report", 14, 38);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated on: ${new Date().toLocaleString()}  |  Auditor: Chief Hostel Warden`, 14, 45);

  // Summary box if provided
  let startY = 52;
  if (report.summary) {
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(14, 48, 182, 16, 2, 2, 'F');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    
    const summaryTexts = Object.entries(report.summary).map(([k, v]) => `${k.replace(/([A-Z])/g, ' $1')}: ${v}`).join('   •   ');
    doc.text(summaryTexts.substring(0, 115), 18, 58);
    startY = 70;
  }

  // Data Table
  autoTable(doc, {
    startY: startY,
    head: [report.headers],
    body: report.rows,
    theme: 'grid',
    headStyles: {
      fillColor: [14, 165, 233], // Ocean Sky Blue
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9
    },
    styles: {
      fontSize: 8.5,
      cellPadding: 3,
      valign: 'middle'
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    margin: { left: 14, right: 14 }
  });

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Page ${i} of ${pageCount} - Confidential Institution Record`, 14, 290);
    doc.text(`System Verified: AI Resource & Anomaly Engine`, 140, 290);
  }

  const filename = `${report.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now()}.pdf`;
  doc.save(filename);
};
