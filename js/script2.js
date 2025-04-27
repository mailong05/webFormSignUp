let sttCounter = 1;

const reMap = {
    name: /^([A-Z]+[a-zà-ỹ]*)+(\s[A-Z]+[a-zà-ỹ]*)*$/,
    phone: /^0\d{2}-\d{3}-\d{4}$/,
    email: /^[\w.-]+@iuh\.edu\.vn$/,
    province: /^([A-Z]+[a-zA-Z]*)(\s[A-Z]+[a-zA-Z]+)*$/,
    cmnd: /^\d{9}$/
};

const message = {
    name: "Tên không hợp lệ!",
    phone: "Số điện thoại dạng 0xx-xxx-xxxx",
    province: "Phải viết hoa tất cả",
    email: "Email phải có dạng xxxx@iuh.edu.vn",
    cmnd: "CMND phải đúng 9 chữ số"
};

function validateFiel(input) {
    let id = input.id;
    let val = input.value.trim();
    let errorSpan = document.getElementById('error-' + id);
    if (reMap[id] && !reMap[id].test(val)) {
        errorSpan.textContent = message[id];
        return false;
    }
    else {
        errorSpan.textContent = '';
        return true;
    }
}

function validateFunc() {
    let isValid = true;
    document.querySelectorAll('#formInfor input[type="text"], #formInfor input[type="tel"], #formInfor input[type="email"]').forEach(input => {
        if (!validateFiel(input))
            isValid = false;
    })
    return isValid;
}

document.querySelectorAll('#formInfor input[type="text"], #formInfor input[type="tel"], #formInfor input[type="email"]').forEach(input => {
    input.addEventListener('input', () => {
        validateFiel(input);
    })
});

document.getElementById('btnSave').addEventListener('click', () => {
    if (!validateFunc()) return;

    let name = document.getElementById('name').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let province = document.getElementById('province').value.trim();
    let email = document.getElementById('email').value.trim();
    let cmnd = document.getElementById('cmnd').value.trim();
    let avatar = document.getElementById('avatar').files[0]?.name || '';

    let tbody = document.querySelector('.main-content tbody');
    let newRow = document.createElement('tr');

    newRow.innerHTML = `
    <td>${sttCounter++}</td>
    <td>${name}</td>
    <td>${cmnd}</td>
    <td>${phone}</td>
    <td>${email}</td>
    <td>${province}</td>
    <td>${avatar}</td>
    `;

    tbody.appendChild(newRow);

    document.getElementById('formInfor').reset();
    document.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
    });

    const modal = bootstrap.Modal.getInstance(document.getElementById('modalId'));
    modal.hide();
});

