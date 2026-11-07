document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const statusDiv = document.getElementById('formStatus');


    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    submitBtn.disabled = true;
    submitBtn.innerText = 'Wysyłanie...';
    statusDiv.style.color = '#ffffff';
    statusDiv.innerText = '';

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, subject, message })
        });

        const result = await response.json();

        if (result.success) {
            statusDiv.style.color = '#79df93';
            statusDiv.innerText = result.message;
            document.getElementById('contactForm').reset();
        } else {
            statusDiv.style.color = '#ff7b7b';
            statusDiv.innerText = result.message;
        }
    } catch (error) {
        console.error('Błąd:', error);
        statusDiv.style.color = '#ff7b7b';
        statusDiv.innerText = 'Wystąpił problem z połączeniem z serwerem.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Prześlij wiadomość';
    }
});