const formatCurrency = (value) => {
    const currency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    return currency.format(value);
}
export default formatCurrency