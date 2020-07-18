var ook = [
    [90, 0],
    [90, 1]
]
var ook_laser = [
    [90, 0.05],
    [90, 1]
]
var ask4 = [
    [90, .00],
    [90, .33],
    [90, .66],
    [90,1.00],
]
var ask4_laser = [
    [90, .05],
    [90, .35],
    [90, .68],
    [90,1.00],
]
// Simulation parameters
// var f = project.view._element.getAttribute("f") || 1.5;    // clock frequency
var f=1.5;
var speed = 40;  // signal speed
var step = project.view._element.hasAttribute("step")// || true
var constellation = eval(project.view._element.getAttribute("constellation"))
var symbol_i = project.view._element.getAttribute("symbol_i")
var draw_guide = project.view._element.hasAttribute("guide") || false

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
    strokeColor: '#ddd'
})
var y_axis_symbol = new Path.Line({
    to: center_symbol - [0, radius],
    from: center_symbol + [0, radius],
    strokeColor: '#ddd'
})
var y_axis_clock = new Path.Line({
    to: center_clock - [0, radius],
    from: center_clock + [0, radius],
    strokeColor: '#ddd'
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
var clock_hand = new Path.Line({
    to: clock_position,
    from: center_clock,
    strokeColor: '#a1dab4',
    strokeWidth: 4,
})


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
    strokeColor: draw_guide ? '#f03b20' : 'rgba(0,0,0,0)',
})
// var shift_arc = new Path.Arc({
//     from: clock_position,
//     through: clock_position.rotate(-symbol[0]/2, center_clock),
//     to: clock_position.rotate(-symbol[0], center_clock),
//     strokeColor: '#f03b20',
//     dashArray: [3, 3],
// });

var signal = new Path.Circle({
        center: [center_clock.x, step ? center_clock.y - radius*symbol[1] : clock_ampl_pos.y],
        radius: 5,
        fillColor: '#225ea8'
})
var guide_signal
if(draw_guide){
    var guide_signal = new Path.Line({
        from: signal.position,
        to: clock_shifted.position,
        dashArray: [3, 3],
        strokeWidth: 4,
        strokeColor: '#41b6c4'
    })
    guide_signal.insertBelow(clock);    
}
var signal_periods = []

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
// var shift_arc_symbol = new Path.Arc({
//     from: center_symbol + [radius, 0],
//     through: (center_symbol + [radius, 0]).rotate(-symbol[0]/2, center_symbol),
//     to: symbol_position_no_ampl,
//     strokeColor: '#feb24c',
//     dashArray: [3, 3]
// });
// var ampl_line_symbol = new Path.Line({
//     from: symbol_position,
//     to: symbol_position_no_ampl,
//     strokeColor: '#feb24c',
//     dashArray: [3, 3]
// });
var last_symbol_sent = 0
var next_symbol_i = Math.floor(Math.random(constellation.length)*constellation.length)
var next_symbol = constellation[next_symbol_i]

// Historical signal
var historical_signal = new Path({
    strokeColor: '#225ea8',
    segments: [signal.position]
})
historical_signal.add(signal.position)
var last_historical_signal = 0



function onFrame(event) {
    var period_symbols = (step? 1: 3) * 1/f

    // UPDATE SYMBOLS
    if(next_symbol_i !== symbol_i){
        var next_constellation_symbol = constellation_symbols[next_symbol_i]
        var delta = 360 *(event.time-last_symbol_sent) / period_symbols;
        var s_top = next_constellation_symbol.position + [0, -5]
        var s_mid = s_top.rotate(delta/2, next_constellation_symbol.position)
        var s_end = s_top.rotate(delta, next_constellation_symbol.position)
        symbol_wait.remove()
        symbol_wait = new Path.Arc({
            from: s_top,
            through: s_mid,
            to: s_end,
            fillColor: '#fecc5c',
        });
        }
    
    if(event.time - last_symbol_sent > period_symbols){
       last_symbol_sent = event.time
       var period_line = new Path.Line({
           from: center_clock + [0, radius],
           to: center_clock + [0, -radius],
           //strokeColor: 'rgba(0,0,0,.1)',
           strokeColor: '#bbb',
           dashArray: [5, 5]
       })
       period_line.insertBelow(signal)
       signal_periods.unshift(period_line)
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
        }
        next_symbol_i = Math.floor(Math.random(constellation.length)*constellation.length)
        next_symbol = constellation[next_symbol_i]
     }
        
    // UPDATE SIGNAL
    theta = Math.min(10, f * event.delta * 360) // chopiness: time
    clock.position = clock.position.rotate(-theta, center_clock)
    clock_hand.rotate(-theta, center_clock)
    // clock_shifted.position = clock.position.rotate(-symbol[0], center_clock)
    clock_shifted.position = clock.position
    clock_ampl_pos = clock_shifted.position + (center_clock-clock_shifted.position) * (1-symbol[1])
    clock_ampl.segments = [clock_shifted.position,
                           clock_ampl_pos]
    signal.position = [center_clock.x, step ? center_clock.y - radius*symbol[1] : clock_ampl_pos.y];
    // shift_arc.rotate(-theta, center_clock) // doesnt survive symbol changes

    if(draw_guide){
        guide_signal.segments[0].point = signal.position;
        guide_signal.segments[1].point = clock_ampl_pos;        
    }

    // UPDATE HISTORICAL SIGNAL
    historical_signal.segments[0].point = signal.position;
    emit_delta = 1/(2*f) / 50
    // we avoid dealing with the user changing tab
    if(event.time - last_historical_signal > 20*emit_delta){
        historical_signal.removeSegments(0);
        signal_periods.map(function(path){path.remove()})
        signal_periods = []
    }
    // we sample the signal finely 
    if(event.time - last_historical_signal > emit_delta){
        historical_signal.insert(1, signal.position)
        last_historical_signal = event.time;
    }
    // we translate period indicators
    for(var i = 0; i<signal_periods.length; i++){
        signal_periods[i].position.x += speed * event.delta
        if(signal_periods[i].position.x >= view.bounds.width){
            signal_periods[i].remove()
            signal_periods.splice(i);
            //continue
        }
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
    f += event.delta.x * .01;
    f = Math.min(f, 3);
    f = Math.max(f, 0);
}