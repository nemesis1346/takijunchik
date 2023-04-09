/**
 * Parse the response from an HTTP request
 * @param {object} response - The response object
 * @returns {any} - The parsed response
 */
export const parseResponse = (response) => {
    const body = JSON.parse(response);
  
    if (body.status === '200') {
      return body.data;
    } else {
      return body.message;
    }
  }
  
  /**
   * Remove duplicates from an array of objects
   * @param {object[]} arr - Array of objects
   * @param {string} prop - Property of each object to compare
   * @returns {object[]} - Array of objects without duplicates
   */
  export const removeDuplicatesProp = (arr, prop) => {
    const obj = {};
  
    return Object.keys(arr.reduce((prev, next) => {
      if (!obj[next[prop]]) obj[next[prop]] = next;
      return obj;
    }, obj)).map((i) => obj[i]);
  }
  
  /**
   * Parse content
   * @param {string} content - The content to parse
   * @returns {string[]} - The parsed content
   */
  export const parseContent = (content) => {
    let entireContent = content;
    let finalResult = [];
  
    //Processing for the entire sentence
    for (let index = 0; index <= entireContent.length; index++) {
      for (let j = index; j <= entireContent.length; j++) {
        const currentResult = entireContent.slice(index, j).trim();
        if (currentResult) {
          finalResult.push(currentResult.toLowerCase());
        }
      }
    }
  
    finalResult = removeDuplicates(finalResult);
    return finalResult;
  }
  
  /**
   * Remove duplicates from an array
   * @param {any[]} arr - The array to remove duplicates from
   * @returns {any[]} - The array without duplicates
   */
  export const removeDuplicates = (arr) => {
    const unique_array = [];
  
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) === -1) {
        unique_array.push(arr[i]);
      }
    }
  
    return unique_array;
  }
  
  /**
   * Remove duplicates from an array of objects
   * @param {object[]} myArr - The array of objects to remove duplicates from
   * @param {string} prop - The property to compare
   * @returns {object[]} - The array of objects without duplicates
   */
  export const removeDuplicates2 = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
  