package com.watom.myjava;

import java.io.File;
import java.io.IOException;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

public class java读取excel文件内容 {
	public static void main(String[] args) throws EncryptedDocumentException, IOException {
		String filePath;
//		filePath="F:/test.xls";
//		filePath="external_resources/普通表格.xls";
//		filePath="external_resources/带合并单元格.xls";
		filePath="external_resources/多个sheet页表格.xls";
		
		File xlsFile = new File(filePath);

		// 工作表
		Workbook workbook = WorkbookFactory.create(xlsFile);

		// 表个数。
		int numberOfSheets = workbook.getNumberOfSheets();

		// 遍历表。
		for (int i = 0; i < numberOfSheets; i++) {
			Sheet sheet = workbook.getSheetAt(i);

			// 行数。
			int rowNumbers = sheet.getLastRowNum() + 1;

			// Excel第一行。
			Row temp = sheet.getRow(0);
			if (temp == null) {
				continue;
			}

			int cells = temp.getPhysicalNumberOfCells();

			// 读数据。
			for (int row = 0; row < rowNumbers; row++) {
				Row r = sheet.getRow(row);
				for (int col = 0; col < cells; col++) {
					System.out.print(r.getCell(col).toString() + " ");
				}

				// 换行。
				System.out.println();
			}
		}
	}

}
