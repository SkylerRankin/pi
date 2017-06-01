var sumFunction;

$(document).ready(function() {
   $("#background").css("width", $(window).width());
    $("#background").css("height", $(window).height());
    $("#step").val("1");
    $("#time-input").val("1000");
    
    var pi = "3.14159265358979323846264338327950288419";
    
    var timer;
    var skip = 1;
    var equation = 0;
    var temp;
    var display = "`4sum_(i=0)^n((-1)^i/(2i+1)) = `";
    
    $("#alternatingOdd").click(function() {
        temp = 0;
        display = "`4sum_(i=0)^n((-1)^i/(2i+1)) = `";
        $(this).css("color", "rgba(255, 255, 255, .5)");
        $("#abrahamSharp").css("color", "white");
        $("#doubleFactorial").css("color", "white");
    });
    $("#abrahamSharp").click(function() {
        temp = 1;
        display = "`sum_(i=0)^n((2(-1)^i3^(1/2-i))/(2i+1)) = `";
        $(this).css("color", "rgba(255, 255, 255, .5)");
        $("#alternatingOdd").css("color", "white");
        $("#doubleFactorial").css("color", "white");
    });
    $("#doubleFactorial").click(function() {
        temp = 2;
        display = "`2sum_(i=0)^n((2i)!!)/((2i+1)!!)(1/2)^i = `";
        $(this).css("color", "rgba(255, 255, 255, .5)");
        $("#alternatingOdd").css("color", "white");
        $("#abrahamSharp").css("color", "white");
    });
    
    $("#restart").click(function() {
        skip = $("#step").val();
        console.log("skip="+skip);
        $("#iterations").text(0);
        $("#summation").text(display);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "#summation"]);
        
        equation = temp;
        var delay = $("#time-input").val();
        
        summation = (function() {
            var n=0;
            var sum=0;
            var alternatingOdd = function(n) { return 4*Math.pow((-1), n) / (2*n + 1); };
            var abrahamSharp = function(n) { return (2*Math.pow((-1), n)*Math.pow(3, .5-n))/(2*n+1); };
            var doubleFactorial = function(n) { return 2*( (fac2(2*n)) * (Math.pow(.5, n))   ) / (fac2(2*n+1)); };
            var functions = [alternatingOdd, abrahamSharp, doubleFactorial];
            
            return function(a) {
                sum += functions[a](n);
                n++;
                return sum;
            };
        })();
        
        timer = window.setInterval(function() {
        
        $("#iterations").text(Number($("#iterations").text())+Number(skip));
        
        var curr;
        for (var i=0; i<skip; ++i)
            curr = summation(equation).round(17).toString();
        console.log(curr);
        for (i=0; i<curr.length; ++i) {
            if (curr.substring(i, i+1)===".") {
                if (curr.substring(0, 1)===pi.substring(0, 1)) $("div.digit").eq(i).css("color", "white");
                else $("div.digit").eq(i).css("color", "rgb(43, 82, 145)");
            } else {
                $("div.digit").eq(i).text(curr.substring(i, i+1));
                 if (curr.substring(i, i+1)===pi.substring(i, i+1))
                    $("div.digit").eq(i).css("color", "white");
                else $("div.digit").eq(i).css("color", "rgb(43, 82, 145)");
            }
            
        }
    }, delay);
    
    });
    
    $("#alternatingOdd").click();
    $("#restart").click();
    /*
    var timer = window.setInterval(function() {
        
        $("#iterations").text(Number($("#iterations").text())+Number(skip));
        
        var curr;
        for (var i=0; i<skip; ++i)
            curr = summation(equation).round(17).toString();
        for (i=0; i<curr.length; ++i) {
            if (curr.substring(i, i+1)===".") {
                if (curr.substring(0, 1)===pi.substring(0, 1)) $("div.digit").eq(i).css("color", "white");
                else $("div.digit").eq(i).css("color", "rgb(43, 82, 145)");
            } else {
                $("div.digit").eq(i).text(curr.substring(i, i+1));
                 if (curr.substring(i, i+1)===pi.substring(i, i+1))
                    $("div.digit").eq(i).css("color", "white");
                else $("div.digit").eq(i).css("color", "rgb(43, 82, 145)");
            }
            
        }
    }, 100);
    */
});

$(window).on("resize", function() {
    $("#background").css("width", $(window).width());
    $("#background").css("height", $(window).height());
});

function fac2(x) {
    if (x === 0) return 1;
    if (x === 1) return 1;
    if (x === -1) return 1;
    return x * fac2(x - 2);
}
Number.prototype.round = function(a) {
        var mult = Math.pow(10, a);
        return Math.floor(this*mult)/mult;
    };