import Swal from 'sweetalert2';

export const badRequestConfirmation = (errors) => {
    let text = '<ul style="list-style-type: circle">';
    errors?.map((val, key) => {
        text += "<li>" + val?.message + '</li>';
        return val;
    })
    text += '</ul>'
    console.log(text);
    return Swal.fire({
        title: 'Validation Error',
        html: text,
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#d6306a',
        confirmButtonText: 'Retry'
    });
}

export const authorizationConfirmation = () => {
    return Swal.fire({
        title: 'Session Expired',
        text: 'Your token is expired. Try again to login',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#d63057',
        cancelButtonColor: '#8a8b8d',
        confirmButtonText: 'Try-Again to login',
        cancelButtonText: "Close"
    });
}

export const error500 = (message) => {
    return Swal.fire({
        title: '500 Internal Error',
        text: message,
        icon: 'error',
        showConfirmButton: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Close'
    });
}


export const convertToFormData = (data = {}) => {
    let x = new FormData();
    Object?.entries(data)?.map(([key, val]) => {
        console.log(key, val)
        if (val) {
            x.append(key, val)
        }

    })
    return x
}

export const convertToFormDataDeep = (data = {}) => {
    let formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            // Handle arrays by iterating through them
            value.forEach((item, index) => {
                if (typeof item === 'object' && item !== null) {
                    // Handle objects inside the array
                    Object.entries(item).forEach(([itemKey, itemValue]) => {
                        formData.append(`${key}[${index}][${itemKey}]`, itemValue);
                    });
                } else {
                    // Handle simple values inside the array
                    formData.append(`${key}[${index}]`, item);
                }
            });
        } else if (typeof value === 'object' && value !== null) {
            // Handle nested objects
            Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                formData.append(`${key}[${nestedKey}]`, nestedValue);
            });
        } else {
            // Handle simple key-value pairs
            formData.append(key, value);
        }
    });

    return formData;
};