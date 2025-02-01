const baseUrl = 'http://localhost/subscription-management'; // المسار إلى مجلد المشروع

// دالة لإضافة اشتراك جديد
async function addSubscription(name, phone, amount, startDate) {
    const response = await fetch(`${baseUrl}/add_subscription.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, amount, startDate })
    });
    return await response.json();
}

// دالة لعرض جميع المشتركين
async function getSubscriptions() {
    const response = await fetch(`${baseUrl}/get_subscriptions.php`);
    return await response.json();
}

// استخدام الدوال في الواجهة
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const startDate = document.getElementById('start-date').value;

    const result = await addSubscription(name, phone, amount, startDate);
    if (result.success) {
        alert(result.message);
        form.reset();
        updateSubscriptionsList();
    } else {
        alert(result.message);
    }
});

async function updateSubscriptionsList() {
    const subscriptions = await getSubscriptions();
    subscriptionsList.innerHTML = '';
    subscriptions.forEach(sub => {
        subscriptionsList.appendChild(createSubscriptionElement(sub));
    });
}

// تحديث البيانات عند تحميل الصفحة
updateSubscriptionsList();