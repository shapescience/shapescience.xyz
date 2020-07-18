// ==== optical imparairements: dispersion
// signal has spectrum: carrier
// modululation introduces more harmonices
// n=f(wavelength) => show signal gets distorted = f(distance)
// eye diagram
// (different modululations slightly different)
// but mainly, signal shaping helps: show on
// - spectrum
// - pulse
// - eye diagram
// linear effect, possible to correct..


var π = Math.PI
var sin = Math.sin

// var f_carrier  = 2000   // GHz 1900?
// var f_baud     =   50   // GHz 10?
// var f_sampling =   50*f_carrier //vs2: to be sure

var f_carrier  = 2000   // GHz 1900?
var f_baud     =   50   // GHz 10?
var f_sampling =   10*f_carrier //vs2: to be sure

var none = [[0,1]]
var ook = [
    [0, 0],
    [0, 1]
]
var bpsk = [
    [0, 1],
    [π, 1]
]
var qpsk = [
    [ 0,   1],
    [ π/2, 1],
    [ π,   1],
    [-π/2, 1]
]
var qam16 = [
    [ 0,   1],
    [ π/2, 1],
    [ π,   1],
    [-π/2, 1],
]
var modulation_name = project.view._element.getAttribute("modulation") || 'none'
var modulation = eval(modulation_name)
console.log('modulation: ', modulation_name)


// Experiment setup #######################################
// bits? line code?
// sampling ###############################################
var n_samples = 4096*32 // 2^n for FTT convenience
console.log(n_samples + ' samples')
var samples_per_symbol = Math.floor(f_sampling / f_baud)
var n_symbols = Math.floor(n_samples * f_baud/f_sampling)+1
var symbols = new Int8Array(n_symbols)
for (var i = 0; i < n_symbols; i++) {
    symbols[i] = Math.random() * modulation.length
}
console.log(n_symbols + ' symbols')

// signal #################################################
var t0 = 0                        // start time
var t1 = n_symbols / f_baud       // end time, nanoseconds
var signal0 = new Float32Array(n_samples) // as sent


var symbol_i = 0
var symbol = symbols[symbol_i]
var symbol_sample = 0
var phase, amplitude;
for (var i = 0; i < n_samples; i++) {
    phase = modulation[symbol][0]
    ampl = modulation[symbol][1]
    signal0[i] = ampl*sin(2*π*f_carrier*i/f_sampling+phase)

    symbol_sample++
    if (symbol_sample > samples_per_symbol){
        symbol_i++
        symbol = symbols[symbol_i]
        symbol_sample = 0
    }
}

// spectrum ###############################################
var fft = new FFT(n_samples, f_sampling);
fft.forward(signal0);

// 4. compute spectrum
//     * interaction with modulation (spectrum shaping?)
// 5. dispersion = f(distance)
//     * interact with reach, modulation, (spectrum shaping? fiber_n_profile?)
// 6. additive white gaussian noise
//     * interact with reach
// 6. received signal
//     * in temporal domain
//     * in constellations, (BER?)

// layout ===================================================
var margin = 10;
var xaxis0 = new Point(margin, view.center.y)
var xaxis1 = new Point(view.bounds.width-margin, view.center.y)
var yaxis0 = new Point(margin, view.bounds.height-margin)
var yaxis1 = new Point(margin, margin)


// scaling factors
var xmin, xmax, ymin, ymax
// where do we plot our sample points?
function scale_x(x){
    return (x-xmin)/(xmax-xmin)* (xaxis1.x-xaxis0.x) + xaxis0.x;
}
function scale_y(s){
    return (s-ymin)/(ymax-ymin) * (yaxis1.y-yaxis0.y) + yaxis0.y;
}


// drawing ===================================================
function draw_input(){
    xmin =  0
    xmax =  n_samples
    ymin = -1
    ymax =  1
    var signal0_path = {
        values: {},
        path: new Path({
            strokeColor: 'blue'
        })
    }
    var x_axis = new Path.Line({
        from: xaxis0,
        to: xaxis1,
        strokeColor: '#ddd'
    })
    for(var x=0; x<=n_samples; x++){
        var x_pos = scale_x(x)
        var y_pos = scale_y(signal0[x])
        signal0_path.path.add([x_pos, y_pos])
    }
}
// draw_input()


var spectrum_path = {
    values: {},
    path: new Path({
        strokeWidth: 3,
        strokeColor: 'rgba(117,107,177,0.9)'
    })
}
function draw_spectrum(spectrum, scaling){
    if(scaling){
        spectrum = spectrum.map(function(s){return scaling(s)})
    }
    xmin =  0
    xmax =  spectrum.length
    ymin = scaling(0.001) //Math.min.apply(null, spectrum)
    ymax = scaling(0.5) //Math.max.apply(null, spectrum)
    // spectrum density
    for(var x=0; x<=spectrum.length; x++){
        var x_pos = scale_x(x)
        var y_pos = scale_y(spectrum[x])
        spectrum_path.path.add([x_pos, y_pos])
    }
    // log scale
    y_lines = new CompoundPath({strokeColor: 'rgba(239,237,245)'})
    for(var s=0.001; s<=0.1; s=10*s){
        for(var l=2*s; l<=10*s; l=l+s){
            y_lines.addChild(new Path.Line({
                from: new Point(scale_x(xmin), scale_y(scaling(l))),
                to: new Point(scale_x(xmax), scale_y(scaling(l)))
            }))
        }
    }
    y_lines.sendToBack()
}

var i_carrier = Math.floor(2 * fft.spectrum.length / (f_sampling/f_carrier) )
var i_baud = Math.floor(2 * fft.spectrum.length / (f_sampling/f_baud) )
// fft.getBandFrequency(0)
// fft.getBandFrequency(i_carrier)
useful_spectrum = fft.spectrum.slice(i_carrier-4*i_baud, i_carrier+4*i_baud)
function dB(s){
    return 20*Math.log10(s);
}
draw_spectrum(useful_spectrum, dB)
