import _ from "lodash"

const handleOnchangeInputs = (setValue, dataClone, valueInput, nameData) => {
    const _dataClone = _.cloneDeep(dataClone)
    _dataClone[nameData] = valueInput
    setValue(_dataClone)
}

function formatDate(dateString) {
    // Tạo một đối tượng Date từ chuỗi ngày tháng
    const date = new Date(dateString);
    
    // Lấy các giá trị ngày, tháng, năm
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
    const day = date.getDate().toString().padStart(2, '0');
    
    // Trả về chuỗi định dạng ngày-tháng-năm
    return `${day}-${month}-${year}`;
}

export {
    handleOnchangeInputs, 
    formatDate
}