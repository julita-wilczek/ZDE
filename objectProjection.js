// 1.3.	Develop a program “Object Projection”.
// Input: any JSON object; prototype object.
// Output: projected object.
// Projected object structure shall be intersection of source object and prototype object structures.
// Values of properties in projected object shall be the same as values of respective properties in source object.

const srcJSON ='{"prop11":{"prop21":21,"prop22":{"prop31":31,"prop32":32}},"prop12":12}';
const sourceObject = JSON.parse(srcJSON);
const prototypeObject = { prop11: { prop22: null } };

const sourceObject2 = JSON.parse('{"prop11": { "prop21": 21,"prop22": {"prop31": {"prop41": 41},"prop32":32}},"prop12":12}');
const prototypeObject2 = { prop11: { prop22: null }, prop13: null };

const sourceObject3 = JSON.parse('{"prop11":{"prop21":21,"prop22":{"prop31":null,"prop32":32}},"prop12":{"prop23":{"prop33":33}}}');
const prototypeObject3 = { prop11: { prop22: { prop31: null } }, prop12: null };

function projectObject(source, prototype) {
  return Object.assign(...Object.keys(prototype).map((key) => {
      if (key in source) {
        if (isValidObject(source[key]) && isValidObject(prototype[key])) {
          // for properties that have object as a value
          const nestedObject = projectObject(source[key], prototype[key]);
          return Object.keys(nestedObject).length
            ? { [key]: nestedObject }
            : {};
        } else {
          return getKeyValue(source, key); // for properties that do not have object as a value
        }
      } else {
        return getKeyValue(prototype, key); // for cases when the prototype has property not existing in source object
      }
    })
  );
}

function isValidObject(object) {
  return object && typeof object === "object";
}

function getKeyValue(object, key) {
  return { [key]: object[key] };
}

console.log(projectObject(sourceObject, prototypeObject)); // expected {prop11: {prop22: {prop31:31, prop32: 32}}};
console.log(projectObject(sourceObject2, prototypeObject2)); // expected {prop11: {prop22: {prop31: {prop41: 41}, prop32: 32}}, prop13: null};
console.log(projectObject(sourceObject3, prototypeObject3)); // expected {prop11: {prop22: {prop31: 31}}, prop12: {prop23: {prop33:33}}};
