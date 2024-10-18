document.getElementById('emailForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    let email = document.querySelector('input[name="email"]').value;

    // Google Sheets integration
    fetch('https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec', {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => {
        document.getElementById('formMessage').textContent = "Thank you for subscribing!";
    })
    .catch(error => {
        console.log(error);
        document.getElementById('formMessage').textContent = "There was an error. Please try again.";
    });

    document.querySelector('input[name="email"]').value = ''; // Clear the input field
}
function doPost(e) {
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    const email = data.email;

    sheet.appendRow([email, new Date()]);
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
                         .setMimeType(ContentService.MimeType.JSON);
}
