let sttCounter = 1;
const reMap = {
    name: /^([A-Z][a-zA-Z]*)(\s[A-Z][a-zA-Z]*)*$/,
    cmnd: /^\d{9}$/,
    province: /^([A-Z]+)(\s[A-Z]+)*$/,
    email: /^[\w.-]+@iuh\.edu\.vn$/,
    phone: /^0\d{2}-\d{3}-\d{4}$/
};

const message = {
    name: "Họ và tên không hợp lệ !",
    cmnd: "CMND phải có 9 chữ số ",
    province: "Quê quán phải bắt đầu chữ hoa và chỉ ghi hoa và không ghi các kí tự đặc biệt ",
    email: "Email phải nhập theo mẫu xxxxxx@iuh.edu.vn ",
    phone: "SĐT phải có dạng 0xx-xxx-xxxx "
};

function validateFiel(input) {
    const id = input.id;
    const val = input.value.trim();
    const errorSpan = document.getElementById('error-' + id);

    if (reMap[id] && !reMap[id].test(val)) {
        errorSpan.textContent = message[id];
        return false;
    }
    else {
        errorSpan.textContent = '';
        return true;
    }
}

function validateForm() {
    let isValid = true;
    document.querySelectorAll('#formInfor input[type="text"], #formInfor input[type = "tel"], #formInfor input[type="email"]')
        .forEach(i => {
            if (!validateFiel(i))
                isValid = false;
        });
    return isValid;
}

document.querySelectorAll('#formInfor input[type="text"], #formInfor input[type="tel"], #formInfor input[type="email"]').forEach(input => {
    input.addEventListener('input', () => validateFiel(input));
});


document.getElementById('btnSave').addEventListener('click', function () {
    if (!validateForm()) return;

    const name = document.getElementById('name').value.trim();
    const cmnd = document.getElementById('cmnd').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const province = document.getElementById('province').value.trim();
    const email = document.getElementById('email').value.trim();
    const avatar = document.getElementById('avatar').files[0]?.name || '';

    const tbody = document.querySelector('section tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
    <td>${sttCounter++}</td>
    <td>${name}</td>
    <td>${cmnd}</td>
    <td>${province}</td>
    <td>${email}</td>
    <td>${phone}</td>
    <td>${avatar}</td>
    `;
    tbody.appendChild(newRow);

    document.getElementById('formInfor').reset();
    document.querySelectorAll('.error').forEach(error => error.textContent = '');

    const modal = bootstrap.Modal.getInstance(document.getElementById('modalId'));
    modal.hide();

});




