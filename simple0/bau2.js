
function getCallerInfo() {
  console.log('getCallerInfo!!!!!!!!!!!!!'); 
  const err = new Error();
  const stack = err.stack?.split('\n');

  if (!stack || stack.length < 4) {
    return { functionName: null, file: null, line: null };
  }

  // The 3rd item (index 2) is the current function, 4th (index 3) is the caller
  const callerLine = stack[3] || '';
  const match = callerLine.match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/) ||
    callerLine.match(/at\s+(.*):(\d+):(\d+)/);

  if (match) {
    return match.length === 5
      ? {
        functionName: match[1],
        file: match[2],
        line: parseInt(match[3]),
      }
      : {
        functionName: null,
        file: match[1],
        line: parseInt(match[2]),
      };
  }

  return { functionName: null, file: null, line: null };
}







