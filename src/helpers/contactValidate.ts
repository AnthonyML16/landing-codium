export const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

export const isValidPhone = (phone: string) => {
    const cleanedPhoneNumber = phone.replace(/\s/g, '');
    const phoneRegex = /^\+?\d+$/;
    return phoneRegex.test(cleanedPhoneNumber);
}