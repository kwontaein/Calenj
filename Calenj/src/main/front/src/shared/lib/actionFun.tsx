//requestAnimationFrame을 활용한 Throttle
export const throttleByAnimationFrame = (handler: (...args: any[]) => void) =>
 function (this: any, ...args: any[]) {
   window.requestAnimationFrame(() => {
     handler.apply(this, args)
   })
 }


export const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout> | null;

    return (...args: Parameters<T>) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

export const throttle = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let lastExecTime = 0;
    let isThrottled = false;
    let savedArgs: Parameters<T> | null = null;
  
    const execute = () => {
      if (savedArgs) {
        func(...savedArgs);
        savedArgs = null;
        lastExecTime = Date.now();
        setTimeout(execute, delay);
      }
      isThrottled = false;
    };
  
    return (...args: Parameters<T>) => {
      if (isThrottled) {
        savedArgs = args;
      } else {
        func(...args);
        isThrottled = true;
        lastExecTime = Date.now();
        setTimeout(execute, delay);
      }
    };
  };
