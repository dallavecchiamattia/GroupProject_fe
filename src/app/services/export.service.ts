import { Injectable } from '@angular/core';
import { Movimento } from '../entities';
import { Workbook } from 'exceljs';

@Injectable({
  providedIn: 'root',
})
export class ExportService {

  esportaCSV(movimenti: Movimento[]) {
    const intestazioni = [
      'Categoria',
      'Importo',
      'Descrizione',
      'Data',
    ];

    const righe = movimenti.map(movimento => [
      movimento.categoria.nomeCategoria,
      movimento.importo,
      movimento.descrizioneEstesa,
      movimento.data,
    ]);

    const csv = [
      intestazioni,
      ...righe,
    ]
      .map(riga =>
        riga
          .map(valore => `"${String(valore ?? '').replace(/"/g, '""')}"`)
          .join(';')
      )
      .join('\n');

    const blob = new Blob(
      ['\ufeff' + csv],
      { type: 'text/csv;charset=utf-8;' }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'movimenti.csv';
    link.click();

    URL.revokeObjectURL(url);
  }

  async esportaExcel(movimenti: Movimento[]) {
    const workbook = new Workbook();

    const worksheet = workbook.addWorksheet('Movimenti');

    worksheet.columns = [
      {
        header: 'Categoria',
        key: 'categoria',
        width: 25,
      },
      {
        header: 'Importo',
        key: 'importo',
        width: 15,
      },
      {
        header: 'Descrizione',
        key: 'descrizione',
        width: 40,
      },
      {
        header: 'Data',
        key: 'data',
        width: 15,
      },
    ];

    movimenti.forEach(movimento => {
      worksheet.addRow({
        categoria: movimento.categoria.nomeCategoria,
        importo: movimento.importo,
        descrizione: movimento.descrizioneEstesa,
        data: movimento.data,
      });
    });

    worksheet.getRow(1).font = {
      bold: true,
    };

    worksheet.getColumn('importo').numFmt = '#,##0.00 €';

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob(
      [buffer],
      {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'movimenti.xlsx';
    link.click();

    URL.revokeObjectURL(url);
  }
}