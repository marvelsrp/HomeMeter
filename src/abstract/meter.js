const gpio    = require('rpi-gpio');

class Meter {
  constructor(initParams){
    this.measureLog = [];
    this.id = initParams.id;
    this.weight  = initParams.weight || 1;
    this.delimiter = initParams.delimiter || 1;
    this.baseValue = initParams.baseValue || 0;
    this.title  = initParams.title || 'Meter';
    this.pin = initParams.pin || 12;
    this.pinMode = gpio[initParams.pinMode] || gpio.DIR_IN;
    this.edgeMode = gpio[initParams.edgeMode] || gpio.EDGE_RISING;

    gpio.setup(this.pin, this.pinMode, this.edgeMode);
    gpio.on('change', (pin, value) => {
      if (pin === this.pin) {
        console.log('grip handler',pin,value);

      }
    })

  }

  trigger() {
    this.measureLog.unshift({
      baseValue: this.baseValue,
      time: new Date().toISOString()
    });
    this.measureLog.length = 10000;
    this.baseValue += this.weight;
    return true;
  }

  getMeasure () {
    return this.baseValue / this.delimiter;
  }

  // Sets new base value
  setBaseValue = function(value) {
    this.baseValue = parseFloat(value) / this.delimiter;
    this.measureLog = [];
  }
}

module.exports = Meter;
