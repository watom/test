package com.watom.myjava;

import java.io.File;
import java.io.IOException;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

public class java��ȡexcel�ļ����� {
	public static void main(String[] args) throws EncryptedDocumentException, IOException {
		String filePath;
//		filePath="F:/test.xls";
//		filePath="external_resources/��ͨ���.xls";
//		filePath="external_resources/���ϲ���Ԫ��.xls";
		filePath="external_resources/���sheetҳ���.xls";
		
		File xlsFile = new File(filePath);

		// ������
		Workbook workbook = WorkbookFactory.create(xlsFile);

		// �������
		int numberOfSheets = workbook.getNumberOfSheets();

		// ������
		for (int i = 0; i < numberOfSheets; i++) {
			Sheet sheet = workbook.getSheetAt(i);

			// ������
			int rowNumbers = sheet.getLastRowNum() + 1;

			// Excel��һ�С�
			Row temp = sheet.getRow(0);
			if (temp == null) {
				continue;
			}

			int cells = temp.getPhysicalNumberOfCells();

			// �����ݡ�
			for (int row = 0; row < rowNumbers; row++) {
				Row r = sheet.getRow(row);
				for (int col = 0; col < cells; col++) {
					System.out.print(r.getCell(col).toString() + " ");
				}

				// ���С�
				System.out.println();
			}
		}
	}

}
