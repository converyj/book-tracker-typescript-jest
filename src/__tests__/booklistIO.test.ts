import { exportBooks, formatImportBook } from '../utils/helper';

jest.mock('file-saver', () => ({
	__esModule: true,
	default: jest.fn()
}));

jest.mock('exceljs', () => {
	class Workbook {
		xlsx = {
			writeBuffer: jest.fn(() => Promise.resolve(new ArrayBuffer(8)))
		};

		addWorksheet = jest.fn(() => {
			let _columns: Array<{ header: string; key: string; eachCell?: () => void }> = [];
			const worksheet = {
				get columns() {
					return _columns;
				},
				set columns(cols: Array<{ header: string; key: string }>) {
					_columns = cols.map((col) => ({
						...col,
						eachCell: jest.fn()
					}));
				},
				getRow: jest.fn(() => ({
					font: {},
					alignment: {},
					border: {},
					fill: {},
					getCell: jest.fn(() => ({ value: '' }))
				})),
				addRows: jest.fn(),
				rowCount: 1,
				eachRow: jest.fn(),
				getColumn: jest.fn(() => ({ numFmt: '', hidden: false }))
			};
			return worksheet;
		});
	}

	return {
		__esModule: true,
		default: { Workbook }
	};
});

describe('booklist import/export', () => {
	beforeEach(() => {
		// Silence alerts during test runs
		jest.spyOn(window, 'alert').mockImplementation(() => {});
	});

	afterEach(() => {
		// Restore any mocked globals
		jest.restoreAllMocks();
	});

	it('exports a book list without throwing', async () => {
		// Arrange: minimal book list
		const books = [
			{
				id: 'id-1',
				title: 'Example Book',
				authors: ['Jane Doe'],
				date: '2024-01-01',
				isLibraryBook: false,
				rate: 4,
				comment: ''
			}
		];

		// Act/Assert: export helper runs without errors
		expect(() => exportBooks(books)).not.toThrow();
	});

	it('formats imported rows into books', () => {
		// Arrange: example import row shape
		const formatted = formatImportBook({
			Id: 'id-1',
			Title: 'Imported Book',
			Authors: 'Jane Doe',
			RealDate: '2024-01-02',
			LibraryBook: 'Yes',
			Rate: '5/5',
			Comment: 'Great',
			image: 'img',
			link: 'link'
		});

		// Assert: output matches expected book shape
		expect(formatted).toEqual({
			id: 'id-1',
			title: 'Imported Book',
			authors: ['Jane Doe'],
			image: 'img',
			link: 'link',
			date: '2024-01-02',
			isLibraryBook: true,
			rate: 5,
			comment: 'Great'
		});
	});
});
