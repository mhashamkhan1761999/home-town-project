import { authorizationConfirmation, badRequestConfirmation, error500 } from ".";

export const responseError = async (e) => {
    // sweetAlert(e?.data?.statusCode, 'error')
    if (e.data?.statusCode === 401) {
        // data.push({message : e.message , color : 'warning'});
        // if(e.errors.length > 0 && e.message){
        //     data.push({ message : e.message , color : 'warning'});
        // }
        await authorizationConfirmation();
    }
    else if (e.data?.statusCode === 409) {
        let data = [];
        if (e.data?.message) {
            data.push({ message: e.data?.message, color: 'warning' });
        }

        console.log('validation error', data);
        await badRequestConfirmation(data)
    }
    else if (e.data?.statusCode === 422 || e.data?.statusCode === 405) {
        // data.push( { message: e.errors , color : 'warning' } );
    }
    else if ((e.data?.statusCode == 400 && e.data?.errors)) {

        let data = [];
        for (let key in e.data?.errors) {
            console.log('login', e.data?.errors[key]?.message, e.data?.errors[key])
            if (e.data?.errors?.hasOwnProperty(key)) {

                data.push({
                    message: e.data?.errors?.errors ? e.data?.errors?.errors : (e.data?.errors[key]?.message ? e.data?.errors[key]?.message : e.data?.errors[key][0]),
                    color: 'warning'
                });
            }
        }
        if (e.data?.errors?.length === 0 && e.data?.message) {
            data.push({ message: e.data?.message, color: 'warning' });
        }

        console.log('validation error', data);
        await badRequestConfirmation(data)
    }
    else if (e.statusCode === 404) {
        // data.push({message : e.message , color : 'info'});
    }
    else {
        // data.push({message : e.message ,color : 'danger' });
        console.log(e?.data?.message);
        await error500(e?.data?.message);

    }
    // return data;

}






