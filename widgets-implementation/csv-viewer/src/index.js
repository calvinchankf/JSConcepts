const $fileUploadInput = document.getElementById("file-upload-input");
const $tableDiv = document.getElementById("csv-table");

// UI
const generateHeader = fields => {
    const $header = document.createElement("div");
    $header.setAttribute("class", "header");
    for (let f of fields) {
        const $textDiv = createTextDiv(f, 'header-text')
        $header.appendChild($textDiv);
    }
	return $header;
}

const createTextDiv = (text, classname) => {
    const $textWrapper = document.createElement("div");
	const $textDiv = document.createTextNode(text);
    $textWrapper.setAttribute("class", classname);
	$textWrapper.appendChild($textDiv);
	return $textWrapper;
}

const generateRow = row => {
    const $row = document.createElement("div");
    $row.setAttribute("class", "row");
    for (let key in row) {
        const val = row[key]
        const $textDiv = createTextDiv(val, 'row-text')
        $row.appendChild($textDiv);
    }
	return $row;
}

const renderHeaderAndRows = data => {
    $tableDiv.innerHTML = ''
    
    $header = generateHeader(data.header)
    $tableDiv.appendChild($header)
    
    for (let row of data.rows) {
        $row = generateRow(row)
        $tableDiv.appendChild($row)
    }
}

// data
const getHeaderAndRows = raw => {
    return {
        header: raw.meta.fields,
        rows: raw.data,
    }
}

// events
function fileUploadHandler() {
    const files = this.files
    const file = files[0]
    console.log(file)

    Papa.parse(file, {
        download: true,
        header: true,
        complete: function(result) {
            // console.log(result);
            if (result.errors.length > 0) {
                alert("There is an error")
            }
            const data = getHeaderAndRows(result)
            renderHeaderAndRows(data)
        }
    });
}
$fileUploadInput.addEventListener("change", fileUploadHandler, false);