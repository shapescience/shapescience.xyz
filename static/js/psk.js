// constellations
var bpsk = [
    [0,   1],
    [180, 1]
]
var qpsk = [
    [45,   1],
    [135,  1],
    [-135, 1],
    [-45,  1],
]
var qam8 = [
    [0,   1],
    [90,  1],
    [180, 1],
    [-90, 1],
    [45,  .517],
    [135, .517],
    [-45, .517],
    [-135,.517]
]
// Simulation parameters
var f = project.view._element.getAttribute("f") || 1;    // clock frequency
var speed = 40;  // signal speed
var step = project.view._element.hasAttribute("step")// || true
var constellation_name = project.view._element.getAttribute("constellation") || 'bpsk'
var constellation = eval(constellation_name)
var symbol_i = project.view._element.getAttribute("symbol_i") | 1

var symbol = constellation[symbol_i]
// Layout
var radius = 50
var margin = 10
var center_symbol = new Point(radius + margin, view.center.y)
var center_clock  = new Point(3*radius + 3*margin, view.center.y)
var clock_position = center_clock + new Point(radius, 0)
var max_y_out = new Point(view.bounds.width, 0)
var x_axis = new Path.Line({
    to: center_symbol - [radius, 0],
    from: center_symbol + max_y_out,
    strokeColor: '#eee'
})
var y_axis_symbol = new Path.Line({
    to: center_symbol - [0, radius],
    from: center_symbol + [0, radius],
    strokeColor: '#eee'
})
var y_axis_clock = new Path.Line({
    to: center_clock - [0, radius],
    from: center_clock + [0, radius],
    strokeColor: '#eee'
})
var circle_clock = new Path.Circle({
        center: center_clock,
        radius: radius,
        strokeColor: '#ffffcc'
});

// Clock and signal
var clock = new Path.Circle({
        center: clock_position,
        radius: 7,
        fillColor: '#a1dab4'
});
// var clock_hand = new Path.Line({
//     to: clock_position,
//     from: center_clock,
//     strokeColor: '#a1dab4',
//     strokeWidth: 2,
// })


var clock_shifted = new Path.Circle({
    center: clock_position.rotate(-symbol[0], center_clock),
    radius: 0,
    fillColor: '#41b6c4'
});
clock_ampl_pos = clock_shifted.position + (center_clock-clock_shifted.position) * (1-symbol[1])
var clock_ampl = new Path.Line({
    from: clock_shifted.position,
    to: clock_ampl_pos,
    dashArray: [3, 3],
    strokeColor: '#f03b20',
})
var shift_arc = new Path.Arc({
    from: clock_position,
    through: clock_position.rotate(-symbol[0]/2, center_clock),
    to: clock_position.rotate(-symbol[0], center_clock),
    strokeColor: '#f03b20',
    dashArray: [3, 3],
});
var signal = new Path.Circle({
        center: [center_clock.x, clock_ampl_pos.y],
        radius: 5,
        fillColor: '#225ea8'
})
var guide_signal = new Path.Line({
    from: signal.position,
    to: clock_shifted.position,
    dashArray: [3, 3],
    strokeWidth: 4,
    strokeColor: '#41b6c4'
})
guide_signal.insertBelow(clock); 


// Symbols
function draw_constellation(constellation){
    var s
    constellation_symbols = []
    for(var i=0; i< constellation.length; i++){
        s = constellation[i]
        pos_amplitude = (center_symbol + new Point(radius*s[1], 0))
        constellation_position = pos_amplitude.rotate(-s[0], center_symbol)
        constellation_symbols[i] = new Path.Circle({
                center: constellation_position,
                radius: 5,
                fillColor: '#ffeda0'
        })
    } 
    return constellation_symbols
}
var constellation_symbols = draw_constellation(constellation)
var symbol_wait = new Path.Arc();

symbol_position_no_shift = center_symbol + new Point(radius*symbol[1], 0)
symbol_position_no_ampl = (center_symbol + [radius, 0]).rotate(-symbol[0], center_symbol)
symbol_position = symbol_position_no_shift.rotate(-symbol[0], center_symbol)
var symbol_marker = new Path.Circle({
        center: symbol_position,
        radius: 5,
        fillColor: '#d7301f'
})
var shift_arc_symbol = new Path.Arc({
    from: center_symbol + [radius, 0],
    through: (center_symbol + [radius, 0]).rotate(-symbol[0]/2, center_symbol),
    to: symbol_position_no_ampl,
    strokeColor: '#feb24c',
    dashArray: [3, 3]
});
var ampl_line_symbol = new Path.Line({
    from: symbol_position,
    to: symbol_position_no_ampl,
    strokeColor: '#feb24c',
    dashArray: [3, 3]
});
var last_symbol_sent = 0
var next_symbol_i = symbol_i
var next_symbol = symbol

// Historical signal
var historical_signal = new Path({
    strokeColor: '#225ea8',
    segments: [signal.position]
})
historical_signal.add(signal.position)
var last_historical_signal = 0



