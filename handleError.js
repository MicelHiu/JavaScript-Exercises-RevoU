/* Make a function of turning on a water heater, then suddenly the electricity goes down when the currentElectricityRate is more than the maximumElectricityrate, and then show the text “Electricity Goes Down!”
 */

function turnOnWaterHeater(currentElectricityRate, maximumElectricityRate) {
    if (currentElectricityRate > maximumElectricityRate) {
        console.log("Electricity Goes Down!");
    } else {
        console.log("Water heater is succesfully turned on.");
    }
}

turnOnWaterHeater(150,100);
turnOnWaterHeater(80,100);