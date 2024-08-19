import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public async exportAsExcelFile(json: any[], excelFileName: string): Promise<void> {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('data');

      // Kiểm tra dữ liệu
      if (json.length === 0) {
        alert('No data to export.');
        return;
      }

      // Chuyển JSON thành rows
      worksheet.columns = Object.keys(json[0]).map(key => ({ header: key, key }));
      json.forEach((data) => {
        worksheet.addRow(data);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      this.saveAsExcelFile(buffer, excelFileName);
    } catch (error) {
      console.error('Error exporting Excel file:', error);
    }
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    try {
      const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
    } catch (error) {
      console.error('Error saving Excel file:', error);
    }
  }
}
