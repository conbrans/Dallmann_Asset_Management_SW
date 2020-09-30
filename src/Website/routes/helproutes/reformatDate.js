/**
 * this method remove the timestamp for a better customer expierence on the
 * website
 * @param data
 * @return {Promise<*>}
 */
 async function removeTimeStampForDevice(data){

    for (var i=0;i<data.length;i++){
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
    for (var i=0;i<data.length;i++){
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
     for (var i=0;i<data.length;i++){
         data[i].guarantee =splitValues(data[i].guarantee);
         data[i].lastLocationUpdate = splitValues(data[i].lastLocationUpdate);
         data[i].lastTuev = splitValues(data[i].lastTuev);
         data[i].lastUvv = splitValues(data[i].lastUvv);
         data[i].lastRepair = splitValues(data[i].lastRepair);
         data[i].lastChange = splitValues(data[i].lastChange);
     }
    return await data;
 }

/**
 * look at the doc for removeTimeStampForDevice
 * @param data
 * @return {Promise<*>}
 */
 function splitValues(arraytosplit){
    if (arraytosplit !== null){
        var stringArray = arraytosplit.toString();
        var withoutTime = stringArray.split("T");
        return withoutTime[0];
    }else {
        return arraytosplit;
    }
}

module.exports = {
    removeTimeStampForDevice,
    removeTimeStampForBooking,
    removeTimeStampForHistory,
};