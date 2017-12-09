var pdfreader = require('pdfreader');
var model = require('./model.js');
var writeFile = require('write');
var excel = require('node-excel-export');

const styles = {
    headerDark: {
        fill: {
            fgColor: {
                rgb: 'FFFFFFFF'
            }
        },
        font: {
            color: {
                rgb: '00000000'
            },
            sz: 12,
            bold: true,
            underline: true
        }
    },
    cellPink: {
        fill: {
            fgColor: {
                rgb: 'FFFFCCFF'
            }
        }
    },
    cellGreen: {
        fill: {
            fgColor: {
                rgb: 'FF00FF00'
            }
        }
    }
};

const CONST_HEADER = "Directory of Members  2017";

const SUB_HEADER_TYPE_1 = "Governing Council  2016-2017"
const SUB_HEADER_TYPE_2 = "Past Presidents"

const excel_spec = {
    name_category: {
        displayName: 'Name/Category/Position',
        headerStyle: styles.headerDark,
        cellStyle: function (value, row) {
            return value ? value : "-"
        },
        width: 1200
    },
    office_addr: {
        displayName: 'Office Address',
        headerStyle: styles.headerDark,
        cellFormat: function (value, row) {
            return value ? value : "-"
        },
        width: 500
    },
    office_tel: {
        displayName: 'Office Tel No',
        headerStyle: styles.headerDark,
        cellStyle: function (value, row) {
            return value ? value : "-"
        },
        width: 200
    },
    office_fax: {
        displayName: 'Office Fax No',
        headerStyle: styles.headerDark,
        cellFormat: function (value, row) {
            return value ? value : "-"
        },
        width: 200
    },
    office_email: {
        displayName: 'Office Email',
        headerStyle: styles.headerDark,
        cellStyle: function (value, row) {
            return value ? value : "-"
        },
        width: 200
    },
    residence_addr: {
        displayName: 'Residence Address',
        headerStyle: styles.headerDark,
        cellFormat: function (value, row) {
            return value ? value : "-"
        },
        width: 400
    },
    residence_tel: {
        displayName: 'Residence Tel No',
        headerStyle: styles.headerDark,
        cellStyle: function (value, row) {
            return value ? value : "-"
        },
        width: 200
    },
    residence_email: {
        displayName: 'Residence Email',
        headerStyle: styles.headerDark,
        cellStyle: function (value, row) {
            return value ? value : "-"
        },
        width: 200
    }
}

const FILTER_TYPE_ACA = "ACA"
const FILTER_TYPE_ACA_SPEC = {
    name: 'ACA',
    specification: excel_spec,
    data: []
}

const FILTER_TYPE_FCA = "FCA"
const FILTER_TYPE_FCA_SPEC = {
    name: 'FCA',
    specification: excel_spec,
    data: []
}

const FILTER_TYPE_MBA = "MBA"
const FILTER_TYPE_MBA_SPEC = {
    name: 'MBA',
    specification: excel_spec,
    data: []
}

const FILTER_TYPE_FMAAT = "FMAAT"
const FILTER_TYPE_FMAAT_SPEC = {
    name: 'FMAAT',
    specification: excel_spec,
    data: []
}

const FILTER_TYPE_SAT = "SAT"
const FILTER_TYPE_SAT_SPEC = {
    name: 'SAT',
    specification: excel_spec,
    data: []
}

const FILTER_TYPE_MAAT = "MAAT"
const FILTER_TYPE_MAAT_SPEC = {
    name: 'MAAT',
    specification: excel_spec,
    data: []
}


var rows = {};
var strRow = ""
var counter = 501

function printRows() {
    //var profiles = {};
    // console.log(rows)

    counter--;

    Object.keys(rows)
        .sort((y1, y2) => parseFloat(y1) - parseFloat(y2))
        .forEach((y, index) => {
            const row = (rows[y] || []).join('').trim()

            // console.log(index, row, CONST_HEADER)
            if (index == 0 && row != CONST_HEADER) {
                return
            }

            // console.log(row)
            strRow += row
            if (index == (Object.keys(rows).length - 1)) {
                //profiles[](strRow)
                // console.log(strRow)
                if (strRow.indexOf("OFFICE") == -1  && strRow.indexOf("RESIDENCE") == -1)
                return

                try{
                var rowModel = new model(strRow)
                } catch(ex){
                    console.log(ex)
                }

                if (rowModel.isACA()) {
                    FILTER_TYPE_ACA_SPEC.data.push(rowModel.getData())
                }

                if (rowModel.isFCA()) {
                    FILTER_TYPE_FCA_SPEC.data.push(rowModel.getData())
                }

                if (rowModel.isFMAAT()) {
                    FILTER_TYPE_FMAAT_SPEC.data.push(rowModel.getData())
                }

                if (rowModel.isSAT()) {
                    FILTER_TYPE_SAT_SPEC.data.push(rowModel.getData())
                }

                if (rowModel.isMAAT()) {
                    FILTER_TYPE_MAAT_SPEC.data.push(rowModel.getData())
                }

                if (rowModel.isMBA()) {
                    FILTER_TYPE_MBA_SPEC.data.push(rowModel.getData())
                }

                console.log("counter" + counter)
                if (counter == 0) {
                    try {
                        const report = excel.buildExport([FILTER_TYPE_ACA_SPEC,
                            FILTER_TYPE_FCA_SPEC,
                            FILTER_TYPE_FMAAT_SPEC,
                            FILTER_TYPE_SAT_SPEC,
                            FILTER_TYPE_MAAT_SPEC,
                            FILTER_TYPE_MBA_SPEC]);

                        writeFile('data.xlsx', report).then(() => {
                            console.log("Document Ready")
                        }).catch((err) => {
                            console.log(err)
                        })

                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        });
}

new pdfreader.PdfReader().parseFileItems('./app/pdfs/directory-of-members-2017-1-500.pdf', function (err, item) {

    if (!item || item.page) {

        // end of file, or page
        printRows();
        console.log('PAGE:', item.page);
        rows = {}; // clear rows for next page
        strRow = ""

    }
    else if (item.text) {
        // accumulate text items into rows object, per line
        (rows[item.y] = rows[item.y] || []).push(item.text);
    }
});