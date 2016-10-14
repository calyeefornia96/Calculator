$(document).ready(function() {
  var input = '';
  var total = '';
  var current = '';
  var log = '';
  var decimal = true;
  var reset = '';

  $("button").click(function() {
    input = $(this).attr("value");

    //handles the ac && ce values.
    if (input === 'ac') {
      input = '';
      total = '';
      current = '';
      log = '';
      decimal = true;
      $('#answer').html('0');
      $('#history').html('0');
    } else if (input === 'ce') {
      log = log.slice(0, -current.length);
      total = log.slice(0, -current.length);
      $('#history').html(log);
      current = total;
      if (log.length === 0 || log === ' ') {
        $('#history').html('0');
      }
      $('#answer').html('0');
      input = '';
      decimal = true;
    }

    //restriction of numerous decimals
    if (input === '.' || input === '0.') {
      if (!decimal) {
        input = '';
      }
    }

    //restriction of proper first input
    if (total.length === 0 && input !== '.' && isNaN(input) || total.length === 0 && input === '0') {
      input = '';
    }

    //restriction of multiple operators && the case of inputting a operator w/o any corresponding numbers
    if (isNaN(input) && isNaN(current) && input !== '.' ||
      current === '' && isNaN(input) && input !== '.') {
      input = '';
    }

    //handling number inputs
    if (Number(input) || input === '0' || current === '.') {
      if (isNaN(current) && input === '0' && current !== '.') {
        input = '';
      } else if(isNaN(current) && Number(input) &&  current !== '.'){
        current = '';
      }
      

      if (input === '.') {
        decimal = false;
      }
      if (current === '0.' && isNaN(input)) {
        input = '';
      } else {
        if (current[current.length - 1] === '.') {
          current = current.concat(input);
        } else {
          current += input;
        }
        total += input;
        $('#answer').html(current);
        log += input;
        $('#history').html(log);
        input = '';
      }
    }
//operators
    
    if (input === '.') {
      if (current === '' || isNaN(current[current.length - 1])) {
        current = '0.';
        total += input;
        $('#answer').html('0.');
        log += current;
        $('#history').html(log);

      } else {
        current = current.concat('.');
        total = total.concat('.');
        log = total;
        $('#answer').html(current);
        $('#history').html(total);
      }
      input = '';
      decimal = false;
    }

    else if (input === '/') {
      current = '/';
      total = eval(total) + current;
      log += current;
      $('#answer').html(current);
      $('#history').html(log);
      input = '';
      decimal = true;
    }

    else if (input === '*') {
      current = '*';
      total = eval(total) + current;
      log += 'X';
      $('#answer').html('X');
      $('#history').html(log);
      input = '';
      decimal = true;
    }

    else if (input === '+') {
      current = '+';
      total = eval(total) + current;
      log += current;
      $('#answer').html(current);
      $('#history').html(log);
      input = '';
      decimal = true;
    }

    else if (input === '-') {
      current = '-';
      total = eval(total) + current;
      log += current;
      $('#answer').html(current);
      $('#history').html(log);
      input = '';
      decimal = true;
    }

    else if (input === '=') {
      if (current[current.length - 1] === '.') {
        input = '';
      } else {
        current = eval(total).toString();
        $('#answer').html(eval(total));
        total = eval(total);
        log += input + total;
        $('#history').html(log);
        log = total;
        input = '';
        decimal = true;
      }
    }

  });
})