function onFrame(event) {
    var period_symbols = 2/f

    // UPDATE SYMBOLS
    if(next_symbol_i !== symbol_i){
        next_constellation_symbol = constellation_symbols[next_symbol_i]
        var delta = 360 *(event.time-last_symbol_sent) / period_symbols;
        var s_top = next_constellation_symbol.position + [0, -5]
        var s_mid = s_top.rotate(delta/2, next_constellation_symbol.position)
        var s_end = s_top.rotate(delta, next_constellation_symbol.position)
        if( (s_top-s_end).length>0.1){
            symbol_wait.remove()
            symbol_wait = new Path.Arc({
                from: s_top,
                through: s_mid,
                to: s_end,
                fillColor: '#fecc5c',
            });            
        }
    }
    
    if(event.time - last_symbol_sent > period_symbols){
       last_symbol_sent = event.time
       if(next_symbol_i !== symbol_i){
        // update the next symbol!
        next_constellation_symbol = constellation_symbols[next_symbol_i]
        symbol_wait.remove()

        // update the symbol!
        symbol = next_symbol
        symbol_i = next_symbol_i

        symbol_position_no_shift = center_symbol + new Point(radius*symbol[1], 0)
        symbol_position_no_ampl = (center_symbol + [radius, 0]).rotate(-symbol[0], center_symbol)
        symbol_position = symbol_position_no_shift.rotate(-symbol[0], center_symbol)
        symbol_marker.position = symbol_position
        shift_arc_symbol.remove()
        shift_arc_symbol = new Path.Arc({
            from: center_symbol + [radius, 0],
            through: (center_symbol + [radius, 0]).rotate(-symbol[0]/2, center_symbol),
            to: symbol_position_no_ampl,
            strokeColor: '#feb24c',
            dashArray: [3, 3]
        });
        ampl_line_symbol.segments = [symbol_position, symbol_position_no_ampl]
    
        shift_arc.remove()
        delta_phase = next_symbol[0]-symbol[0]
        shift_arc = new Path.Arc({
            from: clock.position,
            through: clock.position.rotate(-symbol[0]/2, center_clock),
            to: clock.position.rotate(-symbol[0], center_clock),
            strokeColor: '#f03b20',
            dashArray: [3, 3],
        });
        }
        next_symbol_i = Math.floor(Math.random(constellation.length)*constellation.length)
        next_symbol = constellation[next_symbol_i]
     }
        
    // UPDATE SIGNAL
    theta = Math.min(10, f * event.delta * 360) // chopiness: time
    clock.position = clock.position.rotate(-theta, center_clock)
    // clock_hand.rotate(-theta, center_clock)
    clock_shifted.position = clock.position.rotate(-symbol[0], center_clock)
    clock_ampl_pos = clock_shifted.position + (center_clock-clock_shifted.position) * (1-symbol[1])
    clock_ampl.segments = [clock_shifted.position,
                           clock_ampl_pos]

    signal.position = [center_clock.x, clock_ampl_pos.y];
    shift_arc.rotate(-theta, center_clock) // doesnt survive symbol changes


    guide_signal.segments[0].point = signal.position;
    guide_signal.segments[1].point = clock_ampl_pos;

    // UPDATE HISTORICAL SIGNAL
    historical_signal.segments[0].point = signal.position;
    emit_delta = 1/(2*f) / 50
    // we avoid dealing with the user changing tab
    if(event.time - last_historical_signal > 20*emit_delta){
        historical_signal.removeSegments(0);
    }
    // we sample the signal finely 
    if(event.time - last_historical_signal > emit_delta){
        historical_signal.insert(1, signal.position)
        last_historical_signal = event.time;
    }
    // we translate sampled datapoints
    for(var i = 1; i < historical_signal.segments.length; i++) {
        historical_signal.segments[i].point += [speed * event.delta, 0];
        if(historical_signal.segments[i].point.x > view.bounds.width){
            historical_signal.removeSegments(i);
            continue;
        }
    };
    historical_signal.smooth({ type: 'continuous' });
}

function closest_symbol(point){
    var best = [Infinity, -1];
    var d;
    for(var i=0; i< constellation.length; i++){
        s = constellation[i]
        pos_amplitude = (center_symbol + new Point(radius*s[1], 0))
        constellation_position = pos_amplitude.rotate(-s[0], center_symbol)
        d = (constellation_position - point).length
        if(d<best[0]){
            best = [d, i]
        }
    }
    return(best[1])
}


function onMouseDown(event) {
    // clean previous
    next_constellation_symbol = constellation_symbols[next_symbol_i]
    next_constellation_symbol.fillColor = '#ffeda0'
    symbol_wait.remove()

    // update next
    next_symbol_i = closest_symbol(event.point);
    next_symbol = constellation[next_symbol_i];
}

function onMouseDrag(event) {
    f = f + event.delta.x * 0.01
    f = Math.min(f, 3)
    f = Math.max(f, 0)
}