var f = 0.25;     // clock frequency
var speed = 40;  // signal speed

var radius = 50
var center = new Point(radius+5, view.center.y)
var clock_position = center + new Point(radius, 0)
var max_y_out = new Point(view.bounds.width, 0)

var x_axis = new Path.Line({
    to: center-[radius, 0],
    from: center + max_y_out,
    strokeColor: '#eee'
})
var y_axis = new Path.Line({
    to: center-[0, radius],
    from: center + [0, radius],
    strokeColor: '#eee'
})
var circle = new Path.Circle({
        center: center,
        radius: radius,
        strokeColor: '#edf8b1'
});
var clock = new Path.Circle({
        center: clock_position,
        radius: 5,
        fillColor: '#7fcdbb'
});
var clock_hand = new Path.Line({
    to: clock_position,
    from: center,
    strokeColor: '#a1dab4',
    strokeWidth: 2,
})
var signal = new Path.Circle({
        center: [center.x, clock_position.y],
        radius: 5,
        fillColor: '#2c7fb8'
})
var guide_signal = new Path.Line({
    from: signal.position,
    to: clock_position,
    dashArray: [3, 3],
    strokeWidth: 4,
    strokeColor: '#41b6c4'
})
guide_signal.insertBelow(clock); 


var historical_signal = new Path({
    strokeColor: '#2c7fb8',
    // selected: true,
    segments: [signal.position]
})
historical_signal.add(signal.position)
var last_historical_signal = 0

function onFrame(event) {
        var theta = Math.min(10, f * event.delta * 360) // chopiness: time
        clock_position = clock_position.rotate(theta, center)
        signal.position = [center.x, clock_position.y];

        guide_signal.segments[0].point = signal.position
        guide_signal.segments[1].point = clock_position
        clock.position = clock_position;
        clock_hand.rotate(theta, center)

        historical_signal.segments[0].point = signal.position
        emit_delta = 1/(2*f) / 20
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


function onMouseDrag(event) {
    f = f + event.delta.x * 0.01
    f = Math.min(f, 2)
    f = Math.max(f, 0)
}