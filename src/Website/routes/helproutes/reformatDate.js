/**
 * this method remove the timestamp for a better customer expierence on the
 * website
 * @param data
 * @return {Promise<*>}
 */
 async function removeTimeStampForDevice(data){

    for (let i=0; i<data.length; i++){
        data[i].guarantee =splitValues(data[i].guarantee);
        data[i].lastLocationUpdate = splitValues(data[i].lastLocationUpdate);
        data[i].lastTuev = splitValues(data[i].lastTuev);
        data[i].lastUvv = splitValues(data[i].lastUvv);
    }
    return await data;
}

/**
 * look at the doc for removeTimeStampForDevice
 * @param data
 * @return {Promise<*>}
 */
async function removeTimeStampForBooking(data){
    for (let i=0; i<data.length; i++){
        data[i].loanDay =splitValues(data[i].loanDay);
        data[i].loanEnd = splitValues(data[i].loanEnd);
    }
    return await data;
}

/**
 * look at the doc for removeTimeStampForDevice
 * @param data
 * @return {Promise<*>}
 */
 async function removeTimeStampForHistory(data){
     for (let i=0; i<data.length; i++){
         data[i].guarantee =splitValues(data[i].guarantee);
         data[i].lastLocationUpdate = splitValues(data[i].lastLocationUpdate);
         data[i].lastTuev = splitValues(data[i].lastTuev);
         data[i].lastUvv = splitValues(data[i].lastUvv);
         data[i].lastRepair = splitValues(data[i].lastRepair);
         data[i].lastChange = splitValues(data[i].lastChange);
     }
    return await data;
 }

 async function removeTimestampForBookingNotifcation(data){
     for (let i=0; i<data.length; i++){
         data[i].loan_end = splitValues(data[i].loan_end);
     }
     return data;
 }

async function removeTimestampForNotifcation(data){
    for (let i=0; i<data.length; i++){
        data[i].timestamp = splitValues(data[i].timestamp);
    }
    return data;
}

/**
 * look at the doc for removeTimeStampForDevice
 * @return {Promise<*>}
 * @param arraytosplit
 */
 function splitValues(arraytosplit){
    if (arraytosplit !== null){
        const stringArray = arraytosplit.toString();
        const withoutTime = stringArray.split("T");
        return withoutTime[0];
    }else {
        return arraytosplit;
    }
}

module.exports = {
    removeTimeStampForDevice,
    removeTimeStampForBooking,
    removeTimeStampForHistory,
    removeTimestampForBookingNotifcation,
    removeTimestampForNotifcation,

};